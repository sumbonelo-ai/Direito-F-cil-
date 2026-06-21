export type LegalCategory = "laboral" | "familia" | "imobiliario" | "consumidor" | "geral";

export interface Question {
  id: string;
  label: string;
  type: "text" | "select" | "textarea" | "number";
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export interface DiagnosisReport {
  id: string;
  date: string;
  category: LegalCategory;
  categoryLabel: string;
  answers: Record<string, string>;
  diagnosisText: string;
  userName: string;
}

export interface CategoryInfo {
  id: LegalCategory;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  laws: string; // Major laws governing it in Angola
  questions: Question[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  category: LegalCategory;
  categoryLabel: string;
  date: string;
  status: "Pendente" | "Em Contacto" | "Agendado" | "Concluído" | "Arquivado";
  notes?: string;
  estimatedVal?: string;
  answers?: Record<string, string>;
  diagnosisText?: string;
  assignedLawyerId?: string; // ID do advogado atribuído
  caseFeeTotal?: number;      // Valor total do honorário cobrado
  commissionRate?: number;    // % de comissão regulada (ex: 15)
  commissionEarned?: number;  // Valor da comissão apurada (KZ)
}

export interface Lawyer {
  id: string;
  name: string;
  email: string;
  cedula: string;
  specialty: string;
  commissionRate: number; // TAXA padrão de comissão (ex: 15 para 15%)
  joinedAt: string;
}

export interface Administrator {
  id: string;
  name: string;
  email: string;
  cedula: string;
  createdAt: string;
}

