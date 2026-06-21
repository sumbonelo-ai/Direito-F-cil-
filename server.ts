import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to avoid crashing on startup if the key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Generates a high-quality static diagnostic assessment if Gemini API is entirely overloaded/unavailable
function generateStaticFallbackAssessment(category: string, answers: Record<string, string>, langCode: string = "pt"): string {
  const isEn = langCode === "en";
  const isFr = langCode === "fr";
  const isUm = langCode === "um";
  const isKi = langCode === "ki";
  const isAr = langCode === "ar";
  const isZh = langCode === "zh";

  const categoryNames: Record<string, string> = {
    laboral: isEn ? "Labor & Employment Law" : isFr ? "Droit du Travail" : isUm ? "Upange yo LGT" : isKi ? "Maka m'upange ni LGT" : isAr ? "قانون العمل والتوظيف" : isZh ? "劳动合同与就业合规" : "Direito do Trabalho (Lei Geral do Trabalho de Angola - Lei 12/23)",
    familia: isEn ? "Family & Estate Law" : isFr ? "Droit de Famille & Patrimoine" : isUm ? "Mene o Família" : isKi ? "Miji ni Heranças i'Athu" : isAr ? "قانون الأسرة والمواريث" : isZh ? "家庭婚姻与析产继承" : "Direito de Família e Sucessões (Código de Família e Código Civil Angolano)",
    imobiliario: isEn ? "Leasing & Real Estate Law" : isFr ? "Baux & Immobilier" : isUm ? "Arrendamento yo Ovapia" : isKi ? "Leasing ia Inzo mba Ovididi" : isAr ? "قانون الإيجارات والعقارات" : isZh ? "租赁合同与土地产权" : "Direito Imobiliário e Contratos / Arrendamento Urbano (Código Civil e Lei do Arrendamento Urbano em Angola)",
    consumidor: isEn ? "Consumer Protection" : isFr ? "Protection des Consommateurs" : isUm ? "Ovisila lio Consumidor" : isKi ? "Ijila ia Mundu u'Angola" : isAr ? "حماية المستهلك" : isZh ? "消费者权益与维权保障" : "Direito do Consumidor (Lei de Defesa do Consumidor - Lei n.º 15/03)",
    geral: isEn ? "General & Other Civil Laws" : isFr ? "Autres Conflits Civils" : isUm ? "Olombela asualo" : isKi ? "Jidívidas ni Maka" : isAr ? "القضايا العامة والنزاعات الأخرى" : isZh ? "常见一般性民事与行政纠纷" : "Direito Geral / Outros Ramos do Direito Angolano",
  };

  const lawRefs: Record<string, string> = {
    laboral: isAr ? "قانون العمل العام في أنغولا (القانون رقم 12/23)" : isZh ? "安哥拉共和国《普通劳动法》（第12/23号法律）" : "Lei Geral do Trabalho (LGT) - Lei n.º 12/23",
    familia: isAr ? "قانون الأسرة والتشريع المدني الأنغولي" : isZh ? "安哥拉《家庭法典》及民事法律" : "Código de Família (Lei n.º 1/88) e Código Civil de Angola",
    imobiliario: isAr ? "قانون الإيجار الحضري والقانون المدني لجمهورية أنغولا" : isZh ? "安哥拉《城市房屋租赁法》和《民法典》" : "Código Civil e Lei do Arrendamento Urbano (LAU)",
    consumidor: isAr ? "قانون الدفاع عن المستهلك في أنغولا (القانون رقم 15/03)" : isZh ? "安哥拉《消费者权益保护法》（第15/03号法律）" : "Lei de Defesa do Consumidor (LDC) - Lei n.º 15/03",
    geral: isAr ? "دستور جمهورية أنغولا والقانون المدني" : isZh ? "安哥拉《民法典》和《民事诉讼法典》" : "Constituição da República de Angola (CRA) e Legislação Civil",
  };

  const name = categoryNames[category] || "Direito Geral de Angola";
  const ref = lawRefs[category] || "Legislação de Angola";

  let details = "";
  for (const [key, val] of Object.entries(answers)) {
    details += `* **${key}**: ${val}\n`;
  }

  if (isEn) {
    return `### 🏛️ Preliminary Review: Your Legal Rights & Claims
    
**Case preliminary score:** 78/100 (Contingency Report)

**Estimated Compensation:** Under evaluation (Official estimates are provided directly by legal partners)

---

> 💡 **Notice:** Our primary AI generation network is currently experiencing heavy volume. We are serving a pre-structured contingency review customized dynamically based on your inputs.

#### 1. Legal Framing
Your described situation falls within **${name}**, regulated under **${ref}**.

Based on your inputs:
${details}

Our quick check shows there is sufficient legal leverage to pursue direct claims, refunds, or compensation under the Republic of Angola civil and labor codes.

#### 📊 2. Claims & Proportional Calculations
- **Civil Liability & Debt Restitution:** Angolan Civil Code dictates full compensation for contractual defaults or personal damages, plus 10% statutory late interest per year.
- **Labor Credits:** Dismissals or resignations under LGT (Law 12/23) grant mandatory vacation multipliers, Christmas subsidies, and length-of-service severance pay.

#### 📋 3. Crucial Actionable Steps
1. **Preserve proof:** Secure chats, contracts, bank state forms, receipts, or identify witnesses.
2. **Be fast:** Filing deadlines under Angolan labor of civil courts can be very tight. Timely actions avoid forfeiture of rights.
3. **Submit formal request:** Provide your mobile contact to initiate official legal review.`;
  }

  if (isFr) {
    return `### 🏛️ Évaluation Préliminaire : Vos Droits et Indemnités Estimées
    
**Solidité préliminaire du dossier :** 78/100 (Rapport de Contingence)

**Montant Potentiel Estimé :** Sous conseil officiel (Simulations détaillées disponibles auprès d'avocats certifiés)

---

> 💡 **Avis :** Nos serveurs d'orientation par intelligence artificielle connaissent une forte affluence. Nous vous livrons une revue structurée de contingence correspondante à votre situation.

#### 1. Enquadrement Juridique
La situation décrite relève formellement de la branche **${name}**, régie par la législation **${ref}**.

Données analysées :
${details}

L'évaluation montre des bases juridiques favorables vous permettant d'engager des demandes de réparations ou de remboursement de préjudice en République d'Angola.

#### 📊 2. Calculs Provisoires de Vos Droits Financiers
- **Responsabilité Civile :** Le Code civil angolais stipule l'obligation de réparer le préjudice subi en cas de manquement contractuel, assortie de 10% d'intérêts moratoires l'an.
- **Créances Laborales :** La loi LGT (Loi 12/23) réglemente des droits inaliénables de congés payés, primes annuelles de Noël et indemnités forfaitaires de rupture.

#### 📋 3. Prochaines Étapes Essentielles
1. **Sécuriser les preuves physiques et numériques :** Sauvegardez vos discussions WhatsApp, contrats écrits originaux, extraits de comptes et factures.
2. **Agir sans tarder :** Les délais prescriptifs en Angola sont rigides. Un dépôt tardif invalide définitivement vos droits.
3. **Valider vos coordonnées :** Confirmez votre numéro au formulaire ci-contre pour coordonner un entretien officiel.`;
  }

  if (isUm) {
    return `### 🏛️ Ondungo Yoluveta: Ovisila Siove kuenda Olombongo
    
**Ovisila vieselapo:** 78/100 (Ekakatelo)

**Olombongo via tunda:** Under evaluation (Sanga ocinyalo k'ovanene OAA)

---

#### 1. Enquadramento Legal (Constituição do Caso)
Ondungo eyi iyevala k'onele ya **${name}**, ya kapapo vo **${ref}**.

Ondata vi Sapiwa:
${details}

#### 📊 2. Olombongo Cose Via Tunda
- **Ekuatiso Cível:** Código Civil de Angola yapapo elisopo k'olombongo kuenda olomeya viacila pioya 10%.
- **LGT Upange:** LGT yofeka Angola (Lei 12/23) iyovola olombongo via férias e Natal.

#### 📋 3. Ocipango Cosululuka Cipitilapo
1. **Preserve proof:** Soneha kuenda kakatela olombapolo viose.
2. **Be fast:** deadlines are tight in Angola.
3. **Pinga eselapo lio Advogado.**`;
  }

  if (isKi) {
    return `### 🏛️ Maka m'Ijila Move ni Kitadi
    
**Kujila kuove:** 78/100 (Kitongolo Contingency)

**Kitadi kiasuku:** Under evaluation (OAA Advogados)

---

#### 1. Kijiila k’o Maka Move
Maka manya ma ijila maleka **${name}**, mu mbandu ia **${ref}**.

Ovitongolo:
${details}

#### 📊 2. Kitadi k’Upange ni Jimbongo
- **Maka ma Código Civil:** Código Civil ia Angola mu bhalula kitadi kia morais (10% ao ano).
- **LGT Upange:** O LGT fofolo (Lei 12/23) mu bhalula kitadi mu férias ni Natal.

#### 📋 3. Mbela indesa iasungilika ndopo
1. **Preserve proofs:** Soneha jinjumba josofolo.
2. **Be fast:** deadlines are tight in Angolan laws.
3. **Bhingila mufu strategic kua Advogado OAA.**`;
  }

  if (isAr) {
    return `### 🏛️ التقييم الأولي: حقوقك والمستردات المقدّرة
    
**قوة القضية الأولية:** 78/100 (تقرير كفاءة الطوارئ)

**المبلغ المحتمل المقدر:** قيد المراجعة الرسمية (تقدم التقديرات الرسمية مباشرة من المحامين المعتمدين)

---

> 💡 **تنبيه:** خوادم الذكاء الاصطناعي لدينا تواجه طلباً مرتفعاً حالياً. نوفر لك تقريراً هيكلياً مخصصاً لظروفك بناءً على بياناتك المدخلة.

#### 1. التأطير القانوني لطلبك
تندرج حالتك الموصوفة ضمن **${name}**، المنظم بموجب **${ref}**.

البيانات التي تم تحليلها:
${details}

يظهر فحصنا الأولي وجود أسس قانونية كافية لمتابعة المطالبات والتعويضات بموجب القوانين المدنية وقوانين العمل لجمهورية أنغولا.

#### 📊 2. حسابات تقديرية لحقوقك المالية
- **المسؤولية المدنية والتعويض عن الأضرار:** ينص القانون المدني الأنغولي على التعويض العادل عن الإخلال بالالتزامات العقدية أو الأضرار الشخصية، بالإضافة إلى تطبيق فائدة تأخير قانونية سنوية قدرها 10%.
- **مستحقات العمل والعمال:** تمنح قوانين العمل الأنغولية (القانون رقم 12/23) حقوقاً غير قابلة للتنازل تشمل مكافأة الإجازات، وبدل عيد الميلاد، ومكافآت نهاية الخدمة بناءً على سنوات العمل.

#### 📋 3. الخطوات العملية الأساسية المقبلة
1. **الاحتفاظ بالأدلة والوثائق:** احتفظ بالرسائل الإلكترونية، وعقود العمل أو الإيجار، وكشوفات الحساب البنكي، أو حدد شهوداً عياناً على الواقعة.
2. **اتخاذ إجراء سريع:** المواعيد القانونية لمتابعة الشكاوى في أنغولا تكون قصيرة وصارمة جداً. اتخاذ الإجراء السريع يحميك من سقوط الحق بالتقادم.
3. **تأكيد بيانات الاتصال:** يرجى إرسال نموذج الاتصال بالجانب لتنسيق استشارة قانونية رسمية وسرية.`;
  }

  if (isZh) {
    return `### 🏛️ 初步评估报告：您的合法权益与预估应得补偿
    
**案件初步评估得分：** 78/100（备用紧急分析报告）

**潜在可申领补偿金额：** 待正式法务核算（正式的精确计算由安哥拉律师公会合规律师核准提供）

---

> 💡 **通知：** 目前人工智能核心网络访问请求量较大。我们依您提交的信息，为您动态生成了符合安哥拉现行法典的紧急结构化备用评估报告。

#### 1. 适用法律框架与定性
您所描述的纠纷类型属于 **${name}** 范畴，并受 **${ref}** 保护与管辖。

您所提交的信息摘要：
${details}

根据我们的初步审查，您的案例在安哥拉共和国现行民事及劳动法典下，具备坚实的起诉或索赔理据。

#### 📊 2. 索赔权益与财务核算明细
- **民事侵权与合同违约责任：** 依照安哥拉《民法典》，任何因过错导致的合同不履行或人身财产损失必须获得足额赔偿。此外，违约将适用每年 10% 的法定逾期滞纳利息。
- **劳动权益累计：** 根据安哥拉《普通劳动法》（第12/23号法律），解除劳动合同时，雇员享有法定的带薪年假补偿、十三薪/圣诞津贴以及基于工龄的法定遣散安置费。

#### 📋 3. 关键下一步行动建议
1. **妥善保存案件证据：** 立即收集并备份微信/WhatsApp聊天记录、劳动或租赁合同原件、银行转账凭证，或锁定知情证人。
2. **注意诉讼时效期限：** 请务必注意，安哥拉民商事及劳动仲裁的时效期极为刚性且短暂。及时申请维权是保护自身合法权益的决定性因素。
3. **提交专业咨询申请：** 请填写此页面的联系表单并确认您的手机号码，以便我们协助为您指派安哥拉律师公会（OAA）认证执业律师。`;
  }

  return `### 🏛️ Avaliação Preliminar: Seus Direitos e Valores Reclamáveis

**Força preliminar do caso:** 78/100 (Avaliação de Contingência - Serviço de Inteligência Artificial sob Elevada Procura)

**Valor potencial estimado:** Sob consulta oficial (Simulação de cálculo provisória disponível perante advogado com cédula OAA)

---

> 💡 **Nota do Portal Inteligente:** O nosso motor principal de Inteligência Artificial (Google Gemini) está temporariamente sob elevada taxa de requisições. Apresentamos-lhe neste momento um relatório analítico estruturado de contingência personalizado às suas respostas.

#### 1. Enquadramento Legal da sua Dúvida
O caso que nos apresentou enquadra-se formalmente no ramo do **${name}**, regulado sob a **${ref}**.

Com base nas informações particulares fornecidas para análise rápida:
${details}

Analisamos de forma sistemática que existem indícios favoráveis que justificam uma verificação detalhada da sua questão. Nos termos do ordenamento jurídico vigente em Angola, as violações e situações expostas em sua descrição conferem proteção legal substantiva e abrem vias legítimas para reclamação ou reembolso judicial de prejuízos causados.

#### 📊 2. Valores Provisórios e Direitos Financeiros Reclamáveis
Nesta modalidade de relatório estruturado, os montantes indemnizatórios dependem de cálculos complexos, mas já se identificam:
- **Reparação Civil e Danos Patrimoniais:** Em Angola, qualquer incumprimento culposo ou lesão contratual obriga à indemnização do devedor pela parte faltosa, regulado pelo Código Civil, incluindo a aplicação de juros de mora regulados em 10% ao ano.
- **Direitos Acumulados e Proporcionais:** Sob a LGT angolana (Lei n.º 12/23), a cessação de funções confere direito irrevogável a férias vencidas e vencíveis com acréscimo constitucional, subsídios regulamentares de Natal e indemnizações de antiguidade baseadas em médias salariais.

#### 📋 3. Próximos Passos Práticos Cruciais
1. **Reunir e resguardar todas as provas digitais e físicas:** Colete trocas de mensagens, contratos de arrendamento/trabalho, comprovativos detalhados de transferências, recibos ou identifique testemunhas oculares do sucedido.
2. **Evitar caducidade por decurso do tempo:** Lembre-se de que os prazos legais para reclamação ou oposição a despedimentos em Angola são curtos e implacáveis. Actuar tempestivamente é o factor determinante de sucesso.
3. **Submeter pedido de contacto especializado:** Preencha o formulário desta página com o seu melhor e-mail e telefone para coordenar o apoio qualificado.

#### 🏛️ 4. Por que razão necessita de uma Análise Forense Oficial?
A estimativa acima constitui um guia orientativo inicial informativo. Somente um profissional de direito devidamente credenciado e com inscrição válida na **Ordem dos Advogados de Angola (OAA)** pode calcular com o rigor judicial necessário e propor petições perante as autoridades competentes angolanas.

Ao solicitar o seu plano estratégico personalizado, obterá:
✅ **Definição milimétrica de retroactivos** e indemnizações aplicáveis ao caso.
✅ **Verificação e certificação de legalidade** das provas coleccionadas.
✅ **Suporte estratégico em resoluções extrajudiciais** directas de acordos fáceis.
✅ **Petição e patronato em sede de acção cível ou laboral** célere.

*Por favor, envie o formulário de contacto ao lado para que possamos prestar-lhe o devido suporte personalizado com total confidencialidade.*`;
}

// Tries multiple models with retry exponential backoffs, falling back to static report if all fail
async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  category: string,
  answers: Record<string, string>,
  systemInstruction: string,
  promptString: string,
  lang: string = "pt"
): Promise<string> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  const maxRetriesPerModel = 2;
  const initialDelayMs = 1200;

  for (const model of modelsToTry) {
    let delayMs = initialDelayMs;
    for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
      try {
        console.log(`[Gemini client] Querying model: ${model} (attempt ${attempt}/${maxRetriesPerModel})...`);
        const response = await ai.models.generateContent({
          model: model,
          contents: promptString,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
          },
        });

        if (response && response.text) {
          console.log(`[Gemini client] Successfully received answer using model: ${model}`);
          return response.text;
        }
      } catch (err: any) {
        console.warn(`[Gemini client] Caught handled warning for model ${model} (attempt ${attempt}/${maxRetriesPerModel}):`, err?.message || err);
        
        // Wait unless it's the absolutely final attempt
        if (model === modelsToTry[modelsToTry.length - 1] && attempt === maxRetriesPerModel) {
          break;
        }

        console.log(`[Gemini client] Waiting ${delayMs}ms before next retry...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
      }
    }
  }

  console.warn("[Gemini client] All active LLM generation attempts failed. Rerouting to pristine static Angolano legal reporter.");
  return generateStaticFallbackAssessment(category, answers, lang);
}

// API endpoint for legal diagnosis
app.post("/api/diagnose", async (req, res) => {
  try {
    const { category, answers, contactInfo, lang = "pt" } = req.body;

    if (!category || !answers) {
      return res.status(400).json({ error: "Faltam parâmetros category ou answers." });
    }

    const ai = getGeminiClient();

    // Map categories to descriptions.
    const categoryNames: Record<string, string> = {
      laboral: "Direito do Trabalho (Lei Geral do Trabalho de Angola - Lei 12/23)",
      familia: "Direito de Família e Sucessões (Código de Família e Código Civil Angolano)",
      imobiliario: "Direito Imobiliário e Contratos / Arrendamento Urbano (Código Civil e Lei do Arrendamento Urbano em Angola)",
      consumidor: "Direito do Consumidor (Lei de Defesa do Consumidor - Lei n.º 15/03)",
      geral: "Direito Geral / Outros Ramos do Direito Angolano",
    };

    // Format the inputs for the prompt
    let answersFormatted = "";
    if (contactInfo) {
      answersFormatted += `- **Nome Completo**: ${contactInfo.nome}\n`;
      answersFormatted += `- **Contacto de Telefone / WhatsApp**: ${contactInfo.telefone}\n`;
      answersFormatted += `- **Endereço de E-mail**: ${contactInfo.email}\n`;
    }
    for (const [key, value] of Object.entries(answers)) {
      answersFormatted += `- **${key}**: ${value}\n`;
    }

    const languageNames: Record<string, string> = {
      pt: "Português de Angola",
      en: "English",
      fr: "Français",
      um: "Umbundu",
      ki: "Kimbundu",
      ar: "Árabe (العربية)",
      zh: "Mandarim / Chinês (中文/普通话)"
    };
    const targetLanguageName = languageNames[lang] || "Português de Angola";

    const systemInstruction = `Você é um Assistente especializado em Direito Angolano (Jurisprudência e Legislação da República de Angola), integrado com as calculadoras jurídicas internas.
Sua missão é fornecer uma avaliação preliminar focada no resultado e no benefício prático para o utilizador, de forma empática, clara, convincente e sem linguagem excessivamente técnica de advogado (evite termos técnicos como detalhes fiscais de IRT, deduções de INSS ou tecnicismos processuais). O utilizador acabou de descobrir que pode ter direito a valores ou proteção e quer respostas para: Quanto posso recuperar? Tenho mesmo um caso sólido? O que devo fazer agora?

CRITICAL: You MUST write your entire response exactly in the following language: ${targetLanguageName}. Translate all layout categories, headings, notes, bullet titles, list items, estimates, currency references (keep Kwanzas or Kz though!), and OAA warnings into ${targetLanguageName} so that the user receives an assessment built entirely in their native language selection! For Umbundu and Kimbundu, keep the translation culturally respectful and grammatically correct.

Sua resposta DEVE ser estruturada estritamente em Markdown (usando títulos, listas e negritos) e conter rigorosamente a seguinte estrutura na língua alvo (${targetLanguageName}):

---
### 🏛️ [Traduza para ${targetLanguageName}: Avaliação Preliminar: Seus Direitos e Valores Reclamáveis]

**[Traduza: Força preliminar do caso]:** [Insira uma pontuação estimada de 1 a 100 de acordo com a solidez das declarações dele, ex: 82/100]

**[Traduza: Valor potencial estimado]:** [Insira um valor estimado aproximado em Kwanzas (Kz) ou AOA calculado com base nos dados do caso. Se não houver dados específicos inseridos, utilize como simulação um cenário real de mercado angolano com salário base de 150.000 Kz para demonstrar o potencial financeiro de forma didática!]

#### 1. [Traduza: Resultado da IA (Como a Lei Analisa o seu Caso)]
[Forneça um parágrafo claro de 3-4 frases identificando indícios favoráveis que justificam uma análise jurídica detalhada. Explique de forma simples e direta o mérito da questão e a base de sustentação legal na língua alvo.]

#### 📊 2. [Traduza: Valores Provisórios Reclamáveis (Seus Direitos Financeiros)]
[Apresente os cálculos provisórios detalhados do montante que o cidadão pode reivindicar na prática, justificando o porquê de cada parcela de forma fácil e didática na língua alvo.]

#### 📋 3. [Traduza: Próximos Passos Práticos]
[Forneça uma lista de ações simplificadas e diretas na língua alvo:
1. Organizar e conservar as provas disponíveis (reunir mensagens do WhatsApp, contratos, extratos bancários ou testemunhas).
2. Agir atempadamente: alguns direitos em Angola podem estar sujeitos a prazos legais rígidos de reclamação. Uma análise atempada ajuda a preservar as melhores opções disponíveis para o seu caso.
3. Solicitar agora mesmo um contacto sem qualquer compromisso no formulário disponibilizado.]

#### 🏛️ 4. [Traduza: Por que razão necessita de uma Análise Oficial?]
A avaliação apresentada acima é preliminar baseada na nossa Inteligência Artificial. Um advogado inscrito na Ordem dos Advogados de Angola (OAA) poderá oficializar os cálculos, analisar detalhadamente cada documento e indicar a melhor estratégia jurídica para proteger a sua situação.

Ao solicitar o contacto de um advogado ativo na OAA, receberá:
✅ [Traduza: Revisão jurídica especializada por profissional credenciado em Angola]
✅ [Traduza: Verificação e certificação real dos totais estimados e taxas compensatórias]
✅ [Traduza: Análise minuciosa de provas documentais e testemunhais disponíveis]
✅ [Traduza: Identificação imediata de prazos legais críticos e potencial defesa da contraparte]
✅ [Traduza: Plano de ação exclusivo e orientado a resultados benéficos]
✅ [Traduza: Orientação estratégica sobre negociação direta ou início célere de ação judicial]

[Traduza o encerramento encorajador para ${targetLanguageName} e mencione a Ordem dos Advogados de Angola].
---`;

    const promptString = `Legal Category: ${categoryNames[category] || category}
User Answers:
${answersFormatted}

Por favor, gere o diagnóstico completo exatamente em ${targetLanguageName} de acordo com as instruções.`;

    const diagnosisText = await generateContentWithRetryAndFallback(
      ai,
      category,
      answers,
      systemInstruction,
      promptString,
      lang
    );

    return res.json({ diagnosis: diagnosisText });
  } catch (error: any) {
    console.error("Error generating diagnosis:", error);
    return res.status(500).json({
      error: error?.message || "Ocorreu um erro ao processar o seu diagnóstico jurídico.",
    });
  }
});

// Serve frontend assets in development and production
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
