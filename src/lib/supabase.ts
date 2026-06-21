import { createClient } from "@supabase/supabase-js";
import { Lead, Lawyer, Administrator, DiagnosisReport } from "../types";

// Read variables from import.meta.env (Vite client) with typecast safety
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

/**
 * Centered Supabase Client configuration.
 * Instantiates the client only if keys are present, preventing runtime boot crashes when variables aren't set yet.
 */
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ Supabase is not configured yet. The application will store all data locally in localStorage.\n" +
    "To connect with your Supabase database, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your settings."
  );
}

// ==========================================
// TYPED READ & WRITE HELPERS FOR SUPABASE
// ==========================================

export async function dbGetLeads(): Promise<Lead[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("date", { ascending: false });
    
    if (error) throw error;
    
    // Map response if necessary to match client properties
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      category: item.category,
      categoryLabel: item.category_label,
      date: item.date,
      status: item.status,
      notes: item.notes || "",
      estimatedVal: item.estimated_val || "",
      answers: item.answers || {},
      diagnosisText: item.diagnosis_text || "",
      assignedLawyerId: item.assigned_lawyer_id || undefined,
      caseFeeTotal: item.case_fee_total || undefined,
      commissionRate: item.commission_rate || undefined,
      commissionEarned: item.commission_earned || undefined,
    }));
  } catch (error) {
    console.error("Supabase Error [dbGetLeads]:", error);
    return [];
  }
}

export async function dbSaveLead(lead: Lead): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      category: lead.category,
      category_label: lead.categoryLabel,
      date: lead.date,
      status: lead.status,
      notes: lead.notes,
      estimated_val: lead.estimatedVal,
      answers: lead.answers,
      diagnosis_text: lead.diagnosisText,
      assigned_lawyer_id: lead.assignedLawyerId,
      case_fee_total: lead.caseFeeTotal,
      commission_rate: lead.commissionRate,
      commission_earned: lead.commissionEarned,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from("leads")
      .upsert(payload, { onConflict: "id" });
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbSaveLead]:", error);
    return false;
  }
}

export async function dbDeleteLead(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbDeleteLead]:", error);
    return false;
  }
}

export async function dbGetLawyers(): Promise<Lawyer[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("lawyers")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      cedula: item.cedula,
      specialty: item.specialty,
      commissionRate: item.commission_rate,
      joinedAt: item.joined_at
    }));
  } catch (error) {
    console.error("Supabase Error [dbGetLawyers]:", error);
    return [];
  }
}

export async function dbSaveLawyer(lawyer: Lawyer): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = {
      id: lawyer.id,
      name: lawyer.name,
      email: lawyer.email,
      cedula: lawyer.cedula,
      specialty: lawyer.specialty,
      commission_rate: lawyer.commissionRate,
      joined_at: lawyer.joinedAt
    };
    
    const { error } = await supabase
      .from("lawyers")
      .upsert(payload, { onConflict: "id" });
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbSaveLawyer]:", error);
    return false;
  }
}

export async function dbDeleteLawyer(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("lawyers")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbDeleteLawyer]:", error);
    return false;
  }
}

export async function dbGetAdministrators(): Promise<Administrator[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("administrators")
      .select("*")
      .order("created_at", { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      cedula: item.cedula,
      createdAt: item.created_at
    }));
  } catch (error) {
    console.error("Supabase Error [dbGetAdministrators]:", error);
    return [];
  }
}

export async function dbSaveAdministrator(admin: Administrator, passwordPlain?: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload: any = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      cedula: admin.cedula,
      created_at: admin.createdAt
    };
    if (passwordPlain) {
      payload.password_plain = passwordPlain; // matching logic configured for credentials
    }
    
    let { error } = await supabase
      .from("administrators")
      .upsert(payload, { onConflict: "id" });
      
    if (error && (error.code === "42703" || error.message?.includes("password_plain"))) { // Undefined column!
      console.warn("Got missing column error, retrying with password column as 'password'...");
      delete payload.password_plain;
      if (passwordPlain) {
        payload.password = passwordPlain;
      }
      const retryResult = await supabase
        .from("administrators")
        .upsert(payload, { onConflict: "id" });
        
      if (retryResult.error) {
        console.warn("Retry failed. Attempting to upsert without any password column to preserve administrative records...");
        delete payload.password;
        const retryBaseResult = await supabase
          .from("administrators")
          .upsert(payload, { onConflict: "id" });
        if (retryBaseResult.error) throw retryBaseResult.error;
      }
      return true;
    } else if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Supabase Error [dbSaveAdministrator]:", error);
    return false;
  }
}

export async function dbGetAdminPasswords(): Promise<Record<string, string>> {
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from("administrators")
      .select("email, password_plain");
      
    if (error) {
      if (error.code === "42703" || error.message?.includes("password_plain")) {
        console.warn("Column 'password_plain' doesn't exist, attempting query with 'password' instead...");
        const retryResult = await supabase
          .from("administrators")
          .select("email, password");
          
        if (retryResult.error) {
          console.warn("Column 'password' also failed. Performing deep schema inspect by fetching all columns...");
          const rescueResult = await supabase
            .from("administrators")
            .select("*");
            
          if (rescueResult.error) throw rescueResult.error;
          
          const pwds: Record<string, string> = {};
          (rescueResult.data || []).forEach(item => {
            const pwdKey = Object.keys(item).find(k => 
              k.toLowerCase().includes("password") || 
              k.toLowerCase().includes("passwd") || 
              k.toLowerCase().includes("senha") ||
              k.toLowerCase() === "pwd"
            );
            if (item.email && pwdKey && item[pwdKey]) {
              pwds[item.email.trim().toLowerCase()] = String(item[pwdKey]);
            }
          });
          return pwds;
        }
        
        const pwds: Record<string, string> = {};
        (retryResult.data || []).forEach(item => {
          if (item.email && (item as any).password) {
            pwds[item.email.trim().toLowerCase()] = (item as any).password;
          }
        });
        return pwds;
      }
      throw error;
    }
    
    const pwds: Record<string, string> = {};
    (data || []).forEach(item => {
      if (item.email && item.password_plain) {
        pwds[item.email.trim().toLowerCase()] = item.password_plain;
      }
    });
    return pwds;
  } catch (error) {
    console.error("Supabase Error [dbGetAdminPasswords]:", error);
    return {};
  }
}

export async function dbGetDiagnosisReports(): Promise<DiagnosisReport[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("diagnosis_reports")
      .select("*")
      .order("date", { ascending: false });
      
    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      date: item.date,
      category: item.category,
      categoryLabel: item.category_label,
      answers: item.answers,
      diagnosisText: item.diagnosis_text,
      userName: item.user_name
    }));
  } catch (error) {
    console.error("Supabase Error [dbGetDiagnosisReports]:", error);
    return [];
  }
}

export async function dbSaveDiagnosisReport(report: DiagnosisReport): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = {
      id: report.id,
      date: report.date,
      category: report.category,
      category_label: report.categoryLabel,
      answers: report.answers,
      diagnosis_text: report.diagnosisText,
      user_name: report.userName
    };
    
    const { error } = await supabase
      .from("diagnosis_reports")
      .upsert(payload, { onConflict: "id" });
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbSaveDiagnosisReport]:", error);
    return false;
  }
}

export async function dbDeleteDiagnosisReport(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("diagnosis_reports")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbDeleteDiagnosisReport]:", error);
    return false;
  }
}

export async function dbLogVisitor(log: { ip: string, region: string, device: string, page: string, id?: string }): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = {
      id: log.id || "log_" + Date.now().toString(),
      ip: log.ip,
      region: log.region,
      device: log.device,
      page: log.page,
      time: "Há instantes",
      created_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from("visitor_logs")
      .insert(payload);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Error [dbLogVisitor]:", error);
    return false;
  }
}

export async function dbGetVisitorLogs(): Promise<any[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("visitor_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Supabase Error [dbGetVisitorLogs]:", error);
    return [];
  }
}
