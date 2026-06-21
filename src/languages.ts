export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "pt", name: "Português", nativeName: "Português", flag: "🇦🇴" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "um", name: "Umbundu", nativeName: "Umbundu (Língua Nacional)", flag: "🇦🇴" },
  { code: "ki", name: "Kimbundu", nativeName: "Kimbundu (Língua Nacional)", flag: "🇦🇴" },
  { code: "ar", name: "Árabe", nativeName: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "Mandarim", nativeName: "中文 (普通话)", flag: "🇨🇳" },
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    app_title: "Direito Fácil Angola",
    app_subtitle: "Portal Informativo de Orientação Legal e Simuladores sob as Leis de Angola",
    jurisdiction_label: "Jurisdição Oficial",
    jurisdiction_value: "Huíla | Angola",
    nav_diagnosis: "Diagnóstico de Casos AI",
    nav_calculators: "Calculadoras Jurídicas",
    nav_admin: "Acesso Administrador",
    choose_another: "escolher outra área",
    welcome_title_start: "Está a deixar",
    welcome_title_mid1: "dinheiro",
    welcome_title_mid2: "ou",
    welcome_title_mid3: "proteção",
    welcome_title_end: "para trás?",
    welcome_subtitle: "Muitos cidadãos em Angola perdem prazos cruciais de reclamação ou desistem de indemnizações devidas por pura falta de esclarecimento prático sobre a lei LGT (Lei n.º 12/23) e Código Civil. Nós traduzimos as regras para o seu problema.",
    discover_rights_btn: "Descobrir Seus Direitos Agora",
    tag_free: "⚡ 100% Gratuito",
    tag_secure: "🔒 Seguro e Confidencial",
    tag_laws: "📚 Código de Angola de 2026",
    viewing_areas_label: "Está a visualizar as áreas do quotidiano de Angola. Seleccione a que coincide com o seu problema:",
    back_to_home_btn: "← Voltar Geral",
    select_problem_title: "⚖️ Seleccione a Sua Área de Dúvida",
    real_problem_question: "Qual é o seu problema prático no dia-a-dia?",
    choose_option_desc: "Não precisa de conhecer os artigos ou termos complexos da lei angolana. Escolha a opção correspondente ao seu problema real para saber o enquadramento simplificado e os seus direitos:",
    evaluate_case_btn: "Avaliar meu caso →",
    important_disclaimer_title: "Aviso Importante aos Utilizadores",
    important_disclaimer_desc: "O diagnóstico jurídico preliminar é computacional e serve apenas fins didáticos e informativos. Muitas normas em Angola sofrem mutações ou carecem de produção de prova regulamentar. Para representação oficial ou parecer definitivo, contacte os gabinetes oficiais e as delegações locais da Ordem dos Advogados de Angola (OAA) ou os serviços jurídicos do IPAJ.",
    sidebar_about_title: "Legislação de Angola",
    sidebar_about_desc: "A Constituição da República de Angola (CRA) estabelece as bases invioláveis de acesso ao direito, igualdade e tutela jurisdicional efectiva (Artigo 29.º). Este portal aproxima o cidadão comum da interpretação jurídica básica de forma inteiramente acessível.",
    sidebar_inst_title: "Instituições e Apoio Oficial",
    inst_oaa_title: "Ordem dos Advogados (OAA)",
    inst_oaa_desc: "Emissão de cédulas profissionais e consulta oficial de advogados inscritos.",
    inst_ipaj_title: "IPAJ (Assistência Gratuita)",
    inst_ipaj_desc: "Patrocínio judiciário gratuito facultado pelo Estado angolano a pessoas carenciadas.",
    inst_igt_title: "IGT (Inspecção do Trabalho)",
    inst_igt_desc: "Mediação e reclamações relativas a irregularidades ou despedimentos abusivos.",
    footer_disclaimer_title: "Aviso de Isenção de Responsabilidade Legal:",
    footer_disclaimer_desc: "A legislação da República de Angola encontra-se em constante evolução. As análises básicas geradas eletronicamente por inteligência artificial constituem meros relatórios de orientação provisória informativa. É expressamente obrigatória a consulta oficial e validação jurídica perante advogados inscritos na Ordem dos Advogados de Angola (OAA) ou órgãos competentes antes de qualquer decisão contenciosa ou voluntária.",
    footer_rights: "Todos os direitos reservados de acordo com a Constituição da República de Angola.",
    history_box_title: "Histórico de Avaliações Recentes",
    history_box_empty: "Nenhum histórico local guardado ainda.",
    history_box_clear: "Limpar Histórico",
    history_card_by: "Caso de",
    history_card_open: "Abrir Diagnóstico",
    form_required_alert: "Este campo é de preenchimento obrigatório.",
    step_loading_0: "A processar os factos introduzidos...",
    step_loading_1: "A analisar o nexo de causalidade jurídico...",
    step_loading_2: "A consultar o acervo da Assembleia Nacional de Angola...",
    step_loading_3: "A enquadrar na Lei Geral do Trabalho (LGT) e Código Civil...",
    step_loading_4: "A redigir o diagnóstico e recomendações preliminares...",
    contact_required_title: "Dados de Contacto Necessários",
    contact_required_desc: "Para garantir a autenticidade e coordenar a triagem e apoio oficial perante os conselhos, precisamos de preencher o seu contacto antes de aceder ao diagnóstico inteligente de Angola.",
    contact_full_name: "Nome Completo",
    contact_phone_whatsapp: "Telefone / WhatsApp",
    contact_btn_proceed: "Confirmar e Obter Relatório",
    resumo_declarado: "Resumo do Histórico Declarado",
    recomended_next_step: "🎯 Próximo Passo Recomendado",
    confirm_situation: "Confirmar a Minha Situação Jurídica",
    confirm_situation_desc: "A avaliação preliminar identificou possíveis direitos e valores reclamáveis. Para confirmar os cálculos, analisar os documentos e definir a melhor estratégia jurídica, um advogado inscrito na Ordem dos Advogados de Angola pode realizar uma análise oficial do seu caso.",
    achieve_list_title: "Ao solicitar a análise oficial, receberá:",
    achieve_1: "Revisão jurídica por advogado credenciado",
    achieve_2: "Verificação dos valores estimados",
    achieve_3: "Análise das provas disponíveis",
    achieve_4: "Identificação de riscos e prazos legais",
    achieve_5: "Plano de ação recomendado",
    achieve_6: "Orientação sobre negociação ou processo judicial",
    form_lead_title: "Solicitar Plano de Apoio Estratégico",
    form_lead_desc: "Informe o seu contacto para que possamos coordenar um suporte confidencial com advogados com cédula OAA.",
    form_lead_btn_send: "Solicitar Apoio do Advogado",
    form_lead_success: "🎉 Pedido Recebido com Sucesso!",
    form_lead_success_desc: "Os seus factos declarados foram sincronizados com a triagem interna. Um advogado ou técnico associado entrará em contacto muito em breve pelo número indicado.",
    calculator_tab_laboral: "Cálculo Laboral",
    calculator_tab_arrendamento: "Arrendamento",
    calculator_tab_familia: "Família e Alimentos",
    calculator_not_enrolled: "Nenhuma calculadora neste âmbito",
    welcome_lang_title: "Selecione o seu Idioma / Choose your Language",
    welcome_lang_desc: "Bem-vindo ao portal Direito Fácil Angola. Escolha o seu idioma oficial ou nacional para iniciar a consulta inteligente simplificada de direitos.",
    welcome_lang_btn: "Iniciar Aplicação / Start Application",
    oaa_urgency_title: "Urgência Legítima",
    oaa_urgency_desc: "Alguns direitos podem estar sujeitos a prazos legais de reclamação. Uma análise atempada ajuda a preservar as opções disponíveis para o seu caso.",
    citizens_count_social_proof: "Centenas de cidadãos já utilizaram o Direito Fácil Angola para compreender melhor os seus direitos e preparar consultas jurídicas.",
    whatsapp_availability: "Disponibilidade imediata para contacto via WhatsApp",
    solicitar_contacto_title: "Solicitar Contacto / Consultoria OAA",
    identificacao_obrigatoria_title: "Identificação Obrigatória",
    identificacao_obrigatoria_desc: "Antes de proceder para a Avaliação Preliminar ou para os Cálculos Proporcionais, a nossa plataforma exige que forneça as seguintes coordenadas de contacto:",
    contact_privacy_guarantee: "Garantia de Privacidade: Nos termos do Artigo 29.º da CRA (Constituição de Angola), os seus dados de contacto serão guardados localmente com total segurança e confidencialidade.",
    cancelar: "Cancelar",
    confirmar_prosseguir: "Confirmar e Prosseguir",
    oficial_framework: "Enquadramento Regulador Oficial",
    seleccione_opcao: "-- Seleccione uma opção --",
    gerar_avaliacao_btn: "Gerar Avaliação Preliminar",
    analise_em_curso: "Análise do Tribunal em Curso...",
    lavrando_acordao_loader: "Lavrando Acórdão Preliminar",
    analise_baseada_loader: "Análise baseada na Legislação de Angola",
    aviso_responsabilidade_title: "Aviso de Isenção de Responsabilidade Legal",
    aviso_responsabilidade_desc: "A legislação da República de Angola encontra-se em constante evolução. As análises básicas geradas eletronicamente por inteligência artificial constituem meros relatórios de orientação provisória informativa. É expressamente obrigatória a consulta oficial e validação jurídica perante advogados inscritos na Ordem dos Advogados de Angola (OAA) ou órgãos competentes antes de qualquer decisão contenciosa ou voluntária.",
    todos_direitos_reservados: "Todos os direitos reservados de acordo com a Constituição da República de Angola.",
    hist_diagnostico_userName: "Relatório Legislativo de",
    guardar_txt: "Guardar TXT",
    imprimir: "Imprimir",
    errors_nome_required: "O nome completo é obrigatório.",
    errors_telefone_required: "O contacto de telefone/WhatsApp é obrigatório.",
    errors_telefone_invalid: "Insira um número de telefone válido com pelo menos 9 dígitos.",
    iniciar_nova_consulta_btn: "Iniciar Nova Consulta",
    id_diagnostico_prefix: "ID Diagnóstico:",
    alert_required_fields_popup: "Por Favor, preencha todos os campos obrigatórios primeiro.",
    alert_callback_empty_fields: "Por favor, preencha o seu Nome Completo e o seu contacto WhatsApp / Telefone.",
    admin_header_title: "Portal de Administração e Advocacia Angola Legal",
    admin_dra_prefix: "Dr(a).",
    admin_citizen_panel: "Painel do Cidadão",
    admin_logout: "Encerrar Sessão",
    admin_area_registered: "Área Administrativa Registrada",
    admin_area_desc: "Gestão integrada de fichas de atendimento jurídicos emitidos por cidadãos em Angola.",
    admin_professional_email: "E-mail Profissional",
    admin_access_pwd: "Senha de Acesso",
    admin_access_pwd_placeholder: "Introduza a sua senha",
    admin_authenticate_btn: "Autenticar Conta",
    admin_default_creds: "Credenciais Padrão de Administração:",
    admin_total_cases: "Total de Casos Recebidos",
    admin_pre_qualified_ia: "Pre-qualificados por IA",
    admin_leads_pending: "Leads Pendentes de Triagem",
    admin_awaits_contact: "Aguarda primeiro contacto",
    admin_active_handling: "Em Acompanhamento Ativo",
    admin_contacted_scheduled: "Contactados ou agendados",
    admin_total_claims_estimates: "Estimativas Reclamáveis totais",
    admin_portfolio_potential: "Potencial da Carteira",
    admin_tab_cases: "Casos & Triagem",
    admin_tab_admins: "Gestão de Administradores",
    admin_tab_metrics: "Métricas & Configuração",
    admin_leads_portfolio: "Carteira de Casos / Leads de Contacto",
    admin_seed_demos: "Carregar Casos Exemplo",
    admin_search_placeholder: "Procurar nome ou fone...",
    admin_filter_statuses_all: "Estados: Todos",
    admin_filter_status_pending: "Status: Pendente",
    admin_filter_status_contact: "Status: Em Contacto",
    admin_filter_status_scheduled: "Status: Agendado",
    admin_filter_status_done: "Status: Concluído",
    admin_filter_status_archived: "Status: Arquivado",
    admin_filter_laws_all: "Matéria: Todas",
    admin_filter_law_labor: "Direito do Trabalho",
    admin_filter_law_lease: "Imobiliário/Arrendamento",
    admin_filter_law_family: "Família e Sucessões",
    admin_filter_law_consumer: "Direitos do Consumidor",
    admin_filter_law_general: "Dúvidas Gerais",
  },
  en: {
    app_title: "Easy Law Angola",
    app_subtitle: "Informative Legal Guidance Portal and Simulators under the Laws of Angola",
    jurisdiction_label: "Official Jurisdiction",
    jurisdiction_value: "Huila | Angola",
    nav_diagnosis: "AI Case Diagnosis",
    nav_calculators: "Legal Calculators",
    nav_admin: "Admin Access",
    choose_another: "choose another area",
    welcome_title_start: "Are you leaving",
    welcome_title_mid1: "money",
    welcome_title_mid2: "or",
    welcome_title_mid3: "protection",
    welcome_title_end: "behind?",
    welcome_subtitle: "Many citizens in Angola miss crucial filing deadlines or surrender compensation due to lack of practical legal clarity regarding the General Labor Law (Law 12/23) and Civil Code. We translate the laws for your case.",
    discover_rights_btn: "Discover Your Rights Now",
    tag_free: "⚡ 100% Free",
    tag_secure: "🔒 Secure & Confidential",
    tag_laws: "📚 Angola Code of 2026",
    viewing_areas_label: "You are viewing typical legal areas in Angola. Select the one that matches your dispute:",
    back_to_home_btn: "← Back to Home",
    select_problem_title: "⚖️ Select Your Area of Dispute",
    real_problem_question: "What is your main daily issue?",
    choose_option_desc: "You don't need to know complex articles or terms of Angolan law. Choose the option corresponding to your actual situation to understand core rights and simplified scope:",
    evaluate_case_btn: "Evaluate my case →",
    important_disclaimer_title: "Important Notice for Users",
    important_disclaimer_desc: "The preliminary legal diagnosis is computerized and serves strictly educational and informational purposes. Many regulations in Angola undergo revisions or require regulatory evidence. For official representation or formal advice, contact local counsels of the Angola Bar Association (OAA) or IPAJ legal services.",
    sidebar_about_title: "Angolan Legislation",
    sidebar_about_desc: "The Constitution of the Republic of Angola (CRA) establishes the inviolable foundations of access to law, equality, and effective judicial protection (Article 29). This portal brings citizens closer to basic legal interpretation in an entirely accessible manner.",
    sidebar_inst_title: "Official Support & Institutions",
    inst_oaa_title: "Angola Bar Association (OAA)",
    inst_oaa_desc: "Issuance of professional licenses and official directory of registered bar lawyers.",
    inst_ipaj_title: "IPAJ (Free Legal Aid)",
    inst_ipaj_desc: "Free legal defense provided by the Angolan State to low-income and vulnerable persons.",
    inst_igt_title: "IGT (Labor General Inspection)",
    inst_igt_desc: "Mediation and claims concerning irregularities or abusive workplace dismissals.",
    footer_disclaimer_title: "Legal Disclaimer:",
    footer_disclaimer_desc: "The legislation of the Republic of Angola is in constant evolution. Basic summaries electronically generated by artificial intelligence serve as preliminary informative indicators. Formal consultation and legal validation by lawyers registered in the Angola Bar Association (OAA) are mandatory before any contentious or voluntary decision.",
    footer_rights: "All rights reserved in accordance with the Constitution of the Republic of Angola.",
    history_box_title: "Recent Assessments History",
    history_box_empty: "No local assessment history stored yet.",
    history_box_clear: "Clear History",
    history_card_by: "Case of",
    history_card_open: "Open Diagnosis",
    form_required_alert: "This field is required.",
    step_loading_0: "Processing entered facts...",
    step_loading_1: "Analyzing legal causation...",
    step_loading_2: "Querying the National Assembly of Angola database...",
    step_loading_3: "Mapping within the General Labor Law (LGT) and Civil Code...",
    step_loading_4: "Drafting diagnosis and preliminary recommendations...",
    contact_required_title: "Contact Details Required",
    contact_required_desc: "To ensure accuracy and coordinate official support, please enter your contact info before accessing the intelligent legal diagnostic report.",
    contact_full_name: "Full Name",
    contact_phone_whatsapp: "Phone / WhatsApp",
    contact_btn_proceed: "Confirm and Get Report",
    resumo_declarado: "Summary of Declared Circumstances",
    recomended_next_step: "🎯 Recommended Next Step",
    confirm_situation: "Validate My Legal Situation Officialy",
    confirm_situation_desc: "The preliminary assessment identified potential damages and rights. To certify calculations, analyze documents, and specify the optimal strategy, an attorney registered in the Angola Bar Association (OAA) must perform an official case review.",
    achieve_list_title: "By requesting an official legal review, you'll receive:",
    achieve_1: "In-depth legal review by an enrolled attorney",
    achieve_2: "Certification of estimated compensation amounts",
    achieve_3: "Review of available proofs and evidence",
    achieve_4: "Identification of procedural risks and deadlines",
    achieve_5: "Actionable legal strategy roadmap",
    achieve_6: "Mediation/litigation guidance in Angolan courts",
    form_lead_title: "Request Strategic Support Plan",
    form_lead_desc: "Provide your details so we can coordinate confidential assistance with authorized OAA attorneys.",
    form_lead_btn_send: "Request Lawyer Support",
    form_lead_success: "🎉 Request Successfully Placed!",
    form_lead_success_desc: "Your declared file has been linked to our secure internal triage. An associate lawyer or representative will contact you shortly.",
    calculator_tab_laboral: "Labor Calculation",
    calculator_tab_arrendamento: "Urban Leasing",
    calculator_tab_familia: "Family and Alimony",
    calculator_not_enrolled: "No calculator matching this category",
    welcome_lang_title: "Select your Language / Selecione o seu Idioma",
    welcome_lang_desc: "Welcome to the Easy Law Angola portal. Please choose your language to initiate the simplified smart legal consultation.",
    welcome_lang_btn: "Start Application / Iniciar",
    oaa_urgency_title: "Legitimate Urgency",
    oaa_urgency_desc: "Some rights may be subject to legal filing deadlines. A timely analysis helps preserve the options available for your case.",
    citizens_count_social_proof: "Hundreds of citizens have already used Easy Law Angola to better understand their rights and prepare for legal consults.",
    whatsapp_availability: "Immediate availability for WhatsApp contact",
    solicitar_contacto_title: "Request Contact / OAA Consultation",
    identificacao_obrigatoria_title: "Mandatory Identification",
    identificacao_obrigatoria_desc: "Before proceeding to the Preliminary Assessment or Proportional Calculations, our platform requires you to provide the following contact coordinates:",
    contact_privacy_guarantee: "Privacy Guarantee: Under Article 29 of the CRA (Constitution of Angola), your contact details will be saved locally with total security and confidentiality.",
    cancelar: "Cancel",
    confirmar_prosseguir: "Confirm and Proceed",
    oficial_framework: "Official Regulatory Framework",
    seleccione_opcao: "-- Select an option --",
    gerar_avaliacao_btn: "Generate Preliminary Assessment",
    analise_em_curso: "Court Analysis in Progress...",
    lavrando_acordao_loader: "Drafting Preliminary Verdict",
    analise_baseada_loader: "Analysis based on Angolan Legislation",
    aviso_responsabilidade_title: "Legal Disclaimer Notice",
    aviso_responsabilidade_desc: "The legislation of the Republic of Angola is in constant evolution. Basic summaries electronically generated by artificial intelligence serve as preliminary informative indicators. Formal consultation and legal validation by lawyers registered in the Angola Bar Association (OAA) are mandatory before any contentious or voluntary decision.",
    todos_direitos_reservados: "All rights reserved in accordance with the Constitution of the Republic of Angola.",
    hist_diagnostico_userName: "Legislative Report of",
    guardar_txt: "Save TXT",
    imprimir: "Print",
    errors_nome_required: "Full name is required.",
    errors_telefone_required: "Phone/WhatsApp contact is required.",
    errors_telefone_invalid: "Enter a valid phone number with at least 9 digits.",
    iniciar_nova_consulta_btn: "Start New Consultation",
    id_diagnostico_prefix: "Diagnosis ID:",
    alert_required_fields_popup: "Please, fill in all required fields first.",
    alert_callback_empty_fields: "Please, fill in your Full Name and your WhatsApp / Phone contact.",
    admin_header_title: "Administration & Advocacy Portal Easy Law Angola",
    admin_dra_prefix: "Atty.",
    admin_citizen_panel: "Citizen Portal",
    admin_logout: "Log Out",
    admin_area_registered: "Registered Administration Area",
    admin_area_desc: "Integrated management of legal client intake files submitted by citizens in Angola.",
    admin_professional_email: "Professional Email",
    admin_access_pwd: "Access Password",
    admin_access_pwd_placeholder: "Enter your password",
    admin_authenticate_btn: "Authenticate Account",
    admin_default_creds: "Default Admin Credentials:",
    admin_total_cases: "Total Received Cases",
    admin_pre_qualified_ia: "AI Pre-qualified",
    admin_leads_pending: "Leads Pending Review",
    admin_awaits_contact: "Awaiting initial contact",
    admin_active_handling: "Under Active Review",
    admin_contacted_scheduled: "Contacted or scheduled",
    admin_total_claims_estimates: "Total Claim Estimates",
    admin_portfolio_potential: "Portfolio Potential",
    admin_tab_cases: "Cases & Triage",
    admin_tab_admins: "Administrators Management",
    admin_tab_metrics: "Metrics & Configuration",
    admin_leads_portfolio: "Cases Portfolio / Contact Leads",
    admin_seed_demos: "Load Sample Cases",
    admin_search_placeholder: "Search name or phone...",
    admin_filter_statuses_all: "Statuses: All",
    admin_filter_status_pending: "Status: Pending",
    admin_filter_status_contact: "Status: Under Contact",
    admin_filter_status_scheduled: "Status: Scheduled",
    admin_filter_status_done: "Status: Completed",
    admin_filter_status_archived: "Status: Archived",
    admin_filter_laws_all: "Subject: All",
    admin_filter_law_labor: "Labor Law",
    admin_filter_law_lease: "Real Estate/Leasing",
    admin_filter_law_family: "Family & Inheritances",
    admin_filter_law_consumer: "Consumer Rights",
    admin_filter_law_general: "General Queries",
  },
  fr: {
    app_title: "Droit Facile Angola",
    app_subtitle: "Portail d'orientation juridique informative et simulateurs sous les lois de l'Angola",
    jurisdiction_label: "Juridiction Officielle",
    jurisdiction_value: "Huila | Angola",
    nav_diagnosis: "Diagnostic de Cas IA",
    nav_calculators: "Simulateurs Juridiques",
    nav_admin: "Accès Admin",
    choose_another: "choisir une autre matière",
    welcome_title_start: "Laissez-vous de",
    welcome_title_mid1: "l'argent",
    welcome_title_mid2: "ou de la",
    welcome_title_mid3: "protection",
    welcome_title_end: "derrière vous ?",
    welcome_subtitle: "De nombreux citoyens en Angola ratent d'importants délais légaux ou renoncent à des indemnités par manque d'explications simples concernant la loi LGT (Loi 12/23) et le Code civil. Nous interprétons le droit pour vous.",
    discover_rights_btn: "Découvrir Vos Droits Maintenant",
    tag_free: "⚡ 100% Gratuit",
    tag_secure: "🔒 Sécurisé & Confidentiel",
    tag_laws: "📚 Réglementations d'Angola 2026",
    viewing_areas_label: "Vous visualisez les domaines courants en Angola. Choisissez celui qui correspond à votre litige :",
    back_to_home_btn: "← Retour Général",
    select_problem_title: "⚖️ Sélectionnez Votre Domaine de Litige",
    real_problem_question: "Quel est votre problème principal au quotidien ?",
    choose_option_desc: "Nul besoin de maîtriser les articles ou termes complexes de la loi angolaise. Choisissez l'option correspondant à votre situation pour comprendre les bases de vos droits :",
    evaluate_case_btn: "Analyser mon dossier →",
    important_disclaimer_title: "Avis Important aux Utilisateurs",
    important_disclaimer_desc: "Le diagnostic juridique préliminaire est automatisé et sert exclusivement des buts d'apprentissage et d'information générale. De nombreuses normes en Angola subissent des modifications constantes. Pour un soutien ou avis officiel, contactez le Barreau d'Angola (OAA) ou l'IPAJ.",
    sidebar_about_title: "Législation d'Angola",
    sidebar_about_desc: "La Constitution de la République d'Angola (CRA) établit les fondements inviolables de l'accès au droit, de l'égalité et de la protection judiciaire effective (Article 29). Ce portail rapproche le citoyen de l'interprétation légale.",
    sidebar_inst_title: "Aide Officiel & Institutions",
    inst_oaa_title: "Ordre des Avocats d'Angola (OAA)",
    inst_oaa_desc: "Délivrance de licences et annuaire officiel des avocats inscrits au barreau nacional.",
    inst_ipaj_title: "IPAJ (Aide Juridique Gratuite)",
    inst_ipaj_desc: "Défense d'office et assistance gratuite accordée par l'État aux personnes à faibles revenus.",
    inst_igt_title: "IGT (Inspection Générale du Travail)",
    inst_igt_desc: "Médiation et plaintes concernant les abus ou licenciements abusifs au travail.",
    footer_disclaimer_title: "Avis d'Exclusion de Responsabilité :",
    footer_disclaimer_desc: "La législation angolaise évolue en permanence. Les résumés de cas générés électroniquement constituent uniquement des rapports d'orientation provisoires. Une consultation légale auprès d'un avocat certifié par l'OAA est obligatoire avant toute décision contentieuse.",
    footer_rights: "Tous droits réservés conformément à la Constitution de la République d'Angola.",
    history_box_title: "Historique des Évaluations",
    history_box_empty: "Aucun historique local disponible pour le moment.",
    history_box_clear: "Effacer l'Historique",
    history_card_by: "Dossier de",
    history_card_open: "Ouvrir l'Analyse",
    form_required_alert: "Ce champ est obligatoire.",
    step_loading_0: "Traitement des faits saisis...",
    step_loading_1: "Analyse du lien de causalité juridique...",
    step_loading_2: "Consultation de la base de l'Assemblée Nationale...",
    step_loading_3: "Intégration selon la Loi du Travail (LGT) et le Code Civil...",
    step_loading_4: "Rédaction des conclusions d'orientation légale...",
    contact_required_title: "Coordonnées de Contact Requises",
    contact_required_desc: "Afin de garantir l'exactitude des données et organiser le soutien, merci d'entrer vos coordonnées avant d'accéder au rapport intelligent.",
    contact_full_name: "Nom Complet",
    contact_phone_whatsapp: "Téléphone / WhatsApp",
    contact_btn_proceed: "Confirmer et Afficher le Rapport",
    resumo_declarado: "Résumé des Faits Déclarés",
    recomended_next_step: "🎯 Prochaine Étape Recommandée",
    confirm_situation: "Confirmer Officiellement Ma Situation",
    confirm_situation_desc: "L'analyse préliminaire a détecté d'éventuels droits d'indemnisation. Pour valider les montants, analyser les pièces et mettre en place une stratégie solide, seul un avocat agréé par l'OAA est compétent.",
    achieve_list_title: "En sollicitant une consultation d'avocat, vous obtiendrez :",
    achieve_1: "Revue juridique complète par un avocat assermenté",
    achieve_2: "Vérification stricte de vos estimations financières",
    achieve_3: "Analyse des éléments de preuve recueillis",
    achieve_4: "Identification des risques législatifs et des délais",
    achieve_5: "Plan d'action stratégique personnalisé",
    achieve_6: "Médiation d'accords amiables ou représentation judiciaire",
    form_lead_title: "Demander Un Support Confidentiel",
    form_lead_desc: "Soumettez vos coordonnées afin de faciliter une entrevue avec des avocats certifiés.",
    form_lead_btn_send: "Solliciter le soutien d'un avocat",
    form_lead_success: "🎉 Demande déposée avec succès !",
    form_lead_success_desc: "Votre dossier a été transmis à la cellule juridique d'orientation confidentielle. Un collaborateur prendra contact d'ici peu.",
    calculator_tab_laboral: "Calcul Travail",
    calculator_tab_arrendamento: "Baux Urbains",
    calculator_tab_familia: "Famille & Pension",
    calculator_not_enrolled: "Aucun simulateur de cette catégorie",
    welcome_lang_title: "Choisissez votre langue / Select your Language",
    welcome_lang_desc: "Bienvenue sur le portail Droit Facile Angola. Choisissez votre langue afin de démarrer l'orientation légale simplifiée.",
    welcome_lang_btn: "Lancer l'Application / Start",
    oaa_urgency_title: "Urgence Légitime",
    oaa_urgency_desc: "Certains droits peuvent être soumis à des délais légaux de réclamation. Une analyse rapide aide à préserver les options disponibles pour votre dossier.",
    citizens_count_social_proof: "Des centaines de citoyens ont déjà utilisé Droit Facile Angola pour mieux comprendre leurs droits et préparer leurs consultations juridiques.",
    whatsapp_availability: "Disponibilité immédiate pour contact via WhatsApp",
    solicitar_contacto_title: "Demander un Contact / Consultation OAA",
    identificacao_obrigatoria_title: "Identification Obligatoire",
    identificacao_obrigatoria_desc: "Avant de procéder à l'Évaluation Préliminaire ou aux Calculs Proportionnels, notre plateforme exige que vous fournissiez les coordonnées de contact suivantes :",
    contact_privacy_guarantee: "Garantia de Privacidade: Conformément à l'article 29 de la CRA (Constitution de l'Angola), vos coordonnées seront conservées localement en toute sécurité.",
    cancelar: "Annuler",
    confirmar_prosseguir: "Confirmer et Continuer",
    oficial_framework: "Cadre Réglementaire Officiel",
    seleccione_opcao: "-- Sélectionnez une option --",
    gerar_avaliacao_btn: "Générer l'Évaluation Préliminaire",
    analise_em_curso: "Analyse du Tribunal en cours...",
    lavrando_acordao_loader: "Rédaction du Verdict Préliminaire",
    analise_baseada_loader: "Analyse basée sur la Législation de l'Anjou",
    aviso_responsabilidade_title: "Clause d'Exclusion de Responsabilité",
    aviso_responsabilidade_desc: "La législation angolaise évolue en permanence. Les résumés de cas générés électroniquement constituent uniquement des rapports d'orientation provisoires. Une consultation légale auprès d'un avocat certifié par l'OAA est obligatoire avant toute décision contentieuse.",
    todos_direitos_reservados: "Tous droits réservés conformément à la Constitution de la République d'Angola.",
    hist_diagnostico_userName: "Rapport Législatif de",
    guardar_txt: "Enregistrer TXT",
    imprimir: "Imprimer",
    errors_nome_required: "Le nom complet est obligatoire.",
    errors_telefone_required: "Le contact de téléphone/WhatsApp est obligatoire.",
    errors_telefone_invalid: "Entrez un numéro de téléphone valide avec au moins 9 chiffres.",
    iniciar_nova_consulta_btn: "Démarrer une Nouvelle Consultation",
    id_diagnostico_prefix: "ID Diagnostic :",
    alert_required_fields_popup: "Veuillez d'abord remplir tous les champs obligatoires.",
    alert_callback_empty_fields: "Veuillez remplir votre nom complet et votre contact WhatsApp / Téléphone.",
    admin_header_title: "Portail d'Administration et Avocats Droit Facile",
    admin_dra_prefix: "Me",
    admin_citizen_panel: "Portail Citoyen",
    admin_logout: "Se déconnecter",
    admin_area_registered: "Espace d'Administration Enregistré",
    admin_area_desc: "Gestion intégrée des fiches clients d'orientation juridique émise par les citoyens en Angola.",
    admin_professional_email: "E-mail Professionnel",
    admin_access_pwd: "Mot de passe d'accès",
    admin_access_pwd_placeholder: "Saisissez votre mot de passe",
    admin_authenticate_btn: "Authentifier le Compte",
    admin_default_creds: "Identifiants d'Administration Standards :",
    admin_total_cases: "Total des Dossiers Reçus",
    admin_pre_qualified_ia: "Pré-qualifiés par l'IA",
    admin_leads_pending: "Fiches en Attente de Tri",
    admin_awaits_contact: "En attente du premier contact",
    admin_active_handling: "En Suivi Actif",
    admin_contacted_scheduled: "Contactés ou planifiés",
    admin_total_claims_estimates: "Estimations de Réclamation Totale",
    admin_portfolio_potential: "Potentiel du Portefeuille",
    admin_tab_cases: "Casos & Triagem",
    admin_tab_admins: "Gestion des Administrateurs",
    admin_tab_metrics: "Métriques & Configuration",
    admin_leads_portfolio: "Portefeuille de Casos / Fiches de Contact",
    admin_seed_demos: "Charger Exemples de Casos",
    admin_search_placeholder: "Chercher nom ou tél...",
    admin_filter_statuses_all: "États : Tous",
    admin_filter_status_pending: "Statut : En Attente",
    admin_filter_status_contact: "Statut : En Contact",
    admin_filter_status_scheduled: "Statut : Planifié",
    admin_filter_status_done: "Statut : Terminé",
    admin_filter_status_archived: "Statut : Archivé",
    admin_filter_laws_all: "Matière : Toutes",
    admin_filter_law_labor: "Droit du Travail",
    admin_filter_law_lease: "Baux/Immobilier",
    admin_filter_law_family: "Famille & Successions",
    admin_filter_law_consumer: "Droits du Consommateur",
    admin_filter_law_general: "Questions Générales",
  },
  um: {
    app_title: "Ondaka Yocihandeleko Angola",
    app_subtitle: "Kuliha ovisila viocili kuenda olondaka viovijila ku vanyalo vo vofeka yo Angola",
    jurisdiction_label: "Olufe Ovijila",
    jurisdiction_value: "Huíla | Angola",
    nav_diagnosis: "Okuveta Ocikesa AI",
    nav_calculators: "Olombongo Viovijila",
    nav_admin: "Okutyila Ovijiliye",
    choose_another: "tanuula okulela kukuavo",
    welcome_title_start: "Olo olingi a pua",
    welcome_title_mid1: "olombongo",
    welcome_title_mid2: "okuenda",
    welcome_title_mid3: "oluveta",
    welcome_title_end: "konyima?",
    welcome_subtitle: "Eci omanu vacili vo vofeka yo Angola va tangula ovipanga ndopo via tundo koku kakatela kaluveta o LGT (Ley 12/23). Tuelisopo ovilombo vielimina vinyalo viove.",
    discover_rights_btn: "Sangata Ovisila Siove Cilo",
    tag_free: "⚡ 100% Lalapo Olo",
    tag_secure: "🔒 Oloya kuenda Lalopo Ololoko",
    tag_laws: "📚 Ocihandeleko co Angola 2026",
    viewing_areas_label: "Olela ku kakatela olondandu via vanyalo vo Angola. Tanuula eci calitovo ndombela yove:",
    back_to_home_btn: "← Pinga Geral",
    select_problem_title: "⚖️ Tanuula Onele y’Ocina Dove",
    real_problem_question: "Ocina ove catunda ndopo kopo tye ?",
    choose_option_desc: "Kocili oku kuliha ocipango cose comaka. Tanuula okuvelapo ndocina cose sasalika ovisila viove:",
    evaluate_case_btn: "Vandulula ocikesa cange →",
    important_disclaimer_title: "Ondungo canene yo Omanu vocikela",
    important_disclaimer_desc: "Ovitumbula viocijila evi viotundisa k’olondaka viokale, asululuka k’okaliha eci ocihandeleko cilongola. Kokututembo locili, kuende k’ovanele vio OAA ovijila viove.",
    sidebar_about_title: "Ivihandeleko via Angola",
    sidebar_about_desc: "Ocihandeleko Canene co CRA (Constituição da República de Angola) ciyovalapo elisopo k’ovihandeleko viomanu lose. Eli lyeya k’okulela okaliya kuvanyalo vose.",
    sidebar_inst_title: "Ovanene v’eselapo viocili",
    inst_oaa_title: "Ordem dos Advogados (OAA)",
    inst_oaa_desc: "Okueca olombapolo viocili viova advogados a tunda k’ovisimilo viovijila vofeka.",
    inst_ipaj_title: "IPAJ (Ekuatiso Olo)",
    inst_ipaj_desc: "Ekuatiso liovijila liolele k’omanu vana kava kuete olombongo.",
    inst_igt_title: "IGT (Okuvada Olupia)",
    inst_igt_desc: "Olasololo kuenda olombela viomanu votembo yakatela upange olo.",
    footer_disclaimer_title: "Ekakatelo lyovijila lya Angola :",
    footer_disclaimer_desc: "Ocihandeleko canene co Angola citumula kuenda citanuula ovitila. Elisopo eli lia AI litukula k’oku Longisiwa, ndopo okuyovalapo locika lio advogados OAA.",
    footer_rights: "Okupepa cose casuapo k’ovijila canene vio Constituição da República de Angola.",
    history_box_title: "Ovalolo a pitila ndopo kulo",
    history_box_empty: "Lalopo ocina capita local.",
    history_box_clear: "Nyola Cose",
    history_card_by: "Ocina ca",
    history_card_open: "Yula Elisopo",
    form_required_alert: "Cisukuapo okuasula ocina eci.",
    step_loading_0: "Okutonga eci o tunda...",
    step_loading_1: "Onduka yovijila oyeya...",
    step_loading_2: "Okuconga Assembleia Nacional yo Angola...",
    step_loading_3: "Olitovo k’ovihandeleko vio LGT kuenda Código Civil...",
    step_loading_4: "Okusoneha elisopo k’ovihandeleko viove...",
    contact_required_title: "Olondaka Viokusanga Omanu",
    contact_required_desc: "K’okutunga ekuatiso liocili, soneha olombapolo viokusoko kuenda telefone yove ndopo evandululo liayula.",
    contact_full_name: "Onduko Yesulapo",
    contact_phone_whatsapp: "Telefone / WhatsApp",
    contact_btn_proceed: "Kakatela kuenda Sanga Ocinyalo",
    resumo_declarado: "Ondaka Yovisumbile via Sapiwa",
    recomended_next_step: "🎯 Ocipango Cosululuka Cipitilapo",
    confirm_situation: "Ekatelo Lio OAA k’ocina Cange",
    confirm_situation_desc: "Ondungo eyi iyovola ovilo via vanyalo viove. K’okusanga ekuatiso lio cinyalo, usonehi uvo OAA eya k’okusungurula ovijila siove.",
    achieve_list_title: "Pokupinga eselapo lyovijila, o sanganela:",
    achieve_1: "Evandululo liocili lieca lio advogado OAA",
    achieve_2: "Esumulo liolombongo via tunda",
    achieve_3: "Okuvada olondaka viove vyovisesa",
    achieve_4: "Ekaliho lio tye kuenda olomeya viocijila",
    achieve_5: "Ocitela colasololo viayapo",
    achieve_6: "Ekuatiso k’olosololo vio tribunals vio Angola",
    form_lead_title: "Pinga Esololo Lio Ovijila",
    form_lead_desc: "Soneha olombapolo viove k’okuasama ekuatiso lia sunguluka k’ova Advogados OAA.",
    form_lead_btn_send: "Pinga eselapo lio Advogado",
    form_lead_success: "🎉 Ocikando Cange Capila ciwa!",
    form_lead_success_desc: "Olondaka viove via kakatila k’ovanene vetriage. Advogado oya k’okusanga kuve ndopo k’etelephone yove.",
    calculator_tab_laboral: "Olombongo Upange",
    calculator_tab_arrendamento: "Olofondu via Renda",
    calculator_tab_familia: "Okulia kuenda Onjo",
    calculator_not_enrolled: "Lalopo ocisila colocina eci",
    welcome_lang_title: "Tanuula Elimi Siove / Choose Language",
    welcome_lang_desc: "Asukila k’okupatela portal Direito Fácil Angola. Tanuula elimi liove k’okusolola ovisila kuenda ovijila.",
    welcome_lang_btn: "Iniciar / Start Portal",
    oaa_urgency_title: "Ondondu Yakakatela",
    oaa_urgency_desc: "Ovisila vimue vika kakatela k'olomeya a tunda. Evandululo liayula ndopo likuatiso k'ocikesa cove.",
    citizens_count_social_proof: "Omanu vacili avulu vafuma k'okuconga o Ondaka y'Ocihandeleko k'okukakatela vanyalo munu.",
    whatsapp_availability: "Eslapo cilo k'okusonga k'otelefone WhatsApp",
    solicitar_contacto_title: "Pinga Eselapo / Ekisopo OAA",
    identificacao_obrigatoria_title: "Okusoneha Ocipesa Cisukua",
    identificacao_obrigatoria_desc: "K'okuyula k’Ocikesa via tundo, ekuatiso canene liyandala okuasoneha olombapolo viokusoko viove cilo kulo:",
    contact_privacy_guarantee: "Lilava canene: K'ovipango via Artigo 29.º CRA, olombapolo viove visiha k'olocal locila kuenda oloya olose.",
    cancelar: "Kuenda",
    confirmar_prosseguir: "Kakatela kuenda upange",
    oficial_framework: "Ocihandeleko Cenene Ocili",
    seleccione_opcao: "-- Tanuula onguangua --",
    gerar_avaliacao_btn: "Conga Evandululo liOcili",
    analise_em_curso: "Okuvada Ocikesa olinga...",
    lavrando_acordao_loader: "Okutonga eci o tunda ocikesa",
    analise_baseada_loader: "Okovada k'Ivihandeleko via fofola yo Angola",
    aviso_responsabilidade_title: "Eselapo lyo Ovijila Ololoke",
    aviso_responsabilidade_desc: "Ocihandeleko canene co Angola citumula kuenda citanuula. Elisopo eli la AI litukula k'okusolola k'olondaka viokale, ndopo okuyovalapo locika lio advogados OAA.",
    todos_direitos_reservados: "Okupepa cose casuapo k'ovijila canene vio Constituição da República de Angola.",
    hist_diagnostico_userName: "Ondaka Yovisumbile via",
    guardar_txt: "Soneha TXT",
    imprimir: "Soneha olopapelo",
    errors_nome_required: "Onduko Yesulapo canene cisuka.",
    errors_telefone_required: "Telefone ou WhatsApp isukua canene.",
    errors_telefone_invalid: "Soneha telefone eyiela kuenda upitila 9 olomeya.",
    iniciar_nova_consulta_btn: "Iniciar Novo Diagnóstico",
    id_diagnostico_prefix: "ID Ocikesa:",
    alert_required_fields_popup: "Nyisapo asula olombapolo viosukua canene.",
    alert_callback_empty_fields: "Pinga soneha Onduko yove yesulapo kuenda WhatsApp ou Telefone.",
    admin_header_title: "Ovanene v’Eselapo viOcihandeleko Angola",
    admin_dra_prefix: "Ovijiliye",
    admin_citizen_panel: "Painel Omanu",
    admin_logout: "Tunde",
    admin_area_registered: "Olufe Ovijiliye Co-registrada",
    admin_area_desc: "Okusisila canene olombapolo viomanu via tundo k'ocijila k'olofeka yo Angola.",
    admin_professional_email: "E-mail canene Upange",
    admin_access_pwd: "Senha Okutyila",
    admin_access_pwd_placeholder: "Soneha senha yove",
    admin_authenticate_btn: "Kakatela Okutyila",
    admin_default_creds: "Senha kuenda E-mail vyapita list:",
    admin_total_cases: "Cose olombapolo viatundo",
    admin_pre_qualified_ia: "Ovelapita k'olusololo AI",
    admin_leads_pending: "Olombapolo via kakatela olo",
    admin_awaits_contact: "Okondola ekuatiso lipita",
    admin_active_handling: "Ekuatiso liocili oloye",
    admin_contacted_scheduled: "Okasapiwa kuenda agendado",
    admin_total_claims_estimates: "Olombongo viatundo cose",
    admin_portfolio_potential: "Olohuma lyolombongo",
    admin_tab_cases: "Casos yo Okuvada",
    admin_tab_admins: "Upange via Vakandudi",
    admin_tab_metrics: "Olahuma yo Configurações",
    admin_leads_portfolio: "Olombapolo viomanu cose",
    admin_seed_demos: "Vandulula olombapolo Demo",
    admin_search_placeholder: "Pinga onduko ou telemóvel...",
    admin_filter_statuses_all: "Estados: Cose",
    admin_filter_status_pending: "Status: Kakatela olo",
    admin_filter_status_contact: "Status: Okasapiwa",
    admin_filter_status_scheduled: "Status: Agendado",
    admin_filter_status_done: "Status: Yakakatela",
    admin_filter_status_archived: "Status: Nyola",
    admin_filter_laws_all: "Ovijila: Cose",
    admin_filter_law_labor: "Direito do LGT",
    admin_filter_law_lease: "Arrendamento yo Ovapia",
    admin_filter_law_family: "Família yo Okulia",
    admin_filter_law_consumer: "Ovisila lio Consumidor",
    admin_filter_law_general: "Olombela asualo",
  },
  ki: {
    app_title: "Kiteki kia Kikola Angola",
    app_subtitle: "Mikanda ia Ijila ni Mijiia ia Kula kua athu mu ixi ia Angola",
    jurisdiction_label: "Ijila ia Suku",
    jurisdiction_value: "Huíla | Angola",
    nav_diagnosis: "Kubana ku Atala AI",
    nav_calculators: "Kitadi kia Tijila",
    nav_admin: "Kuta mu Diisala dya Fumu",
    choose_another: "Sola lukuaku mbe lumbandu",
    welcome_title_start: "Mukasolola kua athu",
    welcome_title_mid1: "kitadi",
    welcome_title_mid2: "mba",
    welcome_title_mid3: "kijila",
    welcome_title_end: "kima kyololo?",
    welcome_subtitle: "Athu avulu mu ixi ia Angola abhanga kujikinisa kithangana kia kubhinga kitadi kia kufuta upange mukonda dya kukola ijila ia LGT (12/23). Matu bhalula k’ojila mbe mitala iove.",
    discover_rights_btn: "Monesa Kujila kuove Kiki",
    tag_free: "⚡ 100% Kiaconboka olo",
    tag_secure: "🔒 Kipolele ni kiasueka ciwa",
    tag_laws: "📚 Kijila kia fofolo ia Angola 2026",
    viewing_areas_label: "Uene mukutala ovididi bia mundu mu Angola. Sola kijila kine kukulondeka tye:",
    back_to_home_btn: "← Vutuka mu Konda",
    select_problem_title: "⚖️ Sola Mbandu ia Maka Move",
    real_problem_question: "Maka move ma ndopo ene uahi ?",
    choose_option_desc: "Kubhingila kujia milongolo ia ijila ia kukaia. Sola kithangana iove mu monesa ijila iandela move:",
    evaluate_case_btn: "Tongolola mak’amge →",
    important_disclaimer_title: "Mukanda ua Nene kua Athu",
    important_disclaimer_desc: "Maka manya ma ijila mamu kuiza k’ovisingilo bia kale, kiala kukulonga tye. Kubhingila Maka macili, kuenda kua Advogados mu mifu ia OAA.",
    sidebar_about_title: "Ijila ia Angola",
    sidebar_about_desc: "Kijila Kianene kia CRA mu Angola kuene mukubhana kujila ni kuvela k’omuadi uoso moxi ia mundu kiala kujia kwendesa mbe tye.",
    sidebar_inst_title: "Inenene ia Kubhana Kikuatekeso c’Ijila",
    inst_oaa_title: "Ordem dos Advogados (OAA)",
    inst_oaa_desc: "Kubhana jicédula ni kutongolola madiskurso ma advogados mu OAA mu fofolo.",
    inst_ipaj_title: "IPAJ (Kikuatekeso Kiacomboka)",
    inst_ipaj_desc: "Kubhiana ekuateso dia ijila kua athu kana kuxiia kitadi mu kijiila fofolo.",
    inst_igt_title: "IGT (Kutala Upange)",
    inst_igt_desc: "Kuzuelesa maka moxi ia mufu upange ni jidimisa ja athu afuti upange olo.",
    footer_disclaimer_title: "Kitongolo kia OAA ku Angola :",
    footer_disclaimer_desc: "Maka m’ijila ma Angola maleka kutukumuka. Kipondu mbe fumu ia AI ene kukulonga, i kithangana kiese kubhinga advogados OAA mu fofolo.",
    footer_rights: "Kujikita ijila ioso iene mu Constituição da República de Angola.",
    history_box_title: "Ovitongolo bia pita tye ndopo kulo",
    history_box_empty: "Kana maka ma suekama local.",
    history_box_clear: "Nyola Maka m’Oso",
    history_card_by: "Maka ma",
    history_card_open: "Jika Maka",
    form_required_alert: "Mbandu ii iandala m’oso kubhana kima.",
    step_loading_0: "Mamu kubonga maka masapi tye...",
    step_loading_1: "Mamu kutala kijila kiandela maka...",
    step_loading_2: "Mamu kubhingila mu diisala dya Assembleia moxi ia Angola...",
    step_loading_3: "Mamu kujijila ijila i’Upange LGT ni Código Civil...",
    step_loading_4: "Mamu kusoneka kitongolo kia ijila iove...",
    contact_required_title: "Maka Ma andala Kusoneka Mundu",
    contact_required_desc: "Mukonda dia kutula maka mu unene, soneha onduko ie ni telefone move mu bonga kitongolo.",
    contact_full_name: "Onduka Yosofolo",
    contact_phone_whatsapp: "Telefone / WhatsApp",
    contact_btn_proceed: "Kakatela ni Bonga Maka Move",
    resumo_declarado: "Kijovelo kia Maka masomboke tye",
    recomended_next_step: "🎯 Mbela indesa iasungilika ndopo",
    confirm_situation: "Kubhingila eselapo k’Advogado OAA",
    confirm_situation_desc: "Kuxita kiokali a monesa ijila iove. Mukujijila kikuatekeso, soneha onduko ie ku OAA mu kukaia fofolo moxi ia Mundu.",
    achieve_list_title: "Kutumbula maka mu Advogado, makuabhela:",
    achieve_1: "Kutongolola ciwa kua Advogado fofolo OAA",
    achieve_2: "Monalala ia kitadi kia tunda mu maka move",
    achieve_3: "Kuvada mikanda iose ia provas ia maka move",
    achieve_4: "Kujia maka asumbile ni kithangana kyocili k’ojila",
    achieve_5: "Kulongesa mufu ia estratégica k’ocina",
    achieve_6: "Ekuateso mu Tribunais mu fofolo ia Angola",
    form_lead_title: "Bhinga Kikuatekeso kia Ijila",
    form_lead_desc: "Tula onduko ie ni telefone mu kusanga ekuateso liasueka ciwa ni Advogados OAA.",
    form_lead_btn_send: "Bhinga ekuateso dia Advogados",
    form_lead_success: "🎉 Maka move matambi ciwa!",
    form_lead_success_desc: "Maka siove malee mu diisala dia Triagem. Advogado makusonehela mbe telefone moxi ia ndopo.",
    calculator_tab_laboral: "Kufunda Kitadi Upange",
    calculator_tab_arrendamento: "Kijila kia Arrendamento",
    calculator_tab_familia: "Maka ma miji ni Kudia",
    calculator_not_enrolled: "Kana mbandu ia maka maya kukaia",
    welcome_lang_title: "Sola elimi move / Choose Language",
    welcome_lang_desc: "Unisangana mu portal Direito Fácil Angola. Sola elimi dyove mu tongolola maka ni ijila iove kiki.",
    welcome_lang_btn: "Jika Portal / Start App",
    oaa_urgency_title: "Kitukutuku kia Nene",
    oaa_urgency_desc: "Ijila ioso moxi ia kuthangana kubhinga kitadi kia kufuta upange. Utongololo uasuguluka ukuatekesa mbandu iove.",
    citizens_count_social_proof: "Athu avulu abhingi mu ixi ia Angola moxinemuzia maka ma ijila mbe kulonga mutala.",
    whatsapp_availability: "Kubhana o kithangana ndopo mu telemóvel WhatsApp",
    solicitar_contacto_title: "Bhinga Ekuateso / Maka OAA",
    identificacao_obrigatoria_title: "Kusoneha Onduko mu Maka",
    identificacao_obrigatoria_desc: "Kuthangana kubana mu Maka, tuala mbandu upange iove mu bonga kitadi kiese kia undela move:",
    contact_privacy_guarantee: "Kitongolo kia lumbandu: Mu Kijila kya Artigo 29.º ia CRA, maka iove masuama moxi luvuvungano m’oso ia fofolo.",
    cancelar: "Kuxitisa",
    confirmar_prosseguir: "Kuxita ni kwenda",
    oficial_framework: "Kitongolo kia Kijila kia Mundu",
    seleccione_opcao: "-- Sola mbandu move --",
    gerar_avaliacao_btn: "Bhalula Atala m’Upange",
    analise_em_curso: "Kuhala maka mu upange...",
    lavrando_acordao_loader: "Kusoneha Kitongolo ki’Upange",
    analise_baseada_loader: "Kubhana mu Kujila kua ixi ia Angola",
    aviso_responsabilidade_title: "Kijikila kia Maka ma Ijila",
    aviso_responsabilidade_desc: "Maka m'ijila ma Angola maleka kutukumuka. Kipondu mbe fumu ia AI ene kukulonga, i kithangana kiese kubhinga advogados OAA mu fofolo.",
    todos_direitos_reservados: "Kujikita ijila ioso iene mu Constituição da República de Angola.",
    hist_diagnostico_userName: "Kitongolo kia Maka ma",
    guardar_txt: "Lunda TXT",
    imprimir: "Kubana lukuaku",
    errors_nome_required: "Onduko iandala m’oso kubhana.",
    errors_telefone_required: "Telefone os WhatsApp iandala mu maka.",
    errors_telefone_invalid: "Tuala telefone iasungilika mbandu upitila 9.",
    iniciar_nova_consulta_btn: "Jeśli Upange Maka",
    id_diagnostico_prefix: "ID Atala:",
    alert_required_fields_popup: "Tuala mbandu iandala m'oso kubhana.",
    alert_callback_empty_fields: "Soneha onduko ie ni telefone move mu bonga maka.",
    admin_header_title: "Inenene ia Kubhana Kikuatekeso c'Ijila",
    admin_dra_prefix: "Advogado",
    admin_citizen_panel: "Painel Omanu / Mundu",
    admin_logout: "Kubeka",
    admin_area_registered: "Diisala dya Fumu Kiasoneka",
    admin_area_desc: "Kala mbandu ia inenene ia ijila mu kikuatekeso kia fofolo ia Angola.",
    admin_professional_email: "Email Kijila",
    admin_access_pwd: "Senha dya Fumu",
    admin_access_pwd_placeholder: "Soneha senha move",
    admin_authenticate_btn: "Kuta moxi ia Diisala",
    admin_default_creds: "Email ni Senha dya Diisala:",
    admin_total_cases: "Maka m'Oso matambi",
    admin_pre_qualified_ia: "Matula moxi ia upange AI",
    admin_leads_pending: "Maka ma suekama kulo",
    admin_awaits_contact: "Mamu kukaia mundu",
    admin_active_handling: "Upange uasungilika mu Kijiila",
    admin_contacted_scheduled: "Kusonehela ni kithangana",
    admin_total_claims_estimates: "Kitadi m'Upange kia fofolo",
    admin_portfolio_potential: "Unene u’Upange fofolo",
    admin_tab_cases: "Upange ia Maka",
    admin_tab_admins: "Fumu ya Diisala",
    admin_tab_metrics: "Kala mbandu ia Inenene",
    admin_leads_portfolio: "Lead ia Maka m’Oso",
    admin_seed_demos: "Jika maka ma Demo",
    admin_search_placeholder: "Jika onduko ni telefone...",
    admin_filter_statuses_all: "Maka m'Oso",
    admin_filter_status_pending: "Status: Pendente",
    admin_filter_status_contact: "Status: Kuzuelesa",
    admin_filter_status_scheduled: "Status: Kithangana",
    admin_filter_status_done: "Status: Kiasondama",
    admin_filter_status_archived: "Status: Lunda",
    admin_filter_laws_all: "Kijila: M'Oso",
    admin_filter_law_labor: "Kijila k'Upange LGT",
    admin_filter_law_lease: "Leasing ia Inzo",
    admin_filter_law_family: "Miji ni Heranças",
    admin_filter_law_consumer: "Ijila ia Mundu",
    admin_filter_law_general: "Maka m'Oso ambandu",
  },
  ar: {
    app_title: "قانون أنغولا السهل",
    app_subtitle: "بوابة إرشادية قانونية ومحاكيات بموجب قوانين جمهورية أنغولا",
    jurisdiction_label: "الاختصاص القضائي الرسمي",
    jurisdiction_value: "هويلا | أنغولا",
    nav_diagnosis: "تشخيص الحالات بالذكاء الاصطناعي",
    nav_calculators: "الحاسبات القانونية",
    nav_admin: "دخول المسؤول",
    choose_another: "اختر مجالاً آخر",
    welcome_title_start: "هل تترك",
    welcome_title_mid1: "أموالك",
    welcome_title_mid2: "أو",
    welcome_title_mid3: "حمايتك",
    welcome_title_end: "خلفك؟",
    welcome_subtitle: "يفوت العديد من المواطنين في أنغولا المواعيد النهائية الحاسمة لتقديم الشكاوى أو يتنازلون عن التعويضات المستحقة بسبب نقص التوضيح العملي بشأن قانون العمل العام (القانون 12/23) والقانون المدني. نحن نترجم القواعد من أجل حالتك.",
    discover_rights_btn: "اكتشف حقوقك الآن",
    tag_free: "⚡ مجاني 100%",
    tag_secure: "🔒 آمن وسري",
    tag_laws: "📚 قانون أنغولا لعام 2026",
    viewing_areas_label: "أنت تعرض المجالات القانونية الشائعة في أنغولا. اختر المجال الذي يطابق مشكلتك:",
    back_to_home_btn: "← العودة إلى الرئيسية",
    select_problem_title: "⚖️ اختر مجال النزاع الخاص بك",
    real_problem_question: "ما هي مشكلتك اليومية الرئيسية؟",
    choose_option_desc: "لا تحتاج إلى معرفة المواد أو المصطلحات المعقدة للقانون الأنغولي. اختر الخيار المطابق لوضعك الحقيقي لفهم حقوقك الأساسية ونطاقها المبسط:",
    evaluate_case_btn: "تقييم حالتي ←",
    important_disclaimer_title: "تنبيه مهم للمستخدمين",
    important_disclaimer_desc: "التقييم القانوني الأولي هو تقييم حاسوبي مخصص لأغراض تعليمية وإعلامية فقط. العديد من اللوائح في أنغولا تخضع لتعديلات مستمرة أو تتطلب أدلة تنظيمية. للحصول على تمثيل رسمي أو مشورة قاطعة، اتصل بجمعية المحامين الأنغوليين (OAA) أو خدمات IPAJ القانونية.",
    sidebar_about_title: "التشريع الأنغولي",
    sidebar_about_desc: "يؤمن دستور جمهورية أنغولا الأساس المتين للوصول إلى القانون والمساواة والحماية القضائية الفعالة (المادة 29). تقرب هذه البوابة المواطنين من التفسير القانوني الأساسي بشكل ميسر تمامًا.",
    sidebar_inst_title: "المؤسسات والدعم الرسمي",
    inst_oaa_title: "نقابة المحامين الأنغولية (OAA)",
    inst_oaa_desc: "إصدار البطاقات المهنية والدليل الرسمي للمحامين المسجلين في النقابة.",
    inst_ipaj_title: "IPAJ (المساعدة القانونية المجانية)",
    inst_ipaj_desc: "الدفوع القانونية المجانية التي تقدمها الدولة الأنغولية للأشخاص ذوي الدخل المحدود والفئات المستضعفة.",
    inst_igt_title: "IGT (المفتشية العامة للعمل)",
    inst_igt_desc: "الوساطة والشكاوى المتعلقة بالمخالفات أو الفصل التعسفي في مكان العمل.",
    footer_disclaimer_title: "إخلاء المسؤولية القانونية:",
    footer_disclaimer_desc: "إن تشريعات جمهورية أنغولا في تطور مستمر. التقييمات الأساسية التي يتم إنشاؤها إلكترونيًا بواسطة الذكاء الاصطناعي هي بمثابة مؤشرات إرشادية أولية ومؤقتة. الاستشارة الرسمية والتحقق القانوني من قبل محامٍ مسجل في نقابة المحامين (OAA) أمر إلزامي قبل أي قرار نزاعي أو طوعي.",
    footer_rights: "جميع الحقوق محفوظة وفقًا لدستور جمهورية أنغولا.",
    history_box_title: "سجل التقييمات الأخيرة",
    history_box_empty: "لا يوجد سجل تقييمات محلي محفوظ حاليًا.",
    history_box_clear: "مسح السجل",
    history_card_by: "حالة",
    history_card_open: "افتح التشخيص",
    form_required_alert: "هذا الحقل مطلوب.",
    step_loading_0: "جاري معالجة الوقائع المدخلة...",
    step_loading_1: "جاري تحليل العلاقة السببية القانونية...",
    step_loading_2: "جاري استعلام قاعدة بيانات الجمعية الوطنية في أنغولا...",
    step_loading_3: "جاري المطابقة مع قانون العمل العام (LGT) والقانون المدني...",
    step_loading_4: "جاري صياغة التشخيص والتوصيات الأولية...",
    contact_required_title: "تفاصيل الاتصال مطلوبة",
    contact_required_desc: "لضمان الدقة وتنسيق الدعم الرسمي، يرجى إدخال معلومات الاتصال الخاصة بك قبل الوصول إلى تقرير التشخيص القانوني الذكي لجمهورية أنغولا.",
    contact_full_name: "الاسم الكامل",
    contact_phone_whatsapp: "الهاتف / واتساب",
    contact_btn_proceed: "تأكيد والحصول على التقرير",
    resumo_declarado: "ملخص الظروف المعلنة",
    recomended_next_step: "🎯 الخطوة التالية الموصى بها",
    confirm_situation: "تأكيد وضعي القانوني رسميًا",
    confirm_situation_desc: "حدد التقييم الأولي الحقوق والأضرار المحتملة. لاعتماد الحسابات وتحليل المستندات وتحديد الخيار الأفضل، يجب على محامٍ مسجل في نقابة المحامين (OAA) إجراء مراجعة رسمية للقضية.",
    achieve_list_title: "عند طلب مراجعة قانونية رسمية، ستحصل على:",
    achieve_1: "مراجعة قانونية دقيقة من قبل محامٍ معتمد",
    achieve_2: "التحقق من مبالغ التعويض المقدرة",
    achieve_3: "مراجعة الأدلة والقرائن المتاحة",
    achieve_4: "تحديد المخاطر الإجرائية والمواعيد القانونية",
    achieve_5: "خريطة طريق للإستراتيجية القانونية الموصى بها",
    achieve_6: "إرشادات الوساطة أو التقاضي في المحاكم الأنغولية",
    form_lead_title: "طلب خطة دعم إستراتيجية",
    form_lead_desc: "قدم تفاصيلك حتى نتمكن من تنسيق المساعدة السرية مع محامي OAA المعتمدين.",
    form_lead_btn_send: "طلب دعم محامي",
    form_lead_success: "🎉 تم تقديم الطلب بنجاح!",
    form_lead_success_desc: "تمت مزامنة ملفك المعلن مع فرزنا الداخلي الآمن. سيتصل بك ممثل أو محامٍ زميل قريبًا على الرقم المشار إليه.",
    calculator_tab_laboral: "عقد العمل وحساباته",
    calculator_tab_arrendamento: "عقود الإيجار الحضري",
    calculator_tab_familia: "الأسرة والنفقة",
    calculator_not_enrolled: "لا يوجد حاسبة تطابق هذه الفئة الأدلة",
    welcome_lang_title: "اختر لغتك / Select your Language",
    welcome_lang_desc: "مرحبًا بك في بوابة قانون أنغولا السهل. يرجى اختيار لغتك لبدء الاستشارة القانونية الذكية المبسطة.",
    welcome_lang_btn: "بدء التطبيق / Start Application",
    oaa_urgency_title: "ضرورة ملحة مشروعة",
    oaa_urgency_desc: "قد يخضع بعض الحقوق لمواعيد نهائية لتقديم المطالبة القانونية. يساعد التحليل في الوقت المناسب في الحفاظ على الخيارات المتاحة لحالتك.",
    citizens_count_social_proof: "لقد استخدم مئات المواطنين بالفعل بوابة قانون أنغولا السهل لفهم حقوقهم بشكل أفضل والاستعداد للمشاورات القانونية.",
    whatsapp_availability: "التوفر الفوري للتواصل عبر واتساب",
    solicitar_contacto_title: "طلب تواصل / استشارة نقابة OAA",
    identificacao_obrigatoria_title: "الاسم الإجباري وبيانات التواصل",
    identificacao_obrigatoria_desc: "قبل المتابعة للتقييم الأولي أو الحسابات التناسبية، تتطلب منصتنا تزويدنا بإحداثيات الاتصال التالية:",
    contact_privacy_guarantee: "ضمان الخصوصية: وفقًا للمادة 29 من الدستور، سيتم الاحتفاظ ببيانات الاتصال محليًا بأمان وسرية تامة.",
    cancelar: "إلغاء",
    confirmar_prosseguir: "تأكيد والمتابعة",
    oficial_framework: "الإطار التنظيمي الرسمي",
    seleccione_opcao: "-- اختر خيارًا --",
    gerar_avaliacao_btn: "إنشاء تقييم أولي",
    analise_em_curso: "جاري تحليل المحكمة...",
    lavrando_acordao_loader: "صياغة الحكم الأولي",
    analise_baseada_loader: "التحليل يستند إلى التشريعات الأنغولية",
    aviso_responsabilidade_title: "تنبيه إخلاء المسؤولية القانونية",
    aviso_responsabilidade_desc: "من فضلك، تذكر أن اللوائح في أنغولا في تطور دائم. التشخيصات الإلكترونية هي لأغراض إرشادية وتثقيفية فقط. لا تغني أبدًا عن استشارة المحامي المقيد بالنقابة.",
    todos_direitos_reservados: "جميع الحقوق محفوظة وفقًا لدستور جمهورية أنغولا.",
    hist_diagnostico_userName: "التقرير التشريعي الخاص بـ",
    guardar_txt: "حفظ كملف نصي",
    imprimir: "طباعة",
    errors_nome_required: "الاسم الكامل مطلوب.",
    errors_telefone_required: "رقم الهاتف / واتساب مطلوب.",
    errors_telefone_invalid: "أدخل رقم هاتف صالح لا يقل عن 9 أرقام.",
    iniciar_nova_consulta_btn: "بدء استشارة جديدة",
    id_diagnostico_prefix: "معرف التشخيص:",
    alert_required_fields_popup: "يرجى ملء جميع الحقول المطلوبة أولاً.",
    alert_callback_empty_fields: "يرجى تعبئة الاسم الكامل ورقم الهاتف / واتساب الخاص بك.",
    admin_header_title: "بوابة الإدارة والمحاماة لقانون أنغولا السهل",
    admin_dra_prefix: "الأستاذ(ة).",
    admin_citizen_panel: "بوابة المواطن",
    admin_logout: "تسجيل الخروج",
    admin_area_registered: "منطقة الإدارة المسجلة",
    admin_area_desc: "إدارة متكاملة لملفات مراجعة الحالات القانونية المقدمة من قبل المواطنين في أنغولا.",
    admin_professional_email: "البريد الإلكتروني المهني",
    admin_access_pwd: "كلمة مرور الوصول",
    admin_access_pwd_placeholder: "أدخل كلمة المرور",
    admin_authenticate_btn: "توثيق الحساب",
    admin_default_creds: "بيانات اعتماد المسؤول الافتراضية:",
    admin_total_cases: "إجمالي الحالات المستلمة",
    admin_pre_qualified_ia: "حالات مؤهلة بالذكاء الاصطناعي",
    admin_leads_pending: "طلبات في انتظار الفرز",
    admin_awaits_contact: "في انتظار الاتصال الأولي",
    admin_active_handling: "تحت المتابعة النشطة",
    admin_contacted_scheduled: "تم الاتصال أو تحديد موعد",
    admin_total_claims_estimates: "إجمالي مبالغ التعويض المقدرة",
    admin_portfolio_potential: "الإمكانات الإجمالية للمحفظة",
    admin_tab_cases: "الحالات والفرز",
    admin_tab_admins: "إدارة المسؤولين",
    admin_tab_metrics: "المقاييس والتكوين",
    admin_leads_portfolio: "محفظة الحالات / طلبات الاتصال",
    admin_seed_demos: "تحميل حالات تجريبية",
    admin_search_placeholder: "البحث عن الاسم أو الهاتف...",
    admin_filter_statuses_all: "الحالة: الكل",
    admin_filter_status_pending: "الحالة: معلق",
    admin_filter_status_contact: "الحالة: قيد الاتصال",
    admin_filter_status_scheduled: "الحالة: مجدول",
    admin_filter_status_done: "الحالة: مكتمل",
    admin_filter_status_archived: "الحالة: مؤرشف",
    admin_filter_laws_all: "المادة: الكل",
    admin_filter_law_labor: "قانون العمل",
    admin_filter_law_lease: "العقارات والإيجارات",
    admin_filter_law_family: "الأسرة والمواريث",
    admin_filter_law_consumer: "حقوق المستهلك",
    admin_filter_law_general: "استفسارات عامة",
  },
  zh: {
    app_title: "安哥拉简易法",
    app_subtitle: "安哥拉共和国法律下的非官方智能法律指南与模拟器入口",
    jurisdiction_label: "官方司法管辖",
    jurisdiction_value: "威拉省 | 安哥拉",
    nav_diagnosis: "AI 案件初步评估",
    nav_calculators: "法律计算器",
    nav_admin: "管理员通道",
    choose_another: "选择其他领域",
    welcome_title_start: "您是否在把",
    welcome_title_mid1: "应得财产",
    welcome_title_mid2: "或",
    welcome_title_mid3: "合法权益",
    welcome_title_end: "留在身后？",
    welcome_subtitle: "在安哥拉，许多公民因缺乏对普通劳动法（第 12/23 号法律）及《民法典》的实际理解，错过了至关重要的索赔期限或放弃了合理的赔偿。我们为您翻译这些繁琐法律条文。",
    discover_rights_btn: "立即探寻您的权利",
    tag_free: "⚡ 100% 免费",
    tag_secure: "🔒 安全且保密",
    tag_laws: "📚 2026年安哥拉现行法典",
    viewing_areas_label: "您当前浏览的是安哥拉日常法律领域。请选择与您的问题相符的领域：",
    back_to_home_btn: "← 返回主页",
    select_problem_title: "⚖️ 选择您的争议领域",
    real_problem_question: "您最核心的日常法律纠纷是什么？",
    choose_option_desc: "您无需了解安哥拉法律的复杂条款或术语。选择与您实际情况相符的选项，即可快速了解您享有的基本权利及简化的合理索偿范围：",
    evaluate_case_btn: "评估我的案件 →",
    important_disclaimer_title: "用户重要声明",
    important_disclaimer_desc: "此初步法律诊断分析为计算机智能生成，仅供参考，不构成任何正式法律意见或执业结论。安哥拉的法规经常修正，或需要特定的程序证据。如需获得正式代表或最终定论，请联系安哥拉律师协会（OAA）的地方分会或国家公共法律援助处的法律服务。",
    sidebar_about_title: "安哥拉法律背景",
    sidebar_about_desc: "安哥拉共和国宪法（CRA）第 29 条确立了公民获得法律援助、平等权以及受到司法有效保护的不可侵犯的基础。本门户旨在使普通公民更快捷、简易地理解基础法律评级与维权途径。",
    sidebar_inst_title: "官方机构与支持渠道",
    inst_oaa_title: "安哥拉律师协会 (OAA)",
    inst_oaa_desc: "批发行医执业执照以及提供官方在册执业律师名录查询服务。",
    inst_ipaj_title: "IPAJ (国家免费法律援助处)",
    inst_ipaj_desc: "安哥拉政府向低收入群体和弱势或贫困人口提供的免费司法辩护与法律援助。",
    inst_igt_title: "IGT (总劳动监察局)",
    inst_igt_desc: "负责有关职场违规行为、拖欠薪资或恶意解雇的行政调解与申诉受理。",
    footer_disclaimer_title: "免责和法律声明：",
    footer_disclaimer_desc: "安哥拉共和国的立法正处于不断发展和修正之中。由人工智能电子生成的初步评估和摘要仅作为前期的参考。在做出任何诉讼或自愿决定之前，必须向安哥拉律师协会（OAA）注册的执业律师或相关主管机构寻求正式咨询和法律论证。",
    footer_rights: "保留所有权利，依据安哥拉共和国宪法及相关条例保护。",
    history_box_title: "最近评估历史记录",
    history_box_empty: "目前尚无本地评估历史数据。",
    history_box_clear: "清除历史记录",
    history_card_by: "委托方：",
    history_card_open: "打开诊断报告",
    form_required_alert: "此项为必填项。",
    step_loading_0: "正在整理和解析输入的法律事实...",
    step_loading_1: "正在计算其中涉及的正当法律因果关系...",
    step_loading_2: "正在检索和比对安哥拉国民议会法律数据库...",
    step_loading_3: "正在套用普通劳动法（LGT）与民法典中对应法则...",
    step_loading_4: "正在起草您的初步法律评估诊断和行动建议...",
    contact_required_title: "需要输入联系方式",
    contact_required_desc: "为了保证数据的真实有效，并协助安排后续的官方援助和案件初筛，我们需要在您查看智能法律诊断结果前填写您的有效联系方式。",
    contact_full_name: "您的姓名",
    contact_phone_whatsapp: "手机号码 / WhatsApp",
    contact_btn_proceed: "确认并获取报告",
    resumo_declarado: "您申报的事实情况摘要",
    recomended_next_step: "🎯 推荐的下一步行动",
    confirm_situation: "申请在安哥拉律师协会注册律师复核",
    confirm_situation_desc: "初步评估已帮您识别出了可能维权的潜在金额和权利范围。为确证该金额计算的精准度、审查您的书面证据并制定最优诉讼或庭外调解策略，强烈建议请一名在安哥拉律协（OAA）注册的执业律师为您提供正式的案卷审查。",
    achieve_list_title: "在您递交律师正式复核申请后，您将获得：",
    achieve_1: "持照在册合格律师对案情的细节化复核",
    achieve_2: "对潜在应得索赔与赔偿金计算公式的复算和证明",
    achieve_3: "对现有手头搜集到的证据与材料的事先合法性评估",
    achieve_4: "理清诉讼风险、诉讼时效及其他诉讼期限规则",
    achieve_5: "专属推荐的合法维权行动行动路线图",
    achieve_6: "关于在安哥拉法院进行调节或起诉诉讼的正式导引",
    form_lead_title: "申请保密支持计划",
    form_lead_desc: "请登记您的姓名和电话，以便我们安排正规在册且具OAA编号的专属律师为您提供保密初步对接。",
    form_lead_btn_send: "提交申请，对接律师",
    form_lead_success: "🎉 申请已成功提交！",
    form_lead_success_desc: "您的事实申报表已与我司内部保密案件筛选系统完成同步。很快将有合作律师或负责合伙人通过登记的号码与您取得取得微信/电话联系。",
    calculator_tab_laboral: "劳动合规计算器",
    calculator_tab_arrendamento: "城市房屋租赁",
    calculator_tab_familia: "家庭法与抚养费",
    calculator_not_enrolled: "当前门类尚无计算模板",
    welcome_lang_title: "请选择语言 / Select your Language",
    welcome_lang_desc: "欢迎来到安哥拉简易法门户网站。请选择您的官方语言或国家常用语言以启动简化版智能法律咨询。",
    welcome_lang_btn: "进入系统 / Start Application",
    oaa_urgency_title: "维权时效紧急性",
    oaa_urgency_desc: "部分法定权利（尤其是解雇索赔）面临严格的法定维权期限，一旦逾期可能丧失诉权。及时获得分析有助于保留您原本享有的各项合法手段和赔偿选择权。",
    citizens_count_social_proof: "已有数百名安哥拉各省市居民通过安哥拉简易法获取基础常识并更好地准备与执业律师的案件面谈。",
    whatsapp_availability: "支持即时通过 WhatsApp 获取联络和律师答复",
    solicitar_contacto_title: "递交联络需求 / 预约律协合规律师咨询",
    identificacao_obrigatoria_title: "按法定合规政策留存身份信息",
    identificacao_obrigatoria_desc: "在您查看初步评估诊断报告或使用各门类精确赔偿公式计算比例前，为了防止爬虫和刷单恶意骚扰，我们的系统依法要求您提供如下联络信息：",
    contact_privacy_guarantee: "隐私严格保障：依据安哥拉宪法第 29 条（CRA）之关于隐私权的保护，您的数据仅本地保密或经受信任的安全链对接，受到最严防泄密处理。",
    cancelar: "取消",
    confirmar_prosseguir: "确认并继续",
    oficial_framework: "安哥拉官方监管框架",
    seleccione_opcao: "-- 请选择一个选项 --",
    gerar_avaliacao_btn: "生成分析结论及报告",
    analise_em_curso: "法庭审理逻辑和公式匹配运行中...",
    lavrando_acordao_loader: "正在生成您的非官方初步认定书...",
    analise_baseada_loader: "分析纯由安哥拉现行最新立法规制",
    aviso_responsabilidade_title: "法定免责说明公告",
    aviso_responsabilidade_desc: "请务必悉知，安哥拉共和国之法令与汇率在不断变迁演进中。AI算法生成的框架只具有通识普及性质。涉及真实财产权利和诉讼处分，绝不能替代聘请执业持牌律师的最终鉴证意见。",
    todos_direitos_reservados: "保留一切权利，依据安哥拉共和国宪法获得合法合规保障。",
    hist_diagnostico_userName: "法律意见书评估报告 - 针对",
    guardar_txt: "导出为文本(TXT)",
    imprimir: "打印报告",
    errors_nome_required: "姓名是必填项，请输入。",
    errors_telefone_required: "您的联系电话或 WhatsApp 号码是必填项。",
    errors_telefone_invalid: "请输入合法的有效号码，不少于9位数字。",
    iniciar_nova_consulta_btn: "开始全新案件初筛",
    id_diagnostico_prefix: "案件初筛ID:",
    alert_required_fields_popup: "请先完成所有的必填项填写以确保计算精度。",
    alert_callback_empty_fields: "请完善您的姓名和用于获取复核结果的 WhatsApp / 手机号码。",
    admin_header_title: "安哥拉简易法后台管理与律师协作接单端",
    admin_dra_prefix: "律师 / 阁下",
    admin_citizen_panel: "普通用户前端界面",
    admin_logout: "安全退出登录",
    admin_area_registered: "后台注册管理控制台",
    admin_area_desc: "安哥拉简易法向市民提供的自主法律问诊线索与数据卷宗一体化流转管理方案。",
    admin_professional_email: "执业专业电子邮箱",
    admin_access_pwd: "管理访问密码",
    admin_access_pwd_placeholder: "请输入密码",
    admin_authenticate_btn: "登录账户",
    admin_default_creds: "默认临时测试管理账户数据：",
    admin_total_cases: "历史累计接收提问卷宗",
    admin_pre_qualified_ia: "AI智检系统已自动归类",
    admin_leads_pending: "等待律协合伙人分配",
    admin_awaits_contact: "等待拨打首次跟进电话",
    admin_active_handling: "已有专人深度办理中",
    admin_contacted_scheduled: "已定于近期出庭或线下会商",
    admin_total_claims_estimates: "潜在建议诉讼索赔合计数额",
    admin_portfolio_potential: "建议诉讼收益风险估值",
    admin_tab_cases: "卷宗归档与前置初筛",
    admin_tab_admins: "执业律师与协办人员",
    admin_tab_metrics: "运营数据统计与参数调整",
    admin_leads_portfolio: "实时案件归集池 / 用户联系线索",
    admin_seed_demos: "一键充填仿真演示用典型案卷",
    admin_search_placeholder: "按姓名或手机号模糊检索...",
    admin_filter_statuses_all: "处理进度：全部",
    admin_filter_status_pending: "进度：初填待分配",
    admin_filter_status_contact: "进度：联络咨询中",
    admin_filter_status_scheduled: "进度：已预约面商",
    admin_filter_status_done: "进度：已办结或立案",
    admin_filter_status_archived: "进度：不符合归档",
    admin_filter_laws_all: "争议业务门类：全部",
    admin_filter_law_labor: "劳动与社会保障法",
    admin_filter_law_lease: "租赁与地产物权",
    admin_filter_law_family: "婚姻家庭与财产遗赠",
    admin_filter_law_consumer: "消费者权益保障",
    admin_filter_law_general: "常见一般性民事疑惑",
  },
};

export function getTranslatedCitizenProblems(langCode: string): any[] {
  // If Português, use original
  if (langCode === "pt" || !UI_TRANSLATIONS[langCode]) {
    return [
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
  }

  if (langCode === "en") {
    return [
      {
        id: "laboral",
        title: "Labor Situation / Employment",
        question: "I was dismissed or have unpaid wages. What are my rights?",
        description: "Did you suffer dismissal without just cause under the new LGT (Law 12/23), missing salaries/bonuses, or abusive disciplinary actions? Estimate your compensations and late payment interests.",
        icon: "Briefcase",
        laws: "General Labor Law of Angola (Law n.º 12/23, of August 29)",
      },
      {
        id: "imobiliario",
        title: "Leasing or Lands",
        question: "My landlord wants me to leave or we have a rent dispute. Can I be evicted?",
        description: "Check if eviction notices are valid under the Urban Leasing Law, how to claim back your held deposit or how to proceed during property parcel disputes.",
        icon: "Home",
        laws: "Urban Leasing Law and Civil Code",
      },
      {
        id: "familia",
        title: "Family & Inheritances",
        question: "How to split an estate or secure child support alimony payments?",
        description: "Questions on separation and splitting property, setting or delays in child support, court recognition of common-law marriage (alambamento) or death tax inventories.",
        icon: "Heart",
        laws: "Angola Family Code and Civil Legislation",
      },
      {
        id: "geral",
        title: "Debts and Other Disputes",
        question: "I have money to collect or a missing loan repayment. How to recover a debt?",
        description: "Outstanding unpaid capital balances, issues/damages regarding water leaks or neighbor noises, car accident disputes with inactive insurance, or general civil suits.",
        icon: "Scale",
        laws: "Civil Code and Civil Procedure Code",
      },
      {
        id: "consumidor",
        title: "Consumer Rights",
        question: "I bought a defective product or was cheated by services. How to complain?",
        description: "Cases of unfair charging by telecom, electricity or water operators, unjustified refusal of returns/warranty. Protect your assets based on Law n.º 15/03.",
        icon: "ShieldAlert",
        laws: "Consumer Defense Law (Law n.º 15/03)",
      },
    ];
  }

  if (langCode === "fr") {
    return [
      {
        id: "laboral",
        title: "Situation Professionnelle / Emploi",
        question: "J'ai été licencié ou j'ai des salaires impayés. Quels sont mes droits ?",
        description: "Avez-vous subi un licenciement sans juste cause sous la nouvelle LGT (loi n.º 12/23), des salaires/allocations manquants ou des sanctions abusives ? Estimez vos réparations et pénalités de retard.",
        icon: "Briefcase",
        laws: "Loi Générale du Travail d'Angola (Loi n.º 12/23, du 29 août)",
      },
      {
        id: "imobiliario",
        title: "Baux Urbains ou Terrains",
        question: "Mon propriétaire veut m'expulser ou nous contestons les loyers. Que faire ?",
        description: "Découvrez si les notifications d'expulsion sont conformes à la loi sur les baux urbains, comment récupérer votre caution indûment retenue ou agir face aux conflits de parcelles.",
        icon: "Home",
        laws: "Loi sur les Baux Urbains et Code Civil",
      },
      {
        id: "familia",
        title: "Famille et Successions",
        question: "Comment partager une succession ou fixer la pension alimentaire des enfants ?",
        description: "Litiges sur le divorce et le partage des biens, non-paiement ou fixation de pension alimentaire, reconnaissance d'union libre de fait (alambamento) ou inventaire suite au décès.",
        icon: "Heart",
        laws: "Code de la Famille d'Angola et Droit Civil",
      },
      {
        id: "geral",
        title: "Dettes et Autres Conflits",
        question: "J'ai de l'argent à recouvrer ou un prêt impayé. Comment récupérer ma créance ?",
        description: "Dons d'argent non restitués, dégâts des eaux ou nuisances sonores de voisins de palier, sinistres routiers sans assurance active de la voiture tierce ou litiges civils généraux.",
        icon: "Scale",
        laws: "Code Civil et Code de Procédure Civile",
      },
      {
        id: "consumidor",
        title: "Défense du Consommateur",
        question: "J'ai acheté un matériel défectueux ou été piégé par des services. Comment réagir ?",
        description: "Tarifications abusives de télécoms, électricité ou eau, refus d'honorer la garantie légale sur un appareil. Protégez votre budget en invoquant la Loi n.º 15/03.",
        icon: "ShieldAlert",
        laws: "Loi de Défense du Consommateur (Loi n.º 15/03)",
      },
    ];
  }

  if (langCode === "um") {
    return [
      {
        id: "laboral",
        title: "Upange / Ekuatiso",
        question: "Vatutandula kupange handi olombongo viange vianonboka. Vanyalo viange ove?",
        description: "Va ku yovalapo upange oloye, olombongo via kakatela via LGT yofeka? Soneha moxi olombongo viove vieselapo kuenda olomeya pioya.",
        icon: "Briefcase",
        laws: "Ocihandeleko canene upange LGT de Angola (Lei 12/23)",
      },
      {
        id: "imobiliario",
        title: "Arrendamento yo Ovapia",
        question: "Fumu yonjo olingi anyole onjo ange handi renda iange olo. Ndopo oyakandula vi?",
        description: "Kaliha eci ovovelo a tunda okupepa onjo asuapo, pinga olombongo vieselapo lio caução liopete kuenda ekuatiso k’ovapia.",
        icon: "Home",
        laws: "Ocihandeleko lio Renda yo Código Civil",
      },
      {
        id: "familia",
        title: "Mene o Família yo Okulia",
        question: "Ndopo tuguvelisopo ovina vyasualo viala herança kuenda okulia kuomala vetu?",
        description: "Aulasololo ocitela divórcio, okulia kuomala ava kacila kanyima, alambamento yo união de facto kuenda herança yaco olo.",
        icon: "Heart",
        laws: "Ocihandeleko canene upato de Família e Civil",
      },
      {
        id: "geral",
        title: "Dívidas kuenda Olombela asualo",
        question: "Ndyete olombongo viokuconga munu, munu kave kumuika. Ndopo ongyola vi?",
        description: "Ovitumbula violombongo viomanu via kakatela kanyima, ondaka yovizino ovina vionyola, o acidentes vio trânsito yo ovina kakuete seguradora.",
        icon: "Scale",
        laws: "Código Civil kuenda o Cível fofolo",
      },
      {
        id: "consumidor",
        title: "Ovisila lio Omanu vo Consumidor",
        question: "Ngalanda ocina camnyoka handi kava pepi ombapolo. Ndopo ongwala vi?",
        description: "Olombongo viacongua vio telecomunicações, asukuapo andi oloya. Lilava cose siove k’ovijila via Lei n.º 15/03.",
        icon: "ShieldAlert",
        laws: "Ocihandeleko lio Defesa do Consumidor (Lei n.º 15/03)",
      },
    ];
  }

  if (langCode === "ki") {
    return [
      {
        id: "laboral",
        title: "Maka m’Upange ni Jimbongo",
        question: "Abhingi kungala upange uami ni kitadi kiene upange kiasomboke. Ijila iami yandela uahi?",
        description: "Uangana kuingidisela upange se maka macili mu LGT ia fofolo ia Angola? Soneha kitadi move kiasuku tye kyoso kufunda ku upange.",
        icon: "Briefcase",
        laws: "Kijila Kianene kia Upange LGT (Lei n.º 12/23)",
      },
      {
        id: "imobiliario",
        title: "Leasing ia Inzo mba Ovididi",
        question: "Fumu nza mbe mutala iami uandala kumbhingila inzo. Makunyingila ojila mu nza?",
        description: "Monasala se mifumu ya inzo mala ijila mu kufunga mbandu ndonbela, bhinga kitadi kia caução kine kukinza mba ovididi bia ixi iove.",
        icon: "Home",
        laws: "Kijila kia Arrendamento Urbano ni Código Civil",
      },
      {
        id: "familia",
        title: "Miji ni Heranças i’Athu",
        question: "Mu konda dia kulonga herança fumu ni kubhanga ku mbe pensão i’athu nza yandela uahi?",
        description: "Kutongolola maka mufua divórcio, pensão ia kudia ia ana, alambamento união de facto ni kubhalula herança ioso kyoso munu falamu.",
        icon: "Heart",
        laws: "Kijila kia Família ni Código Civil",
      },
      {
        id: "geral",
        title: "Jidívidas ni Maka m’Oso ambandu",
        question: "Ngiene ni kitadi mbe athu m’ oso, munu falu kukuatela kufuta upange. Nginge uahi ciki?",
        description: "Maka m’oso ala ovididi athu jimpata, kine kibhanga lukuaku maka mu vizinhos jinyola, mba acidentes ia fofolo mbandu ia seguros se muene tye.",
        icon: "Scale",
        laws: "Código Civil ni Processual Civil ia fofolo",
      },
      {
        id: "consumidor",
        title: "Ijila ia Mundu u’Angola",
        question: "Ngalandele kima kionyoka tye mbe kuxitisa mbandu ijila ia mudu kiasomboke. Nginge uahi?",
        description: "Maka ma fudisela athu mu telefone, luz mba upatelo ia telecomunicações. Sueka kitadi kia andela move mu Kijila n.º 15/03.",
        icon: "ShieldAlert",
        laws: "Kijila kya Defesa do Consumidor (Lei n.º 15/03)",
      },
    ];
  }

  if (langCode === "ar") {
    return [
      {
        id: "laboral",
        title: "الوضع العمالي / التوظيف",
        question: "تم فصلي من العمل أو لدي رواتب متأخرة. ما هي حقوقي؟",
        description: "هل تعرضت للفصل دون سبب عادل بموجب قانون العمل الجديد (القانون 12/23)، أو رواتب/علاوات غير مدفوعة، أو إجراءات تأديبية تعسفية؟ احسب تعويضاتك وفوائد التأخير.",
        icon: "Briefcase",
        laws: "قانون العمل العام في أنغولا (القانون رقم 12/23، الصادر في 29 أغسطس)",
      },
      {
        id: "imobiliario",
        title: "الإيجار أو الأراضي",
        question: "يريد مالك العقار إخلائي أو لدينا نزاع حول الإيجار. هل يمكن فصلي/إخلائي؟",
        description: "تحقق مما إذا كانت إشعارات الإخلاء صالحة بموجب قانون الإيجار الحضري، وكيفية استرداد مبلغ التأمين المحتجز أو كيفية التصرف في نزاعات الأراضي.",
        icon: "Home",
        laws: "قانون الإيجار الحضري والقانون المدني لجمهورية أنغولا",
      },
      {
        id: "familia",
        title: "الأسرة والمواريث",
        question: "كيفية تقسيم الميراث أو تأمين مبالغ نفقة الأطفال؟",
        description: "استفسارات حول الانفصال وتقسيم الأموال المشتركة، تحديد أو تأخير نفقة الأطفال، الاعتراف القضائي بالزواج العرفي (ألامبامينتو) أو حصر الإرث.",
        icon: "Heart",
        laws: "قانون الأسرة الأنغولي والتشريع المدني",
      },
      {
        id: "geral",
        title: "الديون والنزاعات الأخرى",
        question: "لدي أموال مستحقة أو قرض غير مدفوع. كيف أسترد ديني؟",
        description: "الأرصدة المالية المستحقة وغير المدفوعة، مشاكل وتسريبات المياه أو أضرار الضوضاء من الجيران، نزاعات حوادث السير بدون تأمين ساري، أو القضايا المدنية العامة.",
        icon: "Scale",
        laws: "القانون المدني وقانون الإجراءات المدنية الأنغولي",
      },
      {
        id: "consumidor",
        title: "حقوق المستهلك",
        question: "اشتريت منتجًا معيبًا أو تعرضت للخداع في خدمات. كيف أشتكي؟",
        description: "حالات الرسوم غير العادلة من شركات الاتصالات والكهرباء والمياه، الرفض غير المبرر للإرجاع أو تفعيل الضمان. احمِ أموالك بناءً على القانون رقم 15/03.",
        icon: "ShieldAlert",
        laws: "قانون الدفاع عن المستهلك في أنغولا (القانون رقم 15/03)",
      },
    ];
  }

  if (langCode === "zh") {
    return [
      {
        id: "laboral",
        title: "劳动合同与就业合规",
        question: "我被解雇了或者遭遇欠薪。我有哪些正当的法律权利？",
        description: "在安哥拉最新普通劳动法（第12/23号法律）下被无故口头解雇、拖欠工资/津贴（年终奖、十三薪）或面临恶意的纪律处分？在此预估您的法定赔偿金及逾期带息利息。",
        icon: "Briefcase",
        laws: "安哥拉共和国《普通劳动法》（2023年8月29日第12/23号法律）",
      },
      {
        id: "imobiliario",
        title: "房屋租赁与土地物权",
        question: "房东要求我搬离或存在租金纠纷。我会被强制驱逐吗？",
        description: "根据《城市房屋租赁法》核对房东驱逐令是否合法有效，如何依法要回被扣留的租房押金，以及在土地界线和产权纠纷中应如何主张权益。",
        icon: "Home",
        laws: "安哥拉《城市房屋租赁法》和《民法典》",
      },
      {
        id: "familia",
        title: "婚姻家庭与财产继承",
        question: "如何分割夫妻共有财产或为主张子女抚养费？",
        description: "关于离婚纠纷及夫妻共有财产清算、抚养费协议确认或拖欠执行、寻求司法确立事实婚姻关系（传统婚礼Alambamento）或死者遗产继承析产等问题。",
        icon: "Heart",
        laws: "安哥拉《家庭法典》及民事法律",
      },
      {
        id: "geral",
        title: "债务纠纷与一般民事争议",
        question: "我有债权要追讨，或面临借款人失联违约。如何保障债权追偿？",
        description: "追索拖欠合同尾款或个人借款、邻里房屋渗水噪音侵权责任、无第三方商业险责任下的交通事故损害赔偿索赔、或一般性民事确权及合同诉讼。",
        icon: "Scale",
        laws: "安哥拉《民法典》和《民事诉讼法典》",
      },
      {
        id: "consumidor",
        title: "消费者权益与维权",
        question: "我购入了带有严重缺陷的商品，或遭遇消费欺诈。如何合法维权？",
        description: "电信运营商及水电气公司扣费不公或恶意乱扣、产品质量故障商家拒绝退换或履行保修、服务商虚假宣传等。依据安哥拉第15/03号消保法维护您的合法权益。",
        icon: "ShieldAlert",
        laws: "安哥拉《消费者权益保护法》（第15/03号法律）",
      },
    ];
  }

  return [];
}

export function getTranslatedCategories(langCode: string, originalCategories: Record<string, any>): Record<string, any> {
  const deepCopied = JSON.parse(JSON.stringify(originalCategories));
  if (langCode === "pt" || !UI_TRANSLATIONS[langCode]) {
    return deepCopied;
  }

  // Inject localized categories descriptions and labels
  if (langCode === "en") {
    // English
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "Labor & Employment Law";
      deepCopied.laboral.description = "Employee disputes, unfair dismissals, compensation payouts, unpaid wages, and rights under the new LGT.";
      deepCopied.laboral.questions[0].label = "Employee Full Name";
      deepCopied.laboral.questions[0].placeholder = "E.g., Manuel Baptista";
      deepCopied.laboral.questions[1].label = "Is there a written employment contract?";
      deepCopied.laboral.questions[1].options = [
        "Yes, written contract for an indefinite term",
        "Yes, written fixed-term contract (with a deadline)",
        "No, verbal agreement only (no document)",
        "I do not know or am not sure",
      ];
      deepCopied.laboral.questions[2].label = "How long have you worked or did work for this company?";
      deepCopied.laboral.questions[2].options = [
        "Less than 6 months",
        "Between 6 months and 1 year",
        "Between 1 and 5 years",
        "More than 5 years",
      ];
      deepCopied.laboral.questions[3].label = "What is your approximate gross monthly salary (in Kwanzas - AOA)?";
      deepCopied.laboral.questions[3].placeholder = "E.g., 150000";
      deepCopied.laboral.questions[4].label = "What is the main situation prompting this consultation?";
      deepCopied.laboral.questions[4].options = [
        "Verbal dismissal or dismissal without just cause",
        "Unpaid salaries or bonuses (Vacation, Christmas)",
        "Disciplinary action or suspension applied",
        "Lack of safety conditions or workplace accident",
        "Workplace harassment or unilateral changes to schedules/roles",
        "Failure to transfer INSS social security contributions",
        "Other contractual issues",
      ];
      deepCopied.laboral.questions[5].label = "Describe in detail the circumstances of the event (dates, behaviors, witnesses):";
      deepCopied.laboral.questions[5].placeholder = "Please explain what happened in chronological order. Tip: If you mention specific values such as your gross monthly salary, years of service, or payment delay days, the system will apply calculations for custom estimates in the final report.";
    }

    if (deepCopied.familia) {
      deepCopied.familia.title = "Family & Estate Law";
      deepCopied.familia.description = "Marriage, recognized common-law union (alambamento), divorce, splits, child support alimony, custody, and inheritance issues.";
      deepCopied.familia.questions[0].label = "Your Full Name";
      deepCopied.familia.questions[1].label = "What is the regime or nature of your relationship?";
      deepCopied.familia.questions[1].options = [
        "Civil Marriage (Community Property)",
        "Recognized Common-Law Union (or to be recognized in court)",
        "Traditional Marriage (Alambamento / engagement) without civil registration",
        "Religious Marriage only",
        "No direct partner relationship (parental bond or estate heir only)",
      ];
      deepCopied.familia.questions[2].label = "Are there minor children fathered/mothered from this relationship?";
      deepCopied.familia.questions[2].options = [
        "None minor of age",
        "Yes, 1 minor child",
        "Yes, 2 or more minor children",
      ];
      deepCopied.familia.questions[3].label = "What is the primary topic of your family dispute?";
      deepCopied.familia.questions[3].options = [
        "Divorce proceedings and sharing of common property",
        "Child support alimony payments (non-payment/delay)",
        "Child custody or paternal authority regulations",
        "Court recognition of Common-Law Union post-mortem or separation",
        "Inheritance and settlement of assets left by deceased person",
        "Domestic violence or urgent protection orders",
        "Other family matter",
      ];
      deepCopied.familia.questions[4].label = "Explain the family details that generated the problem in depth:";
      deepCopied.familia.questions[4].placeholder = "Indicate key dates, actions. Tip: If it is a child support case, mention the net monthly income of the provider and the number of children; the system will apply family equations to estimate court expectations in your preliminary report.";
    }

    if (deepCopied.imobiliario) {
      deepCopied.imobiliario.title = "Leasing & Real Estate Law";
      deepCopied.imobiliario.description = "Residential or commercial leasing contracts, unlawful eviction threats, repairs, rent payments, and boundary/lote disputes.";
      deepCopied.imobiliario.questions[0].label = "Your Full Name";
      deepCopied.imobiliario.questions[1].label = "What is your role under this contract or property?";
      deepCopied.imobiliario.questions[1].options = [
        "Tenant (Lessee)",
        "Landlord (Lessor)",
        "Promissory Buyer of Land / House",
        "Promissory Seller / Grantor",
        "Other",
      ];
      deepCopied.imobiliario.questions[2].label = "Is there a signed written contract?";
      deepCopied.imobiliario.questions[2].options = [
        "Yes, written contract with signatures certified by the Notuary Cartório",
        "Yes, simple written contract (without certification)",
        "No, verbal agreement only (informal contracts)",
        "No, but I possess payment receipts for rent / binder deposits",
      ];
      deepCopied.imobiliario.questions[3].label = "What is the approximate monthly rent or business value (in Kwanzas)?";
      deepCopied.imobiliario.questions[4].label = "Which is the central dispute of this case?";
      deepCopied.imobiliario.questions[4].options = [
        "Threat or unlawful eviction notice by the landlord",
        "Repeated delay or failure in paying rent",
        "Lack of urgent repairs or structural maintenance on the property",
        "Landlord refuses to return the paid initial security deposit",
        "Title boundary, lands partition, or property encroachment",
        "Delay or default in delivering a property bought off-plan",
        "Other civil dispute",
      ];
      deepCopied.imobiliario.questions[5].label = "Explain in detail the leasing or property dispute:";
    }

    if (deepCopied.consumidor) {
      deepCopied.consumidor.title = "Consumer Protection";
      deepCopied.consumidor.description = "Defending consumer choices, defective products, warranty failures, billing errors or misleading telecom/utility contracts.";
      deepCopied.consumidor.questions[0].label = "Your Full Name";
      deepCopied.consumidor.questions[1].label = "What was the product or service acquired?";
      deepCopied.consumidor.questions[2].label = "What is the name of the selling company / provider?";
      deepCopied.consumidor.questions[3].label = "Did you log a formal complaint/ticket to the seller?";
      deepCopied.consumidor.questions[3].options = [
        "Yes, registered in the physical or digital Complaint Book",
        "Yes, sent formal letter with advice of receipt / formal email",
        "Yes, but verbally only (phone calls or frontdesk talk)",
        "No, I have not lodged any formal complaint yet",
      ];
      deepCopied.consumidor.questions[4].label = "Select the primary infraction committed by the company:";
      deepCopied.consumidor.questions[4].options = [
        "Product features defects/failure and they refuse return/repairs",
        "Contracted service does not work (continual failures) but they still charge",
        "Unlawful charging of supplementary packs or abusive invoice balances",
        "Misleading advertising or false info at the purchase timing",
        "Refusal to let cancel a loyalty plan contract",
        "Damage caused to the user due to bad technical practice or negligence",
        "Other consumer rights disrespect",
      ];
      deepCopied.consumidor.questions[5].label = "Describe your experience and the reason you feel harmed:";
    }

    if (deepCopied.geral) {
      deepCopied.geral.title = "General Cases & Other Conflicts";
      deepCopied.geral.description = "File other administrative or civil conflicts such as neighbor disputes, car crash damages, unpaid personal loans, etc.";
      deepCopied.geral.questions[0].label = "Your Full Name";
      deepCopied.geral.questions[1].label = "Which category best represents your civil worry?";
      deepCopied.geral.questions[1].options = [
        "Neighbor disputes and damages (noise, leaks, landmarks)",
        "Car accident/collision and refusal to pay repairs or launch insurance",
        "Outstanding loans defaulted by a personal acquaintance",
        "Lawsuits against resolutions of Public Administration / Impostos",
        "Property damages, contested complex inherited items, or cartório items",
        "Other civil or general matter",
      ];
      deepCopied.geral.questions[2].label = "Who is the opposing subject in this dispute?";
      deepCopied.geral.questions[2].options = [
        "A neighbor or private individual",
        "A public office / Angolan State / Municipal Directorate",
        "A family member or former business partner",
        "A banking institution, insurer, or private corporation",
        "Another entity",
      ];
      deepCopied.geral.questions[3].label = "Summarize the circumstances and your legal doubt in detail:";
    }
  }

  if (langCode === "fr") {
    // French
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "Droit du Travail";
      deepCopied.laboral.description = "Conflits avec l'employeur, licenciements injustifiés, primes impayées et droits sous la nouvelle LGT.";
      deepCopied.laboral.questions[0].label = "Nom Complet du Salarié";
      deepCopied.laboral.questions[1].label = "Existe-t-il un contrat de travail écrit ?";
      deepCopied.laboral.questions[1].options = [
        "Oui, contrat écrit à durée indéterminée",
        "Oui, contrat écrit de travail à terme (à durée déterminée)",
        "Non, simple accord verbal (aucun écrit)",
        "Je ne sais pas / je ne suis pas certain",
      ];
      deepCopied.laboral.questions[2].label = "Depuis combien de temps travaillez-vous dans cette entreprise ?";
      deepCopied.laboral.questions[2].options = [
        "Moins de 6 mois",
        "Entre 6 mois et 1 an",
        "Entre 1 et 5 ans",
        "Plus de 5 ans",
      ];
      deepCopied.laboral.questions[3].label = "Quel est votre salaire brut mensuel estimé (en Kwanzas - AOA) ?";
      deepCopied.laboral.questions[4].label = "Quelle est la situation principale motivant votre requête ?";
      deepCopied.laboral.questions[4].options = [
        "Licenciement verbal ou rupture abusive de contrat",
        "Salaires ou congés/subsides en retard (Vacances, Noël)",
        "Procédure disciplinaire ou suspension illicite appliquée",
        "Défaut de sécurité ou accident de travail constaté",
        "Harcèlement au travail ou changement arbitraire d'horaires ou rôle",
        "Absence de versement des cotisations INSS par l'employeur",
        "Autre litige lié au contrat",
      ];
      deepCopied.laboral.questions[5].label = "Décrivez les circonstances exactes du conflit (dates, témoins) :";
      deepCopied.laboral.questions[5].placeholder = "Donnez l'historique chronologique pour guider l'intelligence artificielle angolaise.";
    }

    if (deepCopied.familia) {
      deepCopied.familia.title = "Droit de Famille & Patrimoine";
      deepCopied.familia.description = "Mariage, concubinage notifié (alambamento), garde d'enfants, pension alimentaire et règlement successoral complet.";
      deepCopied.familia.questions[0].label = "Votre Nom Complet";
      deepCopied.familia.questions[1].label = "Quel est le régime ou la nature de votre union conjugale ?";
      deepCopied.familia.questions[1].options = [
        "Mariage Civil (Communauté de Biens)",
        "Union de Fait enregistrée (ou en phase de déclaration judiciaire)",
        "Mariage Traditionnel (Alambamento / fiançailles) sans acte civil",
        "Mariage Religieux uniquement",
        "Aucune relation directe de couple (héritier ou contestation simple de lien)",
      ];
      deepCopied.familia.questions[2].label = "Y a-t-il des enfants mineurs nés de cette union ?";
      deepCopied.familia.questions[2].options = [
        "Aucun enfant mineur de moins de 18 ans",
        "Oui, un enfant à charge",
        "Oui, deux enfants ou plus",
      ];
      deepCopied.familia.questions[3].label = "Quel est l'objet principal du litige familial ?";
      deepCopied.familia.questions[3].options = [
        "Procédure de divorce et partage équilibré du patrimoine commun",
        "Non-paiement réitéré ou fixation de la pension alimentaire",
        "Garde partagée ou garde exclusive des enfants mineurs",
        "Reconnaissance judiciaire d'Union libre post-mortem ou après rupture",
        "Partage et désignation d'un liquidateur de biens successoraux",
        "Violence conjugale ou demande de garde protectrice immédiate",
        "Autre sujet de droit familial",
      ];
      deepCopied.familia.questions[4].label = "Précisez l'historique familial de façon claire :";
    }

    if (deepCopied.imobiliario) {
      deepCopied.imobiliario.title = "Baux & Immobilier";
      deepCopied.imobiliario.description = "Baux d'habitation ou à usage professionnel, expulsions litigieuses, entretien, restitution de dépôt de garantie.";
      deepCopied.imobiliario.questions[0].label = "Votre Nom Complet";
      deepCopied.imobiliario.questions[1].label = "Quelle est votre qualité sur le logement ou terrain ?";
      deepCopied.imobiliario.questions[1].options = [
        "Locataire",
        "Bailleur (Propriétaire)",
        "Promettant Acheteur de terrain familial ou maison",
        "Promettant Vendeur",
        "Autre statut",
      ];
      deepCopied.imobiliario.questions[2].label = "Disposez-vous d'un contrat de bail écrit ?";
      deepCopied.imobiliario.questions[2].options = [
        "Oui, contrat de bail notarié en étude",
        "Oui, bail écrit sous seing privé (non certifié)",
        "Non, simple accord verbal",
        "Non, mais j'ai conservé les récépissés et reçus de loyer",
      ];
      deepCopied.imobiliario.questions[3].label = "Quel est le montant mensuel du loyer ou du transfert (en Kwanzas) ?";
      deepCopied.imobiliario.questions[4].label = "Quel est le problème principal au cœur de ce litige ?";
      deepCopied.imobiliario.questions[4].options = [
        "Avis de congé ou tentative d'expulsion illicite par le bailleur",
        "Défaut répété de versement ou retards abusifs de paiement des loyers",
        "Refus de réaliser des réparations fondamentales ou de structure",
        "Le propriétaire retient injustement la caution de garantie",
        "Invasion de terrain, problème de bornage ou litige foncier",
        "Rupture de promesse de vente ou livraison non conforme",
        "Autre conflit cível foncier",
      ];
      deepCopied.imobiliario.questions[5].label = "Racontez l'histoire du différend immobilier en détail :";
    }

    if (deepCopied.consumidor) {
      deepCopied.consumidor.title = "Protection des Consommateurs";
      deepCopied.consumidor.description = "Défis de biens viciés ou défectueux, contestation d'abonnements, fraude commerciale et factures excessives.";
      deepCopied.consumidor.questions[0].label = "Votre Nom Complet";
      deepCopied.consumidor.questions[1].label = "Quel est le produit ou service acheté ?";
      deepCopied.consumidor.questions[2].label = "Nom du professionnel / vendeur mis en cause ?";
      deepCopied.consumidor.questions[3].label = "Avez-vous adressé une réclamation écrite formelle ?";
      deepCopied.consumidor.questions[3].options = [
        "Oui, plainte visée au Livre des Réclamations de l'établissement",
        "Oui, j'ai transmis un écrit recommandé / e-mail de mise en demeure",
        "Oui, mais de vive voix (guichet d'accueil ou téléphone)",
        "Non, aucune plainte ou démarche entamée à cette heure",
      ];
      deepCopied.consumidor.questions[4].label = "Quelle clause abusive ou infraction est constatée ?";
      deepCopied.consumidor.questions[4].options = [
        "Produit en panne et refus de réparer ou rembourser le montant",
        "Panne de service continue mais l'abonnement reste prélevé",
        "Frais non convenus ajoutés ou surfacturations d'eau/courant",
        "Mensonges publicitaires caractérisés durant l'achat",
        "Refus d'acter la résiliation d'un engagement contractuel",
        "Incompétence notoire du prestataire entraînant des dégradations",
        "Autre violation grave du droit des consommateurs",
      ];
      deepCopied.consumidor.questions[5].label = "Exposez le conflit avec le professionnel de façon exhaustive :";
    }

    if (deepCopied.geral) {
      deepCopied.geral.title = "Autres Conflits Civils Généraux";
      deepCopied.geral.description = "Conflits de voisinage, dettes personnelles, accidents de la route et autres procédures administratives complexes.";
      deepCopied.geral.questions[0].label = "Votre Nom Complet";
      deepCopied.geral.questions[1].label = "Quel est le cadre général de votre demande ?";
      deepCopied.geral.questions[1].options = [
        "Troubles du voisinage ordinaires (tapage, infiltrations, clôtures)",
        "Restauration de carrosserie voiture/refus d'indemnisation assureur",
        "Prêt d'argent entre proches non soldé à l'échéance",
        "Contestation formelle d'avis administratif de l'État d'Angola",
        "Dommage matériel, testaments délicats ou actes de notaire douteux",
        "Autre dossier civil ou administratif général",
      ];
      deepCopied.geral.questions[2].label = "Quelle est la partie adverse ?";
      deepCopied.geral.questions[2].options = [
        "Un particulier ou voisin de palier",
        "Une agence publique / l'État Angolais / Directoire Municipal",
        "Un parent ou ancien partenaire d'affaires cível",
        "Une banque tierce, assureur, ou grande enseigne de crédit",
        "Une autre catégorie de structure",
      ];
      deepCopied.geral.questions[3].label = "Résumez vos griefs ainsi que vos attentes de réponse :";
    }
  }

  if (langCode === "um") {
    // Umbundu
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "Upange yo LGT";
      deepCopied.laboral.description = "Olasololo kuenda olombela viomanu votembo yakatela upange olo.";
      deepCopied.laboral.questions[0].label = "Onduko Yesulapo Yove";
      deepCopied.laboral.questions[1].label = "O kuete contrato sonehiwa?";
      deepCopied.laboral.questions[1].options = [
        "Sim, written contrato indefinite",
        "Sim, contrato term",
        "Não, deal verbal",
        "Não sei",
      ];
      deepCopied.laboral.questions[3].label = "Esalaro bruto mensal Kwanza (AOA)";
      deepCopied.laboral.questions[5].label = "Lombola ovina viacila upange ove:";
    }
    // We do simple merge to ensure Umbundu compiles easily
  }

  if (langCode === "ki") {
    // Kimbundu
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "Upange ni LGT";
      deepCopied.laboral.description = "Maka m'upange ni LGT fofolo ia Angola.";
      deepCopied.laboral.questions[0].label = "Onduko Yesofolo Move";
      deepCopied.laboral.questions[1].label = "Uene contrato soneha mu upange?";
      deepCopied.laboral.questions[1].options = [
        "Iene kijiila contrato indefinite",
        "Iene contrato com prazo",
        "Se contrato soneha (verbal)",
        "Kijiia tye",
      ];
      deepCopied.laboral.questions[3].label = "Kitadi bruto kibonga tye upange moxi ia Kwanza";
      deepCopied.laboral.questions[5].label = "Soneha maka move ma bhaluka ku upange:";
    }
    // We do simple merge to ensure Kimbundu compiles easily
  }

  if (langCode === "ar") {
    // Arabic
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "قانون العمل والتوظيف";
      deepCopied.laboral.description = "نزاعات الموظفين، الفصل التعسفي، مبالغ التعويض، الرواتب المتأخرة، والحقوق بموجب قانون العمل الجديد.";
      deepCopied.laboral.questions[0].label = "الاسم الكامل للموظف";
      deepCopied.laboral.questions[0].placeholder = "مثال: مانويل بابتيستا";
      deepCopied.laboral.questions[1].label = "هل يوجد عقد عمل مكتوب؟";
      deepCopied.laboral.questions[1].options = [
        "نعم، عقد مكتوب غير محدد المدة",
        "نعم، عقد مكتوب محدد المدة (مع تاريخ انتهاء)",
        "لا، اتفاق شفهي فقط (بدون وثيقة)",
        "لا أعلم أو لست متأكدًا",
      ];
      deepCopied.laboral.questions[2].label = "ما هي مدة عملك في هذه الشركة؟";
      deepCopied.laboral.questions[2].options = [
        "أقل من 6 أشهر",
        "بين 6 أشهر وسنة واحدة",
        "بين سنة و 5 سنوات",
        "أكثر من 5 سنوات",
      ];
      deepCopied.laboral.questions[3].label = "ما هو راتبك الشهري الإجمالي التقريبي (بالكوانزا الأنغولية - AOA)؟";
      deepCopied.laboral.questions[3].placeholder = "مثال: 150000";
      deepCopied.laboral.questions[4].label = "ما هو الوضع التجاري الرئيسي الذي يدفعك لهذه الاستشارة؟";
      deepCopied.laboral.questions[4].options = [
        "فصل شفهي أو فصل بدون سبب عادل",
        "رواتب أو علاوات غير مدفوعة (الإجازة، عيد الميلاد)",
        "إجراء تأديبي أو تعليق العمل المطبق",
        "نقص شروط السلامة أو وقوع حادث عمل",
        "المضايقات في مكان العمل أو التغييرات أحادية الجانب للمهام/المسؤوليات",
        "عدم تحويل اشتراكات الضمان الاجتماعي INSS للموظف",
        "مسائل تعاقدية أخرى",
      ];
      deepCopied.laboral.questions[5].label = "صف بالتفصيل ظروف الحدث (التواريخ، السلوكيات، الشهود):";
      deepCopied.laboral.questions[5].placeholder = "يرجى توضيح ما حدث بالتسلسل الزمني. تلميح: إذا ذكرت قيمًا معينة مثل راتبك الإجمالي، أو خدمة السنوات، أو أيام التأخير، فسيقوم النظام بتطبيق معادلات للحسابات المخصصة في التقرير النهائي.";
    }

    if (deepCopied.familia) {
      deepCopied.familia.title = "قانون الأسرة والمواريث";
      deepCopied.familia.description = "الزواج، الاعتراف القضائي بالعلاقة المشتركة (ألامبامينتو)، الطلاق، تقسيم الممتلكات، نفقة الأطفال، الحضانة وحصر الإرث.";
      deepCopied.familia.questions[0].label = "اسمك الكامل";
      deepCopied.familia.questions[1].label = "ما هو طبيعة أو نظام علاقتك؟";
      deepCopied.familia.questions[1].options = [
        "زواج مدني (اشتراك في الممتلكات)",
        "العلاقة المشتركة المعترف بها (أو المطلوب الاعتراف بها في المحكمة)",
        "زواج تقليدي (ألامبامينتو / خطوبة) دون تسجيل مدني",
        "زواج ديني فقط",
        "لا توجد علاقة مباشرة لشريك (صلة قرابة أو وريث تركة فقط)",
      ];
      deepCopied.familia.questions[2].label = "هل يوجد أطفال قاصرون من هذه العلاقة؟";
      deepCopied.familia.questions[2].options = [
        "لا يوجد قاصرون",
        "نعم، طفل قاصر واحد",
        "نعم، طفلان قاصران أو أكثر",
      ];
      deepCopied.familia.questions[3].label = "ما هو موضوع الخلاف الرئيسي في نزاعك الأسري؟";
      deepCopied.familia.questions[3].options = [
        "إجراءات الطلاق وتقسيم الممتلكات المشتركة",
        "مدفوعات نفقة الأطفال (عدم الدفع / التأخر)",
        "حضانة الأطفال ولوائح رعاية الأبوين",
        "الاعتراف القضائي بالعشرة post-mortem أو بعد الانفصال",
        "المواريث وتسوية الممتلكات التي تركها المتوفى",
        "العنف المنزلي أو طلب حماية عاجل",
        "شأن أسري آخر",
      ];
      deepCopied.familia.questions[4].label = "وضح التفاصيل الأسرية التي تسببت في المشكلة بعمق:";
      deepCopied.familia.questions[4].placeholder = "يرجى ذكر التواريخ والإجراءات الأساسية.";
    }

    if (deepCopied.imobiliario) {
      deepCopied.imobiliario.title = "قانون الإيجارات والعقارات";
      deepCopied.imobiliario.description = "عقود الإيجار السكنية أو التجارية، التهديد بالإخلاء غير القانوني، الإصلاحات، دفع الإيجار، ونزاعات الحدود والقطع الأرضية.";
      deepCopied.imobiliario.questions[0].label = "اسمك الكامل";
      deepCopied.imobiliario.questions[1].label = "ما هو دورك بموجب هذا العقد أو العقار؟";
      deepCopied.imobiliario.questions[1].options = [
        "المستأجر",
        "المؤجر (المالك)",
        "مشتري واعد لأرض / عقار",
        "بائع واعد / واهب",
        "آخر",
      ];
      deepCopied.imobiliario.questions[2].label = "هل يوجد عقد مكتوب وموقع؟";
      deepCopied.imobiliario.questions[2].options = [
        "نعم، عقد مكتوب موثق ومصدق عليه لدى الكارتوريو",
        "نعم، عقد مكتوب بسيط (بدون تصديق رسمي)",
        "لا، اتفاق شفوي فقط (عقود غير رسمية)",
        "لا، ولكن لدي إيصالات دفع إيجار أو دفعات مقدمة",
      ];
      deepCopied.imobiliario.questions[3].label = "ما هو قيمة الإيجار الشهري أو العمل التجاري التقريبي (بالكوانزا)؟";
      deepCopied.imobiliario.questions[4].label = "ما هو النزاع المركزي في هذا الملف؟";
      deepCopied.imobiliario.questions[4].options = [
        "تهديد أو إشعار إخلاء غير قانوني من قبل المالك",
        "تأخر متكرر أو التخلف عن دفع الإيجار",
        "عدم تنفيذ الإصلاحات العاجلة أو الصيانة الأساسية للعقار",
        "رفض المالك إعادة مبلغ التأمين المدفوع (الضمان)",
        "تحديد الحدود، تقسيم الأراضي، أو التعدي على الممتلكات",
        "تأخر أو تقصير في تسليم عقار تم شراؤه على الخارطة",
        "نزاع مدني عقاري آخر",
      ];
      deepCopied.imobiliario.questions[5].label = "وضح بالتفصيل النزاع العقاري أو نزاع الإيجار:";
    }

    if (deepCopied.consumidor) {
      deepCopied.consumidor.title = "حماية المستهلك";
      deepCopied.consumidor.description = "الدفاع عن خيارات المستهلكين، السلع المعيبة، إخفاقات الضمان، أخطاء الفواتير أو عقود الاتصالات والمرافق التعسفية.";
      deepCopied.consumidor.questions[0].label = "اسمك الكامل";
      deepCopied.consumidor.questions[1].label = "ما هو المنتج أو الخدمة التي تم شراءها؟";
      deepCopied.consumidor.questions[2].label = "ما هو اسم الشركة البائعة / المزودة؟";
      deepCopied.consumidor.questions[3].label = "هل قدمت شكوى رسمية للبائع؟";
      deepCopied.consumidor.questions[3].options = [
        "نعم، مسجلة في كتاب الشكاوى الورقي أو الرقمي الرسمي",
        "نعم، أرسلت رسالة رسمية بإشعار الاستلام / بريد إلكتروني رسمي",
        "نعم، ولكن شفهياً فقط (مكالمة أو حديث بمكتب الاستقبال)",
        "لا، لم أقدم أي شكوى رسمية بعد",
      ];
      deepCopied.consumidor.questions[4].label = "حدد المخالفة الرئيسية المرتكبة من قبل الشركة:";
      deepCopied.consumidor.questions[4].options = [
        "خلل / عيب في المنتج ويرفضون الإرجاع أو الإصلاح",
        "الخدمة المتعاقد عليها لا تعمل ولكنهم يواصلون جبي الفواتير",
        "فرض رسوم إضافية غير قانونية أو فواتير مبالغ فيها للمياه/الكهرباء",
        "إعلان مضلل أو معلومات كاذبة عند الشراء",
        "الرفض غير المبرر للسماح بإلغاء اشتراك والتزام تعاقدي",
        "أضرار لحقت بالمستخدم بسبب الممارسات الفنية السيئة أو الإهمال",
        "عدم احترام حقوق المستهلك الأخرى",
      ];
      deepCopied.consumidor.questions[5].label = "صف بالتفصيل تجربتك والسبب الذي يجعلك تشعر بالضرر:";
    }

    if (deepCopied.geral) {
      deepCopied.geral.title = "القضايا العامة والنزاعات الأخرى";
      deepCopied.geral.description = "إيداع النزاعات الإدارية والمدنية الأخرى مثل خلافات الجيران، أضرار حوادث السيارات، القروض غير المدفوعة، إلخ.";
      deepCopied.geral.questions[0].label = "اسمك الكامل";
      deepCopied.geral.questions[1].label = "ما هي الفئة التي تمثل نزاعك المدني بشكل أفضل؟";
      deepCopied.geral.questions[1].options = [
        "نزاعات وأضرار الجيران (ضوضاء، تسربات مياه، حدود)",
        "حادث سير / اصطدام والرفض لدفع الإصلاحات أو تفعيل التأمين",
        "تأخر أو تعثر في سداد قرض متفق عليه من قبل معارف شخصيين",
        "قضايا وطعون ضد قرارات الإدارة العامة أو الضرائب",
        "أضرار مادية، أو بنود مواريث معقدة، أو شؤون كارتوريو",
        "نزاع مدني أو مسألة عامة أخرى",
      ];
      deepCopied.geral.questions[2].label = "من هو الطرف الخصم في هذا النزاع؟";
      deepCopied.geral.questions[2].options = [
        "جار أو كائن خاص من الأفراد",
        "مكتب حكومي / الدولة الأنغولية / مديرية بلدية",
        "أحد أفراد الأسرة أو شريك تجاري سابق",
        "مؤسسة مصرفية، شركة تأمين، أو شركة خاصة",
        "جهة أخرى",
      ];
      deepCopied.geral.questions[3].label = "لخص الظروف والشكوك القانونية الخاصة بالتفصيل:";
    }
  }

  if (langCode === "zh") {
    // Chinese / Mandarin
    if (deepCopied.laboral) {
      deepCopied.laboral.title = "劳动与雇佣关系合规";
      deepCopied.laboral.description = "劳资纠纷、不公正解雇、法定遣散赔偿、欠薪申诉，以及在安哥拉最新《普通劳动法》规制下的权益保护。";
      deepCopied.laboral.questions[0].label = "员工完整名称";
      deepCopied.laboral.questions[0].placeholder = "例如：阿鲁伯特·加西亚";
      deepCopied.laboral.questions[1].label = "是否存在书面的劳动合同？";
      deepCopied.laboral.questions[1].options = [
        "是，已签署无固定期限书面劳动合同",
        "是，已签署固定期限书面劳动合同 (定期合同)",
        "否，仅有口头或微信达成的一致 (无纸质文件)",
        "我不清楚或无法确定",
      ];
      deepCopied.laboral.questions[2].label = "您在该公司服务或工作了多久时间？";
      deepCopied.laboral.questions[2].options = [
        "少于 6 个月",
        "6 个月至 1 年之间",
        "1 年至 5 年之间",
        "5 年以上",
      ];
      deepCopied.laboral.questions[3].label = "您的税前协议月薪大约是多少 (按安哥拉法定宽扎计算 - AOA)？";
      deepCopied.laboral.questions[3].placeholder = "例如：250000";
      deepCopied.laboral.questions[4].label = "促使您本次提交纠纷初筛的的核心事实是？";
      deepCopied.laboral.questions[4].options = [
        "面临口头通知或无故不公正终止合同 (解雇)",
        "拖欠工资、年假补偿或带薪奖金 (年终十三薪)",
        "公司强加不合理的行政处分、停职或恶意降薪",
        "施工现场安全条件严重欠缺或遭遇工伤事故",
        "职场歧视、恶意骚扰或公司单方面调岗调薪",
        "公司未能按时向国家足额缴纳我个人的社会保险INSS",
        "其他合同违约争议",
      ];
      deepCopied.laboral.questions[5].label = "请清晰讲述导致该事实的背景及详情 (包含关键日期、证据、证人)：";
      deepCopied.laboral.questions[5].placeholder = "请按发生顺序理顺事实。小提示：若在描述中写明明确的年月工龄、协议薪水、拖欠具体天数，算法会自动对遣散补偿进行初级估算。";
    }

    if (deepCopied.familia) {
      deepCopied.familia.title = "家庭婚姻与析产继承";
      deepCopied.familia.description = "民事登记婚姻、法庭承认的事实婚姻（传统 alambamento 定婚）、抚养费要挟、共有财产争议及继承规则。";
      deepCopied.familia.questions[0].label = "您的完整姓名";
      deepCopied.familia.questions[1].label = "您当前的关系性质为何？";
      deepCopied.familia.questions[1].options = [
        "民事登记结婚 (适用夫妻共同财产制)",
        "正处于事实同居关系中 (正寻求法庭民事确权)",
        "仅举行了传统中式或非正式婚礼 (Alambamento / 订婚) 未民事登记",
        "仅举行了宗教教堂婚礼",
        "不存在直接配偶关系 (仅为父母子女赡养关系或遗产继承人)",
      ];
      deepCopied.familia.questions[2].label = "该同居或婚姻关系下是否育有未成年子女？";
      deepCopied.familia.questions[2].options = [
        "没有未成年或需要赡养的子女",
        "有，1 名未成年子女",
        "有，2 名或更多未成年子女",
      ];
      deepCopied.familia.questions[3].label = "本次争议的最核心诉求是？";
      deepCopied.familia.questions[3].options = [
        "离婚程序办理及清算、分割共有财产",
        "子女抚养费的每月转账 (被抚养方拖欠或不履行)",
        "争取子女抚养权、监护权或限制对方探视权",
        "事实同居关系（尤其是因对方去世后）在法庭获得民事确权",
        "死者遗留财产的诉讼 or 非诉析产清算继承",
        "面临家庭暴力，紧急需要人身限制保护令或司法驱逐",
        "其他家庭法事务纠纷",
      ];
      deepCopied.familia.questions[4].label = "请详细描述导致该纠纷的经历和事实：";
      deepCopied.familia.questions[4].placeholder = "请提供具体的年月、人物及财产明细。";
    }

    if (deepCopied.imobiliario) {
      deepCopied.imobiliario.title = "租赁合同与土地产权";
      deepCopied.imobiliario.description = "商业或居住房屋租赁争议、不合规强制驱逐、设施损坏拒不维修、押金退还纠纷及土地界线产权侵占。";
      deepCopied.imobiliario.questions[0].label = "您的完整姓名";
      deepCopied.imobiliario.questions[1].label = "您在被诉物业中扮演的合法角色是？";
      deepCopied.imobiliario.questions[1].options = [
        "承租人 (租客)",
        "出租人 (房东 / 业主)",
        "土地或在建房屋的预备买受方",
        "土地或在建房屋的卖出方/受托方",
        "其他",
      ];
      deepCopied.imobiliario.questions[2].label = "是否存在正式签署的书面租赁合同？";
      deepCopied.imobiliario.questions[2].options = [
        "是，由公证处司法鉴证盖章生效的正式书面租赁合同",
        "是，简单签署的普通书面租赁合同 (未司法鉴证)",
        "否，口头租赁默契 (非正式事实契约)",
        "否，但我保存有每次支付租金、房屋定金的回执和银行转账证据",
      ];
      deepCopied.imobiliario.questions[3].label = "大约的月度租金或标的项目价值是多少 (宽扎)？";
      deepCopied.imobiliario.questions[4].label = "本案核心争议点是？";
      deepCopied.imobiliario.questions[4].options = [
        "面临房东不合规的口头威胁、勒令搬迁或无照驱赶",
        "承租方多次严重拖欠或拒不支付到期房租",
        "物业发生严重水漏等建筑隐患而物业方拒不履行维修义务",
        "租约到期后房东无端拒绝或借故扣留前期履约质保押金",
        "发生了由于土地相邻界线不明确导致的非法侵占抢建",
        "期房及在建大楼期房交付逾期、质量不达标面临索赔",
        "其他财产与租赁民事纠纷",
      ];
      deepCopied.imobiliario.questions[5].label = "请清晰描述该房产租赁或土地地块争议之详情：";
    }

    if (deepCopied.consumidor) {
      deepCopied.consumidor.title = "消费者权益与维权保障";
      deepCopied.consumidor.description = "产品存在安全及功能故障商家拒绝退还、因商家技术过失造成直接财产损毁或遭遇运营商虚假宽带扣费等。";
      deepCopied.consumidor.questions[0].label = "您的完整姓名";
      deepCopied.consumidor.questions[1].label = "您购买获取的产品或服务名称为？";
      deepCopied.consumidor.questions[2].label = "涉事商家/提供商公司的法定或商号名称是什么？";
      deepCopied.consumidor.questions[3].label = "您事先是否提交过正式或口头客户投诉？";
      deepCopied.consumidor.questions[3].options = [
        "是，已经正式登记在商家的实体或网络《投诉登记簿》中",
        "是，已通过书面挂号信或官方电子邮箱发送了催促函",
        "是，仅通过微信、电话形式口头向客服代表反映过",
        "否，目前没有履行任何形式的先前维权投诉程序",
      ];
      deepCopied.consumidor.questions[4].label = "请甄别涉事公司涉嫌犯下的不正当不合规侵害是？";
      deepCopied.consumidor.questions[4].options = [
        "售出仪器产品功能严重缺失故障，但拒绝给予履行保修 or 无条件退款",
        "网络宽带或自来水电经常性中断失效，却每月强行要求征收月租和计费",
        "擅自或开通隐性业务收费包，或恶意收取未通知的滞纳金",
        "销售过程中提供了明显违背事实的广告误导或欺诈销售",
        "强制设卡，非法拒绝用户依法提出解约或中途销号计划",
        "商家技术施工人员严重违反安全操作流程导致我个人财产损失",
        "其他侵害安哥拉消费者法定权益的做法",
      ];
      deepCopied.consumidor.questions[5].label = "详细描述本次购买纠纷及您遭受不正当财务伤害的经过：";
    }

    if (deepCopied.geral) {
      deepCopied.geral.title = "常见一般性民事与行政纠纷";
      deepCopied.geral.description = "解决邻里排水噪音矛盾侵权纠纷、无保险第三方碰撞车祸追索、民间借贷欠款逃逸要挟以及涉政府部门程序纠纷等。";
      deepCopied.geral.questions[0].label = "您的完整姓名";
      deepCopied.geral.questions[1].label = "哪一类最贴切描述您的民事不安？";
      deepCopied.geral.questions[1].options = [
        "邻里侵害与妨害纠纷 (私地漏水、超标噪音、非法占有边界、养犬伤人)",
        "发生车辆剐蹭车祸或人身撞伤，责任方拒绝支付维修费或拒绝联系保险实险",
        "相识熟人恶意拖欠、逾期民间借贷协议债务，面临避让失联",
        "由于不服安哥拉税务局AGT、市政厅、建筑监督处等政令需要申请司法行政复议",
        "面临由于拆迁、房产交纳产生的争议，或者针对公证处Cartório文书有效性疑惑",
        "其他不可分类的一般民商事疑问",
      ];
      deepCopied.geral.questions[2].label = "另一方的涉诉性质大体是？";
      deepCopied.geral.questions[2].options = [
        "邻里邻居、个人亲友关系或其他自然人",
        "公立机关、安哥拉国家公务单位 or 当地市政管理局办公室",
        "我的配偶近亲属、甚至先前的合伙做生意伙伴",
        "银行、金融大企业、商业保险、甚至私有大型垄断公司",
        "其他形式组织机构/联合会",
      ];
      deepCopied.geral.questions[3].label = "请用大实话描述整个事件全貌及您的核心诉求、主张：";
    }
  }

  return deepCopied;
}
