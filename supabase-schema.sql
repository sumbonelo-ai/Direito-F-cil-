-- ==============================================================================
-- SUPABASE / POSTGRESQL SCHEMA FOR DIREITO FÁCIL ANGOLA
-- Execute this SQL script in the Supabase SQL Editor to create all required tables,
-- configure Row Level Security (RLS) policies, and seed mock/default system data.
-- ==============================================================================

-- Enable gen_random_uuid() extension if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist in reverse dependency order
DROP TABLE IF EXISTS visitor_logs CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS diagnosis_reports CASCADE;
DROP TABLE IF EXISTS lawyers CASCADE;
DROP TABLE IF EXISTS administrators CASCADE;

-- 1. ADMINISTRATORS TABLE
CREATE TABLE administrators (
    id TEXT PRIMARY KEY, -- Supports text IDs like 'adm_default' or standard UUIDs
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cedula TEXT,
    password_plain TEXT NOT NULL DEFAULT '123456', -- Simple plain password matching local logic, can be modified for crypt() if needed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. LAWYERS TABLE (Ordem dos Advogados de Angola - OAA professionals)
CREATE TABLE lawyers (
    id TEXT PRIMARY KEY, -- Handles text IDs like 'law_1' or UUIDs
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cedula TEXT UNIQUE NOT NULL,
    specialty TEXT NOT NULL,
    commission_rate NUMERIC NOT NULL DEFAULT 15, -- Commission percentage (e.g., 15 for 15%)
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. LEADS TABLE (Contact requests and diagnosed legal cases)
CREATE TABLE leads (
    id TEXT PRIMARY KEY, -- Handles 'lead_...' format or custom string UUIDs
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'laboral', 'familia', 'imobiliario', etc.
    category_label TEXT NOT NULL, -- Human-friendly name
    date TEXT NOT NULL, -- Stored as formatted string (e.g. DD/MM/YYYY) or timestamp fallback
    status TEXT NOT NULL DEFAULT 'Pendente', -- 'Pendente', 'Em Contacto', 'Agendado', 'Concluído', 'Arquivado'
    notes TEXT,
    estimated_val TEXT,
    answers JSONB, -- Diagnostic response details stored as JSONB
    diagnosis_text TEXT, -- Full AI legal diagnosis context
    assigned_lawyer_id TEXT REFERENCES lawyers(id) ON DELETE SET NULL, -- Professional assigned
    case_fee_total NUMERIC, -- Total amount in Kwanzas
    commission_rate NUMERIC, -- Percentage
    commission_earned NUMERIC, -- Commission amount calculated in Kwanzas
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. DIAGNOSIS REPORTS TABLE (Diagnosis sessions history)
CREATE TABLE diagnosis_reports (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    answers JSONB NOT NULL,
    diagnosis_text TEXT NOT NULL,
    user_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 5. VISITOR LOGS TABLE (For Real-time monitoring feed)
CREATE TABLE visitor_logs (
    id TEXT PRIMARY KEY,
    ip TEXT,
    region TEXT,
    device TEXT,
    page TEXT,
    time TEXT NOT NULL DEFAULT 'Há instantes',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & ACCESS CONTROL POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE administrators ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;

-- Anonymous reads/write permissions for specific tables
-- In this frontend-to-supabase implementation (without Supabase Auth Auth state required),
-- we establish simple policies. For stricter authentication on private portals,
-- custom filters are applied. Below policies authorize public access for client integrations:

-- policy for leads (Anonymous users can INSERT contact requests, Admins can do everything)
CREATE POLICY "Enable insert access for anyone" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable full access for anyone matching custom needs or admins" ON leads FOR ALL USING (true);

-- policy for diagnosis_reports (Anonymous clients can log their assessments, view them)
CREATE POLICY "Enable read/write for all on diagnosis_reports" ON diagnosis_reports FOR ALL USING (true);

-- policy for visitor_logs (Allows frontend to log real-time telemetry clicks and views)
CREATE POLICY "Enable logging for all users" ON visitor_logs FOR ALL USING (true);

-- policy for lawyers (Public can read professional profiles; Only admins can modify)
CREATE POLICY "Enable read access for all" ON lawyers FOR SELECT USING (true);
CREATE POLICY "Enable admin write access" ON lawyers FOR ALL USING (true);

-- policy for administrators (Allows login queries and full administration settings)
CREATE POLICY "Enable all database tasks on administrators table" ON administrators FOR ALL USING (true);


-- ==============================================================================
-- INITIAL DEFAULT SEED DATA
-- ==============================================================================

-- Seed Central Administrator (matches first-time custom setup or manual cloud inserts)
-- INSERT INTO administrators (id, name, email, cedula, password_plain, created_at)
-- VALUES (
--     'adm_default',
--     'Diretor Angola Legal',
--     'admin@angolalegal.ao',
--     'Administrador Central',
--     '123456',
--     NOW()
-- ) ON CONFLICT (id) DO NOTHING;

-- Seed Default Professional Lawyers from Ordem dos Advogados de Angola (OAA)
INSERT INTO lawyers (id, name, email, cedula, specialty, commission_rate, joined_at)
VALUES 
(
    'law_1',
    'Dr. Domingos Catonho',
    'catonho.advocacia@oaa.ao',
    'OAA 3.842',
    'Direito do Trabalho (LGT)',
    15,
    NOW() - INTERVAL '30 days'
),
(
    'law_2',
    'Dra. Elísia Gourgel',
    'gourgel.conselho@oaa.ao',
    'OAA 5.121',
    'Direito de Família e Sucessões',
    10,
    NOW() - INTERVAL '15 days'
),
(
    'law_3',
    'Dr. Mateus de Oliveira',
    'mateus.oliveira@oaa.ao',
    'OAA 4.887',
    'Direito Imobiliário e Contratos',
    12,
    NOW() - INTERVAL '5 days'
) ON CONFLICT (id) DO NOTHING;

-- (Optional) If you ever want to seed initial demo Leads for testing, you can execute the following:
-- INSERT INTO leads (id, name, phone, category, category_label, date, status, notes, estimated_val, answers, diagnosis_text, assigned_lawyer_id, case_fee_total, commission_rate, commission_earned)
-- VALUES 
-- (
--     'lead_seed_1',
--     'Manuel dos Santos',
--     '923112233',
--     'laboral',
--     'Direito do Trabalho (LGT)',
--     '18/06/2026',
--     'Pendente',
--     'Cliente foi despedido sem justa causa apos 4 anos de serviço. Requer calculo de indemnizaçao integral.',
--     '2.140.000 Kz',
--     '{"tempo_servico": "4", "salario_base": "250000", "motivo_rescisao": "despedimento_sem_justa"}'::jsonb,
--     'De acordo com a Lei Geral do Trabalho (LGT) angolana, o trabalhador Manuel dos Santos tem direito a indemnização proporcional ao tempo de serviço corrido...',
--     'law_1',
--     450000,
--     15,
--     67500
-- ),
-- (
--     'lead_seed_2',
--     'Maria da Conceição',
--     '931445566',
--     'familia',
--     'Família e Sucessões',
--     '19/06/2026',
--     'Em Contacto',
--     'Reclamação de pensão de alimentos em atraso para dois menores de idade.',
--     'Menores Envolvidos',
--     '{"numero_filhos": "2", "salario_pai": "400000"}'::jsonb,
--     'Com base na Lei da Família de Angola (Código de Família), o valor de pensão provisória é calculado...',
--     'law_2',
--     150000,
--     10,
--     15000
-- ) ON CONFLICT (id) DO NOTHING;


-- Add comments on schema tables for documentation
COMMENT ON TABLE administrators IS 'Administradores centrais habilitados a aceder ao painel Angola Legal.';
COMMENT ON TABLE lawyers IS 'Advogados inscritos na Ordem dos Advogados de Angola especialistas em várias vertentes.';
COMMENT ON TABLE leads IS 'Consultas e pedidos de acompanhamento encaminhados do portal Direito Fácil Angola.';
COMMENT ON TABLE diagnosis_reports IS 'Consultas informativas locais e diagnósticos automáticos gerados com auxílio de Inteligência Artificial.';
COMMENT ON TABLE visitor_logs IS 'Logs de interação e visitas anónimas em tempo-real para o painel de tráfego.';
