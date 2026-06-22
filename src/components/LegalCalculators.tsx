import React, { useState } from "react";
import {
  Scale,
  Calculator,
  Briefcase,
  Heart,
  Coins,
  Clock,
  Printer,
  ChevronRight,
  Info,
  AlertCircle,
  FileText,
  Percent,
  Plus,
  Trash2,
  CalendarCheck,
  Building,
  RotateCcw
} from "lucide-react";

type CalculatorType = "rescisao" | "pensao" | "juros" | "atraso";

interface LegalCalculatorsProps {
  userInfo: { nome: string; telefone: string; email?: string } | null;
  onRequireContact: (callback: () => void) => void;
  langCode?: string;
}

const CALC_TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    title: "Painel de Calculadoras Virtuais Jurídicas",
    subtitle: "Estime montantes indemnizatórios, pensões e taxas sob o regime da Lei Angolana",
    print_btn: "Imprimir Simulação",
    tab_rescisao: "Acerto de Rescisão (LGT)",
    tab_pensao: "Pensão Alimentícia",
    tab_juros: "Juros e Dívidas Cíveis",
    tab_atraso: "Indemnização Atraso Salarial",
    
    // Rescisão LGT
    rescisao_title: "Simulador de Indemnização Geral de Trabalho (Lei n.º 12/23)",
    rescisao_desc: "Estimativa geral para contratos que cessam por iniciativa da entidade laboral (despedimento sem justa causa) ou por despedimento coletivo.",
    salario_base: "Salário Base Mensal (AOA)",
    anos_servico: "Anos Completos de Serviço",
    meses_corrente: "Meses Trabalhados no Ano Corrente",
    dimensao_empresa: "Dimensão da Empresa (Classificação)",
    grande_empresa: "Grande Empresa (100% coeficiente)",
    media_empresa: "Média Empresa (70% coeficiente LGT)",
    pequena_empresa: "Micro ou Pequena Empresa (50% coeficiente)",
    salarios_atraso: "Salários em atraso a receber? (AOA)",
    ferias_gozadas: "Já gozou as férias deste ano civil?",
    ferias_nao: "Não, irei receber o proporcional completo",
    ferias_parcial: "Sim, parcialmente gozadas",
    ferias_total: "Sim, já beneficiou das férias regulamentares",
    btn_calcular_rescisao: "Calcular Proporcionais e Indemnizações",
    recibo_titulo: "Simulação de Rescisão (Recibo AOA)",
    indem_antiguidade: "Indemnização Base Antiguidade",
    prop_ferias: "Proporcional Férias",
    prop_natal: "Proporcional Natal",
    atraso_diarias: "Salários e Diárias em Atraso",
    estimativa_bruta: "Estimativa Bruta Total",
    nota_rescisao: "*Nota: Esta simulação não contempla retenções fiscais obrigatórias de Segurança Social (INSS - 3% trabalhador, 8% entidade) e Imposto sobre o Rendimento do Trabalho (IRT) que incidem sobre parcelas regulamentares.",
    aviso_inserir_dados: "Indique os dados salariais para emitir a folha de indemnização provisória.",

    // Pensão Alimentícia
    pensao_title: "Simulador de Cálculo Orientador de Pensão de Alimentos (Código de Família)",
    pensao_desc: "Em Angola, o Código de Família não impõe um percentual rígido fixo na lei, mas os tribunais fundamentam as pensões na capacidade de quem presta e na necessidade do alimentado, habitualmente limitando-se a um intervalo entre 15% e 45% do rendimento mensal líquido.",
    rendimento_provedor: "Rendimento Líquido Mensal do Provedor (AOA)",
    num_filhos: "Número de Descendentes menores alimentados",
    filho_1: "1 filho menor (aprox. 15% a 20%)",
    filho_2: "2 filhos menores (aprox. 25% a 30%)",
    filho_3: "3 ou mais filhos menores (aprox. 35% mais)",
    necessidade_especial: "Necessidades Médicas / Escolares Especiais?",
    necessidade_sim: "Sim, requer acréscimo de 5%",
    btn_calcular_pensao: "Estimar Intervalo Coercivo de Pensão",
    parecer_titulo: "Parecer de Estimativa",
    taxa_estimada: "Taxa Estimativa de Rendimento:",
    valor_ref_medio: "Valor de Referência Médio:",
    intervalo_judicial: "Intervalo Judicial Esperado:",
    valor_a: "a",
    nota_pensao: "Em Angola, as decisões sobre prestação de alimentos podem ser determinadas por acordo amigável na Procuradoria de Família ou impostas coercivamente por via de Sentença Judicial.",
    aviso_pensao: "Indique as condições parentais para gerar a estimativa regulamentar.",

    // Juros
    juros_title: "Simulador de Juros Bancários de Mora e Civis (Código Civil Angolano)",
    juros_desc: "Utilize este utilitário rápido para apurar as taxas de mora legais aplicadas a incumprimentos contratuais ou acordos de renegociação de capital geral.",
    principal: "Capital da Dívida / Valor Principal (AOA)",
    taxa_anual: "Taxa de Juro Anual (%)",
    padrao_civil: "Nota: 10% é o padrão civil em vigor.",
    atraso_meses: "Período de Atraso em Meses",
    metodo_incidencia: "Método de Incidência",
    juro_simples: "Juro Simples (Tradicional Civil)",
    juro_composto: "Juros Compostos (Contratos Bancários)",
    btn_calcular_juros: "Calcular Taxas de Mora",
    calculo_capitalizacao: "Cálculo de Capitalização",
    capital_base: "Capital de Base original",
    juros_mora: "Juros de Mora Acumulados",
    total_amortizar: "Total a Amortizar",
    nota_juros: "*Nota: A acumulação do passivo é indicadora e não substitui liquidações formais do Tribunal do Comércio ou repartições de Finanças em Angola.",
    aviso_juros: "Preencha o montante em débito e o tempo de incumprimento.",

    // Atraso Salarial
    atraso_title: "Simulador de Multa por Atraso Salarial (LGT Lei n.º 12/23, Artigo 137.º)",
    atraso_desc: "Por força da Lei Geral do Trabalho de Angola, o salário deve ser pago até ao último dia do período a que respeita. Caso o pagamento se atrase por culpa da empresa, e esse atraso ultrapasse os 15 dias, o trabalhador ganha o direito a um acréscimo específico punitivo: 10% de indemnização ao completar 15 dias + 2% adicionais por cada dia subsequente de falta de pagamento.",
    salario_liquido: "Seu Salário Líquido Mensal (AOA)",
    dias_atraso: "Dias Totais de Atraso Acumulados",
    dias_vencimento: "Dias desde a data regular de vencimento.",
    btn_calcular_atraso: "Calcular Indemnização Punível",
    sentenca_indemnizacao: "Sentença de Indemnização (Cálculo LGT)",
    salario_regular: "Vencimento do Salário Regular",
    taxa_atraso: "Taxa Aplicada por Atraso",
    indem_devida: "Acordo de Indemnização devido",
    total_receber: "Total devido a Receber",
    atraso_grave_alerta: "Trata-se de um atraso grave (> 15 dias). O trabalhador está legalmente habilitado a reclamar este acréscimo junto da IGT (Inspeção Geral de Trabalho) ou tribunal de comarca.",
    atraso_leve_alerta: "Para atrasos inferiores a 15 dias, a lei LGT de Angola não impõe a taxa pesada de 10%+2%, aplicando-se apenas direito a juros genéricos de mora simples ou apelo sindical.",
    aviso_atraso: "Forneça o salário mensal e a duração do atraso da entidade laboral.",

    // Footer CTA
    cta_title: "Validação Forense Obrigatória pelo Advogado OAA",
    cta_desc: "As calculadoras facultam uma taxa bruta exemplar. Para acionar judicialmente a empresa patronal, reclamar a pensão ou mover uma execução de dívida, necessita de mandato de advogado para evitar coimas ou erros processuais graves que anulam o direito de reaver estes valores.",
    cta_btn: "Diagnosticar Áreas & Agendar Consulta OAA",
    fontes_titulo: "Fontes Legais Directas sobre as Simulações em Angola:",
    fontes_trabalho: "Direito do Trabalho: De acordo com a nova Assembleia Nacional, a Lei Geral do Trabalho de Angola n.º 12/23, de 29 de Agosto, veio redefinir os regimes de rescisão e compensação com vista ao equilíbrio laboral.",
    fontes_pensao: "Pensão Alimentícia: Baseada no Artigo 146.º e seguintes do Código de Família de Angola, consagrando o direito da criança a sustento digno proporcional.",
    fontes_civil: "Código Civil: Amparado nos Artigos 805.º e seguintes do Código Civil Angolano no que toca ao decurso dos prazos de obrigações pecuniárias cíveis.",
  },
  en: {
    title: "Virtual Legal Calculators Panel",
    subtitle: "Estimate compensation payouts, alimony, and late interest, governed under Angolan legislation",
    print_btn: "Print Simulation",
    tab_rescisao: "Severance Settlement (LGT)",
    tab_pensao: "Child Alimony",
    tab_juros: "Civil Interest & Debts",
    tab_atraso: "Wages Delay Compensation",
    
    // Rescisão LGT
    rescisao_title: "General Employment Severance Simulator (Law n.º 12/23)",
    rescisao_desc: "General estimate for contracts ending by employer's initiative (unfair dismissal) or collective redundancy.",
    salario_base: "Monthly Base Salary (AOA)",
    anos_servico: "Complete Years of Service",
    meses_corrente: "Months Worked in Current Year",
    dimensao_empresa: "Company Size (Classification)",
    grande_empresa: "Large Company (100% coefficient)",
    media_empresa: "Medium Company (70% LGT coefficient)",
    pequena_empresa: "Micro or Small Company (50% coefficient)",
    salarios_atraso: "Outstanding unpaid salary? (AOA)",
    ferias_gozadas: "Have you taken your holidays in the current civil year?",
    ferias_nao: "No, I am entitled to receive full proportion",
    ferias_parcial: "Yes, partially taken",
    ferias_total: "Yes, already fully benefited from statutory holidays",
    btn_calcular_rescisao: "Calculate Proportions and Severance",
    recibo_titulo: "Dismissal Simulation Receipt (AOA)",
    indem_antiguidade: "Base Severance Compensation",
    prop_ferias: "Proportional Holiday Pay",
    prop_natal: "Proportional Christmas Pay",
    atraso_diarias: "Backpaid Wages & Allowances",
    estimativa_bruta: "Total Gross Estimate",
    nota_rescisao: "*Note: This simulation does not include mandatory social security deductions (INSS - 3% employee, 8% company) and Employment Income Tax (IRT) applicable to statutory items.",
    aviso_inserir_dados: "Provide salary parameters to issue the provisional compensations report.",

    // Pensão Alimentícia
    pensao_title: "Child Support Guideline Alimony Simulator (Family Code)",
    pensao_desc: "In Angola, the Family Code does not impose rigid percentages, but judges calculate alimony on the provider's capability and the needs of the minor, traditionally inside a 15% to 45% net income range.",
    rendimento_provedor: "Provider's Monthly Net Income (AOA)",
    num_filhos: "Number of minor dependents supported",
    filho_1: "1 minor child (approx. 15% to 20%)",
    filho_2: "2 minor children (approx. 25% to 30%)",
    filho_3: "3 or more children (approx. 35% or more)",
    necessidade_especial: "Special Medical / Educational Needs?",
    necessidade_sim: "Yes, adding extra 5%",
    btn_calcular_pensao: "Estimate Judicial Alimony Range",
    parecer_titulo: "Regulatory Alimony Report",
    taxa_estimada: "Estimated Income Leverage:",
    valor_ref_medio: "Middle Reference Value:",
    intervalo_judicial: "Expected Judicial Range:",
    valor_a: "to",
    nota_pensao: "In Angola, alimony orders can be drafted as amicable agreements under the Family Prosecutor or imposed by Court Sentence.",
    aviso_pensao: "Select parental details to estimate the standard benchmark.",

    // Juros
    juros_title: "Civil and Bank Late Interest Simulator (Angola Civil Code)",
    juros_desc: "Use this quick utility to determine statutory late interest applied to default contracts or debt restructuring plans.",
    principal: "Capital Principal Debt amount (AOA)",
    taxa_anual: "Annual Interest Rate (%)",
    padrao_civil: "Note: 10% is the standard in-force civil rate.",
    atraso_meses: "Delay Period in Months",
    metodo_incidencia: "Interests Calculation Method",
    juro_simples: "Simple Interest (Civil Tradition)",
    juro_composto: "Compound Interest (Commercial Banks)",
    btn_calcular_juros: "Calculate Delayed Interests",
    calculo_capitalizacao: "Capitalization Layout",
    capital_base: "Base Original Principal",
    juros_mora: "Accrued Late Interests",
    total_amortizar: "Total Outstanding Due",
    nota_juros: "*Note: Accrued calculations act as indicators and do not replace legal liquidations by Commercial Courts or Finance authorities in Angola.",
    aviso_juros: "State the outstanding debt amount and delay months.",

    // Atraso Salarial
    atraso_title: "Wages Delay Compensation Penalty Simulator (LGT Art. 137.º)",
    atraso_desc: "Under the Labor Law of Angola, salaries must be paid timely. If the employer defaults and the delay overflows 15 days, the worker gains a heavy statutory premium: 10% penalty on the 15th day + 2% additional penalty for each subsequent calendar/business day.",
    salario_liquido: "Your Monthly Net Salary (AOA)",
    dias_atraso: "Total Delayed Days",
    dias_vencimento: "Days elapsed since the regular payday.",
    btn_calcular_atraso: "Calculate Compensation Penalty",
    sentenca_indemnizacao: "Compensation Verdict (LGT Calculation)",
    salario_regular: "Regular Base Due",
    taxa_atraso: "Applied Penalty Rate",
    indem_devida: "Due Compensation Penalty",
    total_receber: "Total Net Outstanding Due",
    atraso_grave_alerta: "This represents a severe delay (> 15 days). The employee is fully entitled to request this premium legally via IGT (Labor Inspection) or civil courts.",
    atraso_leve_alerta: "For delays under 15 days, the LGT of Angola does not trigger the severe 10%+2% penalty rate, only granting standard moratory interest or union assistance.",
    aviso_atraso: "Provide the base salary and elapsed delay duration.",

    // Footer CTA
    cta_title: "Mandatory Forensic Validation by an OAA Lawyer",
    cta_desc: "These calculators render gross indications. To sue an employer, demand alimony or execute debts, professional counsel representing you via the Angolan Bar Association (OAA) is legally required.",
    cta_btn: "Perform Case Assessment & Schedule OAA Counsel",
    fontes_titulo: "Direct Legal Sources on Angola Simulations:",
    fontes_trabalho: "Employment Law: In accordance with the National Assembly, the new General Labor Law n.º 12/23 of August 29 reshaped dismissal and severance rules.",
    fontes_pensao: "Child Alimony: Rooted in Article 146.º and subsequent of the Angola Family Code, ensuring child support rights.",
    fontes_civil: "Civil Code: Under Article 805.º and subsequent of the Angolan Civil Code regarding moratory rates on monetary obligations.",
  },
  fr: {
    title: "Tableau d'Orientation des Simulateurs Juridiques",
    subtitle: "Estimez les indemnités de rupture, pensions alimentaires et pénalités sous le droit angolais",
    print_btn: "Imprimer la Simulation",
    tab_rescisao: "Indemnités de Rupture (LGT)",
    tab_pensao: "Pension Alimentaire",
    tab_juros: "Intérêts Moratoires Civils",
    tab_atraso: "Retard de Paiement Salaire",
    
    // Rescisão LGT
    rescisao_title: "Simulateur Général de Rupture de Contrat (Loi n.º 12/23)",
    rescisao_desc: "Estimation brute pour rupture de contrat de travail décidée par l'employeur (licenciement abusif/sans juste cause) ou motif économique.",
    salario_base: "Salaire de Base Mensuel (AOA)",
    anos_servico: "Années de Service Révolues",
    meses_corrente: "Mois Travaillés durant l'Année Civile",
    dimensao_empresa: "Classification de l'Entreprise",
    grande_empresa: "Grande Entreprise (Coefficient 100%)",
    media_empresa: "Moyenne Entreprise (Coefficient LGT 70%)",
    pequena_empresa: "Micro ou Petite Entreprise (Coefficient 50%)",
    salarios_atraso: "Reliquats de Salaires Impayés ? (AOA)",
    ferias_gozadas: "Avez-vous déjà pris vos vacances cette année ?",
    ferias_nao: "Non, je percevrai le prorata complet de congés",
    ferias_parcial: "Oui, partiellement soldées",
    ferias_total: "Oui, congés déjà entièrement soldés",
    btn_calcular_rescisao: "Calculer les Proratas et Indemnités",
    recibo_titulo: "Reçu Virtuel de Solde de Tout Compte (AOA)",
    indem_antiguidade: "Indemnité d'Ancienneté de Base",
    prop_ferias: "Prorata d'Indemnité de Congés",
    prop_natal: "Prorata de Treizième Mois (Noël)",
    atraso_diarias: "Salaires de Retard et Rappels",
    estimativa_bruta: "Orientation de Rupture Brut",
    nota_rescisao: "*Note: Ce simulateur exclut l'incidence des retenues sociales obligatoires (INSS de 3% salarié, 8% employeur) et de l'impôt sur le revenu (IRT) qui affectent le STC brut.",
    aviso_inserir_dados: "Veuillez insérer vos paramètres salariaux afin de générer le bilan de rupture.",

    // Pensão Alimentícia
    pensao_title: "Indicateur de Fixation de Pension Alimentaire (Code de la Famille)",
    pensao_desc: "En Angola, le Code de la famille n'impose pas de taux contractuel fixe, mais les tribunaux évaluent au cas par cas selon les revenus du débiteur et le besoin de l'enfant (généralement de 15% à 45% du net).",
    rendimento_provedor: "Revenu Mensuel Net du Débiteur (AOA)",
    num_filhos: "Nombre de mineurs bénéficiant du soutien",
    filho_1: "1 enfant mineur (env. 15% à 20%)",
    filho_2: "2 enfants mineurs (env. 25% à 30%)",
    filho_3: "3 enfants ou plus (env. 35% ou plus)",
    necessidade_especial: "Besoins Médicaux / Scolaires Particuliers ?",
    necessidade_sim: "Oui, majoration de 5%",
    btn_calcular_pensao: "Estimer la Fourchette Judiciaire",
    parecer_titulo: "Rapport Indicatif de Pension",
    taxa_estimada: "Taux Prévu des Revenus :",
    valor_ref_medio: "Montant Moyen Conseillé :",
    intervalo_judicial: "Fourchette Judiciaire Habuelle :",
    valor_a: "à",
    nota_pensao: "En République d'Angola, la pension s'organise soit par accord amiable consigné auprès du procureur familial, soit par arrêt du juge aux affaires familiales.",
    aviso_pensao: "Saisissez les paramètres familiaux afin de simuler la fourchette d'évaluation.",

    // Juros
    juros_title: "Simulateur de Pénalités et Créances de Retard (Code Civil Angolais)",
    juros_desc: "Estimez les intérêts de retard civils légaux liés à des défauts contractuels ou à une restructuration de passif.",
    principal: "Capital en Souffrance / Principal de la Dette (AOA)",
    taxa_anual: "Taux d'Intérêt Annuel (%)",
    padrao_civil: "Note: Le loyer civil légal standard est fixé à 10% l'an.",
    atraso_meses: "Durée du Retard en Mois",
    metodo_incidencia: "Mode de Composition des Intérêts",
    juro_simples: "Intérêts Simples (Usage Civil Courant)",
    juro_composto: "Intérêts Composés (Usage Bancaire)",
    btn_calcular_juros: "Calculer les Intérêts Civils",
    calculo_capitalizacao: "Tableau de Capitalisation",
    capital_base: "Principal de la Dette Propre",
    juros_mora: "Intérêts Cumulés Estimés",
    total_amortizar: "Montant Total à Rembourser",
    nota_juros: "*Note: Ce rapport sert d'indicateur commercial et ne supplante pas le décompte officiel des greffes ou de l'administration fiscale d'Angola.",
    aviso_juros: "Entrez le montant nominal et la durée de la défaillance.",

    // Retard Salarial
    atraso_title: "Simulateur de Taux Punitif sur Salaires Impayés (LGT Art. 137.º)",
    atraso_desc: "La loi angolaise enjoint de payer les rémunérations à échéance. Si le retard imputable à l'entreprise outrepasse 15 jours, une pénalité s'active légalement : 10% au 15ème jour, complété par 2% d'indemnité supplémentaire par jour subséquent.",
    salario_liquido: "Votre Salaire Net Mensuel Estimé (AOA)",
    dias_atraso: "Jours de Retard Accumulés",
    dias_vencimento: "Jours passés la date habituelle de paie.",
    btn_calcular_atraso: "Calculer la Pénalité due",
    sentenca_indemnizacao: "Orientation de Pénalité Légale (Barème LGT)",
    salario_regular: "Salaire Nominal de Base dû",
    taxa_atraso: "Taux de Pénalité Calculé",
    indem_devida: "Montant Net de la Pénalité",
    total_receber: "Total Net dû à Percevoir",
    atraso_grave_alerta: "Il s'agit d'un manquement grave (> 15 jours). Le salarié est fondé à exiger cette majoration devant l'Inspection Générale du Travail ou les tribunaux régionaux.",
    atraso_leve_alerta: "Sous la barre des 15 jours, la loi angolaise ne déclenche pas le barème pénal de 10%+2%, limitant les droits aux intérêts légaux de base ou recours syndicaux.",
    aviso_atraso: "Insérez le montant nominal et la durée constatée du retard.",

    // Footer CTA
    cta_title: "Validation Légale Obligatoire par Avocat certifié OAA",
    cta_desc: "Ces outils fournissent des indications de calcul. Pour engager des procédures contentieuses, réclamer vos droits de pension ou exécuter des créanciers, l'assistance d'un avocat du Barreau d'Angola (OAA) est obligatoire.",
    cta_btn: "Évaluer mon dossier & Consulter un Avocat OAA",
    fontes_titulo: "Sources de Législation Réelles d'Angola :",
    fontes_trabalho: "Code du travail : Le parlement angolais a revu le solde de rupture au sein de la Loi Générale du Travail n.º 12/23 arrêtée le 29 août.",
    fontes_pensao: "Soutien familial : Droits aux contributions alimentaires garantis en vertu de l'article 146 du code angolais de la famille.",
    fontes_civil: "Code civil : Encadrement des taux de retard commerciaux aux articles 805 du Code civil de la République d'Angola.",
  },
  um: {
    title: "Ondandu Violombongo Viovijila yo Angola",
    subtitle: "Sanganela estimates violombongo cose via tundo, pensão kuenda ovihandeleko",
    print_btn: "Okusoneha Calitovo",
    tab_rescisao: "Olombongo Upange (LGT)",
    tab_pensao: "Pensão yo Okulia",
    tab_juros: "Olomeya kuenda Dívidas",
    tab_atraso: "Atraso lio Salário LGT",
    
    // Rescisão LGT
    rescisao_title: "Simulador liolombongo Upange vieselapo (Lei n.º 12/23)",
    rescisao_desc: "Eselapo liomanu vacili a tunda k'olombila fofolo LGT yo Angola.",
    salario_base: "Salário Base Mensal (AOA)",
    anos_servico: "Anos Completos de Serviço",
    meses_corrente: "Meses a pita upange",
    dimensao_empresa: "Unene we Empresa vofeka",
    grande_empresa: "Grande Empresa (100% coeficiente)",
    media_empresa: "Média Empresa (70% coeficiente LGT)",
    pequena_empresa: "Pequena Empresa (50% coeficiente)",
    salarios_atraso: "Salários via kakatela? (AOA)",
    ferias_gozadas: "Oko a gozou férias cilo unyalo?",
    ferias_nao: "Lalopo, ngasanga areceber completo",
    ferias_parcial: "Oko, parcialmente gozadas",
    ferias_total: "Oko, unyalo cose yasapo",
    btn_calcular_rescisao: "Okualo Proporcionais kuenda Compensações",
    recibo_titulo: "Recibo de Rescisão de Angola (AOA)",
    indem_antiguidade: "Compensação d'Antiguidade",
    prop_ferias: "Prorata Férias",
    prop_natal: "Prorata Natal",
    atraso_diarias: "Salários via kakatela kanyima",
    estimativa_bruta: "Total de Indemnização Bruto",
    nota_rescisao: "*Nota: Esta simulação kavalepo INSS (3% trabalhador, 8% entidade) e IRT das parcelas civis.",
    aviso_inserir_dados: "Soneha olombapolo viosari k'okuyula recibo.",

    // Pensão Alimentícia
    pensao_title: "Pensão de Alimentos canene (Código de Família)",
    pensao_desc: "Moxi ia Angola Código de Família kapepi taxas fixed, asululuka k'ocitela co provedor lio 15% to 45% net income.",
    rendimento_provedor: "Rendimento Líquido Mensal do Provedor (AOA)",
    num_filhos: "Omanu menores yo okulia",
    filho_1: "1 child (approx. 15% to 20%)",
    filho_2: "2 children (approx. 25% to 30%)",
    filho_3: "3 or more children (35% etc)",
    necessidade_especial: "Needs especiais escolares?",
    necessidade_sim: "Oko, acréscimo de 5%",
    btn_calcular_pensao: "Estimar Intervalo Judicial",
    parecer_titulo: "Ondaka de Pensão",
    taxa_estimada: "Taxa de Rendimento:",
    valor_ref_medio: "Valor de Referência Médio:",
    intervalo_judicial: "Expected Judicial Range:",
    valor_a: "to",
    nota_pensao: "Em Angola, as decisões sobre prestação de alimentos dependem da Procuradoria de Família.",
    aviso_pensao: "Selecione as condições parentais para gerar a estimativa.",

    // Juros
    juros_title: "Juros de Mora Civis canene (Código Civil Angolano)",
    juros_desc: "Estimar taxas de mora legally aplicadas k'ovisimilo via default.",
    principal: "Capital da Dívida / Valor Principal (AOA)",
    taxa_anual: "Taxa de Juro Anual (%)",
    padrao_civil: "Nota: 10% padrão legal civil em vigor.",
    atraso_meses: "Período de Atraso em Meses",
    metodo_incidencia: "Incidência lio Juros",
    juro_simples: "Juro Simples (Civil)",
    juro_composto: "Juros Compostos (Contratos Bancários)",
    btn_calcular_juros: "Calcular Juros Civis",
    calculo_capitalizacao: "Capitalização Lio Dívida",
    capital_base: "Capital de Base original",
    juros_mora: "Juros de Mora Acumulados",
    total_amortizar: "Total a Amortizar",
    nota_juros: "*Nota: A acumulação do passivo não representa de Finanças de Angola.",
    aviso_juros: "Soneha o montante em débito e o tempo de incumprimento.",

    // Atraso Salarial
    atraso_title: "Multa por Atraso Salarial (LGT Art. 137.º)",
    atraso_desc: "LGT Angola manda salary pago up to last day. Atraso over 15 days triggers: 10% ao completares 15 dias + 2% adicionais por cada dia subsequente.",
    salario_liquido: "Seu Salário Líquido Mensal (AOA)",
    dias_atraso: "Dias de Atraso",
    dias_vencimento: "Dias desde a data regular.",
    btn_calcular_atraso: "Calcular Multa LGT",
    sentenca_indemnizacao: "Sentença de Compensação (Calculo LGT)",
    salario_regular: "Salário Regular Devido",
    taxa_atraso: "Taxa Moratória LGT",
    indem_devida: "Multa do Atraso Devido",
    total_receber: "Total a Receber Líquido",
    atraso_grave_alerta: "Trata-se de um atraso grave (> 15 dias). O trabalhador can claim no IGT vofeka.",
    atraso_leve_alerta: "Para atrasos inferiores a 15 dias, a lei LGT não impõe multa pesada, kuxita juros simples.",
    aviso_atraso: "Forneça o salário mensal e a duração do atraso.",

    // Footer CTA
    cta_title: "Mandato de Advogado OAA Obrigatório",
    cta_desc: "As calculadoras facultam taxas brutas exemplares. Para acionar a empresa patronal, necessita de advogado para evitar coimas ou erros no conselho.",
    cta_btn: "Diagnosticar Áreas & Agendar Apoio OAA",
    fontes_titulo: "Ocihandeleko co Angola directas:",
    fontes_trabalho: "Upange: LGT Angola Lei Geral do Trabalho n.º 12/23 redefines severance.",
    fontes_pensao: "Pensão: Baseado no Código de Família de Angola para as crianças.",
    fontes_civil: "Código Civil: Regula os juros civis de mora de acordo com o artigo 805.",
  },
  ki: {
    title: "Diisala dia Kitadi kia Tijila mu Angola",
    subtitle: "Funda jimbongo mbe upange, pensão ni jipenalidades moxi ia ijila Angola",
    print_btn: "Kusoneha Kima Kyambote",
    tab_rescisao: "Indemnização ia LGT Upange",
    tab_pensao: "Pensão ia Kudia",
    tab_juros: "Juros dya Jidívidas",
    tab_atraso: "Atraso dya Salary LGT",
    
    // Rescisão LGT
    rescisao_title: "General Severance Simulator (Kijila n.º 12/23)",
    rescisao_desc: "Funda kitadi mbe ufunda upange moxi ia LGT (Lei Geral do Trabalho de Angola).",
    salario_base: "Monthly Base Salary (AOA)",
    anos_servico: "Complete Years of Service",
    meses_corrente: "Months Worked in Current Year",
    dimensao_empresa: "Unene we Empresa fofolo",
    grande_empresa: "Grande Empresa (100% coefficient)",
    media_empresa: "Média Empresa (70% coefficient LGT)",
    pequena_empresa: "Pequena Empresa (50% coefficient)",
    salarios_atraso: "Salários em atraso? (AOA)",
    ferias_gozadas: "Agozou férias mu kithangana?",
    ferias_nao: "Kana, ngatambula completo",
    ferias_parcial: "Oene, parcialmente gozadas",
    ferias_total: "Oene, férias mu falamu cose",
    btn_calcular_rescisao: "Kufunda Proporcionais ni Jimbongo",
    recibo_titulo: "Recibo de Indemnização de Angola (AOA)",
    indem_antiguidade: "Indemnização Antiguidade",
    prop_ferias: "Prorata Férias",
    prop_natal: "Prorata Natal",
    atraso_diarias: "Salary ia Atraso in falamu",
    estimativa_bruta: "Total d'Indemnização Líquido",
    nota_rescisao: "*Nota: Kitongolo kiki kaene INSS (3% trabalhador, 8% entidade) e IRT legal fofolo.",
    aviso_inserir_dados: "Soneha kitadi dya salary mu Jika Recibo.",

    // Pensão Alimentícia
    pensao_title: "Alimentos mbe pensão fofolo (Código de Família)",
    pensao_desc: "Moxi ia Angola Código de Família kapi jimbongo mbe porcento fixed, asululuka k'ocitela co provedor lio 15% to 45% net income.",
    rendimento_provedor: "Rendimento Líquido Mensal do Provedor (AOA)",
    num_filhos: "Minor dependents mu pensão kudia",
    filho_1: "1 child (approx. 15% to 20%)",
    filho_2: "2 children (approx. 25% to 30%)",
    filho_3: "3 or more children (35% etc)",
    necessidade_especial: "Needs especiais escolares?",
    necessidade_sim: "Oene, acréscimo de 5%",
    btn_calcular_pensao: "Estimar Intervalo Judicial",
    parecer_titulo: "Parecer of Pensão",
    taxa_estimada: "Taxa de Rendimento:",
    valor_ref_medio: "Valor de Referência Médio:",
    intervalo_judicial: "Expected Judicial Range:",
    valor_a: "to",
    nota_pensao: "Em Angola, as decisões de alimentos dependem da Procuradoria de Família.",
    aviso_pensao: "Selecione as condições parentais para gerar a estimativa.",

    // Juros
    juros_title: "Juros de Mora dya Jidívidas (Código Civil Angolano)",
    juros_desc: "Funda jipenalidades mbe taxas legally aplicadas.",
    principal: "Capital da Dívida / Valor Principal (AOA)",
    taxa_anual: "Taxa de Juro Anual (%)",
    padrao_civil: "Nota: 10% padrão legal civil em vigor.",
    atraso_meses: "Período de Atraso em Meses",
    metodo_incidencia: "Incidência dya Juros",
    juro_simples: "Juro Simples (Civil)",
    juro_composto: "Juros Compostos (Contratos Bancários)",
    btn_calcular_juros: "Calcular Juros dya Jidívidas",
    calculo_capitalizacao: "Capitalização lio Dívida",
    capital_base: "Capital de Base original",
    juros_mora: "Juros de Mora Acumulados",
    total_amortizar: "Total a Amortizar",
    nota_juros: "*Nota: A acumulação do passivo não representa de Finanças de Angola.",
    aviso_juros: "Soneha o montante em débito e o tempo de incumprimento.",

    // Atraso Salarial
    atraso_title: "Multa por Atraso dya Salary (LGT Art. 137.º)",
    atraso_desc: "LGT Angola manda salary pago up to last day. Atraso over 15 days triggers: 10% dya completares 15 dias + 2% adicionais por cada dia subsequente.",
    salario_liquido: "Seu Salário Líquido Mensal (AOA)",
    dias_atraso: "Dias de Atraso",
    dias_vencimento: "Dias desde a data regular.",
    btn_calcular_atraso: "Calcular Multa LGT",
    sentenca_indemnizacao: "Sentença d'Indemnização (Calculo LGT)",
    salario_regular: "Salary Regular Devido",
    taxa_atraso: "Taxa d'Atraso LGT",
    indem_devida: "Multa do Atraso Devido",
    total_receber: "Total a Receber Líquido",
    atraso_grave_alerta: "Trata-se de um atraso grave (> 15 dias). O trabalhador can claim no IGT vofeka.",
    atraso_leve_alerta: "Para atrasos inferiores a 15 dias, a lei LGT não impõe multa, kuxita juros simples.",
    aviso_atraso: "Forneça o salário mensal e a duração do atraso.",

    // Footer CTA
    cta_title: "Mandato d'Advogado OAA Obrigatório",
    cta_desc: "As calculadoras dão taxas brutas exemplares. Soneha onduko ie ku OAA mu kukaia fofolo moxi ia Mundu.",
    cta_btn: "Diagnosticar Áreas & Agendar Apoio OAA",
    fontes_titulo: "Ocihandeleko co Angola directas:",
    fontes_trabalho: "Upange: LGT Angola Lei Geral do Trabalho n.º 12/23 redefines severance.",
    fontes_pensao: "Pensão: Baseado no Código de Família de Angola para as crianças.",
    fontes_civil: "Código Civil: Regula os juros civis de mora de acordo com o artigo 805.",
  }
};

export default function LegalCalculators({ userInfo, onRequireContact, langCode = "pt" }: LegalCalculatorsProps) {
  const [activeTab, setActiveTab] = useState<CalculatorType>("rescisao");

  const activeLang = langCode && CALC_TRANSLATIONS[langCode] ? langCode : "pt";
  const tc = (key: string): string => {
    return CALC_TRANSLATIONS[activeLang]?.[key] || CALC_TRANSLATIONS["pt"]?.[key] || key;
  };

  // --- Calculator 1 State: Rescisão Trabalhista (Angola LGT Lei 12/23) ---
  const [salarioBase, setSalarioBase] = useState<number>(150000);
  const [anosServico, setAnosServico] = useState<number>(3);
  const [mesesTrabalhadosAnoCorrente, setMesesTrabalhadosAnoCorrente] = useState<number>(6);
  const [tamanhoEmpresa, setTamanhoEmpresa] = useState<"grande" | "media" | "pequena">("grande");
  const [salariosAtraso, setSalariosAtraso] = useState<number>(0);
  const [gozouFerias, setGozouFerias] = useState<string>("nao"); // "nao" | "sim_parcial" | "sim_total"
  const [proporcionaisRescisao, setProporcionaisRescisao] = useState({
    indeminizacaoAnos: 0,
    subFerias: 0,
    subNatal: 0,
    totalRescisao: 0,
  });
  const [calculatedRescisao, setCalculatedRescisao] = useState<boolean>(false);

  // --- Calculator 2 State: Pensão Alimentícia (Código de Família de Angola) ---
  const [rendimentoLiquido, setRendimentoLiquido] = useState<number>(120000);
  const [numeroFilhos, setNumeroFilhos] = useState<number>(1);
  const [necessidadeEspecial, setNecessidadeEspecial] = useState<boolean>(false);
  const [calculatedPensao, setCalculatedPensao] = useState<boolean>(false);
  const [pensaoResult, setPensaoResult] = useState({
    percentagemSugerida: 0,
    valorSugerido: 0,
    intervaloMin: 0,
    intervaloMax: 0,
  });

  // --- Calculator 3 State: Juros e Dívidas ---
  const [capitalDivida, setCapitalDivida] = useState<number>(500000);
  const [taxaJuroAnual, setTaxaJuroAnual] = useState<number>(10); // Default 10% Angola Civil legal rate
  const [periodoMeses, setPeriodoMeses] = useState<number>(12);
  const [tipoJuros, setTipoJuros] = useState<"simples" | "compostos">("simples");
  const [calculatedJuros, setCalculatedJuros] = useState<boolean>(false);
  const [jurosResult, setJurosResult] = useState({
    jurosAcumulados: 0,
    montanteTotal: 0,
  });

  // --- Calculator 4 State: Atraso Salarial (LGT n.º 12/23) ---
  const [salarioMensalAtraso, setSalarioMensalAtraso] = useState<number>(180000);
  const [diasAtraso, setDiasAtraso] = useState<number>(20);
  const [calculatedAtraso, setCalculatedAtraso] = useState<boolean>(false);
  const [atrasoResult, setAtrasoResult] = useState({
    indemnizacaoArredondada: 0,
    taxaPercentagem: 0,
    totalAReceber: 0,
    atrasoGrave: false,
  });

  // --- Core Calculation Handlers ---

  // 1. Rescisão - Angola LGT 12/23 Rules
  const handleCalculateRescisao = (e: React.FormEvent) => {
    e.preventDefault();
    onRequireContact(() => {
      let baseFactorMultiplier = 1;
      let overflowMultiplier = 0.5;

      if (tamanhoEmpresa === "media") {
        baseFactorMultiplier = 0.7;
        overflowMultiplier = 0.35;
      } else if (tamanhoEmpresa === "pequena") {
        baseFactorMultiplier = 0.5;
        overflowMultiplier = 0.25;
      }

      let indeminizacaoAnos = 0;
      if (anosServico <= 5) {
        indeminizacaoAnos = salarioBase * baseFactorMultiplier * anosServico;
      } else {
        indeminizacaoAnos = (salarioBase * baseFactorMultiplier * 5) + 
                            (salarioBase * overflowMultiplier * (anosServico - 5));
      }

      let holidayFactor = 1;
      if (gozouFerias === "sim_total") holidayFactor = 0;
      else if (gozouFerias === "sim_parcial") holidayFactor = 0.5;

      const subFerias = (mesesTrabalhadosAnoCorrente / 12) * salarioBase * holidayFactor;
      const subNatal = (mesesTrabalhadosAnoCorrente / 12) * salarioBase;
      const totalRescisao = indeminizacaoAnos + subFerias + subNatal + salariosAtraso;

      setProporcionaisRescisao({
        indeminizacaoAnos: Math.round(indeminizacaoAnos),
        subFerias: Math.round(subFerias),
        subNatal: Math.round(subNatal),
        totalRescisao: Math.round(totalRescisao),
      });
      setCalculatedRescisao(true);
    });
  };

  // 2. Pensão Alimentícia
  const handleCalculatePensao = (e: React.FormEvent) => {
    e.preventDefault();
    onRequireContact(() => {
      let percentagemBase = 20;
      if (numeroFilhos === 1) {
        percentagemBase = 20;
      } else if (numeroFilhos === 2) {
        percentagemBase = 30;
      } else {
        percentagemBase = 40;
      }

      if (necessidadeEspecial) {
        percentagemBase += 5;
      }

      if (percentagemBase > 45) {
        percentagemBase = 45;
      }

      const valorSugerido = rendimentoLiquido * (percentagemBase / 100);
      const intervaloMin = valorSugerido * 0.85;
      const intervaloMax = valorSugerido * 1.15;

      setPensaoResult({
        percentagemSugerida: percentagemBase,
        valorSugerido: Math.round(valorSugerido),
        intervaloMin: Math.round(intervaloMin),
        intervaloMax: Math.round(intervaloMax),
      });
      setCalculatedPensao(true);
    });
  };

  // 3. Juros e Dívidas
  const handleCalculateJuros = (e: React.FormEvent) => {
    e.preventDefault();
    onRequireContact(() => {
      const decimalRate = (taxaJuroAnual / 100) / 12;
      let jurosAcumulados = 0;
      let montanteTotal = 0;

      if (tipoJuros === "simples") {
        jurosAcumulados = capitalDivida * (taxaJuroAnual / 100) * (periodoMeses / 12);
        montanteTotal = capitalDivida + jurosAcumulados;
      } else {
        montanteTotal = capitalDivida * Math.pow(1 + decimalRate, periodoMeses);
        jurosAcumulados = montanteTotal - capitalDivida;
      }

      setJurosResult({
        jurosAcumulados: Math.round(jurosAcumulados),
        montanteTotal: Math.round(montanteTotal),
      });
      setCalculatedJuros(true);
    });
  };

  // 4. Delayed wages indemnity (LGT Artigo 137.º)
  const handleCalculateAtraso = (e: React.FormEvent) => {
    e.preventDefault();
    onRequireContact(() => {
      let taxaPercentagem = 0;
      let indemnizacao = 0;
      let atrasoGrave = false;

      if (diasAtraso > 15) {
        atrasoGrave = true;
        const extraDays = diasAtraso - 15;
        taxaPercentagem = 10 + (extraDays * 2);
        indemnizacao = salarioMensalAtraso * (taxaPercentagem / 100);
      } else {
        taxaPercentagem = 0;
        indemnizacao = 0;
      }

      const totalAReceber = salarioMensalAtraso + indemnizacao;

      setAtrasoResult({
        indemnizacaoArredondada: Math.round(indemnizacao),
        taxaPercentagem: taxaPercentagem,
        totalAReceber: Math.round(totalAReceber),
        atrasoGrave: atrasoGrave,
      });
      setCalculatedAtraso(true);
    });
  };

  const formatKwanza = (num: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const printCalculatorView = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col animate-fade-in" id="legal-calculators-root">
      
      {/* Header Banner */}
      <div className="bg-[#5c0608] border-t-4 border-t-[#da291c] border-b-2 border-b-white/10 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 border border-white/20 rounded-lg text-white">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-white">
              {tc("title")}
            </h3>
            <p className="text-xs text-red-100/85">
              {tc("subtitle")}
            </p>
          </div>
        </div>

        <button
          onClick={printCalculatorView}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded text-xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> {tc("print_btn")}
        </button>
      </div>

      {/* Internal Tabs Navigator */}
      <div className="bg-slate-50 border-b border-slate-200 flex flex-nowrap overflow-x-auto">
        <button
          onClick={() => setActiveTab("rescisao")}
          className={`px-4 py-3 border-b-2 font-serif text-xs md:text-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "rescisao"
              ? "border-[#991b1b] text-[#991b1b] font-bold bg-white"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
          id="tab-rescisao"
        >
          <Briefcase className="w-4 h-4 shrink-0 text-[#991b1b]" />
          {tc("tab_rescisao")}
        </button>

        <button
          onClick={() => setActiveTab("pensao")}
          className={`px-4 py-3 border-b-2 font-serif text-xs md:text-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "pensao"
              ? "border-[#991b1b] text-[#991b1b] font-bold bg-white"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
          id="tab-pensao"
        >
          <Heart className="w-4 h-4 shrink-0 text-[#991b1b]" />
          {tc("tab_pensao")}
        </button>

        <button
          onClick={() => setActiveTab("juros")}
          className={`px-4 py-3 border-b-2 font-serif text-xs md:text-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "juros"
              ? "border-[#991b1b] text-[#991b1b] font-bold bg-white"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
          id="tab-juros"
        >
          <Coins className="w-4 h-4 shrink-0 text-[#991b1b]" />
          {tc("tab_juros")}
        </button>

        <button
          onClick={() => setActiveTab("atraso")}
          className={`px-4 py-3 border-b-2 font-serif text-xs md:text-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "atraso"
              ? "border-[#991b1b] text-[#991b1b] font-bold bg-white"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
          id="tab-atraso"
        >
          <Clock className="w-4 h-4 shrink-0 text-[#991b1b]" />
          {tc("tab_atraso")}
        </button>
      </div>

      {/* Main calculation workspace area */}
      <div className="p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* TAB 1: RESCISÃO TRABALHISTA */}
        {activeTab === "rescisao" && (
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                {tc("rescisao_title")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tc("rescisao_desc")}
              </p>

              <form onSubmit={handleCalculateRescisao} className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("salario_base")}</label>
                  <input
                    type="number"
                    value={salarioBase}
                    onChange={(e) => setSalarioBase(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("anos_servico")}</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={anosServico}
                    onChange={(e) => setAnosServico(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("meses_corrente")}</label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={mesesTrabalhadosAnoCorrente}
                    onChange={(e) => setMesesTrabalhadosAnoCorrente(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("dimensao_empresa")}</label>
                  <select
                    value={tamanhoEmpresa}
                    onChange={(e) => setTamanhoEmpresa(e.target.value as any)}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-white text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium cursor-pointer"
                  >
                    <option value="grande">{tc("grande_empresa")}</option>
                    <option value="media">{tc("media_empresa")}</option>
                    <option value="pequena">{tc("pequena_empresa")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("salarios_atraso")}</label>
                  <input
                    type="number"
                    min="0"
                    value={salariosAtraso}
                    onChange={(e) => setSalariosAtraso(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    placeholder="Ex: 0"
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("ferias_gozadas")}</label>
                  <select
                    value={gozouFerias}
                    onChange={(e) => setGozouFerias(e.target.value)}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-white text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium cursor-pointer"
                  >
                    <option value="nao">{tc("ferias_nao")}</option>
                    <option value="sim_parcial">{tc("ferias_parcial")}</option>
                    <option value="sim_total">{tc("ferias_total")}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-3.5 bg-gradient-to-r from-[#0b1426] via-[#101b33] to-[#0b1426] hover:brightness-110 active:scale-[0.99] text-white font-serif rounded-xl font-bold tracking-wider text-xs uppercase mt-3 transition duration-300 cursor-pointer shadow-md select-none border-b-2 border-slate-950"
                >
                  {tc("btn_calcular_rescisao")}
                </button>
              </form>
            </div>

            {/* Severance calculation output receipt card */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
              <h5 className="font-serif font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                {tc("recibo_titulo")}
              </h5>

              {calculatedRescisao ? (
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("indem_antiguidade")}:</span>
                    <span className="font-bold text-slate-900">{formatKwanza(proporcionaisRescisao.indeminizacaoAnos)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("prop_ferias")}:</span>
                    <span className="font-bold text-slate-900">{formatKwanza(proporcionaisRescisao.subFerias)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("prop_natal")}:</span>
                    <span className="font-bold text-slate-900">{formatKwanza(proporcionaisRescisao.subNatal)}</span>
                  </div>

                  {salariosAtraso > 0 && (
                    <div className="flex justify-between items-center text-red-700">
                      <span>{tc("atraso_diarias")}:</span>
                      <span className="font-bold">{formatKwanza(salariosAtraso)}</span>
                    </div>
                  )}

                  <div className="border-t border-dashed border-slate-300 pt-3 flex justify-between items-center text-slate-900 font-serif text-sm">
                    <span className="font-bold">{tc("estimativa_bruta")}:</span>
                    <span className="font-bold text-[#991b1b] text-base">{formatKwanza(proporcionaisRescisao.totalRescisao)}</span>
                  </div>

                  <div className="bg-[#fdfafb] border border-[#991b1b]/30 text-slate-600 p-2 text-[10px] leading-relaxed rounded font-serif mt-2">
                    {tc("nota_rescisao")}
                  </div>

                  <a
                    href={`https://wa.me/244923000000?text=${encodeURIComponent(`Olá! Realizei uma simulação na Calculadora de Rescisão de Angola do portal Direito Fácil Angola. O meu cálculo provisório deu o valor total de *${formatKwanza(proporcionaisRescisao.totalRescisao)}*. Gostaria de validá-lo e obter ajuda técnica de um profissional credenciado na OAA!`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-750 hover:brightness-110 active:scale-95 text-white rounded font-sans font-bold text-[11px] uppercase tracking-wide transition shadow-sm hover:shadow cursor-pointer text-center mt-2"
                  >
                    💬 Tirar Dúvidas no WhatsApp
                  </a>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <Scale className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-slate-500 text-xs font-serif italic">{tc("aviso_inserir_dados")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PENSÃO ALIMENTÍCIA */}
        {activeTab === "pensao" && (
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                {tc("pensao_title")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tc("pensao_desc")}
              </p>

              <form onSubmit={handleCalculatePensao} className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("rendimento_provedor")}</label>
                  <input
                    type="number"
                    value={rendimentoLiquido}
                    onChange={(e) => setRendimentoLiquido(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("num_filhos")}</label>
                  <select
                    value={numeroFilhos}
                    onChange={(e) => setNumeroFilhos(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-white text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium cursor-pointer"
                  >
                    <option value={1}>{tc("filho_1")}</option>
                    <option value={2}>{tc("filho_2")}</option>
                    <option value={3}>{tc("filho_3")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("necessidade_especial")}</label>
                  <div className="flex items-center gap-2 mt-1.5 h-full">
                    <input
                      type="checkbox"
                      id="needs-special"
                      checked={necessidadeEspecial}
                      onChange={(e) => setNecessidadeEspecial(e.target.checked)}
                      className="w-5 h-5 text-[#991b1b] rounded-lg border-2 border-slate-300 focus:ring-0 cursor-pointer accent-[#991b1b]"
                    />
                    <label htmlFor="needs-special" className="text-xs text-slate-700 font-medium cursor-pointer select-none">
                      {tc("necessidade_sim")}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-3.5 bg-gradient-to-r from-[#0b1426] via-[#101b33] to-[#0b1426] hover:brightness-110 active:scale-[0.99] text-white font-serif rounded-xl font-bold tracking-wider text-xs uppercase mt-3 transition duration-300 cursor-pointer shadow-md select-none border-b-2 border-slate-950"
                >
                  {tc("btn_calcular_pensao")}
                </button>
              </form>
            </div>

            {/* Alimony calculation output */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
              <h5 className="font-serif font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                {tc("parecer_titulo")}
              </h5>

              {calculatedPensao ? (
                <div className="flex flex-col gap-3 font-sans text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("taxa_estimada")}</span>
                    <span className="font-bold text-slate-900 font-mono">{pensaoResult.percentagemSugerida}%</span>
                  </div>

                  <div className="bg-[#0b1426]/5 rounded p-3 text-center border border-[#0b1426]/10 flex flex-col gap-1 my-1">
                    <span className="text-slate-500 font-serif text-[11px]">{tc("valor_ref_medio")}</span>
                    <span className="font-bold text-lg text-[#0b1426] font-mono">{formatKwanza(pensaoResult.valorSugerido)}</span>
                  </div>

                  <div className="flex flex-col gap-1 py-1 border-t border-b border-dashed border-slate-200 text-[#0b1426]">
                    <span className="font-serif text-[10px] text-slate-500 text-center uppercase tracking-wide">{tc("intervalo_judicial")}</span>
                    <div className="flex justify-between items-center text-slate-800 font-bold font-mono">
                      <span>{formatKwanza(pensaoResult.intervaloMin)}</span>
                      <span className="text-slate-400 font-normal">{tc("valor_a")}</span>
                      <span>{formatKwanza(pensaoResult.intervaloMax)}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 text-[11px] leading-relaxed rounded font-serif mt-1 flex gap-1.5 items-start">
                    <Info className="w-3.5 h-3.5 text-[#991b1b] mt-0.5 shrink-0" />
                    <p>
                      {tc("nota_pensao")}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/244923000000?text=${encodeURIComponent(`Olá! Realizei uma simulação na Calculadora de Pensão Alimentícia de Angola do Direito Fácil Angola. O valor sugerido mensal foi de *${formatKwanza(pensaoResult.valorSugerido)}* (${pensaoResult.percentagemSugerida}%). Gostaria de analisar o meu caso com um advogado credenciado!`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-750 hover:brightness-110 active:scale-95 text-white rounded font-sans font-bold text-[11px] uppercase tracking-wide transition shadow-sm hover:shadow cursor-pointer text-center mt-2.5"
                  >
                    💬 Tirar Dúvidas no WhatsApp
                  </a>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <Heart className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-slate-500 text-xs font-serif italic">{tc("aviso_pensao")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: JUROS E DÍVIDAS */}
        {activeTab === "juros" && (
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                {tc("juros_title")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tc("juros_desc")}
              </p>

              <form onSubmit={handleCalculateJuros} className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("principal")}</label>
                  <input
                    type="number"
                    value={capitalDivida}
                    onChange={(e) => setCapitalDivida(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("taxa_anual")}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={taxaJuroAnual}
                    onChange={(e) => setTaxaJuroAnual(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                  <span className="text-[10px] text-slate-550 mt-0.5 font-medium">{tc("padrao_civil")}</span>
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("atraso_meses")}</label>
                  <input
                    type="number"
                    min="1"
                    max="600"
                    value={periodoMeses}
                    onChange={(e) => setPeriodoMeses(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("metodo_incidencia")}</label>
                  <select
                    value={tipoJuros}
                    onChange={(e) => setTipoJuros(e.target.value as any)}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-white text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium cursor-pointer"
                  >
                    <option value="simples">{tc("juro_simples")}</option>
                    <option value="compostos">{tc("juro_composto")}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-3.5 bg-gradient-to-r from-[#0b1426] via-[#101b33] to-[#0b1426] hover:brightness-110 active:scale-[0.99] text-white font-serif rounded-xl font-bold tracking-wider text-xs uppercase mt-3 transition duration-300 cursor-pointer shadow-md select-none border-b-2 border-slate-950"
                >
                  {tc("btn_calcular_juros")}
                </button>
              </form>
            </div>

            {/* Debt calculation panel */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
              <h5 className="font-serif font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                {tc("calculo_capitalizacao")}
              </h5>

              {calculatedJuros ? (
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("capital_base")}:</span>
                    <span className="font-bold text-slate-900">{formatKwanza(capitalDivida)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-100 pb-2">
                    <span>{tc("juros_mora")}:</span>
                    <span className="font-bold text-red-700">+{formatKwanza(jurosResult.jurosAcumulados)}</span>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-slate-900 font-serif text-sm">
                    <span className="font-bold">{tc("total_amortizar")}:</span>
                    <span className="font-bold text-[#991b1b] text-base">{formatKwanza(jurosResult.montanteTotal)}</span>
                  </div>

                  <div className="bg-slate-100 border border-slate-200 text-slate-600 p-2 text-[10px] leading-relaxed rounded font-serif mt-2">
                    {tc("nota_juros")}
                  </div>

                  <a
                    href={`https://wa.me/244923000000?text=${encodeURIComponent(`Olá! Realizei uma simulação na Calculadora de Juros e Dívidas do Direito Fácil Angola. O valor total calculado para amortizar é de *${formatKwanza(jurosResult.montanteTotal)}* (dos quais *${formatKwanza(jurosResult.jurosAcumulados)}* são juros de mora). Gostaria de obter ajuda profissional para contestar ou cobrar esta dívida!`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-750 hover:brightness-110 active:scale-95 text-white rounded font-sans font-bold text-[11px] uppercase tracking-wide transition shadow-sm hover:shadow cursor-pointer text-center mt-2.5"
                  >
                    💬 Tirar Dúvidas no WhatsApp
                  </a>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <Coins className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-slate-500 text-xs font-serif italic">{tc("aviso_juros")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: INDEMNIZAÇÃO POR ATRASO SALARIAL */}
        {activeTab === "atraso" && (
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                {tc("atraso_title")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tc("atraso_desc")}
              </p>

              <form onSubmit={handleCalculateAtraso} className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("salario_liquido")}</label>
                  <input
                    type="number"
                    value={salarioMensalAtraso}
                    onChange={(e) => setSalarioMensalAtraso(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{tc("dias_atraso")}</label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={diasAtraso}
                    onChange={(e) => setDiasAtraso(Number(e.target.value))}
                    className="w-full p-3 border border-slate-200 focus:ring-2 focus:ring-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl bg-slate-50/55 text-slate-900 text-sm outline-none transition-all duration-300 hover:border-slate-300 font-medium"
                    required
                  />
                  <span className="text-[10px] text-slate-550 mt-0.5 font-medium">{tc("dias_vencimento")}</span>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 py-3.5 bg-gradient-to-r from-[#0b1426] via-[#101b33] to-[#0b1426] hover:brightness-110 active:scale-[0.99] text-white font-serif rounded-xl font-bold tracking-wider text-xs uppercase mt-3 transition duration-300 cursor-pointer shadow-md select-none border-b-2 border-slate-950"
                >
                  {tc("btn_calcular_atraso")}
                </button>
              </form>
            </div>

            {/* delayed wages calculation output feedback */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col gap-4">
              <h5 className="font-serif font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                {tc("sentenca_indemnizacao")}
              </h5>

              {calculatedAtraso ? (
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("salario_regular")}:</span>
                    <span className="font-bold text-slate-900">{formatKwanza(salarioMensalAtraso)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>{tc("taxa_atraso")}:</span>
                    <span className="font-bold text-red-650">{atrasoResult.taxaPercentagem}%</span>
                  </div>

                  <div className="flex justify-between items-center text-red-700 border-b border-slate-100 pb-3">
                    <span>{tc("indem_devida")}:</span>
                    <span className="font-bold flex items-center">+{formatKwanza(atrasoResult.indemnizacaoArredondada)}</span>
                  </div>

                  <div className="pt-1 flex justify-between items-center text-slate-900 font-serif text-sm">
                    <span className="font-bold">{tc("total_receber")}:</span>
                    <span className="font-bold text-[#991b1b] text-base">{formatKwanza(atrasoResult.totalAReceber)}</span>
                  </div>

                  {atrasoResult.atrasoGrave ? (
                    <div className="bg-red-50 border border-red-200 text-red-900 p-2 px-2.5 text-[10px] leading-relaxed rounded font-serif mt-2 flex gap-1 items-start">
                      <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                      <div>
                        {tc("atraso_grave_alerta")}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-100 border border-slate-200 text-slate-500 p-2 text-[10px] leading-relaxed rounded font-serif mt-2">
                      {tc("atraso_leve_alerta")}
                    </div>
                  )}

                  <a
                    href={`https://wa.me/244923000000?text=${encodeURIComponent(`Olá! Realizei uma simulação na Calculadora de Atraso Salarial de Angola do portal Direito Fácil Angola. A multa indemnizatória estimada foi de *${formatKwanza(atrasoResult.indemnizacaoArredondada)}*, totalizando *${formatKwanza(atrasoResult.totalAReceber)}* a receber. Gostaria de obter assistência técnica estratégica profissional!`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-750 hover:brightness-110 active:scale-95 text-white rounded font-sans font-bold text-[11px] uppercase tracking-wide transition shadow-sm hover:shadow cursor-pointer text-center mt-2.5"
                  >
                    💬 Tirar Dúvidas no WhatsApp
                  </a>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <Clock className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-slate-500 text-xs font-serif italic">{tc("aviso_atraso")}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Dynamic CTA Banner focusing the reader on booking a lawyer */}
      <div className="bg-[#5c0608] text-white p-6 border-t-2 border-t-white/10 border-l-4 border-l-[#da291c] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h5 className="font-serif font-bold text-white text-sm md:text-base flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            {tc("cta_title")}
          </h5>
          <p className="text-xs text-red-100/90 max-w-xl font-sans leading-relaxed">
            {tc("cta_desc")}
          </p>
        </div>
        <button
          onClick={() => {
            const headerBtn = document.getElementById("nav-diagnosis-btn");
            if (headerBtn) headerBtn.click();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-[#5c0608] rounded font-serif font-black text-xs uppercase transition tracking-wider shrink-0 cursor-pointer text-center shadow-md hover:scale-102"
        >
          {tc("cta_btn")}
        </button>
      </div>

      {/* Accordion list of detailed legal references */}
      <div className="bg-slate-50 border-t border-slate-200 p-5 px-6 font-serif text-xs md:text-sm text-slate-600 flex flex-col gap-2.5">
        <h5 className="font-bold text-[#991b1b] flex items-center gap-1">
          <Info className="w-4 h-4 text-[#991b1b]" /> {tc("fontes_titulo")}
        </h5>
        <ul className="list-disc pl-5 flex flex-col gap-1 text-slate-500 text-[11px] leading-relaxed">
          <li>{tc("fontes_trabalho")}</li>
          <li>{tc("fontes_pensao")}</li>
          <li>{tc("fontes_civil")}</li>
        </ul>
      </div>

    </div>
  );
}
