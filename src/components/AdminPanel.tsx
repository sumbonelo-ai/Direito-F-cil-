import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  TrendingUp,
  Coins,
  Lock,
  Search,
  FileText,
  Phone,
  ArrowRight,
  LogOut,
  Check,
  Trash2,
  Filter,
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Compass,
  UserPlus,
  Activity,
  Plus,
  Key,
  Eye,
  Globe
} from "lucide-react";
import { Lead, Administrator, LegalCategory, Lawyer } from "../types";
import { 
  isSupabaseConfigured,
  dbGetLeads,
  dbSaveLead,
  dbDeleteLead,
  dbGetLawyers,
  dbSaveLawyer,
  dbDeleteLawyer,
  dbGetAdministrators,
  dbSaveAdministrator,
  dbGetAdminPasswords
} from "../lib/supabase";

interface AdminPanelProps {
  onBackToHome: () => void;
}

export default function AdminPanel({ onBackToHome }: AdminPanelProps) {
  // Authentication & Session States
  const [currentAdmin, setCurrentAdmin] = useState<Administrator | null>(() => {
    try {
      const saved = localStorage.getItem("angola_legal_current_admin");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Inner Dashboard navigation sub-tab
  const [adminTab, setAdminTab] = useState<"leads" | "lawyers" | "register" | "logs">("leads");

  // Lawyers state and creation form
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [lawyerForm, setLawyerForm] = useState({
    name: "",
    email: "",
    cedula: "",
    specialty: "Direito do Trabalho (LGT)",
    commissionRate: 15
  });
  const [lawyerSuccess, setLawyerSuccess] = useState<string | null>(null);
  const [lawyerError, setLawyerError] = useState<string | null>(null);

  // Inner recruiting / registration form (Administrators registration inside Panel)
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    cedula: "",
    password: ""
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // List of all registered administrators
  const [allAdmins, setAllAdmins] = useState<Administrator[]>([]);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [usingSupabase] = useState(isSupabaseConfigured);

  // Login Form
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Lead Dashboard States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [adminNotes, setAdminNotes] = useState("");

  // Visitor Tracking & Simulation State
  const [visitorStats, setVisitorStats] = useState(() => {
    try {
      const stored = localStorage.getItem("angola_legal_visitors_stats");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clear old fake data if present
        if (parsed.totalVisits === 1420 || parsed.uniqueVisitors === 850) {
          const fresh = {
            totalVisits: 0,
            uniqueVisitors: 0,
            bounceRate: 0,
            avgDuration: "0s",
            recentLogs: []
          };
          localStorage.setItem("angola_legal_visitors_stats", JSON.stringify(fresh));
          return fresh;
        }
        return parsed;
      }
    } catch {}
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      bounceRate: 0,
      avgDuration: "0s",
      recentLogs: []
    };
  });

  const handleSimulateVisitor = () => {
    try {
      const STATS_KEY = "angola_legal_visitors_stats";
      const regions = ["Luanda", "Lubango", "Benguela", "Huambo", "Cabinda", "Lobito", "Malanje"];
      const devices = ["Telemóvel (Android)", "Telemóvel (iOS)", "Computador (Chrome)", "Computador (Safari)", "Computador (Firefox)"];
      const pages = ["Diagnóstico Jurídico", "Calculadoras de Direito", "Painel de Administração", "Consultoria Geral"];
      
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      const randomIp = `197.94.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
      
      const newLog = {
        id: "log_" + Date.now(),
        ip: randomIp,
        region: randomRegion,
        device: randomDevice,
        time: "Agora mesmo",
        page: randomPage
      };

      const updated = {
        ...visitorStats,
        totalVisits: (visitorStats.totalVisits || 1420) + 1,
        uniqueVisitors: (visitorStats.uniqueVisitors || 850) + (Math.random() > 0.45 ? 1 : 0),
        recentLogs: [newLog, ...(visitorStats.recentLogs || [])].slice(0, 10)
      };

      setVisitorStats(updated);
      localStorage.setItem(STATS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetVisitors = () => {
    if (confirm("Tem a certeza de que deseja zerar as estatísticas de tráfego de visitantes?")) {
      const STATS_KEY = "angola_legal_visitors_stats";
      const initial = {
        totalVisits: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgDuration: "0s",
        recentLogs: []
      };
      setVisitorStats(initial);
      localStorage.setItem(STATS_KEY, JSON.stringify(initial));
    }
  };

  // Sync visitor logs in background or when mounting
  useEffect(() => {
    const syncStats = () => {
      try {
        const stored = localStorage.getItem("angola_legal_visitors_stats");
        if (stored) {
          setVisitorStats(JSON.parse(stored));
        }
      } catch {}
    };
    syncStats();
    window.addEventListener("storage", syncStats);
    return () => window.removeEventListener("storage", syncStats);
  }, []);

  // Load leads from LocalStorage / Supabase
  const loadLeads = async () => {
    try {
      if (isSupabaseConfigured) {
        const cloudLeads = await dbGetLeads();
        if (cloudLeads && cloudLeads.length > 0) {
          const cleaned = cloudLeads.filter(l => l && l.id && !l.id.includes("demo") && !l.id.includes("seed"));
          setLeads(cleaned);
          localStorage.setItem("angola_legal_admin_leads", JSON.stringify(cleaned));
          return;
        }
      }

      const stored = localStorage.getItem("angola_legal_admin_leads");
      if (stored) {
        const parsed = JSON.parse(stored) as Lead[];
        // Filter out demo/fictional leads (containing demo/seed)
        const cleaned = parsed.filter(l => l && l.id && !l.id.includes("demo") && !l.id.includes("seed"));
        setLeads(cleaned);
        if (cleaned.length !== parsed.length) {
          localStorage.setItem("angola_legal_admin_leads", JSON.stringify(cleaned));
        }
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error("Erro ao carregar contactos:", e);
    }
  };

  // Load admins list from LocalStorage / Supabase
  const loadAllAdmins = async () => {
    try {
      let localAdmins: Administrator[] = [];
      const storedAdminsStr = localStorage.getItem("angola_legal_registered_admins");
      if (storedAdminsStr) {
        try {
          localAdmins = JSON.parse(storedAdminsStr);
        } catch {}
      }

      if (isSupabaseConfigured) {
        try {
          const cloudAdmins = await dbGetAdministrators();
          const allMerged = [...cloudAdmins];
          localAdmins.forEach(la => {
            if (!allMerged.some(ca => ca.email.toLowerCase() === la.email.toLowerCase())) {
              allMerged.push(la);
            }
          });
          setAllAdmins(allMerged);
          localStorage.setItem("angola_legal_registered_admins", JSON.stringify(allMerged));
          return;
        } catch (err) {
          console.warn("Could not fetch administrators from cloud database:", err);
        }
      }

      setAllAdmins(localAdmins);
    } catch (e) {
      console.error("Erro ao ler administradores:", e);
    }
  };

  // Load lawyers from LocalStorage / Supabase
  const loadLawyers = async () => {
    try {
      if (isSupabaseConfigured) {
        const cloudLawyers = await dbGetLawyers();
        if (cloudLawyers && cloudLawyers.length > 0) {
          setLawyers(cloudLawyers);
          localStorage.setItem("angola_legal_registered_lawyers", JSON.stringify(cloudLawyers));
          return;
        }
      }

      const stored = localStorage.getItem("angola_legal_registered_lawyers");
      if (stored) {
        setLawyers(JSON.parse(stored));
      } else {
        const defaultLawyers: Lawyer[] = [
          {
            id: "law_1",
            name: "Dr. Domingos Catonho",
            email: "catonho.advocacia@oaa.ao",
            cedula: "OAA 3.842",
            specialty: "Direito do Trabalho (LGT)",
            commissionRate: 15,
            joinedAt: "10/01/2026"
          },
          {
            id: "law_2",
            name: "Dra. Elísia Gourgel",
            email: "gourgel.conselho@oaa.ao",
            cedula: "OAA 5.121",
            specialty: "Direito de Família e Sucessões",
            commissionRate: 10,
            joinedAt: "14/02/2026"
          },
          {
            id: "law_3",
            name: "Dr. Mateus de Oliveira",
            email: "mateus.oliveira@oaa.ao",
            cedula: "OAA 4.887",
            specialty: "Direito Imobiliário e Contratos",
            commissionRate: 12,
            joinedAt: "05/03/2026"
          }
        ];
        localStorage.setItem("angola_legal_registered_lawyers", JSON.stringify(defaultLawyers));
        setLawyers(defaultLawyers);
      }
    } catch (e) {
      console.error("Erro ao carregar advogados:", e);
    }
  };

  useEffect(() => {
    loadLeads();
    loadAllAdmins();
    loadLawyers();
  }, [currentAdmin]);

  // Allocation state helpers
  const [allocationLawyerId, setAllocationLawyerId] = useState("");
  const [allocationFee, setAllocationFee] = useState(0);
  const [allocationRate, setAllocationRate] = useState(15);

  const handleLawyerSelectChange = (lawyerId: string) => {
    setAllocationLawyerId(lawyerId);
    const selectedLawyer = lawyers.find(l => l.id === lawyerId);
    if (selectedLawyer) {
      setAllocationRate(selectedLawyer.commissionRate);
    }
  };

  const handleSaveAllocation = () => {
    if (!selectedLead) return;
    
    const fee = Number(allocationFee) || 0;
    const rate = Number(allocationRate) || 0;
    const earned = Math.round((fee * rate) / 100);

    const updated = leads.map(l => {
      if (l.id === selectedLead.id) {
        const upLead: Lead = {
          ...l,
          assignedLawyerId: allocationLawyerId || undefined,
          caseFeeTotal: fee || undefined,
          commissionRate: rate || undefined,
          commissionEarned: earned || undefined
        };
        setSelectedLead(upLead);
        return upLead;
      }
      return l;
    });

    setLeads(updated);
    localStorage.setItem("angola_legal_admin_leads", JSON.stringify(updated));
    alert("Atribuição do caso e termo de comissão gravados com sucesso!");
  };

  // Sync admin notes when selecting a different lead
  useEffect(() => {
    if (selectedLead) {
      setAdminNotes(selectedLead.notes || "");
      setAllocationLawyerId(selectedLead.assignedLawyerId || "");
      setAllocationFee(selectedLead.caseFeeTotal || 0);
      setAllocationRate(selectedLead.commissionRate || 15);
    } else {
      setAdminNotes("");
      setAllocationLawyerId("");
      setAllocationFee(0);
      setAllocationRate(15);
    }
  }, [selectedLead]);

  // Handle Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!loginForm.email.trim()) errors.email = "Insira o seu e-mail.";
    if (!loginForm.password) errors.password = "Insira a sua senha de acesso.";

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    try {
      let admins: Administrator[] = [];
      let pwdMap: Record<string, string> = {};

      // Load local credentials
      const storedAdminsStr = localStorage.getItem("angola_legal_registered_admins");
      const localAdmins: Administrator[] = storedAdminsStr ? JSON.parse(storedAdminsStr) : [];
      const pwdMapStr = localStorage.getItem("angola_legal_admin_pwds") || "{}";
      const localPwdMap = JSON.parse(pwdMapStr);

      if (isSupabaseConfigured) {
        try {
          const cloudAdmins = await dbGetAdministrators();
          const cloudPwdMap = await dbGetAdminPasswords();
          
          // Merge lists: prioritize cloud but preserve unique local definitions
          const allMerged = [...cloudAdmins];
          localAdmins.forEach(la => {
            if (!allMerged.some(ca => ca.email.toLowerCase() === la.email.toLowerCase())) {
              allMerged.push(la);
            }
          });
          admins = allMerged;
          pwdMap = { ...localPwdMap, ...cloudPwdMap };
        } catch (dbError) {
          console.warn("Could not query Supabase administrators. Falling back entirely to browser storage:", dbError);
          admins = localAdmins;
          pwdMap = localPwdMap;
        }
      } else {
        admins = localAdmins;
        pwdMap = localPwdMap;
      }

      const targetEmail = loginForm.email.trim().toLowerCase();
      const adminMatch = admins.find(a => a.email === targetEmail);

      if (!adminMatch || pwdMap[targetEmail] !== loginForm.password) {
        setLoginErrors({ general: "Credenciais de administrador inválidas ou conta inexistente." });
        return;
      }

      // Login Successful
      setCurrentAdmin(adminMatch);
      localStorage.setItem("angola_legal_current_admin", JSON.stringify(adminMatch));
      
      // Reload leads
      loadLeads();
    } catch {
      setLoginErrors({ general: "Erro de processamento durante a autenticação." });
    }
  };

  const handleFirstAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrors({});
    const errors: Record<string, string> = {};

    if (!regForm.name.trim()) errors.name = "O Nome Completo é obrigatório.";
    if (!regForm.email.trim()) {
      errors.email = "O E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = "O endereço de e-mail não é válido.";
    }
    if (regForm.password.length < 6) {
      errors.password = "A senha deve conter pelo menos 6 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const firstAdmin: Administrator = {
      id: "adm_root",
      name: regForm.name.trim(),
      email: regForm.email.trim().toLowerCase(),
      cedula: regForm.cedula.trim() || "Administrador Central (Fundador)",
      createdAt: new Date().toLocaleDateString("pt-AO")
    };

    try {
      localStorage.setItem("angola_legal_registered_admins", JSON.stringify([firstAdmin]));
      
      const pwdMap = { [firstAdmin.email]: regForm.password };
      localStorage.setItem("angola_legal_admin_pwds", JSON.stringify(pwdMap));

      if (isSupabaseConfigured) {
        await dbSaveAdministrator(firstAdmin, regForm.password);
      }

      // Auto login
      setCurrentAdmin(firstAdmin);
      localStorage.setItem("angola_legal_current_admin", JSON.stringify(firstAdmin));

      // Reset form
      setRegForm({ name: "", email: "", cedula: "", password: "" });
      
      // Reload lists
      loadAllAdmins();
      loadLeads();
    } catch {
      setRegErrors({ general: "Erro ao registar o administrador principal de raiz." });
    }
  };

  const handleNoAuthAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrors({});
    const errors: Record<string, string> = {};

    if (!regForm.name.trim()) errors.name = "O Nome Completo é obrigatório.";
    if (!regForm.email.trim()) {
      errors.email = "O E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = "O endereço de e-mail não é válido.";
    }
    if (regForm.password.length < 6) {
      errors.password = "A senha deve conter pelo menos 6 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const newAdmin: Administrator = {
      id: "adm_" + Date.now().toString(),
      name: regForm.name.trim(),
      email: regForm.email.trim().toLowerCase(),
      cedula: regForm.cedula.trim() || "Administrador Geral",
      createdAt: new Date().toLocaleDateString("pt-AO")
    };

    try {
      const storedAdminsStr = localStorage.getItem("angola_legal_registered_admins");
      const existingAdmins: Administrator[] = storedAdminsStr ? JSON.parse(storedAdminsStr) : [];
      
      if (existingAdmins.some(a => a.email === newAdmin.email)) {
        setRegErrors({ email: "Este endereço de e-mail já está registado como administrador de forma local." });
        return;
      }

      if (isSupabaseConfigured) {
        const cloudAdmins = await dbGetAdministrators();
        if (cloudAdmins.some(a => a.email === newAdmin.email)) {
          setRegErrors({ email: "Este endereço de e-mail já está registado na cloud." });
          return;
        }
        await dbSaveAdministrator(newAdmin, regForm.password);
      }

      existingAdmins.push(newAdmin);
      localStorage.setItem("angola_legal_registered_admins", JSON.stringify(existingAdmins));
      
      const pwdMapStr = localStorage.getItem("angola_legal_admin_pwds") || "{}";
      const pwdMap = JSON.parse(pwdMapStr);
      pwdMap[newAdmin.email] = regForm.password;
      localStorage.setItem("angola_legal_admin_pwds", JSON.stringify(pwdMap));

      // Auto login
      setCurrentAdmin(newAdmin);
      localStorage.setItem("angola_legal_current_admin", JSON.stringify(newAdmin));

      // Reset form & state
      setRegForm({ name: "", email: "", cedula: "", password: "" });
      setIsRegisterMode(false);
      
      // Reload lists
      loadAllAdmins();
      loadLeads();
    } catch {
      setRegErrors({ general: "Erro ao registar o novo administrador no sistema." });
    }
  };

  // Log Out handler
  const handleLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem("angola_legal_current_admin");
    setSelectedLead(null);
  };

  // Update selection status
  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const upLead = { ...l, status: newStatus };
        if (selectedLead?.id === leadId) {
          setSelectedLead(upLead);
        }
        return upLead;
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem("angola_legal_admin_leads", JSON.stringify(updated));
  };

  // Save admin custom strategic annotations
  const handleSaveNotes = () => {
    if (!selectedLead) return;
    const updated = leads.map(l => {
      if (l.id === selectedLead.id) {
        const upLead = { ...l, notes: adminNotes };
        setSelectedLead(upLead);
        return upLead;
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem("angola_legal_admin_leads", JSON.stringify(updated));
    alert("Notas administrativas de triagem salvas com sucesso!");
  };

  // Delete Lead record
  const handleDeleteLead = (leadId: string) => {
    if (confirm("Tem a certeza que deseja excluir esta ficha de contacto permanentemente da base de dados?")) {
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      localStorage.setItem("angola_legal_admin_leads", JSON.stringify(updated));
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

  // Handle addition of new administrator from inside the dashboard
  const handleRegisterAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrors({});
    setRegSuccess(null);
    const errors: Record<string, string> = {};

    if (!regForm.name.trim()) {
      errors.name = "O Nome Completo é obrigatório.";
    }
    if (!regForm.email.trim()) {
      errors.email = "O E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = "O endereço de e-mail não é válido.";
    }
    if (regForm.password.length < 6) {
      errors.password = "A senha de administração deve conter pelo menos 6 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const finalCedula = regForm.cedula.trim() || "Administrador Assistente";

    const newAdmin: Administrator = {
      id: "adm_" + Date.now().toString(),
      name: regForm.name.trim(),
      email: regForm.email.trim().toLowerCase(),
      cedula: finalCedula,
      createdAt: new Date().toLocaleDateString("pt-AO")
    };

    try {
      const storedAdminsStr = localStorage.getItem("angola_legal_registered_admins");
      const existingAdmins: Administrator[] = storedAdminsStr ? JSON.parse(storedAdminsStr) : [];
      
      if (existingAdmins.some(a => a.email === newAdmin.email)) {
        setRegErrors({ email: "Este endereço de e-mail já está registado como administrador." });
        return;
      }

      existingAdmins.push(newAdmin);
      localStorage.setItem("angola_legal_registered_admins", JSON.stringify(existingAdmins));
      
      const pwdMapStr = localStorage.getItem("angola_legal_admin_pwds") || "{}";
      const pwdMap = JSON.parse(pwdMapStr);
      pwdMap[newAdmin.email] = regForm.password;
      localStorage.setItem("angola_legal_admin_pwds", JSON.stringify(pwdMap));

      setRegSuccess(`Administrador "${newAdmin.name}" foi cadastrado com sucesso!`);
      setRegForm({ name: "", email: "", cedula: "", password: "" });
      loadAllAdmins();
    } catch {
      setRegErrors({ general: "Erro ao gravar administrador no armazenamento local." });
    }
  };

  // Revoke administrator access
  const handleDeleteAdmin = (adminId: string, email: string) => {
    try {
      const storedAdminsStr = localStorage.getItem("angola_legal_registered_admins");
      const existingAdmins: Administrator[] = storedAdminsStr ? JSON.parse(storedAdminsStr) : [];
      
      if (existingAdmins.length <= 1) {
        alert("Operação bloqueada: O sistema necessita de manter pelo menos um administrador ativo.");
        return;
      }
      if (email === currentAdmin?.email) {
        alert("Operação bloqueada: Não pode remover a sua própria conta de administrador enquanto estiver autenticado nela.");
        return;
      }

      if (confirm(`Tem a certeza absoluta que deseja revogar o acesso administrativo da conta "${email}"? O utilizador perderá acesso imediato ao painel.`)) {
        const updated = existingAdmins.filter(a => a.id !== adminId);
        localStorage.setItem("angola_legal_registered_admins", JSON.stringify(updated));
        
        const pwdMapStr = localStorage.getItem("angola_legal_admin_pwds") || "{}";
        const pwdMap = JSON.parse(pwdMapStr);
        delete pwdMap[email];
        localStorage.setItem("angola_legal_admin_pwds", JSON.stringify(pwdMap));

        loadAllAdmins();
      }
    } catch {
      alert("Erro ao remover administrador.");
    }
  };

  // Register and delete lawyer operations
  const handleRegisterLawyer = (e: React.FormEvent) => {
    e.preventDefault();
    setLawyerSuccess(null);
    setLawyerError(null);

    if (!lawyerForm.name.trim() || !lawyerForm.email.trim() || !lawyerForm.cedula.trim()) {
      setLawyerError("Todos os campos marcados com asterisco (*) são obrigatórios.");
      return;
    }

    const newLawyer: Lawyer = {
      id: "law_" + Date.now().toString(),
      name: lawyerForm.name.trim(),
      email: lawyerForm.email.trim().toLowerCase(),
      cedula: lawyerForm.cedula.trim(),
      specialty: lawyerForm.specialty,
      commissionRate: Number(lawyerForm.commissionRate) || 15,
      joinedAt: new Date().toLocaleDateString("pt-AO")
    };

    try {
      const storedLawyersStr = localStorage.getItem("angola_legal_registered_lawyers") || "[]";
      const existingLawyers: Lawyer[] = JSON.parse(storedLawyersStr);

      if (existingLawyers.some(l => l.email === newLawyer.email)) {
        setLawyerError("Já existe um advogado cadastrado com este endereço de e-mail.");
        return;
      }

      existingLawyers.push(newLawyer);
      localStorage.setItem("angola_legal_registered_lawyers", JSON.stringify(existingLawyers));
      
      setLawyerSuccess(`Advogado "${newLawyer.name}" cadastrado com sucesso no sistema.`);
      setLawyers(existingLawyers);
      setLawyerForm({
        name: "",
        email: "",
        cedula: "",
        specialty: "Direito do Trabalho (LGT)",
        commissionRate: 15
      });
    } catch {
      setLawyerError("Erro ao gravar novo advogado de consultoria.");
    }
  };

  const handleDeleteLawyer = (id: string, name: string) => {
    if (confirm(`Tem certeza absoluta que deseja revogar o cadastro do(a) ${name}? Todas as atribuições ativas deste advogado serão marcadas como pendentes.`)) {
      try {
        const storedLawyersStr = localStorage.getItem("angola_legal_registered_lawyers") || "[]";
        const existingLawyers: Lawyer[] = JSON.parse(storedLawyersStr);
        const updated = existingLawyers.filter(l => l.id !== id);
        
        localStorage.setItem("angola_legal_registered_lawyers", JSON.stringify(updated));
        setLawyers(updated);
        
        const updatedLeads = leads.map(l => {
          if (l.assignedLawyerId === id) {
            return { 
              ...l, 
              assignedLawyerId: undefined,
              caseFeeTotal: undefined, // Clear fees on removal or keep as you prefer (clear for safety)
              commissionEarned: undefined
            };
          }
          return l;
        });
        setLeads(updatedLeads);
        localStorage.setItem("angola_legal_admin_leads", JSON.stringify(updatedLeads));
      } catch {
        alert("Erro ao revogar cadastro do advogado.");
      }
    }
  };

  // Seed demo records for elegant pre-visualization
  const seedDemoLeads = () => {
    const demo: Lead[] = [
      {
        id: "lead_demo_1",
        name: "Manuel da Silva dos Santos",
        phone: "923 456 789",
        category: "laboral",
        categoryLabel: "Situação Laboral / Emprego",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("pt-AO"), // Yesterday
        status: "Pendente",
        estimatedVal: "2.450.000 AOA",
        notes: "Trabalhador despedido sumariamente após 4 anos de serviço sem receber indemnizações nem proporcionais. Empresa alega crise financeira mas não seguiu trâmites processuais da LGT (Lei 12/23).",
        answers: {
          "Nome": "Manuel da Silva dos Santos",
          "Tipo do Problema": "Despedimento Verbal sem Justa Causa",
          "Salário Mensal": "250.000 Kz",
          "Tempo de Serviço": "4 anos e 3 meses",
          "Teve Processo Disciplinar?": "Não, foi ordenado verbalmente a não regressar no dia seguinte."
        },
        diagnosisText: "### 🏛️ Avaliação Preliminar: Seus Direitos e Valores Reclamáveis\n\n**Força preliminar do caso:** 88/100\n\n**Valor potencial estimado:** 2.450.000 AOA\n\n#### 1. Resultado da IA (Como a Lei Analisa o seu Caso)\nO despedimento ordenado verbalmente sem processo disciplinar prévio constitui nulidade absoluta do ato de demissão, de acordo com as diretrizes do Artigo 200.º da Lei Geral do Trabalho (Lei n.º 12/23). Há fortes indícios de preterição das formalidades de rito legal.\n\n#### 📊 2. Valores Provisórios Reclamáveis (Seus Direitos Financeiros)\n- Indemnização de base por cessação: 4 salários = 1.000.000 Kz\n- Falta de aviso prévio (60 dias): 2 salários = 500.000 Kz\n- Subsídio de Férias e de Natal proporcional: 450.000 Kz\n- Compensações em atraso: 500.000 Kz"
      },
      {
        id: "lead_demo_2",
        name: "Maria de Fátima Conceição",
        phone: "912 300 450",
        category: "imobiliario",
        categoryLabel: "Arrendamento ou Terrenos",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-AO"), // 3 days ago
        status: "Em Contacto",
        estimatedVal: "450.000 AOA",
        notes: "Senhorio exige saída do imóvel arrendado num prazo de 15 dias para realização de obras de pintura, recusando a devolução do depósito de caução pago aquando da assinatura.",
        answers: {
          "Nome": "Maria de Fátima Conceição",
          "Tipo de Litígio": "Despejo sem Notificação / Retenção de Depósito",
          "Valor da Renda Mensal": "150.000 Kz",
          "Meses em Falta": "Nenhum, rendas pagas exemplarmente",
          "Existe contrato escrito?": "Sim, contrato com duração de 1 ano renovável por iguais períodos."
        },
        diagnosisText: "### 🏛️ Avaliação Preliminar: Seus Direitos e Valores Reclamáveis\n\n**Força preliminar do caso:** 92/100\n\n**Valor potencial estimado:** 450.000 AOA\n\n#### 1. Resultado da IA (Como a Lei Analisa o seu Caso)\nO aviso de despejo num prazo de 15 dias sem incumprimento contratual do inquilino viola as normas cogentes da Lei do Arrendamento Urbano (LAU). Qualquer denúncia imotivada exige aviso prévio formal por escrito de, no mínimo, 90 dias.\n\n#### 📊 2. Valores Provisórios Reclamáveis (Seus Direitos Financeiros)\n- Reclamação do depósito de caução: 300.000 Kz (equivalente a 2 meses retidos)\n- Indemnização civil potencial por abuso de direito: 155.000 Kz"
      }
    ];
    setLeads(demo);
    localStorage.setItem("angola_legal_admin_leads", JSON.stringify(demo));
  };

  // Filter computations
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "todos" || l.status === statusFilter;
    const matchesCategory = categoryFilter === "todos" || l.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // KPI calculations
  const totalLeadsCount = leads.length;
  const pendingLeadsCount = leads.filter(l => l.status === "Pendente").length;
  const inContactCount = leads.filter(l => l.status === "Em Contacto" || l.status === "Agendado").length;
  
  // Custom parsing to estimate total portfolio value
  const parseValue = (valStr?: string) => {
    if (!valStr) return 0;
    const numeric = valStr.replace(/[^0-9]/g, "");
    return numeric ? parseInt(numeric, 10) : 0;
  };
  const totalPortfolioValue = leads.reduce((sum, current) => sum + parseValue(current.estimatedVal), 0);

  // Lawyer & Platform Commissions KPIs
  const getLawyerStats = (lawyerId: string) => {
    const lawyerLeads = leads.filter(l => l.assignedLawyerId === lawyerId);
    const totalFees = lawyerLeads.reduce((sum, l) => sum + (l.caseFeeTotal || 0), 0);
    const totalEarned = lawyerLeads.reduce((sum, l) => sum + (l.commissionEarned || 0), 0);
    return {
      casesCount: lawyerLeads.length,
      totalFees,
      totalEarned
    };
  };

  const totalFeesBilled = leads.reduce((sum, current) => sum + (current.caseFeeTotal || 0), 0);
  const totalCommissionsEarned = leads.reduce((sum, current) => sum + (current.commissionEarned || 0), 0);
  const assignedCasesCount = leads.filter(l => l.assignedLawyerId).length;

  return (
    <div className="w-full min-h-[500px] bg-[#0a0a0d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans animate-fade-in text-white/90">
      
      {/* 1. ADMIN HEADER RAIL */}
      <div className="bg-black border-t-4 border-t-[#da291c] border-b-2 border-b-[#c5a85c] p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#c5a85c]" />
          <span className="font-serif text-xs font-bold tracking-widest text-[#c5a85c] uppercase">
            Portal de Administração e Advocacia Angola Legal
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {currentAdmin && (
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 border border-slate-800 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-200">
                Dr(a). {currentAdmin.name} ({currentAdmin.cedula})
              </span>
            </div>
          )}
          
          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-xs font-semibold text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#c5a85c]" />
            Painel do Cidadão
          </button>

          {currentAdmin && (
            <button
              onClick={handleLogout}
              className="p-1.5 bg-red-950/20 hover:bg-red-900/40 border border-red-900/30 text-red-200 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              title="Encerrar Sessão"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. AUTHENTICATION SCREENS (Unregistered/Unauthenticated State) */}
      {!currentAdmin ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-lg mx-auto w-full gap-6">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="p-4 bg-[#c5a85c]/10 border border-[#c5a85c]/40 rounded-full text-[#c5a85c] animate-bounce">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-black text-2xl tracking-tight text-white">
              {allAdmins.length === 0 
                ? "Configuração de Administrador" 
                : isRegisterMode 
                  ? "Registo de Novo Administrador" 
                  : "Área Administrativa Registrada"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {allAdmins.length === 0 
                ? "Nenhum administrador registado no sistema de forma local ou cloud. Cadastre o primeiro perfil profissional para obter controle principal." 
                : isRegisterMode 
                  ? "Crie uma nova credencial administrativa pessoal para realizar triagem e atribuição de contatos." 
                  : "Gestão integrada de fichas de atendimento jurídicos emitidos por cidadãos em Angola."}
            </p>
          </div>

          {usingSupabase && (
            <div className="w-full py-2 px-3 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 rounded-lg text-[11px] flex items-center gap-1.5 justify-center">
              <Globe className="w-3.5 h-3.5 animate-pulse" /> Sincronização em Tempo Real (Supabase Cloud Activo)
            </div>
          )}

          {allAdmins.length === 0 ? (
            /* INITIAL ADMIN SETUP FORM */
            <form onSubmit={handleFirstAdminSubmit} className="w-full bg-[#050505] border border-[#c5a85c]/30 rounded-xl p-6 flex flex-col gap-4 animate-fade-in">
              <div className="bg-[#c5a85c]/5 border border-[#c5a85c]/20 p-3 rounded-lg text-xs text-slate-350 leading-relaxed">
                <span className="font-bold text-[#c5a85c]">Primeiro Acesso:</span> Defina as suas próprias credenciais privadas. Estas credenciais serão salvas de forma segura no seu navegador ou banco de dados conectado.
              </div>

              {regErrors.general && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-200 rounded-lg text-xs">
                  {regErrors.general}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nome do Administrador *</label>
                <input
                  type="text"
                  placeholder="Ex: Dr. Salvador Simão"
                  required
                  value={regForm.name}
                  onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.name && (
                  <span className="text-[10px] text-red-400">{regErrors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail Profissional *</label>
                <input
                  type="email"
                  placeholder="Ex: s.simao@angolalegal.ao"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.email && (
                  <span className="text-[10px] text-red-400">{regErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cédula OAA ou Identificação</label>
                <input
                  type="text"
                  placeholder="Ex: Administrador Central (Opcional)"
                  value={regForm.cedula}
                  onChange={(e) => setRegForm(prev => ({ ...prev, cedula: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nova Senha de Acesso *</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={regForm.password}
                  onChange={(e) => setRegForm(prev => ({ ...prev, password: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.password && (
                  <span className="text-[10px] text-red-400">{regErrors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#c5a85c] hover:bg-[#b0934d] text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-lg transition mt-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Configurar Administrador & Entrar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : isRegisterMode ? (
            /* NON-AUTHENTICATED NEW ADMIN REGISTRATION FORM */
            <form onSubmit={handleNoAuthAdminSubmit} className="w-full bg-[#050505] border border-[#c5a85c]/30 rounded-xl p-6 flex flex-col gap-4 animate-fade-inShadow">
              {regErrors.general && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-200 rounded-lg text-xs flex items-center gap-2">
                  <span className="font-sans font-bold">⚠️</span>
                  <span>{regErrors.general}</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Dra. Teresa Bento"
                  required
                  value={regForm.name}
                  onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.name && (
                  <span className="text-[10px] text-red-400 font-sans">{regErrors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail Profissional *</label>
                <input
                  type="email"
                  placeholder="Ex: t.bento@angolalegal.ao"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.email && (
                  <span className="text-[10px] text-red-400 font-sans">{regErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cédula OAA ou Cargo</label>
                <input
                  type="text"
                  placeholder="Ex: Delegada Adjunta (Opcional)"
                  value={regForm.cedula}
                  onChange={(e) => setRegForm(prev => ({ ...prev, cedula: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nova Senha de Acesso *</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={regForm.password}
                  onChange={(e) => setRegForm(prev => ({ ...prev, password: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {regErrors.password && (
                  <span className="text-[10px] text-red-400 font-sans">{regErrors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#c5a85c] hover:bg-[#b0934d] text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-lg transition mt-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Registar Administrador <Plus className="w-3.5 h-3.5" />
              </button>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setRegErrors({});
                  }}
                  className="text-xs text-[#c5a85c] hover:underline cursor-pointer"
                >
                  Já possui conta? Efetuar Login
                </button>
              </div>
            </form>
          ) : (
            /* STANDARD LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="w-full bg-[#050505] border border-slate-800/80 rounded-xl p-6 flex flex-col gap-4">
              {loginErrors.general && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-200 rounded-lg text-xs flex items-center gap-2">
                  <span className="font-sans font-bold">⚠️</span>
                  <span>{loginErrors.general}</span>
                </div>
              )}
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail Profissional</label>
                <input
                  type="email"
                  placeholder="Ex: dr.santos@angolalegal.ao"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {loginErrors.email && (
                  <span className="text-[10px] text-red-400">{loginErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Senha de Acesso</label>
                <input
                  type="password"
                  placeholder="Introduza a sua senha"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                />
                {loginErrors.password && (
                  <span className="text-[10px] text-red-400">{loginErrors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#da291c] hover:bg-[#be1e13] text-white border-b-4 border-b-[#c5a85c] font-serif font-bold text-xs tracking-widest uppercase rounded-lg transition mt-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Autenticar Conta <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setLoginErrors({});
                  }}
                  className="text-xs text-[#c5a85c] hover:underline cursor-pointer"
                >
                  Novo Administrador? Registar nova conta
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        
        /* 3. AUTHENTICATED STATE: CORE LEAD DASHBOARD WORKSPACE */
        <div className="flex-grow flex flex-col gap-6 p-4 md:p-6">
          
          {/* KPI CARD STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total leads card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Total de Casos Recebidos
                </span>
                <span className="text-2xl font-serif font-black text-white">{totalLeadsCount}</span>
                <span className="text-[10px] text-slate-500 italic">Pre-qualificados por IA</span>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg z-10 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 pointer-events-none">
                <Users className="w-16 h-16" />
              </div>
            </div>

            {/* Pending card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Leads Pendentes de Triagem
                </span>
                <span className="text-2xl font-serif font-black text-[#c5a85c]">{pendingLeadsCount}</span>
                <span className="text-[10px] text-[#c5a85c]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#c5a85c]" /> Aguarda primeiro contacto
                </span>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg z-10 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 pointer-events-none">
                <Clock className="w-16 h-16 opacity-10" />
              </div>
            </div>

            {/* In contact card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Em Acompanhamento Ativo
                </span>
                <span className="text-2xl font-serif font-black text-emerald-400">{inContactCount}</span>
                <span className="text-[10px] text-slate-550">Contactados ou agendados</span>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg z-10 shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 pointer-events-none">
                <CheckCircle className="w-16 h-16" />
              </div>
            </div>

            {/* Values sum card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Estimativas Reclamáveis totais
                </span>
                <span className="text-lg font-serif font-black text-emerald-300">
                  {totalPortfolioValue.toLocaleString("pt-AO")} Kz
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ArrowUpRight className="w-3 h-3" /> Potencial da Carteira
                </span>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg z-10 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 pointer-events-none">
                <Coins className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* INNER NAVIGATION SUB-TABS */}
          <div className="flex border-b border-slate-800 gap-1.5 scrollbar-thin overflow-x-auto">
            <button
              onClick={() => setAdminTab("leads")}
              className={`px-4 py-2.5 font-serif text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border-t-2 border-x border-transparent rounded-t-lg cursor-pointer ${
                adminTab === "leads"
                  ? "bg-slate-950 text-[#c5a85c] border-x-slate-800 border-t-[#da291c]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Casos & Triagem
            </button>

            <button
              onClick={() => {
                setAdminTab("lawyers");
                setLawyerSuccess(null);
                setLawyerError(null);
              }}
              className={`px-4 py-2.5 font-serif text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border-t-2 border-x border-transparent rounded-t-lg cursor-pointer ${
                adminTab === "lawyers"
                  ? "bg-slate-950 text-[#c5a85c] border-x-slate-800 border-t-[#da291c]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Gestão de Advogados
            </button>

            <button
              onClick={() => {
                setAdminTab("register");
                setRegErrors({});
                setRegSuccess(null);
              }}
              className={`px-4 py-2.5 font-serif text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border-t-2 border-x border-transparent rounded-t-lg cursor-pointer ${
                adminTab === "register"
                  ? "bg-slate-950 text-[#c5a85c] border-x-slate-800 border-t-[#da291c]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Gestão de Administradores
            </button>

            <button
              onClick={() => setAdminTab("logs")}
              className={`px-4 py-2.5 font-serif text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border-t-2 border-x border-transparent rounded-t-lg cursor-pointer ${
                adminTab === "logs"
                  ? "bg-slate-950 text-[#c5a85c] border-x-slate-800 border-t-[#da291c]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Métricas & Configuração
            </button>
          </div>

          {/* DYNAMIC SUB-TABS RENDERER */}
          {adminTab === "leads" && (
            /* INTERNAL CONTENT AREA LAYOUT (Left List with Filters, Right lead inspection panel) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
              
              {/* LEFT COLUMN: FILTERS & LEADS LIST (Span 7) */}
              <div className="lg:col-span-7 flex flex-col gap-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
                
                {/* Filter tools row */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif font-bold text-sm text-[#c5a85c] flex items-center gap-1.5 uppercase">
                      <Layers className="w-4 h-4" /> Carteira de Casos / Leads de Contacto
                    </h4>
                    {leads.length === 0 && (
                      <button
                        onClick={seedDemoLeads}
                        className="px-2 py-1 bg-amber-950/40 border border-amber-900/40 hover:bg-[#c5a85c] hover:text-slate-950 text-amber-200 text-[10px] font-serif font-bold rounded uppercase transition tracking-wider cursor-pointer"
                      >
                        Carregar Casos Exemplo
                      </button>
                    )}
                  </div>

                  {/* Search bar & simple selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="relative col-span-1 sm:col-span-1">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Procurar nome ou fone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-2 py-2 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c]"
                      />
                    </div>

                    <div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none focus:border-[#c5a85c]"
                      >
                        <option value="todos">Estados: Todos</option>
                        <option value="Pendente">Status: Pendente</option>
                        <option value="Em Contacto">Status: Em Contacto</option>
                        <option value="Agendado">Status: Agendado</option>
                        <option value="Concluído">Status: Concluído</option>
                        <option value="Arquivado">Status: Arquivado</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none focus:border-[#c5a85c]"
                      >
                        <option value="todos">Matéria: Todas</option>
                        <option value="laboral">Direito do Trabalho</option>
                        <option value="imobiliario">Imobiliário/Arrendamento</option>
                        <option value="familia">Família e Sucessões</option>
                        <option value="consumidor">Direitos do Consumidor</option>
                        <option value="geral">Dúvidas Gerais</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dynamic scrollable table list */}
                <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900 flex flex-col gap-1 min-h-[350px]">
                  {filteredLeads.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-550 gap-2">
                      <span className="text-2xl select-none">📭</span>
                      <p className="text-xs font-semibold">Nenhuma ficha de contacto identificada.</p>
                      <p className="text-[11px] text-slate-600 max-w-xs">
                        Os contactos solicitados pelos utilizadores através de "Quero ser contactado" na tela de resultados de diagnóstico aparecerão aqui em tempo real.
                      </p>
                      {leads.length === 0 && (
                        <button
                          onClick={seedDemoLeads}
                          className="mt-3 px-3.5 py-1.5 bg-[#c5a85c]/10 hover:bg-[#c5a85c] border border-[#c5a85c] text-[#c5a85c] hover:text-slate-950 rounded-lg text-xs font-serif font-black uppercase tracking-wider transition cursor-pointer"
                        >
                          Carregar Casos Demonstrativos
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-[10px] font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                          <tr>
                            <th className="p-3">Nome / Requerente</th>
                            <th className="p-3">Contacto</th>
                            <th className="p-3">Matéria</th>
                            <th className="p-3 text-right">Potencial</th>
                            <th className="p-3 text-center">Estado</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {filteredLeads.map((lead) => {
                            const isSelected = selectedLead?.id === lead.id;
                            return (
                              <tr
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`hover:bg-slate-800/40 cursor-pointer transition ${
                                  isSelected ? "bg-slate-800/80 border-l-2 border-[#c5a85c]" : ""
                                }`}
                              >
                                <td className="p-3 font-medium">
                                  <div className="flex flex-col">
                                    <span className="text-white text-xs">{lead.name}</span>
                                    <span className="text-[10px] text-slate-500">{lead.date}</span>
                                  </div>
                                </td>
                                <td className="p-3 font-mono text-[11px] text-[#c5a85c]">
                                  {lead.phone}
                                </td>
                                <td className="p-3 text-slate-400">
                                  <span className="text-[11px] inline-block max-w-[120px] truncate" title={lead.categoryLabel}>
                                    {lead.category === "laboral" ? "Laboral (LGT)" : 
                                     lead.category === "imobiliario" ? "Arrendamento" : 
                                     lead.category === "familia" ? "Família" : 
                                     lead.category === "consumidor" ? "Consumo" : "Civil Geral"}
                                  </span>
                                </td>
                                <td className="p-3 text-right font-bold text-emerald-400 font-mono text-[11px]">
                                  {lead.estimatedVal || "(Vago)"}
                                </td>
                                <td className="p-3 text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                      lead.status === "Pendente"
                                        ? "bg-amber-950/60 text-amber-300 border border-amber-900/50"
                                        : lead.status === "Em Contacto"
                                        ? "bg-blue-950/60 text-blue-300 border border-blue-900/50"
                                        : lead.status === "Agendado"
                                        ? "bg-cyan-950/60 text-cyan-300 border border-cyan-900/50"
                                        : lead.status === "Concluído"
                                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-900/50"
                                        : "bg-slate-800 text-slate-400"
                                    }`}
                                  >
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="p-1 hover:bg-red-950/60 hover:text-red-400 rounded text-slate-500 transition"
                                    title="Eliminar Lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILED LEAD INFORMATION & ACTIONS PANEL (Span 5) */}
              <div className="lg:col-span-5 flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[480px]">
                
                {!selectedLead ? (
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-slate-550 gap-3">
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-full text-[#c5a85c]/60">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-slate-300">Nenhum Atendimento Selecionado</h4>
                    <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                      Selecione uma ficha de contacto na lista lateral para analisar os factos descritos pelo cidadão, visualizar o enquadramento na lei de Angola e registrar anotações de consultoria jurídica.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 animate-fade-in text-slate-200">
                    
                    {/* Visual Header with Lead Details */}
                    <div className="border-b border-slate-800 pb-3 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-black text-base text-white leading-tight">
                            {selectedLead.name}
                          </h3>
                          <p className="text-[10px] text-slate-500">
                            Submetido em: {selectedLead.date} | ID: {selectedLead.id.replace("lead_", "")}
                          </p>
                        </div>
                        
                        {/* Status changer dropdown */}
                        <select
                          value={selectedLead.status}
                          onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead["status"])}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-900 border outline-none cursor-pointer ${
                            selectedLead.status === "Pendente"
                              ? "text-amber-400 border-amber-900/50"
                              : selectedLead.status === "Em Contacto"
                              ? "text-blue-400 border-blue-900/50"
                              : selectedLead.status === "Agendado"
                              ? "text-cyan-400 border-cyan-900/50"
                              : "text-emerald-400 border-emerald-950/50"
                          }`}
                        >
                          <option value="Pendente">🟡 Pendente</option>
                          <option value="Em Contacto">🔵 Em Contacto</option>
                          <option value="Agendado">📅 Agendado</option>
                          <option value="Concluído">🟢 Concluído</option>
                          <option value="Arquivado">⚪ Arquivado</option>
                        </select>
                      </div>

                      {/* Direct Contact Buttons */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {/* WhatsApp trigger button */}
                        <a
                          href={`https://wa.me/${selectedLead.phone.replace(/\s+/g, "")}?text=Olá%20${encodeURIComponent(selectedLead.name)},%20sou%20o%20Dr.%20${encodeURIComponent(currentAdmin.name)}%20da%20Plataforma%20Direito%20Fácil%20Angola.%20Recebi%20a%2520sua%20ficha%20prévia%20sobre%2520${encodeURIComponent(selectedLead.categoryLabel)}%20e%20gostaria%20de%20ajudar.`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold tracking-wider uppercase transition text-center"
                        >
                          <Phone className="w-3.5 h-3.5" /> Falar via WhatsApp
                        </a>

                        <button
                          onClick={() => handleDeleteLead(selectedLead.id)}
                          className="px-3 py-2 bg-slate-900 hover:bg-red-950/60 hover:text-red-300 border border-slate-800 rounded-lg text-xs font-semibold text-slate-400 transition"
                          title="Eliminar Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Questionnaire answers summary */}
                    {selectedLead.answers && (
                      <div className="bg-slate-900 border border-slate-800/85 rounded-lg p-3">
                        <h5 className="text-[10px] font-bold text-[#c5a85c] uppercase mb-2">
                          Respostas Fornecidas no Questionário:
                        </h5>
                        <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {Object.entries(selectedLead.answers).map(([qLabel, qValue]) => (
                            <div key={qLabel} className="text-[11px] border-b border-slate-800/40 pb-1.5 flex flex-col gap-0.5">
                              <span className="text-slate-400 font-medium">{qLabel}</span>
                              <span className="text-white font-sans font-semibold">{qValue || "—"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Generated Diagnostics Text summary scroll */}
                    {selectedLead.diagnosisText && (
                      <div className="bg-slate-900 border border-slate-800/85 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="text-[10px] font-bold text-[#c5a85c] uppercase">
                            Diagnóstico Jurídico Gerado pela IA:
                          </h5>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">
                            Estimativa: {selectedLead.estimatedVal || "Sem valor"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-350 max-h-[180px] overflow-y-auto leading-relaxed border border-slate-800 bg-slate-950/40 p-2.5 rounded font-sans pr-1 whitespace-pre-wrap">
                          {selectedLead.diagnosisText}
                        </div>
                      </div>
                    )}

                    {/* Atribuição de Advogado e Comissões */}
                    <div className="bg-slate-900 border border-slate-800/85 rounded-lg p-3 flex flex-col gap-3">
                      <h5 className="text-[10px] font-bold text-[#c5a85c] uppercase flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Atribuição de Advogado & Comissões
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-semibold text-slate-400">Selecionar Advogado</label>
                          <select
                            value={allocationLawyerId}
                            onChange={(e) => handleLawyerSelectChange(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-xs px-2 py-1.5 rounded text-white outline-none focus:border-[#c5a85c] cursor-pointer"
                          >
                            <option value="">Nenhum (Sob Custódia)</option>
                            {lawyers.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name} ({l.cedula})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-semibold text-slate-400">Honorários Estimados (Kz)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={allocationFee || ""}
                            onChange={(e) => setAllocationFee(Number(e.target.value))}
                            className="bg-slate-950 border border-slate-800 text-xs px-2 py-1.5 rounded text-white outline-none focus:border-[#c5a85c]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-semibold text-slate-400">Cota de Comissão (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="15"
                            value={allocationRate}
                            onChange={(e) => setAllocationRate(Number(e.target.value))}
                            className="bg-slate-950 border border-[#c5a85c]/45 text-xs px-2 py-1.5 rounded text-white outline-none focus:border-[#c5a85c]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-semibold text-[#c5a85c]">Comissão Devida (Kz)</label>
                          <div className="bg-slate-950 border border-[#c5a85c]/40 text-xs font-mono font-bold text-center px-2 py-1.5 rounded text-emerald-400">
                            {Math.round((allocationFee * allocationRate) / 100).toLocaleString("pt-AO")} Kz
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSaveAllocation}
                        className="py-1.5 bg-[#c5a85c] hover:bg-[#b0934d] text-slate-950 rounded text-xs font-serif font-bold uppercase transition tracking-wider text-center cursor-pointer"
                      >
                        Gravar Atribuição & Comissão
                      </button>
                    </div>

                    {/* Strategic Case Annotations Textarea */}
                    <div className="flex flex-col gap-2 mt-1">
                      <label className="text-[10px] font-bold text-[#c5a85c] uppercase tracking-wider">
                        📝 Notas Estratégicas / Parecer Administrativo de Triagem
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Registe notas sobre as provas em falta, datas limite de contestação na IGT ou impressões sobre a fiabilidade das declarações..."
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] font-sans resize-none"
                      />
                      <button
                        onClick={handleSaveNotes}
                        className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-serif font-black uppercase tracking-widest transition text-center cursor-pointer"
                      >
                        Gravar Nota
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

          {adminTab === "lawyers" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in text-white">
              
              {/* REGISTER LAWYER FORM (Span 5) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" /> Cadastrar Advogado de Consultoria
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Credencie um novo advogado na plataforma Angola Legal para atribuição interna de casos e triagem especializada.
                  </p>
                </div>

                {lawyerSuccess && (
                  <div className="p-3 bg-emerald-950/55 border border-emerald-800 text-emerald-300 text-xs rounded-lg font-medium leading-relaxed">
                    🎉 {lawyerSuccess}
                  </div>
                )}

                {lawyerError && (
                  <div className="p-3 bg-red-950/55 border border-red-900 text-red-300 text-xs rounded-lg font-medium leading-relaxed">
                    ⚠️ {lawyerError}
                  </div>
                )}

                <form onSubmit={handleRegisterLawyer} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Nome do Advogado *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Dra. Antónia de Almeida"
                      value={lawyerForm.name}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, name: e.target.value })}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      E-mail Profissional *
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: d.almeida@oaa.ao"
                      value={lawyerForm.email}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, email: e.target.value })}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Nº de Inscrição na OAA *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: OAA 5.932"
                      value={lawyerForm.cedula}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, cedula: e.target.value })}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Especialidade Principal
                    </label>
                    <select
                      value={lawyerForm.specialty}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, specialty: e.target.value })}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] cursor-pointer"
                    >
                      <option value="Direito do Trabalho (LGT)">Direito do Trabalho (LGT)</option>
                      <option value="Direito de Família e Sucessões">Direito de Família e Sucessões</option>
                      <option value="Direito Imobiliário e Contratos">Direito Imobiliário e Contratos</option>
                      <option value="Defesa do Consumidor (LDC)">Defesa do Consumidor (LDC)</option>
                      <option value="Direito Cível e Administrativo">Direito Cível e Administrativo</option>
                      <option value="Geral (Múltiplas áreas)">Geral (Múltiplas áreas)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Taxa de Comissão Padrão (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={lawyerForm.commissionRate}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, commissionRate: Number(e.target.value) || 15 })}
                      className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:border-[#c5a85c] font-sans"
                    />
                    <span className="text-[9px] text-slate-500 font-sans mt-0.5">
                      Percentagem cobrada pelo Angola Legal sobre os honorários angariados.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 mt-2 bg-[#c5a85c] hover:bg-[#b0934d] text-slate-950 font-serif font-black uppercase tracking-wider rounded-lg text-xs transition cursor-pointer"
                  >
                    Credenciar Advogado
                  </button>
                </form>
              </div>

              {/* LAWYERS LIST TABLE (Span 7) */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> Corpo de Advogados Credenciados
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Monitorize as atribuições de casos, honorários gerados e comissões para o Angola Legal.
                    </p>
                  </div>
                  <span className="bg-slate-900 text-[#c5a85c] border border-slate-800/80 px-2.5 py-1 rounded text-[10px] font-mono font-bold">
                    Total: {lawyers.length} Advogados
                  </span>
                </div>

                {lawyers.length === 0 ? (
                  <div className="py-12 border border-dashed border-slate-850 rounded-lg text-center text-slate-500">
                    Nenhum advogado cadastrado no sistema. Utilize o formulário ao lado para cadastrar.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-850 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-serif text-[10px] font-bold uppercase tracking-wider">
                          <th className="p-3">Advogado / Cédula</th>
                          <th className="p-3">Especialidade</th>
                          <th className="p-3 text-center">Casos Ativos</th>
                          <th className="p-3 text-right">Comissões Acumuladas</th>
                          <th className="p-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-xs">
                        {lawyers.map((l) => {
                          const stats = getLawyerStats(l.id);
                          return (
                            <tr key={l.id} className="hover:bg-slate-900/50 transition">
                              <td className="p-3">
                                <div className="font-bold text-white leading-tight">{l.name}</div>
                                <div className="text-[9px] text-[#c5a85c] font-mono mt-0.5">{l.cedula}</div>
                                <div className="text-[9px] text-slate-500 mt-0.5">{l.email}</div>
                              </td>
                              <td className="p-3">
                                <span className="bg-slate-900 border border-slate-800 text-slate-300 font-sans px-2 py-0.5 rounded text-[10px]">
                                  {l.specialty}
                                </span>
                              </td>
                              <td className="p-3 text-center font-mono font-bold text-white text-xs">
                                {stats.casesCount}
                              </td>
                              <td className="p-3 text-right">
                                <div className="font-mono font-bold text-emerald-400">
                                  {stats.totalEarned.toLocaleString("pt-AO")} Kz
                                </div>
                                <div className="text-[9px] text-slate-500">
                                  Honorários: {stats.totalFees.toLocaleString("pt-AO")} Kz ({l.commissionRate}%)
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleDeleteLawyer(l.id, l.name)}
                                  className="p-1 px-2 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-950 bg-slate-900/30 hover:bg-red-950/20 rounded transition text-[10px] uppercase font-bold cursor-pointer"
                                  title="Revogar credenciamento"
                                >
                                  Descredenciar
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {adminTab === "register" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in text-white">
              
              {/* REGISTER ADMIN FORM (Span 5) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" /> Cadastro de Administrador
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 mt-1">
                    Cadastre um novo perfil de administrador para triagem de casos de forma interna e segura.
                  </p>
                </div>

                {regSuccess && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 text-emerald-200 rounded-lg text-xs flex items-center gap-2">
                    <span className="font-sans font-bold">✓</span>
                    <span>{regSuccess}</span>
                  </div>
                )}

                {regErrors.general && (
                  <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-200 rounded-lg text-xs flex items-center gap-2">
                    <span className="font-sans font-bold">⚠️</span>
                    <span>{regErrors.general}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterAdmin} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Nome Completo do Administrador <span className="text-[#c5a85c] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Dra. Antunes Santos"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                      className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                    />
                    {regErrors.name && (
                      <span className="text-[10px] text-red-400 font-sans">{regErrors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      E-mail Profissional / Acesso <span className="text-[#c5a85c] font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: santos.oaa@angolalegal.ao"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                      className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                    />
                    {regErrors.email && (
                      <span className="text-[10px] text-red-400 font-sans">{regErrors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Cédula OAA / Cargo <span className="text-slate-500 font-normal lowercase">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cédula de Advogado N.º 4251"
                      value={regForm.cedula}
                      onChange={(e) => setRegForm(prev => ({ ...prev, cedula: e.target.value }))}
                      className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Senha de Acesso (mínimo 6 dígitos) <span className="text-[#c5a85c] font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Introduza uma senha robusta"
                      required
                      value={regForm.password}
                      onChange={(e) => setRegForm(prev => ({ ...prev, password: e.target.value }))}
                      className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-[#c5a85c]"
                    />
                    {regErrors.password && (
                      <span className="text-[10px] text-red-400 font-sans">{regErrors.password}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#c5a85c] hover:bg-[#b0934d] text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-lg transition mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Efetuar Cadastro Local <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* REGISTERED ADMINS LIST (Span 7) */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Administradores do Sistema Cadastrados
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Estes perfis têm acesso completo de triagem na plataforma Angola Legal utilizando as credenciais listadas.
                  </p>
                </div>

                <div className="border border-slate-800 rounded-lg overflow-x-auto bg-slate-900/40">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-[10px] font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Nome / Cédula</th>
                        <th className="p-3">E-mail de Acesso</th>
                        <th className="p-3">Data de Registo</th>
                        <th className="p-3 text-center">Acções</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {allAdmins.map((adm, idx) => {
                        const isRoot = idx === 0 || allAdmins.length <= 1;
                        const isSelf = adm.email === currentAdmin?.email;
                        return (
                          <tr key={adm.id} className="hover:bg-slate-800/20 transition">
                            <td className="p-3">
                              <div className="flex flex-col">
                                <span className="text-white font-semibold text-xs flex items-center gap-1">
                                  {adm.name}
                                  {isRoot && (
                                    <span className="text-[8px] bg-red-950 text-red-400 border border-red-900 px-1 rounded font-mono">
                                      ROOT
                                    </span>
                                  )}
                                  {isSelf && (
                                    <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1 rounded font-mono">
                                      VOCÊ
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-slate-450">{adm.cedula}</span>
                              </div>
                            </td>
                            <td className="p-3 font-mono text-slate-400 text-[11px]">
                              {adm.email}
                            </td>
                            <td className="p-3 text-slate-400 text-[11px]">
                              {adm.createdAt}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                disabled={isRoot || isSelf}
                                onClick={() => handleDeleteAdmin(adm.id, adm.email)}
                                title={isRoot ? "Protegido de raiz" : isSelf ? "Sessão Ativa" : "Revogar Direitos"}
                                className={`p-1 hover:bg-red-950/60 rounded text-slate-500 transition ${
                                  isRoot || isSelf ? "opacity-30 cursor-not-allowed text-slate-700" : "hover:text-red-405"
                                }`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/80 rounded-lg p-3.5 text-[11px] text-slate-400 leading-relaxed">
                  <h5 className="font-serif text-[#c5a85c] uppercase text-[9px] font-bold mb-1">🛡️ Isenção e Localização das Chaves:</h5>
                  A plataforma utiliza autenticação criptográfica simulada persistida localmente no navegador. Todas as alterações, perfis de e-mail criados e credenciais inseridas acima são persistidas unicamente em segurança na Sandbox do utilizador.
                </div>
              </div>
            </div>
          )}

          {adminTab === "logs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in text-white font-sans">
              
              {/* SYSTEM METRICS SUMMARY (Span 7) */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Métricas e Estatísticas do Sistema
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Análise e desdobramento demográfico de interações do simulador jurídico.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Média de Reclamações</span>
                    <span className="text-xl font-serif text-white font-bold">
                      {leads.length > 0
                        ? Math.round(totalPortfolioValue / leads.length).toLocaleString("pt-AO")
                        : 0}{" "}
                      Kz
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Valor potencial estimado médio por lead</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Relação Conversão OAA</span>
                    <span className="text-xl font-serif text-white font-bold">
                      {leads.length > 0 ? Math.round((inContactCount / leads.length) * 100) : 0}%
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Leads acompanhados ativamente sobre total</p>
                  </div>
                </div>

                {/* PLATFORM COMMISSIONS & FEES FLOW METRICS CARD */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-3">
                  <h4 className="text-[11px] font-bold text-[#c5a85c] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Coins className="w-3.5 h-3.5" /> Fluxo Financeiro de Parcerias e Comissões
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg">
                      <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Honorários Totais</span>
                      <span className="text-sm font-mono font-bold text-slate-105 tracking-wide text-white block">
                        {totalFeesBilled.toLocaleString("pt-AO")} Kz
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Acordas com advogados credenciados</p>
                    </div>

                    <div className="bg-slate-950 border border-[#c5a85c]/30 p-3 rounded-lg">
                      <span className="text-[9px] text-[#c5a85c] font-bold uppercase block mb-0.5">Taxas Recorrentes (Platform)</span>
                      <span className="text-sm font-mono font-black tracking-wide text-emerald-400 block">
                        {totalCommissionsEarned.toLocaleString("pt-AO")} Kz
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Receita líquida da Angola Legal</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg">
                      <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Atribuições Ativas</span>
                      <span className="text-sm font-mono font-bold text-white block">
                        {assignedCasesCount} de {leads.length}
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">
                        {leads.length > 0 ? Math.round((assignedCasesCount / leads.length) * 100) : 0}% dos casos triados
                      </p>
                    </div>
                  </div>
                </div>

                {/* SYSTEM VISITORS & REAL-TIME TRAFFIC TELEMETRY CARD */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <h4 className="text-[11px] font-bold text-[#c5a85c] uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Telemetria de Tráfego e Visitantes do Sistema
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleSimulateVisitor}
                        className="px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 rounded text-[9px] uppercase font-mono font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Simular um novo acesso de cidadão angolano em tempo real"
                      >
                        <Plus className="w-2.5 h-2.5" /> Simular Visita
                      </button>
                      <button
                        onClick={handleResetVisitors}
                        className="px-2 py-1 bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-850 rounded text-[9px] uppercase font-mono font-bold transition cursor-pointer"
                        title="Repor métricas ao padrão de teste"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">Total Visitas</span>
                        <Eye className="w-3 h-3 text-[#c5a85c]" />
                      </div>
                      <span className="text-sm font-mono font-black text-white block">
                        {(visitorStats?.totalVisits || 1420).toLocaleString("pt-AO")}
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Sessões totais registradas</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">Visitas Únicas</span>
                        <Globe className="w-3 h-3 text-[#c5a85c]" />
                      </div>
                      <span className="text-sm font-mono font-black text-white block">
                        {(visitorStats?.uniqueVisitors || 850).toLocaleString("pt-AO")}
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Identificadores únicos locais</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg">
                      <span className="text-[8px] text-slate-400 font-semibold uppercase block mb-1">Taxa de Rejeição</span>
                      <span className="text-sm font-mono font-bold text-amber-500 block">
                        {visitorStats?.bounceRate || 42.5}%
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Saídas s/ interação profunda</p>
                    </div>

                    <div className="bg-slate-950 border border-[#c5a85c]/20 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-[#c5a85c] font-bold uppercase">Tempo Médio</span>
                        <Clock className="w-3 h-3 text-emerald-400 animate-pulse" />
                      </div>
                      <span className="text-sm font-mono font-bold text-emerald-400 block">
                        {visitorStats?.avgDuration || "4m 32s"}
                      </span>
                      <p className="text-[8px] text-slate-500 mt-0.5">Esforço médio na triagem IA</p>
                    </div>
                  </div>

                  {/* Realtime logs */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-[#c5a85c] font-bold uppercase tracking-wider block">
                      Fila de Atividade ao Vivo (Cidadãos Triando Casos em Angola)
                    </span>
                    <div className="bg-slate-950 border border-slate-850 rounded-lg overflow-hidden text-[10px] font-mono leading-relaxed divide-y divide-slate-900/65">
                      {visitorStats?.recentLogs?.slice(0, 5).map((log: any, index: number) => (
                        <div key={log.id || index} className="p-2 flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 hover:bg-slate-900/50 transition">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-slate-550 select-none">[{index + 1}]</span>
                            <span className="text-[#c5a85c] font-bold">{log.ip}</span>
                            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-1 py-0.5 rounded text-[8px] uppercase">
                              {log.region}
                            </span>
                            <span className="text-slate-400 pr-1">{log.device}</span>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className="text-slate-500">→</span>
                            <span className="text-emerald-400 font-sans font-semibold text-[10px]">{log.page}</span>
                            <span className="text-slate-500 text-[9px]">{log.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DISTRIBUTION OF CASES BY LEGAL AREA CATEGORIES */}
                <div className="flex flex-col gap-3.5 bg-slate-900 border border-slate-800 rounded-lg p-4">
                  <h4 className="text-[11px] font-bold text-[#c5a85c] uppercase tracking-wider">
                    Distribuição Jurídica por Ramo do Direito de Angola
                  </h4>

                  <div className="flex flex-col gap-3">
                    {[
                      { key: "laboral", label: "Direito de Trabalho (LGT)", color: "bg-blue-500" },
                      { key: "imobiliario", label: "Arrendamento Urbano / Inquilinato", color: "bg-emerald-500" },
                      { key: "familia", label: "Família e Sucessões", color: "bg-[#c5a85c]" },
                      { key: "consumidor", label: "Defesa do Consumidor (LDC)", color: "bg-amber-500" },
                      { key: "geral", label: "Cível Geral / Outros", color: "bg-purple-500" }
                    ].map((categ) => {
                      const count = leads.filter(l => l.category === categ.key).length;
                      const percentage = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                      return (
                        <div key={categ.key} className="flex flex-col gap-1 text-xs">
                          <div className="flex justify-between items-center text-slate-300">
                            <span>{categ.label}</span>
                            <span className="font-mono text-[11px]">
                              {count} {count === 1 ? "caso" : "casos"} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${percentage}%` }}
                              className={`h-full rounded-full ${categ.color}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SYSTEM CONFIGURATION CONTROLS (Span 5) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-black text-sm text-[#c5a85c] uppercase flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Parâmetros e Gestão de Backup
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Operações estratégicas de recuperação e exportação de dados do sistema.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Backup export action */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-200">Exportar Registos Globais</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Efetue o download de todas as fichas de contacto, notas de triagem administrativa e diagnósticos em formato JSON estruturado.
                    </p>
                    <button
                      onClick={() => {
                        try {
                          const dataExport = {
                            leads: leads,
                            admins: allAdmins,
                            exportedAt: new Date().toISOString()
                          };
                          const blob = new Blob([JSON.stringify(dataExport, null, 2)], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `backup_sistema_angola_legal_${Date.now()}.json`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } catch {
                          alert("Erro ao exportar base de dados.");
                        }
                      }}
                      className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs px-2.5 mt-1 font-bold uppercase transition"
                    >
                      Descarregar JSON (.json)
                    </button>
                  </div>

                  {/* Seed / Reload demo data action */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-200">Simulação de Fluxos</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Guarde ou sobreponha o estado da carteira com os leads de demonstração pré-qualificados pela inteligência artificial.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm("Isto irá recarregar as fichas de teste pré-definidas na sua fila de triagem. Prosseguir?")) {
                          seedDemoLeads();
                          alert("Leads de demonstração reiniciados!");
                        }
                      }}
                      className="py-1.5 px-3 bg-[#c5a85c]/10 hover:bg-[#c5a85c] border border-[#c5a85c]/50 text-[#c5a85c] hover:text-slate-950 rounded text-xs px-2.5 mt-1 font-serif font-black uppercase tracking-wider transition"
                    >
                      Repor Fichas Exemplo
                    </button>
                  </div>

                  {/* Reset app state */}
                  <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-lg flex flex-col gap-1.5">
                    <h4 className="text-xs font-bold text-red-400">Limpar Carteira de Clientes</h4>
                    <p className="text-[10px] text-slate-500">
                      Apaga permanentemente todas as fichas de contacto recebidas do painel do cidadão.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm("Atenção vital: Deseja expurgar todas as fichas de contacto e limas de triagem permanentemente do histórico do backoffice? Esta acção é irreversível.")) {
                          localStorage.removeItem("angola_legal_admin_leads");
                          setLeads([]);
                          setSelectedLead(null);
                          alert("Base de dados de leads limpa com sucesso.");
                        }
                      }}
                      className="py-1.5 px-3 bg-red-900/20 hover:bg-red-900/50 border border-red-900/30 text-red-200 rounded text-xs font-bold uppercase transition"
                    >
                      Expurgar Todos os Leads
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
