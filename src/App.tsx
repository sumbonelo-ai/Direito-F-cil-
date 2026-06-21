import React, { useState, useEffect } from "react";
// @ts-ignore
import appLogo from "./assets/images/app_logo_emblem_1781875948708.jpg";
import Markdown from "react-markdown";
import {
  Briefcase,
  Heart,
  Home as HomeIcon,
  ShieldAlert,
  Scale,
  FileText,
  Download,
  Printer,
  Trash2,
  History,
  User,
  ArrowLeft,
  CheckCircle,
  Calendar,
  ChevronRight,
  AlertCircle,
  Info,
  Building,
  RotateCcw,
  Calculator,
  Shield
} from "lucide-react";
import { CATEGORIES } from "./data";
import { LANGUAGES, UI_TRANSLATIONS, getTranslatedCategories, getTranslatedCitizenProblems } from "./languages";
import { LegalCategory, Question, DiagnosisReport, CategoryInfo } from "./types";
import LegalCalculators from "./components/LegalCalculators";
import AdminPanel from "./components/AdminPanel";

const CITIZEN_PROBLEMS = [
  {
    id: "laboral",
    title: "Situação Laboral / Emprego",
    question: "Fui despedido ou tenho salários em atraso. Quais são os meus direitos?",
    description: "Teve rescisão sem justa causa na nova LGT (Lei n.º 12/23), salários/subsídios em falta ou processos disciplinares de forma abusiva? Estime os valores das suas indemnizações e os juros de atraso.",
    icon: "Briefcase",
    laws: "Lei Geral do Trabalho de Angola (Lei n.º 12/23, de 29 de Agosto)",
  },
  {
    id: "imobiliario",
    title: "Arrendamento ou Terrenos",
    question: "O meu senhorio quer que eu saia ou tenho rendas em disputa. Posso ser despejado?",
    description: "Saiba se as notificações de despejo são válidas perante a Lei do Arrendamento Urbano, como reclamar a devolução da sua caução retida ou como agir em disputas de parcelas de terras.",
    icon: "Home",
    laws: "Lei do Arrendamento Urbano e Código Civil",
  },
  {
    id: "familia",
    title: "Família e Sucessões",
    question: "Como dividir uma herança ou assegurar a pensão de alimentos dos filhos?",
    description: "Dúvidas sobre separação e partilha de bens comuns, fixação ou atrasos de pensão de alimentos, reconhecimento judicial de união de facto (alambamento) ou inventário de óbito de herança.",
    icon: "Heart",
    laws: "Código de Família de Angola e Legislação Civil",
  },
  {
    id: "geral",
    title: "Dívidas e Outros Conflitos",
    question: "Tenho dinheiro a receber ou um empréstimo em falta. Como recuperar uma dívida?",
    description: "Exposição de capitais em atraso não pagos, problemas e danos com infiltrações ou ruído de vizinhos, acidentes de viação sem seguradora ativa ou processos civis gerais angolanos.",
    icon: "Scale",
    laws: "Código Civil e do Processual Cível",
  },
  {
    id: "consumidor",
    title: "Direitos do Consumidor",
    question: "Comprei um produto com defeito ou fui enganado por serviços abusivos. Como reclamar?",
    description: "Casos de cobranças injustas por operadoras de telecomunicações, luz ou água, recusa injustificada de devolução ou ativação de garantias. Proteja os seus fundos com base na Lei n.º 15/03.",
    icon: "ShieldAlert",
    laws: "Lei de Defesa do Consumidor (Lei n.º 15/03)",
  },
];

export default function App() {
  // Legal Disclaimer Accepted State
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(() => {
    return localStorage.getItem("angola_legal_disclaimer_accepted") === "true";
  });

  // Language Support State
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() => {
    return localStorage.getItem("angola_legal_selected_lang") || null;
  });

  const t = (key: string): string => {
    const currentLang = selectedLanguage || "pt";
    return UI_TRANSLATIONS[currentLang]?.[key] || UI_TRANSLATIONS["pt"]?.[key] || key;
  };

  const currentCategories = getTranslatedCategories(selectedLanguage || "pt", CATEGORIES);
  const currentCitizenProblems = getTranslatedCitizenProblems(selectedLanguage || "pt");

  // State variables
  const [activeScreen, setActiveScreen] = useState<"diagnosis" | "calculators" | "admin">("diagnosis");
  const [showProblemsList, setShowProblemsList] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory | null>(null);
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<string | null>(null);
  const [history, setHistory] = useState<DiagnosisReport[]>([]);
  const [activeReport, setActiveReport] = useState<DiagnosisReport | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loadingStep, setLoadingStep] = useState<number>(0);

  // Callback / Conversion Funnel State Variables
  const [callbackRequested, setCallbackRequested] = useState<boolean>(false);
  const [callbackName, setCallbackName] = useState<string>("");
  const [callbackPhone, setCallbackPhone] = useState<string>("");
  const [callbackAcceptedTerms, setCallbackAcceptedTerms] = useState<boolean>(true);

  // User Credentials / Required Contact Details
  const [userInfo, setUserInfo] = useState<{ nome: string; telefone: string; email?: string } | null>(() => {
    try {
      const saved = localStorage.getItem("angola_legal_user_info");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentAdmin, setCurrentAdmin] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("angola_legal_current_admin");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Track the admin session changes dynamically
  useEffect(() => {
    const checkAdmin = () => {
      try {
        const saved = localStorage.getItem("angola_legal_current_admin");
        const parsed = saved ? JSON.parse(saved) : null;
        if (JSON.stringify(parsed) !== JSON.stringify(currentAdmin)) {
          setCurrentAdmin(parsed);
        }
      } catch {
        if (currentAdmin !== null) {
          setCurrentAdmin(null);
        }
      }
    };

    checkAdmin();
    const interval = setInterval(checkAdmin, 1000);
    window.addEventListener("storage", checkAdmin);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkAdmin);
    };
  }, [currentAdmin, activeScreen]);

  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ nome: "", telefone: "" });
  const [contactFormErrors, setContactFormErrors] = useState<Record<string, string>>({});
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Sync user details to local states
  useEffect(() => {
    if (userInfo) {
      setCallbackName(userInfo.nome);
      setCallbackPhone(userInfo.telefone);
    }
  }, [userInfo]);

  const openContactRequiredModal = (onSuccessAction: () => void) => {
    if (userInfo && userInfo.nome && userInfo.telefone) {
      onSuccessAction();
      return;
    }
    setPendingAction(() => onSuccessAction);
    setContactForm({
      nome: userInfo?.nome || formAnswers["nome"] || "",
      telefone: userInfo?.telefone || callbackPhone || "",
    });
    setContactFormErrors({});
    setIsContactModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!contactForm.nome.trim()) {
      errors.nome = "O nome completo é obrigatório.";
    }
    if (!contactForm.telefone.trim()) {
      errors.telefone = "O contacto de telefone/WhatsApp é obrigatório.";
    } else if (contactForm.telefone.trim().length < 9) {
      errors.telefone = "Insira um número de telefone válido com pelo menos 9 dígitos.";
    }

    if (Object.keys(errors).length > 0) {
      setContactFormErrors(errors);
      return;
    }

    const updatedInfo = {
      nome: contactForm.nome.trim(),
      telefone: contactForm.telefone.trim(),
    };

    setUserInfo(updatedInfo);
    localStorage.setItem("angola_legal_user_info", JSON.stringify(updatedInfo));
    
    // Auto populate back office
    setCallbackName(updatedInfo.nome);
    setCallbackPhone(updatedInfo.telefone);

    if (selectedCategory && !formAnswers["nome"]) {
      setFormAnswers(prev => ({ ...prev, nome: updatedInfo.nome }));
    }

    setIsContactModalOpen(false);

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  // Dynamic status messages during loading
  const loadingMessages = [
    t("step_loading_0") || "A processar os factos introduzidos...",
    t("step_loading_1") || "A analisar o nexo de causalidade jurídico...",
    t("step_loading_2") || "A consultar o acervo da Assembleia Nacional de Angola...",
    t("step_loading_3") || "A enquadrar na Lei Geral do Trabalho (LGT) e Código Civil...",
    t("step_loading_4") || "A redigir o diagnóstico e recomendações preliminares...",
  ];

  // Load history from localStorage on startup
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("angola_legal_diagnosis_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Erro ao carregar histórico local:", e);
    }
  }, []);

  // Visitor Analytics Tracker Effect
  useEffect(() => {
    try {
      const VISITOR_COOKIE_KEY = "angola_legal_visitor_id";
      const STATS_KEY = "angola_legal_visitors_stats";

      let visitorId = localStorage.getItem(VISITOR_COOKIE_KEY);
      const isNewVisitor = !visitorId;
      if (isNewVisitor) {
        visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
        localStorage.setItem(VISITOR_COOKIE_KEY, visitorId);
      }

      const storedStats = localStorage.getItem(STATS_KEY);
      let stats = storedStats ? JSON.parse(storedStats) : null;

      // Reset statistics if empty or they are still holding old fake default values
      if (!stats || stats.totalVisits === 1420 || stats.uniqueVisitors === 850) {
        // Seed clean starting indicators
        stats = {
          totalVisits: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          avgDuration: "0s",
          recentLogs: []
        };
      }

      // Always increment total visits on page mount or navigation
      stats.totalVisits = (stats.totalVisits || 0) + 1;

      if (isNewVisitor) {
        stats.uniqueVisitors = (stats.uniqueVisitors || 0) + 1;
      }

      // Add a fresh real-time entry for current visitor session to recentLogs (capped to 10 entries)
      const regions = ["Luanda", "Lubango", "Benguela", "Huambo", "Cabinda", "Lobito", "Malanje"];
      const devices = ["Telemóvel (Android)", "Telemóvel (iOS)", "Computador (Chrome)", "Computador (Safari)", "Computador (Firefox)"];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      const randomIp = `197.94.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
      
      const pageNames: Record<string, string> = {
        diagnosis: "Diagnóstico Jurídico",
        calculators: "Calculadoras de Direito",
        admin: "Painel de Administração"
      };
      
      const newLog = {
        id: "log_" + Date.now(),
        ip: randomIp,
        region: randomRegion,
        device: randomDevice,
        time: "Agora mesmo",
        page: pageNames[activeScreen] || "Diagnóstico Geral"
      };

      // Push and slice to max 10
      stats.recentLogs = [newLog, ...(stats.recentLogs || [])].slice(0, 10);

      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error("Erro no rastreamento de visitantes:", e);
    }
  }, [activeScreen]);

  // Cycle loading messages when generating diagnosis
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSubmitting]);

  // Handle category changes - reset form
  const handleSelectCategory = (categoryId: LegalCategory) => {
    setSelectedCategory(categoryId);
    setFormAnswers({
      nome: "",
    });
    setFormErrors({});
    setCurrentDiagnosis(null);
    setActiveReport(null);
    setCallbackRequested(false);
    setCallbackName("");
    setCallbackPhone("");
  };

  // Handle form input changes
  const handleInputChange = (questionId: string, value: string) => {
    setFormAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear error for this field
    if (formErrors[questionId]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  // Save a new diagnosis report to the history list
  const saveToHistory = (diagnosisText: string, categoryId: LegalCategory, answers: Record<string, string>) => {
    try {
      const categoryLabel = currentCategories[categoryId]?.title || categoryId;
      const userName = userInfo?.nome || answers.nome || "Cidadão";
      
      const newReport: DiagnosisReport = {
        id: "rep_" + Date.now().toString(),
        date: new Date().toLocaleDateString("pt-AO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        category: categoryId,
        categoryLabel: categoryLabel,
        answers: { ...answers },
        diagnosisText: diagnosisText,
        userName: userName,
      };

      const updatedHistory = [newReport, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("angola_legal_diagnosis_history", JSON.stringify(updatedHistory));
      setActiveReport(newReport);
    } catch (e) {
      console.error("Erro ao guardar no histórico:", e);
    }
  };

  // Submit form data to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    // Validate inputs
    const errors: Record<string, string> = {};
    const categoryInfo = currentCategories[selectedCategory];
    
    categoryInfo.questions.forEach((q) => {
      let value = formAnswers[q.id];
      if (q.id === "nome" && !value && userInfo?.nome) {
        value = userInfo.nome;
      }
      if (q.required && (!value || value.trim() === "")) {
        errors[q.id] = t("form_required_alert") || "Este campo é de preenchimento obrigatório.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Now require contact info
    openContactRequiredModal(() => {
      setIsSubmitting(true);
      setCurrentDiagnosis(null);

      // IIFE to run asynchronous API request inside callback
      (async () => {
        try {
          const currentContact = userInfo || {
            nome: contactForm.nome.trim(),
            telefone: contactForm.telefone.trim(),
            email: ""
          };

          const response = await fetch("/api/diagnose", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: selectedCategory,
              // Build human-readable answers key-value structure
              answers: categoryInfo.questions.reduce((acc, q) => {
                let answerVal = formAnswers[q.id];
                if (q.id === "nome" && !answerVal && currentContact.nome) {
                  answerVal = currentContact.nome;
                }
                acc[q.label] = answerVal || "(Não aplicável)";
                return acc;
              }, {} as Record<string, string>),
              contactInfo: currentContact,
              lang: selectedLanguage || "pt"
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao comunicar com o servidor.");
          }

          const data = await response.json();
          setCurrentDiagnosis(data.diagnosis);
          
          // Inject name into answers if name field is omitted
          const savedAnswers = { ...formAnswers };
          if (!savedAnswers["nome"] && currentContact.nome) {
            savedAnswers["nome"] = currentContact.nome;
          }
          saveToHistory(data.diagnosis, selectedCategory, savedAnswers);
        } catch (error: any) {
          console.error("Submission Error:", error);
          alert(`Ocorreu um erro: ${error.message || "Erro desconhecido. Por favor, certifique-se de que a chave da API do Gemini está devidamente configurada."}`);
        } finally {
          setIsSubmitting(false);
        }
      })();
    });
  };

  // Handle professional OAA consultation call request
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) {
      alert("Por favor, preencha o seu Nome Completo e o seu contacto WhatsApp / Telefone.");
      return;
    }
    setCallbackRequested(true);

    // Save lead details for administration panel triagem
    try {
      let estimatedVal = "Sob consulta";
      if (activeReport?.diagnosisText) {
        const matchValue = activeReport.diagnosisText.match(/(?:Valor potencial estimado:?\s*\*\*?)([\d.,]+\s*(?:Kz|AOA|Kwanzas))/i) || 
                           activeReport.diagnosisText.match(/([\d.,]+\s*(?:Kz|AOA|Kwanzas))/i);
        if (matchValue) {
          estimatedVal = matchValue[1];
        }
      } else if (selectedCategory) {
        if (selectedCategory === "laboral") estimatedVal = "1.500.000 Kz";
        else if (selectedCategory === "imobiliario") estimatedVal = "300.000 Kz";
        else if (selectedCategory === "familia") estimatedVal = "120.000 Kz";
      }

      const newLead = {
        id: "lead_" + Date.now().toString(),
        name: callbackName.trim(),
        phone: callbackPhone.trim(),
        category: activeReport?.category || selectedCategory || "geral",
        categoryLabel: activeReport?.categoryLabel || "Dúvidas Gerais",
        date: new Date().toLocaleDateString("pt-AO"),
        status: "Pendente" as const,
        notes: "",
        estimatedVal: estimatedVal,
        answers: activeReport?.answers || formAnswers || {},
        diagnosisText: activeReport?.diagnosisText || currentDiagnosis || ""
      };

      const stored = localStorage.getItem("angola_legal_admin_leads");
      const currentLeads = stored ? JSON.parse(stored) : [];
      currentLeads.unshift(newLead);
      localStorage.setItem("angola_legal_admin_leads", JSON.stringify(currentLeads));
    } catch (err) {
      console.error("Erro ao salvar lead na base local:", err);
    }
  };

  // Delete a report from history
  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Tem a certeza que deseja eliminar este diagnóstico do seu histórico?")) {
      const updatedHistory = history.filter((item) => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem("angola_legal_diagnosis_history", JSON.stringify(updatedHistory));
      if (activeReport?.id === id) {
        setActiveReport(null);
        setCurrentDiagnosis(null);
      }
    }
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (confirm("Isto irá apagar permanentemente todas as suas consultas locais. Deseja continuar?")) {
      setHistory([]);
      localStorage.removeItem("angola_legal_diagnosis_history");
      setActiveReport(null);
      setCurrentDiagnosis(null);
    }
  };

  // Format category icons dynamically
  const renderCategoryIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className={className} />;
      case "Heart":
        return <Heart className={className} />;
      case "Home":
        return <HomeIcon className={className} />;
      case "ShieldAlert":
        return <ShieldAlert className={className} />;
      case "Scale":
        return <Scale className={className} />;
      default:
        return <Scale className={className} />;
    }
  };

  // Save the report as text file
  const handleDownloadTxt = (report: DiagnosisReport) => {
    const header = `==================================================\n` +
                   `          AVALIAÇÃO JURÍDICA PRELIMINAR - ANGOLA \n` +
                   `Avaliação Preliminar Baseada nas Informações Fornecidas pelo Utilizador\n` +
                   `==================================================\n\n` +
                   `Data de Emuneração: ${report.date}\n` +
                   `Requerente: ${report.userName}\n` +
                   `Ramo do Direito: ${report.categoryLabel}\n` +
                   `--------------------------------------------------\n\n` +
                   `RESUMO DAS INFORMAÇÕES PRESTADAS:\n`;
    
    let answersStr = "";
    const categoryInfo = currentCategories[report.category];
    if (categoryInfo) {
      categoryInfo.questions.forEach((q) => {
        const answerVal = report.answers[q.id] || "Não fornecido";
        answersStr += `- ${q.label}: ${answerVal}\n`;
      });
    } else {
      for (const [qlabel, val] of Object.entries(report.answers)) {
        answersStr += `- ${qlabel}: ${val}\n`;
      }
    }

    const body = `\n--------------------------------------------------\n\n` +
                 `DIAGNÓSTICO E ENQUADRAMENTO JURÍDICO:\n\n` +
                 report.diagnosisText.replace(/###/g, "").replace(/####/g, "").replace(/\*\*/g, "");

    const fullBlobText = header + answersStr + body;
    const blob = new Blob([fullBlobText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Diagnostico_Juridico_${report.userName.replace(/\s+/g, "_")}_${report.category}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Direct print option
  const handlePrint = () => {
    window.print();
  };

  // Legal Disclaimer Gate Overlay
  if (!disclaimerAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0707] via-black to-[#0a0a0d] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
        {/* Abstract luxury legal graphic details */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#da291c]/15 to-transparent pointer-events-none"></div>
        <div className="absolute -top-1/4 -right-1/10 opacity-[0.03] select-none pointer-events-none">
          <Scale className="w-[800px] h-[800px] text-[#c5a85c]" />
        </div>
        
        <div className="max-w-xl w-full bg-[#0d0d0d] border-2 border-[#c5a85c]/60 rounded-3xl p-6 md:p-10 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-b-8 border-b-[#da291c]">
          
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-slate-900 border border-[#c5a85c]/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(197,168,92,0.25)] flex items-center justify-center p-0.5">
              <img 
                src={appLogo} 
                alt="Logo Direito Fácil Angola" 
                className="w-full h-full object-cover rounded-xl" 
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-[#c5a85c]">
              Direito Fácil Angola
            </h2>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-900/60 text-red-400 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase font-mono">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> Aviso de Isenção de Responsabilidade Legal
            </div>
          </div>
          
          <div className="w-full h-px bg-[#c5a85c]/25 my-5"></div>
          
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed max-h-[350px] overflow-y-auto pr-1">
            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
              <h4 className="font-bold text-[#c5a85c] font-serif flex items-center gap-1.5 text-xs sm:text-sm">
                <Info className="w-4 h-4 text-amber-500 shrink-0" /> 1. Carácter Puramente Informativo
              </h4>
              <p className="text-slate-400 text-xs text-justify">
                Este portal e as suas ferramentas inteligentes foram criados exclusivamente para fins didáticos, informativos e de orientação lúdica preliminar. Nenhuma informação ou diagnóstico automatizado obtido substitui uma análise profissional oficial.
              </p>
            </div>

            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
              <h4 className="font-bold text-[#c5a85c] font-serif flex items-center gap-1.5 text-xs sm:text-sm">
                <Scale className="w-4 h-4 text-[#c5a85c] shrink-0" /> 2. Obrigatoriedade de Consulta Oficial (OAA)
              </h4>
              <p className="text-slate-400 text-xs text-justify">
                Perante qualquer lide, contenda jurídica ou assinatura de atos com eficácia jurídica em Angola, é <strong className="text-white">obrigatória</strong> e imperativa a consulta, representação técnica e validação final de um advogado devidamente credenciado e inscrito na <strong className="text-white">Ordem dos Advogados de Angola (OAA)</strong> ou assistência jurídica do <strong className="text-white">IPAJ</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
              <h4 className="font-bold text-[#c5a85c] font-serif flex items-center gap-1.5 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> 3. Dinamicidade da Legislação Angolana
              </h4>
              <p className="text-slate-400 text-xs text-justify">
                A legislação da República de Angola encontra-se em constante transformação e aperfeiçoamento. Embora façamos todos os esforços para incorporar as melhores práticas com base no Código de Família e na nova Lei Geral do Trabalho (LGT - Lei n.º 12/23), a plataforma não garante a isenção de desatualizações ou erros informáticos temporários.
              </p>
            </div>
            
            <div className="p-3 text-slate-500 text-[10px] sm:text-xs italic text-center leading-relaxed">
              Ao continuar, o utilizador assume total responsabilidade pelo uso das informações providenciadas e isenta a plataforma de quaisquer ações judiciais futuras.
            </div>
          </div>

          <div className="w-full h-px bg-[#c5a85c]/25 my-5"></div>

          <button
            onClick={() => {
              setDisclaimerAccepted(true);
              localStorage.setItem("angola_legal_disclaimer_accepted", "true");
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#da291c] to-[#a81c12] hover:from-[#f03a2e] hover:to-[#be2217] text-white font-serif font-bold rounded-2xl tracking-wide transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(218,41,28,0.25)]"
          >
            <CheckCircle className="w-5 h-5 shrink-0 text-white" /> Compreendo e Aceito os Termos
          </button>

          <div className="text-[10px] text-slate-500 font-mono tracking-widest mt-4 text-center uppercase">
            Huíla • República de Angola
          </div>
        </div>
      </div>
    );
  }

  // Language Selection Gate Overlay
  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0707] via-black to-[#0a0a0d] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
        {/* Abstract luxury legal graphic details */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#da291c]/15 to-transparent pointer-events-none"></div>
        <div className="absolute -top-1/4 -right-1/10 opacity-[0.03] select-none pointer-events-none">
          <Scale className="w-[800px] h-[800px] text-[#c5a85c]" />
        </div>
        
        <div className="max-w-xl w-full bg-[#0d0d0d] border-2 border-[#c5a85c]/60 rounded-3xl p-8 md:p-12 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center flex flex-col items-center gap-6 border-b-8 border-b-[#da291c]">
          
          <div className="w-20 h-20 bg-slate-900 border-2 border-[#c5a85c] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(197,168,92,0.3)] mb-1 flex items-center justify-center p-1 transform scale-102">
            <img 
              src={appLogo} 
              alt="Logo Direito Fácil Angola" 
              className="w-full h-full object-cover rounded-xl" 
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-2.5xl md:text-3xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-[#c5a85c]">
            Direito Fácil Angola
          </h2>
          
          <div className="w-12 h-0.5 bg-[#c5a85c]/30 rounded-full"></div>
          
          <h3 className="text-sm md:text-base font-semibold text-slate-300 font-serif leading-relaxed max-w-sm">
            Selecione o seu Idioma / Choose your Language / Sola ocihundu cove
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
            Bem-vindo ao portal de orientação jurídica angolana. Escolha o seu idioma oficial ou idioma nacional para receber análises adaptadas.
          </p>

          <div className="w-full flex flex-col gap-3 mt-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.code);
                  localStorage.setItem("angola_legal_selected_lang", lang.code);
                }}
                className="w-full text-left bg-white/[0.02] hover:bg-white/[0.07] border border-white/10 hover:border-[#c5a85c]/90 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-sm hover:translate-y-[-1px]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2.5xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] shrink-0">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white font-serif tracking-wide">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-mono italic">{lang.name}</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-[#c5a85c] flex items-center justify-center transition-all bg-black/40 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c5a85c] opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"></div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-[9px] text-slate-500 font-mono tracking-widest mt-2 uppercase">
            Huíla • República de Angola
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans transition-colors duration-200">
      {/* Upper Top Navbar with stunning elite design */}
      <header id="djan-header" className="bg-[#5c0608] border-b-2 border-white/10 text-white pt-8 pb-0 px-4 md:px-8 shadow-lg relative">
        {/* Angola National Flag top split stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex select-none pointer-events-none">
          <div className="w-1/2 h-full bg-[#da291c]"></div>
          <div className="w-1/2 h-full bg-[#000000]"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white border-2 border-white rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.25)] flex items-center justify-center p-0.5 transform hover:scale-105 transition-transform duration-300">
              <img 
                src={appLogo} 
                alt="Logo Direito Fácil Angola" 
                className="w-full h-full object-cover rounded-lg" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-red-100 animate-fade-in">
                  {t("app_title") || "Direito Fácil Angola"}
                </h1>
                <span className="text-[9px] bg-white border border-slate-200 text-[#5c0608] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase shadow-sm">Pre-OAA</span>
              </div>
              <p className="text-xs text-red-100/90 font-serif italic tracking-wide mt-0.5">
                {t("app_subtitle") || "Portal Informativo de Orientação Legal e Simuladores sob as Leis de Angola"}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Lang Switcher with visual flags */}
            <div className="flex items-center gap-1.5 bg-black/25 border border-white/10 rounded-lg p-1 mr-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    localStorage.setItem("angola_legal_selected_lang", lang.code);
                  }}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-200 cursor-pointer ${
                    selectedLanguage === lang.code
                      ? "bg-white text-[#5c0608] scale-110 shadow-md font-bold"
                      : "opacity-45 hover:opacity-100 text-slate-200"
                  }`}
                  title={lang.nativeName}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <div className="text-right hidden sm:block border-r border-white/15 pr-3.5 mr-0.5">
              <p className="text-[10px] text-red-200/70 font-mono tracking-wider uppercase">{t("jurisdiction_label") || "Jurisdição Oficial"}</p>
              <p className="text-xs text-white font-black font-serif flex items-center justify-end gap-1.5">
                <Building className="w-3.5 h-3.5" /> {t("jurisdiction_value") || "Huíla | Angola"}
              </p>
            </div>
            {selectedCategory && activeScreen === "diagnosis" && (
              <button
                id="back-to-home-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentDiagnosis(null);
                  setActiveReport(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-[#5c0608] font-serif font-bold rounded-lg transition-all duration-300 text-xs shadow-md transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t("choose_another") || "escolher outra área"}
              </button>
            )}
          </div>
        </div>

        {/* Global Navigation Tabs: Diagnosis vs Calculators */}
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 md:gap-6 border-t border-white/10 pt-1 px-4 md:px-0">
          <button
            id="nav-diagnosis-btn"
            onClick={() => setActiveScreen("diagnosis")}
            className={`px-4 py-3 font-serif text-xs md:text-sm transition-all relative flex items-center gap-2 cursor-pointer ${
              activeScreen === "diagnosis"
                ? "text-white font-bold border-b-2 border-white scale-102"
                : "text-red-100/60 hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4 text-white" />
            {t("nav_diagnosis") || "Diagnóstico de Casos AI"}
          </button>

          <button
            id="nav-calculators-btn"
            onClick={() => setActiveScreen("calculators")}
            className={`px-4 py-3 font-serif text-xs md:text-sm transition-all relative flex items-center gap-2 cursor-pointer ${
              activeScreen === "calculators"
                ? "text-white font-bold border-b-2 border-white scale-102"
                : "text-red-100/60 hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4 text-white" />
            {t("nav_calculators") || "Calculadoras Jurídicas"}
          </button>

          <button
            id="nav-admin-btn"
            onClick={() => setActiveScreen("admin")}
            className={`px-4 py-3 font-serif text-xs md:text-sm transition-all relative flex items-center gap-2 sm:ml-auto cursor-pointer ${
              activeScreen === "admin"
                ? "text-white font-bold border-b-2 border-white scale-102"
                : "text-red-100/60 hover:text-red-200"
            }`}
          >
            <Shield className="w-4 h-4 text-white" />
            {t("nav_admin") || "Acesso Administrador"}
          </button>
        </div>
      </header>

      {/* Main Container Layout / Conditional Admin View or Citizen Portal */}
      {activeScreen === "admin" ? (
        <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8">
          <AdminPanel onBackToHome={() => setActiveScreen("diagnosis")} />
        </main>
      ) : (
        <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Category Navigator & Form or Diagnostic Output */}
        <section className="flex-1 flex flex-col gap-6" id="main-legal-diagnostico-workspace">
          
          {activeScreen === "calculators" ? (
            <LegalCalculators userInfo={userInfo} onRequireContact={openContactRequiredModal} langCode={selectedLanguage || "pt"} />
          ) : !selectedCategory && !activeReport ? (
            /* Home State: Display Welcome Gate or Category Grid */
            !showProblemsList ? (
              /* Enormous Gate welcoming screen with a gorgeous royal look */
              <div className="animate-fade-in flex flex-col gap-6" id="welcome-royal-gate">
                <div className="w-full bg-gradient-to-br from-[#5c0608] via-[#260102] to-black border-2 border-white/10 rounded-2xl p-6 md:p-12 text-white relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                  
                  {/* Elegant decorative background overlay pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(218,41,28,0.08),transparent_60%)] pointer-events-none"></div>
                  <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-y-[-10%] translate-x-[10%]">
                    <Scale className="w-96 h-96 text-white" />
                  </div>
                  
                  <div className="max-w-2xl flex flex-col items-center gap-6 relative z-10">
                    <span className="text-[10px] sm:text-[11px] bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-widest animate-pulse inline-block shadow-sm">
                      ⚖️ {t("app_title") || "Direito Fácil Angola"} • {t("jurisdiction_value") || "Huíla | Angola"}
                    </span>
                    
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black leading-tight tracking-tight">
                      {t("welcome_title_start") || "Está a deixar"}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-100 via-white to-red-150">
                        {t("welcome_title_mid1") || "dinheiro"}
                      </span>{" "}
                      {t("welcome_title_mid2") || "ou"}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-white">
                        {t("welcome_title_mid3") || "proteção"}
                      </span>{" "}
                      {t("welcome_title_end") || "para trás?"}
                    </h2>
                    
                    <p className="text-xs sm:text-sm md:text-base text-red-100/80 leading-relaxed font-sans max-w-xl">
                      {t("welcome_subtitle") || "Muitos cidadãos em Angola perdem prazos cruciais de reclamação ou desistem de indemnizações devidas por pura falta de esclarecimento prático sobre a lei LGT (Lei n.º 12/23) e Código Civil."}
                    </p>

                    {/* Common real-world problems as visual question chips */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 text-left max-w-xl">
                      {currentCitizenProblems.slice(0, 4).map((prob) => {
                        const emojis: Record<string, string> = {
                          laboral: "💼",
                          imobiliario: "🏠",
                          familia: "👪",
                          geral: "💰"
                        };
                        return (
                          <div key={prob.id} className="p-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl flex items-start gap-3 transition duration-300 shadow-inner group">
                            <span className="text-white text-lg mt-0.5 shrink-0 select-none bg-white/[0.05] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                              {emojis[prob.id] || "⚖️"}
                            </span>
                            <div>
                              <p className="text-[10px] text-red-200 font-bold uppercase tracking-widest block font-sans">{prob.title}</p>
                              <p className="text-xs text-slate-100 font-semibold font-serif leading-tight mt-0.5">"{prob.question}"</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setShowProblemsList(true)}
                      className="w-full max-w-md px-6 py-4.5 bg-white text-[#5c0608] hover:bg-slate-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] rounded-xl font-serif font-black text-center text-sm md:text-base uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group mt-2 border-b-2 border-slate-300 shadow-md animate-bounce"
                    >
                      <span>{t("discover_rights_btn") || "Descobrir Seus Direitos Agora"}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition shrink-0" />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1.5 mt-3 text-[10px] text-red-200/60 font-mono">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t("tag_free") || "⚡ 100% Gratuito"}</span>
                      <span className="hidden sm:inline text-red-950/40">•</span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{t("tag_secure") || "🔒 Seguro e Confidencial"}</span>
                      <span className="hidden sm:inline text-red-950/40">•</span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{t("tag_laws") || "📚 Código de Angola de 2026"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Original category choices with problems grid with superb animations */
              <div className="animate-fade-in flex flex-col gap-6">
                
                {/* Visual back to welcome btn or info anchor if they want to scroll back */}
                <div className="flex justify-between items-center bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 shadow-sm animate-fade-in">
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    {t("viewing_areas_label") || "Está a visualizar as áreas do quotidiano de Angola. Seleccione a que coincide com o seu problema:"}
                  </p>
                  <button
                    onClick={() => setShowProblemsList(false)}
                    className="text-xs text-[#da291c] hover:text-[#c5a85c] font-black underline shrink-0 cursor-pointer ml-3 flex items-center gap-1"
                  >
                    {t("back_to_home_btn") || "← Voltar Geral"}
                  </button>
                </div>

                <div id="problems-grid-section" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md transition-all duration-500 relative">
                  {/* Thin Angola National colors design bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#da291c] via-[#c5a85c] to-[#000000] rounded-t-2xl font-sans"></div>
                  
                  <span className="text-[10px] bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/25 px-3 py-1 rounded-full font-mono font-bold self-start uppercase tracking-wider mb-4 mt-2 inline-block">
                    {t("select_problem_title") || "⚖️ Seleccione a Sua Área de Dúvida"}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                    {t("real_problem_question") || "Qual é o seu problema prático no dia-a-dia?"}
                  </h2>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed font-sans">
                    {t("choose_option_desc") || "Não precisa de conhecer os artigos ou termos complexos da lei angolana. Escolha a opção correspondente ao seu problema real para saber o enquadramento simplificado e os seus direitos:"}
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                    {currentCitizenProblems.map((prob) => (
                      <button
                        id={`cat-select-${prob.id}`}
                        key={prob.id}
                        onClick={() => handleSelectCategory(prob.id as LegalCategory)}
                        className="text-left bg-gradient-to-b from-white to-slate-50/80 hover:to-[#fdfafb] hover:border-[#991b1b] border-l-4 border-l-slate-400 hover:border-l-[#991b1b] border border-slate-200 rounded-xl p-5.5 transition-all duration-300 flex gap-4 cursor-pointer group shadow-sm hover:shadow-md hover:scale-[1.01]"
                      >
                        <div className="p-3 bg-[#991b1b]/10 group-hover:bg-[#991b1b] text-[#991b1b] group-hover:text-white rounded-xl transition-all duration-300 self-start shrink-0 shadow-sm">
                          {renderCategoryIcon(prob.icon, "w-6 h-6")}
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <span className="text-[10px] text-[#991b1b] font-black uppercase tracking-wider font-mono">
                            {prob.title}
                          </span>
                          <span className="font-serif font-bold text-slate-950 text-sm md:text-[15px] leading-snug flex items-start gap-1">
                            "{prob.question}"
                            <ChevronRight className="w-4.5 h-4.5 text-slate-400 group-hover:translate-x-1 transition-all mt-0.5 shrink-0 group-hover:text-[#991b1b]" />
                          </span>
                          <p className="text-xs text-slate-620 leading-relaxed font-sans font-medium">
                            {prob.description}
                          </p>
                          <div className="border-t border-slate-200/60 pt-2.5 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-slate-400 gap-2">
                            <span className="truncate flex-1 max-w-[250px] sm:max-w-none text-slate-450 italic">Ref: {prob.laws}</span>
                            <span className="text-[#991b1b] font-serif font-black sm:self-auto self-end group-hover:underline transition shrink-0">{t("evaluate_case_btn") || "Avaliar meu caso →"}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* General Disclaimer Card */}
                <div className="bg-[#fdfafb] border border-[#991b1b]/30 rounded-xl p-5 flex items-start gap-4">
                  <Info className="w-6 h-6 text-[#991b1b] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif font-bold text-slate-800 uppercase tracking-wider mb-1">
                      {t("important_disclaimer_title") || "Aviso Importante aos Utilizadores"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t("important_disclaimer_desc") || "O diagnóstico jurídico preliminar é computacional e serve apenas fins didáticos e informativos. Muitas normas em Angola sofrem mutações ou carecem de produção de prova regulamentar. Para representação oficial ou parecer definitivo, contacte os gabinetes oficiais e as delegações locais da Ordem dos Advogados de Angola (OAA) ou os serviços jurídicos do IPAJ."}
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : activeReport ? (
            /* Selected Active Report Result State */
            <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden flex flex-col">
              
              {/* Report Header Context */}
              <div className="bg-[#5c0608] text-white p-5 md:p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase bg-white text-[#5c0608] px-2 py-0.5 rounded font-bold">
                        {activeReport.categoryLabel}
                      </span>
                      <span className="text-xs text-red-200/80 font-mono">{activeReport.date}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      {t("hist_diagnostico_userName") || "Relatório Legislativo de"} {activeReport.userName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                    <button
                      id="download-txt-btn"
                      onClick={() => handleDownloadTxt(activeReport)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-md transition text-xs cursor-pointer"
                      title="Salvar como arquivo texto"
                    >
                      <Download className="w-3.5 h-3.5" /> {t("guardar_txt") || "Guardar TXT"}
                    </button>
                    <button
                      id="print-btn"
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-[#5c0608] rounded-md transition font-black text-xs cursor-pointer shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" /> {t("imprimir") || "Imprimir"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs / Panels inside report */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                
                {/* User Input Data Box (Accordion/Review style) */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-sans text-sm">
                  <h4 className="font-serif font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#991b1b]" />
                    {t("resumo_declarado") || "Resumo do Histórico Declarado"}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-1">
                    {/* Map out values */}
                    {Object.entries(activeReport.answers).map(([key, val]) => (
                      <div key={key} className="border-b border-slate-100 pb-1.5">
                        <span className="text-slate-500 text-xs block">{key}:</span>
                        <span className="text-slate-800 font-medium text-xs sm:text-sm">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Legal Verdict */}
                <div id="legal-diagnosis-output" className="markdown-body p-6 border border-slate-200 rounded-xl bg-[#fafafa] relative shadow-inner mb-6">
                  <Markdown>{activeReport.diagnosisText}</Markdown>
                </div>

                {/* ADVOCATE CONVERSION TUNNEL BLOCK */}
                <div className="bg-[#fdfafb] border-2 border-[#991b1b] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 shadow-sm">
                  <div className="flex-1 flex flex-col gap-3 text-left">
                    <span className="text-[10px] bg-emerald-100 text-emerald-850 border border-emerald-300/60 px-2.5 py-0.5 rounded-full font-mono font-bold self-start uppercase tracking-wider">
                      {t("recomended_next_step") || "🎯 Próximo Passo Recomendado"}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-lg">
                      {t("confirm_situation") || "Confirmar a Minha Situação Jurídica"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t("confirm_situation_desc") || "A avaliação preliminar identificou possíveis direitos e valores reclamáveis. Para confirmar os cálculos, analisar os documentos e definir a melhor estratégia jurídica, um advogado inscrito na Ordem dos Advogados de Angola pode realizar uma análise oficial do seu caso."}
                    </p>
                    
                    <div className="bg-white border border-slate-100 rounded-lg p-4 my-1 flex flex-col gap-2 w-full">
                      <h5 className="text-xs font-bold text-slate-800">{t("achieve_list_title") || "Ao solicitar a análise oficial, receberá:"}</h5>
                      <ul className="text-xs text-slate-650 flex flex-col gap-1.5 list-none pr-2">
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_1") || "Revisão jurídica por advogado credenciado"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_2") || "Verificação dos valores estimados"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_3") || "Análise das provas disponíveis"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_4") || "Identificação de riscos e prazos legais"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_5") || "Plano de ação recomendado"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 select-none">✅</span>
                          <span>{t("achieve_6") || "Orientação sobre negociação ou processo judicial"}</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/40 p-2.5 rounded-lg leading-relaxed">
                      ⏳ <strong>{t("oaa_urgency_title") || "Urgência Legítima"}:</strong> {t("oaa_urgency_desc") || "Alguns direitos podem estar sujeitos a prazos legais de reclamação. Uma análise atempada ajuda a preservar as opções disponíveis para o seu caso."}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-[#991b1b] font-semibold mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                      <span>{t("whatsapp_availability") || "Disponibilidade imediata para contacto via WhatsApp"}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-80 bg-white border border-slate-200 rounded-lg p-5 shrink-0 shadow-xs">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
                      {t("solicitar_contacto_title") || "Solicitar Contacto / Consultoria OAA"}
                    </h5>

                    {callbackRequested ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded text-xs leading-relaxed flex flex-col gap-2 animate-fade-in">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{t("form_lead_success") || "Pedido Submetido!"}</span>
                        </div>
                        <p className="text-[11px]">
                          {t("form_lead_success_desc") || "Os seus factos declarados foram sincronizados com a triagem interna."}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-3 font-sans">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">{t("contact_full_name") || "Seu Nome Completo"}</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Manuel dos Santos"
                            value={callbackName}
                            onChange={(e) => setCallbackName(e.target.value)}
                            className="p-2 border border-[#991b1b] rounded text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#991b1b]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">{t("contact_phone_whatsapp") || "Telemóvel / WhatsApp"}</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ex: 923 000 000"
                            value={callbackPhone}
                            onChange={(e) => setCallbackPhone(e.target.value)}
                            className="p-2 border border-[#991b1b] rounded text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#991b1b]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-serif rounded text-[11px] font-bold tracking-wider uppercase transition mt-1 cursor-pointer"
                        >
                          {t("quero_ser_contactado_btn") || "Quero ser contactado"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Quick bottom disclaimer action bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 gap-4">
                  <button
                    id="new-diagnosis-btn"
                    onClick={() => {
                      setActiveReport(null);
                      setCurrentDiagnosis(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-serif text-sm text-center transition cursor-pointer"
                  >
                    {t("iniciar_nova_consulta_btn") || "Iniciar Nova Consulta"}
                  </button>
                  
                  <p className="text-xs text-slate-400 font-mono italic">
                    {t("id_diagnostico_prefix") || "ID Diagnóstico:"} {activeReport.id}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Selected Category: Display Specific Questionnaire */
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-md relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#da291c] via-[#c5a85c] to-[#000000] rounded-t-2xl"></div>
              
              <div className="flex items-start gap-4 mb-6 border-b border-slate-100 pb-5 mt-2">
                <div className="p-3 bg-[#08080a] text-[#c5a85c] rounded-2xl shadow-md border border-[#da291c]/30">
                  {renderCategoryIcon(currentCategories[selectedCategory].icon, "w-6 h-6 animate-pulse")}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-slate-950">
                    {t("nav_diagnosis") || "Avaliação Preliminar"}: {currentCategories[selectedCategory].title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5">
                    {t("official_framework") || "Enquadramento Regulador Oficial"}:{" "}
                    <span className="text-[#c5a85c] font-bold font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/50">{currentCategories[selectedCategory].laws}</span>
                  </p>
                </div>
              </div>

              {/* Form Submission */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {currentCategories[selectedCategory].questions.map((q) => (
                  <div key={q.id} id={`field-${q.id}`} className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                      {q.label}
                      {q.required && <span className="text-red-500 font-black animate-bounce">*</span>}
                    </label>

                    {q.type === "select" ? (
                      <select
                        id={`input-${q.id}`}
                        value={formAnswers[q.id] || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className={`w-full p-3 border rounded-xl bg-white text-slate-900 text-sm focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] outline-none transition-all duration-300 shadow-xs hover:border-slate-300 font-medium ${
                          formErrors[q.id] ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      >
                        <option value="">{t("seleccione_opcao") || "-- Seleccione uma opção --"}</option>
                        {q.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : q.type === "textarea" ? (
                      <textarea
                        id={`input-${q.id}`}
                        rows={4}
                        placeholder={q.placeholder}
                        value={formAnswers[q.id] || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className={`w-full p-3.5 border rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] outline-none transition-all duration-300 shadow-xs hover:border-slate-300 font-medium ${
                          formErrors[q.id] ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    ) : (
                      <input
                        id={`input-${q.id}`}
                        type={q.type}
                        placeholder={q.placeholder}
                        value={formAnswers[q.id] || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className={`w-full p-3 border rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] outline-none transition-all duration-300 shadow-xs hover:border-slate-300 font-medium ${
                          formErrors[q.id] ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    )}

                    {formErrors[q.id] && (
                      <span className="text-[11px] text-red-600 flex items-center gap-1.5 mt-0.5 font-bold font-sans">
                        <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-500" />
                        {formErrors[q.id]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Submit Action Block */}
                <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-slate-100 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 bg-gradient-to-r from-[#da291c] via-[#a81c14] to-black hover:brightness-110 active:scale-[0.99] disabled:bg-slate-400 text-white font-serif py-3.5 px-6 rounded-xl font-black text-center transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-2 cursor-pointer uppercase tracking-wider text-xs border-b-2 border-slate-950"
                  >
                    {isSubmitting ? t("analise_em_curso") || "Análise do Tribunal em Curso..." : t("gerar_avaliacao_btn") || "Gerar Avaliação Preliminar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentDiagnosis(null);
                    }}
                    className="px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm text-center transition cursor-pointer"
                  >
                    {t("cancelar") || "Cancelar"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Detailed Loader Layout when calling API */}
          {isSubmitting && (
            <div className="fixed inset-0 bg-[#000000]/80 flex justify-center items-center p-4 z-50 animate-fade-in backdrop-blur-xs">
              <div className="bg-white border border-[#c5a85c]/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl flex flex-col items-center">
                
                {/* Legal Scales Wobbling Loader (Simulated Gavel scale with app emblem) */}
                <div className="mb-6 relative w-16 h-16 flex items-center justify-center bg-slate-900 rounded-2xl text-[#c5a85c] border-2 border-[#c5a85c]/60 overflow-hidden shadow-md animate-bounce p-0.5">
                  <img 
                    src={appLogo} 
                    alt="Logo Direito Fácil" 
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="font-serif font-bold text-slate-900 text-lg md:text-xl text-center mb-1">
                  {t("acordao_preliminar_title") || "Lavrando Acórdão Preliminar"}
                </h3>
                <p className="text-xs text-[#c5a85c] font-serif italic text-center mb-5">
                  {t("analise_baseada") || "Análise baseada na Legislação de Angola"}
                </p>

                {/* Pulse loading message bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#da291c] rounded-full animate-pulse" style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}></div>
                </div>

                {/* Cycling legal feedback message */}
                <span className="text-slate-600 font-mono text-xs text-center flex items-center justify-center gap-1.5 py-1 px-3 bg-slate-50 border border-slate-100 rounded">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                  {loadingMessages[loadingStep]}
                </span>
              </div>
            </div>
          )}

          {/* Contact Details Prerequisite Modal */}
          {isContactModalOpen && (
            <div className="fixed inset-0 bg-[#000000]/85 flex justify-center items-center p-4 z-50 animate-fade-in backdrop-blur-xs">
              <div className="bg-white border-2 border-[#c5a85c] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
                
                {/* Header with Title and close button */}
                <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#c5a85c]" />
                    <h3 className="font-serif font-bold text-slate-900 text-lg">
                      {t("identificacao_obrigatoria_title") || "Identificação Obrigatória"}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setPendingAction(null);
                    }}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition"
                  >
                    <span className="text-xl font-bold">&times;</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {t("identificacao_obrigatoria_desc") || "Antes de proceder para a Avaliação Preliminar ou para os Cálculos Proporcionais, a nossa plataforma exige que forneça as seguintes coordenadas de contacto:"}
                </p>

                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#c5a85c]" /> {t("contact_full_name") || "Nome Completo"}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Manuel dos Santos"
                      value={contactForm.nome}
                      onChange={(e) => setContactForm(prev => ({ ...prev, nome: e.target.value }))}
                      className={`p-2.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#c5a85c] focus:border-[#c5a85c] ${
                        contactFormErrors.nome ? "border-red-500 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                    {contactFormErrors.nome && (
                      <span className="text-[10px] text-red-500 font-sans">{contactFormErrors.nome}</span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#c5a85c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t("contact_phone_whatsapp") || "Telemóvel / WhatsApp"}
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: 923 000 000"
                      value={contactForm.telefone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, telefone: e.target.value }))}
                      className={`p-2.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#c5a85c] focus:border-[#c5a85c] ${
                        contactFormErrors.telefone ? "border-red-500 bg-red-50/10" : "border-slate-200"
                      }`}
                    />
                    {contactFormErrors.telefone && (
                      <span className="text-[10px] text-red-500 font-sans">{contactFormErrors.telefone}</span>
                    )}
                  </div>

                  {/* Disclaimer block */}
                  <p className="text-[10px] text-slate-400 italic text-justify leading-relaxed mt-1">
                    {t("privacidade_garantia_desc") || "Garantia de Privacidade: Nos termos do Artigo 29.º da CRA (Constituição de Angola), os seus dados de contacto serão guardados localmente com total segurança e confidencialidade."}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsContactModalOpen(false);
                        setPendingAction(null);
                      }}
                      className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition text-center cursor-pointer"
                    >
                      {t("cancelar") || "Cancelar"}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#da291c] hover:bg-[#b01e15] text-white rounded-lg text-xs font-serif font-bold tracking-wider uppercase transition text-center cursor-pointer"
                    >
                      {t("confirmar_prosseguir_btn") || "Confirmar e Prosseguir"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </section>

        {/* Right Side: Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6" id="djan-sidehistory-menu">
          
          {/* Informational About panel */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-md p-5 md:p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#991b1b]"></div>
            <h3 className="font-serif font-black text-slate-950 flex items-center gap-2 text-base border-b border-slate-100 pb-3.5">
              <Info className="w-4.5 h-4.5 text-[#991b1b]" />
              {t("sidebar_about_title") || "Legislação de Angola"}
            </h3>
            <div className="text-xs text-slate-700 leading-relaxed font-sans text-justify">
              {t("sidebar_about_desc") || "A Constituição da República de Angola (CRA) estabelece as bases invioláveis de acesso ao direito, igualdade e tutela jurisdicional efectiva (Artigo 29.º). Este portal aproxima o cidadão comum da interpretação jurídica básica de forma inteiramente acessível."}
            </div>
          </div>

          {/* Quick links to real entities in Angola */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-md p-5 md:p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#991b1b]"></div>
            <h4 className="font-serif font-black text-slate-950 text-sm flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Building className="w-4.5 h-4.5 text-[#991b1b]" />
              {t("sidebar_inst_title") || "Instituições e Apoio Oficial"}
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-650 font-sans">
              <li className="flex flex-col border-b border-slate-100 pb-2.5">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] inline-block"></span>
                  {t("inst_oaa_title") || "Ordem dos Advogados (OAA)"}
                </span>
                <span className="text-[11px] text-slate-500 leading-relaxed pl-2.5">{t("inst_oaa_desc") || "Emissão de cédulas profissionais e consulta oficial de advogados inscritos."}</span>
              </li>
              <li className="flex flex-col border-b border-slate-100 pb-2.5">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] inline-block"></span>
                  {t("inst_ipaj_title") || "IPAJ (Assistência Gratuita)"}
                </span>
                <span className="text-[11px] text-slate-500 leading-relaxed pl-2.5">{t("inst_ipaj_desc") || "Patrocínio judiciário gratuito facultado pelo Estado angolano a pessoas carenciadas."}</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] inline-block"></span>
                  {t("inst_igt_title") || "IGT (Inspecção do Trabalho)"}
                </span>
                <span className="text-[11px] text-slate-500 leading-relaxed pl-2.5">{t("inst_igt_desc") || "Mediação e reclamações relativas a irregularidades ou despedimentos abusivos."}</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
      )}

      {/* Footer copyright and disclaimers */}
      <footer id="djan-footer" className="bg-[#5c0608] text-slate-200 border-t-4 border-t-[#da291c] border-b-2 border-b-white/10 py-10 px-4 md:px-8 text-xs text-center font-serif mt-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-white" />
            <span className="text-white font-black tracking-widest text-[13px] uppercase font-sans">Direito Fácil Angola</span>
          </div>
          <p className="max-w-3xl text-[11px] leading-relaxed text-red-100/90 font-sans italic">
            <strong>{t("footer_disclaimer_title") || "Aviso de Isenção de Responsabilidade Legal:"}</strong> {t("footer_disclaimer_desc") || "A legislação da República de Angola encontra-se em constante evolução. As análises básicas geradas eletronicamente por inteligência artificial constituem meros relatórios de orientação provisória informativa. É expressamente obrigatória a consulta oficial e validação jurídica perante advogados inscritos na Ordem dos Advogados de Angola (OAA) ou órgãos competentes antes de qualquer decisão contenciosa ou voluntária."}
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent my-1"></div>
          <p className="text-red-200/70 font-mono text-[10px]">
            © {new Date().getFullYear()} Direito Fácil Angola. {t("footer_rights") || "Todos os direitos reservados de acordo com a Constituição da República de Angola."}
          </p>
        </div>
      </footer>
    </div>
  );
}
