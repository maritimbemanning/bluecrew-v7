export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          active: boolean | null
          created_at: string | null
          full_name: string
          id: string
          role: string
          updated_at: string | null
          username: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          full_name: string
          id: string
          role?: string
          updated_at?: string | null
          username: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          full_name?: string
          id?: string
          role?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          archived_at: string | null
          candidate_id: string | null
          contract_months: number | null
          contract_url: string | null
          created_at: string
          currency: string | null
          customer_id: string | null
          disembarkation_date: string | null
          disembarkation_port: string | null
          embarkation_date: string | null
          embarkation_port: string | null
          hourly_rate: number | null
          hours_worked: number | null
          id: number
          invoice_number: string | null
          invoice_status: string | null
          location: string | null
          monthly_salary: number | null
          overtime_rate: number | null
          period: string | null
          role: string | null
          shipping_company: string | null
          status: string | null
          tripletex_invoice_id: number | null
          vessel_flag_state: string | null
          vessel_imo: string | null
          vessel_name: string | null
        }
        Insert: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_months?: number | null
          contract_url?: string | null
          created_at?: string
          currency?: string | null
          customer_id?: string | null
          disembarkation_date?: string | null
          disembarkation_port?: string | null
          embarkation_date?: string | null
          embarkation_port?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          monthly_salary?: number | null
          overtime_rate?: number | null
          period?: string | null
          role?: string | null
          shipping_company?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
          vessel_flag_state?: string | null
          vessel_imo?: string | null
          vessel_name?: string | null
        }
        Update: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_months?: number | null
          contract_url?: string | null
          created_at?: string
          currency?: string | null
          customer_id?: string | null
          disembarkation_date?: string | null
          disembarkation_port?: string | null
          embarkation_date?: string | null
          embarkation_port?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          monthly_salary?: number | null
          overtime_rate?: number | null
          period?: string | null
          role?: string | null
          shipping_company?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
          vessel_flag_state?: string | null
          vessel_imo?: string | null
          vessel_name?: string | null
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      candidate_activity_log: {
        Row: {
          action: string
          candidate_interest_id: string
          details: Json | null
          id: string
          new_value: string | null
          old_value: string | null
          performed_at: string | null
          performed_by: string | null
          performed_by_email: string | null
        }
        Insert: {
          action: string
          candidate_interest_id: string
          details?: Json | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          performed_at?: string | null
          performed_by?: string | null
          performed_by_email?: string | null
        }
        Update: {
          action?: string
          candidate_interest_id?: string
          details?: Json | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          performed_at?: string | null
          performed_by?: string | null
          performed_by_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_activity_log_candidate_interest_id_fkey"
            columns: ["candidate_interest_id"]
            isOneToOne: false
            referencedRelation: "candidate_interest"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_certifications: {
        Row: {
          candidate_id: string
          cert_class: string | null
          cert_name: string | null
          cert_type: string
          created_at: string | null
          expires_at: string | null
          id: string
          issued_date: string | null
          updated_at: string | null
          verification_notes: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id: string
          cert_class?: string | null
          cert_name?: string | null
          cert_type: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          issued_date?: string | null
          updated_at?: string | null
          verification_notes?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string
          cert_class?: string | null
          cert_name?: string | null
          cert_type?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          issued_date?: string | null
          updated_at?: string | null
          verification_notes?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_documents: {
        Row: {
          candidate_id: string
          candidate_name: string
          created_at: string | null
          document_type: string
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          notes: string | null
          updated_at: string | null
          uploaded_by: string | null
          verification_method: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id: string
          candidate_name: string
          created_at?: string | null
          document_type: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string
          candidate_name?: string
          created_at?: string | null
          document_type?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      candidate_interest: {
        Row: {
          archived_at: string | null
          assigned_to: string | null
          available_date: string | null
          certificates: string | null
          consent: boolean
          created_at: string
          cv_url: string | null
          email: string
          experience: number | null
          fylke: string | null
          honey: string | null
          id: string
          ip: string | null
          kommune: string | null
          last_contacted: string | null
          name: string
          next_followup: string | null
          notes: string | null
          phone: string | null
          pipeline_status: string | null
          priority: string | null
          rating: number | null
          region: string | null
          role: string
          salary_expectation: number | null
          source: string | null
          start_from: string | null
          status: string | null
          tags: string[] | null
          user_agent: string | null
        }
        Insert: {
          archived_at?: string | null
          assigned_to?: string | null
          available_date?: string | null
          certificates?: string | null
          consent?: boolean
          created_at?: string
          cv_url?: string | null
          email: string
          experience?: number | null
          fylke?: string | null
          honey?: string | null
          id?: string
          ip?: string | null
          kommune?: string | null
          last_contacted?: string | null
          name: string
          next_followup?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_status?: string | null
          priority?: string | null
          rating?: number | null
          region?: string | null
          role: string
          salary_expectation?: number | null
          source?: string | null
          start_from?: string | null
          status?: string | null
          tags?: string[] | null
          user_agent?: string | null
        }
        Update: {
          archived_at?: string | null
          assigned_to?: string | null
          available_date?: string | null
          certificates?: string | null
          consent?: boolean
          created_at?: string
          cv_url?: string | null
          email?: string
          experience?: number | null
          fylke?: string | null
          honey?: string | null
          id?: string
          ip?: string | null
          kommune?: string | null
          last_contacted?: string | null
          name?: string
          next_followup?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_status?: string | null
          priority?: string | null
          rating?: number | null
          region?: string | null
          role?: string
          salary_expectation?: number | null
          source?: string | null
          start_from?: string | null
          status?: string | null
          tags?: string[] | null
          user_agent?: string | null
        }
        Relationships: []
      }
      candidate_matches: {
        Row: {
          assignment_id: number
          blockers: string[] | null
          can_assign: boolean
          candidate_id: string
          created_at: string
          id: number
          matched_at: string
          reasons: string[] | null
          score: number
          warnings: string[] | null
        }
        Insert: {
          assignment_id: number
          blockers?: string[] | null
          can_assign?: boolean
          candidate_id: string
          created_at?: string
          id?: number
          matched_at?: string
          reasons?: string[] | null
          score: number
          warnings?: string[] | null
        }
        Update: {
          assignment_id?: number
          blockers?: string[] | null
          can_assign?: boolean
          candidate_id?: string
          created_at?: string
          id?: number
          matched_at?: string
          reasons?: string[] | null
          score?: number
          warnings?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "active_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "archived_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_shortlists: {
        Row: {
          can_assign: boolean | null
          candidate_id: string
          candidate_name: string
          contacted_at: string | null
          created_at: string | null
          id: string
          job_requirement_id: string | null
          match_blockers: string[] | null
          match_reasons: string[] | null
          match_score: number | null
          match_warnings: string[] | null
          notes: string | null
          rank: number | null
          responded_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          can_assign?: boolean | null
          candidate_id: string
          candidate_name: string
          contacted_at?: string | null
          created_at?: string | null
          id?: string
          job_requirement_id?: string | null
          match_blockers?: string[] | null
          match_reasons?: string[] | null
          match_score?: number | null
          match_warnings?: string[] | null
          notes?: string | null
          rank?: number | null
          responded_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          can_assign?: boolean | null
          candidate_id?: string
          candidate_name?: string
          contacted_at?: string | null
          created_at?: string | null
          id?: string
          job_requirement_id?: string | null
          match_blockers?: string[] | null
          match_reasons?: string[] | null
          match_score?: number | null
          match_warnings?: string[] | null
          notes?: string | null
          rank?: number | null
          responded_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_shortlists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "job_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_shortlists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "jobs_needing_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          archived_at: string | null
          available_from: string | null
          available_to: string | null
          bankid_verified_at: string | null
          certs_key: string | null
          clerk_user_id: string | null
          county: string | null
          created_at: string
          cv_key: string | null
          deck_class: string | null
          deck_has: string | null
          email: string
          email_encrypted: string | null
          flagged_reason: string | null
          fylke: string | null
          gdpr_consent: boolean | null
          id: string
          is_encrypted: boolean | null
          kommune: string | null
          municipality: string | null
          name: string
          name_encrypted: string | null
          national_id_hash: string | null
          ocr_confidence_score: number | null
          other_comp: string | null
          phone: string
          phone_encrypted: string | null
          skills: string | null
          source_ip: string | null
          source_ip_encrypted: string | null
          status: string | null
          stcw_confirm: boolean | null
          stcw_confirmed: boolean | null
          stcw_has: string | null
          stcw_mod: string[] | null
          submitted_at: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          wants_temporary: string | null
          work_main: string[] | null
        }
        Insert: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          clerk_user_id?: string | null
          county?: string | null
          created_at?: string
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email: string
          email_encrypted?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string
          is_encrypted?: boolean | null
          kommune?: string | null
          municipality?: string | null
          name: string
          name_encrypted?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone: string
          phone_encrypted?: string | null
          skills?: string | null
          source_ip?: string | null
          source_ip_encrypted?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Update: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          clerk_user_id?: string | null
          county?: string | null
          created_at?: string
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email?: string
          email_encrypted?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string
          is_encrypted?: boolean | null
          kommune?: string | null
          municipality?: string | null
          name?: string
          name_encrypted?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone?: string
          phone_encrypted?: string | null
          skills?: string | null
          source_ip?: string | null
          source_ip_encrypted?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Relationships: []
      }
      capa_action_log: {
        Row: {
          action_number: number
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          nc_id: string | null
          reminder_sent_1d: boolean | null
          reminder_sent_7d: boolean | null
          responsible_user: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          action_number: number
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          nc_id?: string | null
          reminder_sent_1d?: boolean | null
          reminder_sent_7d?: boolean | null
          responsible_user?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          action_number?: number
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          nc_id?: string | null
          reminder_sent_1d?: boolean | null
          reminder_sent_7d?: boolean | null
          responsible_user?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capa_action_log_nc_id_fkey"
            columns: ["nc_id"]
            isOneToOne: false
            referencedRelation: "nonconformities"
            referencedColumns: ["nc_id"]
          },
        ]
      }
      clerk_users: {
        Row: {
          candidate_registered: boolean | null
          clerk_user_id: string
          created_at: string | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          updated_at: string | null
          vipps_verified: boolean | null
        }
        Insert: {
          candidate_registered?: boolean | null
          clerk_user_id: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          updated_at?: string | null
          vipps_verified?: boolean | null
        }
        Update: {
          candidate_registered?: boolean | null
          clerk_user_id?: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          updated_at?: string | null
          vipps_verified?: boolean | null
        }
        Relationships: []
      }
      contract_signing_parties: {
        Row: {
          contract_id: string
          created_at: string
          email: string
          has_signed: boolean | null
          id: string
          name: string
          org_number: string | null
          organization: string | null
          party_type: string
          phone: string | null
          signature_reference: string | null
          signed_at: string | null
          signed_ip: string | null
          signed_user_agent: string | null
          signing_method: string | null
          signing_order: number
          updated_at: string
        }
        Insert: {
          contract_id: string
          created_at?: string
          email: string
          has_signed?: boolean | null
          id?: string
          name: string
          org_number?: string | null
          organization?: string | null
          party_type: string
          phone?: string | null
          signature_reference?: string | null
          signed_at?: string | null
          signed_ip?: string | null
          signed_user_agent?: string | null
          signing_method?: string | null
          signing_order?: number
          updated_at?: string
        }
        Update: {
          contract_id?: string
          created_at?: string
          email?: string
          has_signed?: boolean | null
          id?: string
          name?: string
          org_number?: string | null
          organization?: string | null
          party_type?: string
          phone?: string | null
          signature_reference?: string | null
          signed_at?: string | null
          signed_ip?: string | null
          signed_user_agent?: string | null
          signing_method?: string | null
          signing_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_signing_parties_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          activated_at: string | null
          archived_at: string | null
          audit_trail: Json | null
          auto_renewal: boolean | null
          candidate_id: string | null
          compliance_flags: Json | null
          contract_number: string
          contract_type: string
          created_at: string
          created_by: string
          customer_id: string | null
          description: string | null
          document_url: string | null
          effective_date: string
          expiry_date: string | null
          id: string
          notice_period_days: number | null
          parent_contract_id: string | null
          sent_at: string | null
          signed_at: string | null
          signed_document_url: string | null
          signing_method: string
          signing_request_id: string | null
          status: string
          template_id: string | null
          terminated_at: string | null
          title: string
          updated_at: string
          version: number
          vessel_id: string | null
        }
        Insert: {
          activated_at?: string | null
          archived_at?: string | null
          audit_trail?: Json | null
          auto_renewal?: boolean | null
          candidate_id?: string | null
          compliance_flags?: Json | null
          contract_number: string
          contract_type: string
          created_at?: string
          created_by: string
          customer_id?: string | null
          description?: string | null
          document_url?: string | null
          effective_date: string
          expiry_date?: string | null
          id?: string
          notice_period_days?: number | null
          parent_contract_id?: string | null
          sent_at?: string | null
          signed_at?: string | null
          signed_document_url?: string | null
          signing_method?: string
          signing_request_id?: string | null
          status?: string
          template_id?: string | null
          terminated_at?: string | null
          title: string
          updated_at?: string
          version?: number
          vessel_id?: string | null
        }
        Update: {
          activated_at?: string | null
          archived_at?: string | null
          audit_trail?: Json | null
          auto_renewal?: boolean | null
          candidate_id?: string | null
          compliance_flags?: Json | null
          contract_number?: string
          contract_type?: string
          created_at?: string
          created_by?: string
          customer_id?: string | null
          description?: string | null
          document_url?: string | null
          effective_date?: string
          expiry_date?: string | null
          id?: string
          notice_period_days?: number | null
          parent_contract_id?: string | null
          sent_at?: string | null
          signed_at?: string | null
          signed_document_url?: string | null
          signing_method?: string
          signing_request_id?: string | null
          status?: string
          template_id?: string | null
          terminated_at?: string | null
          title?: string
          updated_at?: string
          version?: number
          vessel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          id: string
          navn: string
          epost: string
          telefon: string | null
          melding: string
          created_at: string
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          navn: string
          epost: string
          telefon?: string | null
          melding: string
          created_at?: string
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          navn?: string
          epost?: string
          telefon?: string | null
          melding?: string
          status?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          call_duration_minutes: number | null
          call_outcome: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          created_by_name: string | null
          date: string | null
          description: string | null
          email_cc: string[] | null
          email_from: string | null
          email_message_id: string | null
          email_thread_id: string | null
          email_to: string | null
          hubspot_engagement_id: string | null
          hubspot_synced_at: string | null
          id: string
          meeting_attendees: string[] | null
          meeting_location: string | null
          meeting_recording_url: string | null
          next_activity: string | null
          next_follow_up_date: string | null
          subject: string | null
          type: string
        }
        Insert: {
          call_duration_minutes?: number | null
          call_outcome?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_by_name?: string | null
          date?: string | null
          description?: string | null
          email_cc?: string[] | null
          email_from?: string | null
          email_message_id?: string | null
          email_thread_id?: string | null
          email_to?: string | null
          hubspot_engagement_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          meeting_attendees?: string[] | null
          meeting_location?: string | null
          meeting_recording_url?: string | null
          next_activity?: string | null
          next_follow_up_date?: string | null
          subject?: string | null
          type: string
        }
        Update: {
          call_duration_minutes?: number | null
          call_outcome?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_by_name?: string | null
          date?: string | null
          description?: string | null
          email_cc?: string[] | null
          email_from?: string | null
          email_message_id?: string | null
          email_thread_id?: string | null
          email_to?: string | null
          hubspot_engagement_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          meeting_attendees?: string[] | null
          meeting_location?: string | null
          meeting_recording_url?: string | null
          next_activity?: string | null
          next_follow_up_date?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_approval_requests: {
        Row: {
          approver_id: string | null
          approver_name: string | null
          confirmation_token: string | null
          created_at: string
          decision_at: string | null
          decision_note: string | null
          description: string | null
          dry_run_preview: Json | null
          entity_ids: string[]
          entity_type: string
          executed_at: string | null
          execution_result: Json | null
          expires_at: string | null
          id: string
          impact_summary: string | null
          requested_at: string
          requested_by: string
          requested_by_name: string | null
          status: string
          title: string
          type: string
        }
        Insert: {
          approver_id?: string | null
          approver_name?: string | null
          confirmation_token?: string | null
          created_at?: string
          decision_at?: string | null
          decision_note?: string | null
          description?: string | null
          dry_run_preview?: Json | null
          entity_ids: string[]
          entity_type: string
          executed_at?: string | null
          execution_result?: Json | null
          expires_at?: string | null
          id?: string
          impact_summary?: string | null
          requested_at?: string
          requested_by: string
          requested_by_name?: string | null
          status?: string
          title: string
          type: string
        }
        Update: {
          approver_id?: string | null
          approver_name?: string | null
          confirmation_token?: string | null
          created_at?: string
          decision_at?: string | null
          decision_note?: string | null
          description?: string | null
          dry_run_preview?: Json | null
          entity_ids?: string[]
          entity_type?: string
          executed_at?: string | null
          execution_result?: Json | null
          expires_at?: string | null
          id?: string
          impact_summary?: string | null
          requested_at?: string
          requested_by?: string
          requested_by_name?: string | null
          status?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      crm_audit_log: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          metadata: Json | null
          user_email: string | null
          user_id: string
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_email?: string | null
          user_id: string
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      crm_automation_log: {
        Row: {
          actions_executed: string[] | null
          contact_id: string
          duration_ms: number | null
          error_message: string | null
          executed_at: string
          executed_by: string | null
          id: string
          rule_id: string | null
          rule_name: string
          status: string
          trigger: string
          trigger_data: Json | null
        }
        Insert: {
          actions_executed?: string[] | null
          contact_id: string
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string
          executed_by?: string | null
          id?: string
          rule_id?: string | null
          rule_name: string
          status: string
          trigger: string
          trigger_data?: Json | null
        }
        Update: {
          actions_executed?: string[] | null
          contact_id?: string
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string
          executed_by?: string | null
          id?: string
          rule_id?: string | null
          rule_name?: string
          status?: string
          trigger?: string
          trigger_data?: Json | null
        }
        Relationships: []
      }
      crm_automation_rules: {
        Row: {
          actions: Json
          created_at: string
          created_by: string
          description: string | null
          editable_by: string[] | null
          id: string
          is_active: boolean | null
          last_triggered_at: string | null
          name: string
          order_index: number | null
          trigger: string
          trigger_condition: Json | null
          trigger_count: number | null
          updated_at: string
        }
        Insert: {
          actions: Json
          created_at?: string
          created_by: string
          description?: string | null
          editable_by?: string[] | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          name: string
          order_index?: number | null
          trigger: string
          trigger_condition?: Json | null
          trigger_count?: number | null
          updated_at?: string
        }
        Update: {
          actions?: Json
          created_at?: string
          created_by?: string
          description?: string | null
          editable_by?: string[] | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          name?: string
          order_index?: number | null
          trigger?: string
          trigger_condition?: Json | null
          trigger_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      crm_contact_audit_log: {
        Row: {
          action: string
          backup_reference: string | null
          can_rollback: boolean | null
          changes: Json | null
          contact_id: string
          created_at: string
          created_by: string
          created_by_email: string | null
          created_by_name: string | null
          field_changed: string | null
          id: string
          ip_address: unknown
          is_sensitive: boolean | null
          new_value: string | null
          note: string | null
          old_value: string | null
          reason: string | null
          rollback_data: Json | null
          rolled_back_at: string | null
          rolled_back_by: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          backup_reference?: string | null
          can_rollback?: boolean | null
          changes?: Json | null
          contact_id: string
          created_at?: string
          created_by: string
          created_by_email?: string | null
          created_by_name?: string | null
          field_changed?: string | null
          id?: string
          ip_address?: unknown
          is_sensitive?: boolean | null
          new_value?: string | null
          note?: string | null
          old_value?: string | null
          reason?: string | null
          rollback_data?: Json | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          backup_reference?: string | null
          can_rollback?: boolean | null
          changes?: Json | null
          contact_id?: string
          created_at?: string
          created_by?: string
          created_by_email?: string | null
          created_by_name?: string | null
          field_changed?: string | null
          id?: string
          ip_address?: unknown
          is_sensitive?: boolean | null
          new_value?: string | null
          note?: string | null
          old_value?: string | null
          reason?: string | null
          rollback_data?: Json | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          activity_count_30d: number | null
          address: string | null
          archived_at: string | null
          archived_reason: string | null
          assigned_to: string | null
          campaign_tag: string | null
          company: string | null
          contact_status: string | null
          created_at: string | null
          deal_value: number | null
          email: string | null
          follow_up_date: string | null
          hubspot_id: string | null
          hubspot_owner_id: string | null
          hubspot_synced_at: string | null
          id: string
          industry: string | null
          interest_level: number | null
          last_contact_at: string | null
          last_quote_sent_at: string | null
          linkedin_url: string | null
          location: string | null
          manual_entry: boolean | null
          merged_from: Json | null
          merged_into: string | null
          name: string
          next_activity: string | null
          notes: string | null
          notes_updated_at: string | null
          notes_updated_by: string | null
          org_number: string | null
          owner_id: string | null
          phone: string | null
          pinned_note: string | null
          position: string | null
          priority: string | null
          probability: number | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          activity_count_30d?: number | null
          address?: string | null
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          hubspot_owner_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          last_quote_sent_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          merged_into?: string | null
          name: string
          next_activity?: string | null
          notes?: string | null
          notes_updated_at?: string | null
          notes_updated_by?: string | null
          org_number?: string | null
          owner_id?: string | null
          phone?: string | null
          pinned_note?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          activity_count_30d?: number | null
          address?: string | null
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          hubspot_owner_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          last_quote_sent_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          merged_into?: string | null
          name?: string
          next_activity?: string | null
          notes?: string | null
          notes_updated_at?: string | null
          notes_updated_by?: string | null
          org_number?: string | null
          owner_id?: string | null
          phone?: string | null
          pinned_note?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      crm_deals: {
        Row: {
          assigned_to: string | null
          closed_at: string | null
          contact_id: string | null
          created_at: string | null
          expected_close_date: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: string | null
          title: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          assigned_to?: string | null
          closed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          title: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          assigned_to?: string | null
          closed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          title?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_documents: {
        Row: {
          contact_id: string
          created_at: string
          file_size: number | null
          file_url: string
          id: string
          is_latest: boolean | null
          mime_type: string | null
          name: string
          notes: string | null
          parent_id: string | null
          signature_envelope_id: string | null
          signature_provider: string | null
          signature_request_id: string | null
          signature_status: string | null
          signature_url: string | null
          signed_at: string | null
          signed_by: string | null
          signed_by_email: string | null
          status: string
          storage_path: string | null
          type: string
          updated_at: string
          uploaded_by: string | null
          uploaded_by_name: string | null
          version: number | null
        }
        Insert: {
          contact_id: string
          created_at?: string
          file_size?: number | null
          file_url: string
          id?: string
          is_latest?: boolean | null
          mime_type?: string | null
          name: string
          notes?: string | null
          parent_id?: string | null
          signature_envelope_id?: string | null
          signature_provider?: string | null
          signature_request_id?: string | null
          signature_status?: string | null
          signature_url?: string | null
          signed_at?: string | null
          signed_by?: string | null
          signed_by_email?: string | null
          status?: string
          storage_path?: string | null
          type: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          version?: number | null
        }
        Update: {
          contact_id?: string
          created_at?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_latest?: boolean | null
          mime_type?: string | null
          name?: string
          notes?: string | null
          parent_id?: string | null
          signature_envelope_id?: string | null
          signature_provider?: string | null
          signature_request_id?: string | null
          signature_status?: string | null
          signature_url?: string | null
          signed_at?: string | null
          signed_by?: string | null
          signed_by_email?: string | null
          status?: string
          storage_path?: string | null
          type?: string
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_email_summaries: {
        Row: {
          action_items: Json | null
          activity_id: string | null
          analyzed_at: string | null
          contact_id: string | null
          created_at: string | null
          decision_makers: string[] | null
          email_id: string | null
          email_subject: string | null
          email_thread_id: string | null
          follow_up_date: string | null
          follow_up_reason: string | null
          follow_up_suggested: boolean | null
          id: string
          is_redacted: boolean | null
          key_topics: Json | null
          llm_confidence: number | null
          llm_model: string | null
          llm_processed_at: string | null
          next_steps: string | null
          redacted_at: string | null
          redacted_by: string | null
          redaction_reason: string | null
          sentiment: string | null
          short_summary: string | null
          subject: string | null
          summary: string | null
        }
        Insert: {
          action_items?: Json | null
          activity_id?: string | null
          analyzed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          decision_makers?: string[] | null
          email_id?: string | null
          email_subject?: string | null
          email_thread_id?: string | null
          follow_up_date?: string | null
          follow_up_reason?: string | null
          follow_up_suggested?: boolean | null
          id?: string
          is_redacted?: boolean | null
          key_topics?: Json | null
          llm_confidence?: number | null
          llm_model?: string | null
          llm_processed_at?: string | null
          next_steps?: string | null
          redacted_at?: string | null
          redacted_by?: string | null
          redaction_reason?: string | null
          sentiment?: string | null
          short_summary?: string | null
          subject?: string | null
          summary?: string | null
        }
        Update: {
          action_items?: Json | null
          activity_id?: string | null
          analyzed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          decision_makers?: string[] | null
          email_id?: string | null
          email_subject?: string | null
          email_thread_id?: string | null
          follow_up_date?: string | null
          follow_up_reason?: string | null
          follow_up_suggested?: boolean | null
          id?: string
          is_redacted?: boolean | null
          key_topics?: Json | null
          llm_confidence?: number | null
          llm_model?: string | null
          llm_processed_at?: string | null
          next_steps?: string | null
          redacted_at?: string | null
          redacted_by?: string | null
          redaction_reason?: string | null
          sentiment?: string | null
          short_summary?: string | null
          subject?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_email_summaries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_general_files: {
        Row: {
          category: string | null
          contact_id: string
          created_at: string | null
          description: string | null
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          name: string
          parent_id: string | null
          tags: string[] | null
          updated_at: string | null
          uploaded_by: string
          uploaded_by_user_id: string | null
          version: number | null
        }
        Insert: {
          category?: string | null
          contact_id: string
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          name: string
          parent_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by: string
          uploaded_by_user_id?: string | null
          version?: number | null
        }
        Update: {
          category?: string | null
          contact_id?: string
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          name?: string
          parent_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by?: string
          uploaded_by_user_id?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_general_files_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
          {
            foreignKeyName: "crm_general_files_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "crm_general_files"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_hubspot_sync_log: {
        Row: {
          changes: Json | null
          conflicts: Json | null
          contact_id: string
          direction: string
          error_code: string | null
          error_message: string | null
          fields_updated: string[] | null
          hubspot_contact_id: string | null
          hubspot_portal_id: string | null
          id: string
          resolutions: Json | null
          status: string
          synced_at: string
          synced_by: string | null
        }
        Insert: {
          changes?: Json | null
          conflicts?: Json | null
          contact_id: string
          direction: string
          error_code?: string | null
          error_message?: string | null
          fields_updated?: string[] | null
          hubspot_contact_id?: string | null
          hubspot_portal_id?: string | null
          id?: string
          resolutions?: Json | null
          status: string
          synced_at?: string
          synced_by?: string | null
        }
        Update: {
          changes?: Json | null
          conflicts?: Json | null
          contact_id?: string
          direction?: string
          error_code?: string | null
          error_message?: string | null
          fields_updated?: string[] | null
          hubspot_contact_id?: string | null
          hubspot_portal_id?: string | null
          id?: string
          resolutions?: Json | null
          status?: string
          synced_at?: string
          synced_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_hubspot_sync_log_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_meetings: {
        Row: {
          attendees: Json | null
          calendar_event_id: string | null
          calendar_link: string | null
          calendar_synced_at: string | null
          completed_at: string | null
          contact_id: string
          created_at: string
          created_by: string | null
          date: string
          description: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          meeting_provider: string | null
          meeting_url: string | null
          notes: string | null
          organizer: string | null
          recording_url: string | null
          status: string | null
          time: string
          timezone: string | null
          title: string
          transcript_url: string | null
          updated_at: string
        }
        Insert: {
          attendees?: Json | null
          calendar_event_id?: string | null
          calendar_link?: string | null
          calendar_synced_at?: string | null
          completed_at?: string | null
          contact_id: string
          created_at?: string
          created_by?: string | null
          date: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          meeting_provider?: string | null
          meeting_url?: string | null
          notes?: string | null
          organizer?: string | null
          recording_url?: string | null
          status?: string | null
          time: string
          timezone?: string | null
          title: string
          transcript_url?: string | null
          updated_at?: string
        }
        Update: {
          attendees?: Json | null
          calendar_event_id?: string | null
          calendar_link?: string | null
          calendar_synced_at?: string | null
          completed_at?: string | null
          contact_id?: string
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          meeting_provider?: string | null
          meeting_url?: string | null
          notes?: string | null
          organizer?: string | null
          recording_url?: string | null
          status?: string | null
          time?: string
          timezone?: string | null
          title?: string
          transcript_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_merge_log: {
        Row: {
          activities_moved: number | null
          approval_note: string | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          can_rollback: boolean | null
          canonical_id: string
          canonical_name: string | null
          confirmation_token: string | null
          created_at: string
          documents_moved: number | null
          dry_run_preview: Json | null
          fields_merged: Json | null
          id: string
          is_dry_run: boolean | null
          match_type: string | null
          merged_by: string
          merged_by_name: string | null
          requires_approval: boolean | null
          rollback_data: Json | null
          rolled_back_at: string | null
          rolled_back_by: string | null
          secondary_ids: string[]
          secondary_names: string[] | null
          tasks_moved: number | null
        }
        Insert: {
          activities_moved?: number | null
          approval_note?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          can_rollback?: boolean | null
          canonical_id: string
          canonical_name?: string | null
          confirmation_token?: string | null
          created_at?: string
          documents_moved?: number | null
          dry_run_preview?: Json | null
          fields_merged?: Json | null
          id?: string
          is_dry_run?: boolean | null
          match_type?: string | null
          merged_by: string
          merged_by_name?: string | null
          requires_approval?: boolean | null
          rollback_data?: Json | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          secondary_ids: string[]
          secondary_names?: string[] | null
          tasks_moved?: number | null
        }
        Update: {
          activities_moved?: number | null
          approval_note?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          can_rollback?: boolean | null
          canonical_id?: string
          canonical_name?: string | null
          confirmation_token?: string | null
          created_at?: string
          documents_moved?: number | null
          dry_run_preview?: Json | null
          fields_merged?: Json | null
          id?: string
          is_dry_run?: boolean | null
          match_type?: string | null
          merged_by?: string
          merged_by_name?: string | null
          requires_approval?: boolean | null
          rollback_data?: Json | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          secondary_ids?: string[]
          secondary_names?: string[] | null
          tasks_moved?: number | null
        }
        Relationships: []
      }
      crm_scheduled_reminders: {
        Row: {
          automation_rule_id: string | null
          channels: string[] | null
          contact_id: string
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          message: string
          scheduled_for: string
          sent: boolean | null
          sent_at: string | null
          type: string
        }
        Insert: {
          automation_rule_id?: string | null
          channels?: string[] | null
          contact_id: string
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          message: string
          scheduled_for: string
          sent?: boolean | null
          sent_at?: string | null
          type: string
        }
        Update: {
          automation_rule_id?: string | null
          channels?: string[] | null
          contact_id?: string
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          message?: string
          scheduled_for?: string
          sent?: boolean | null
          sent_at?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_scheduled_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_tasks: {
        Row: {
          assigned_to: string | null
          automation_rule_id: string | null
          category: string | null
          completed_at: string | null
          completed_by: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          due_date: string | null
          id: string
          owner: string | null
          owner_name: string | null
          priority: string | null
          source: string | null
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          automation_rule_id?: string | null
          category?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          owner?: string | null
          owner_name?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          automation_rule_id?: string | null
          category?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          owner?: string | null
          owner_name?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          archived_at: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          location: string | null
          name: string
          org_number: string | null
          phone: string | null
          projects: number | null
          status: string | null
          tripletex_id: number | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name: string
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      data_sync_history: {
        Row: {
          action: string
          changes_made: Json | null
          id: string
          notes: string | null
          prod_id: string | null
          raw_id: string | null
          synced_at: string | null
          synced_by: string | null
          table_name: string
        }
        Insert: {
          action: string
          changes_made?: Json | null
          id?: string
          notes?: string | null
          prod_id?: string | null
          raw_id?: string | null
          synced_at?: string | null
          synced_by?: string | null
          table_name: string
        }
        Update: {
          action?: string
          changes_made?: Json | null
          id?: string
          notes?: string | null
          prod_id?: string | null
          raw_id?: string | null
          synced_at?: string | null
          synced_by?: string | null
          table_name?: string
        }
        Relationships: []
      }
      document_expiry_warnings: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          candidate_name: string
          created_at: string | null
          days_until_expiry: number
          document_id: string | null
          document_type: string
          email_subject: string | null
          expiry_date: string
          id: string
          sent_at: string | null
          sent_to: string[] | null
          warning_type: string
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          candidate_name: string
          created_at?: string | null
          days_until_expiry: number
          document_id?: string | null
          document_type: string
          email_subject?: string | null
          expiry_date: string
          id?: string
          sent_at?: string | null
          sent_to?: string[] | null
          warning_type: string
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          candidate_name?: string
          created_at?: string | null
          days_until_expiry?: number
          document_id?: string | null
          document_type?: string
          email_subject?: string | null
          expiry_date?: string
          id?: string
          sent_at?: string | null
          sent_to?: string[] | null
          warning_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_expiry_warnings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "candidate_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_expiry_warnings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents_expiring_soon"
            referencedColumns: ["id"]
          },
        ]
      }
      document_reviews: {
        Row: {
          created_at: string | null
          id: string
          kommentar: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
          version_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kommentar?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status: string
          version_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kommentar?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_reviews_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "document_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      document_versions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          change_note: string | null
          document_id: string | null
          file_key: string
          id: string
          uploaded_at: string | null
          uploaded_by: string | null
          version_number: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          change_note?: string | null
          document_id?: string | null
          file_key: string
          id?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          version_number: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          change_note?: string | null
          document_id?: string | null
          file_key?: string
          id?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          current_version: number | null
          doc_number: string
          id: string
          status: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          current_version?: number | null
          doc_number: string
          id?: string
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          current_version?: number | null
          doc_number?: string
          id?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          email_type: string
          error_message: string | null
          id: string
          metadata: Json | null
          recipient_email: string
          recipient_name: string | null
          sent_at: string | null
          status: string | null
          subject: string
          success: boolean | null
        }
        Insert: {
          email_type: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          success?: boolean | null
        }
        Update: {
          email_type?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          success?: boolean | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          available_tokens: string[] | null
          body: string
          category: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          name: string
          subject: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          available_tokens?: string[] | null
          body: string
          category: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name: string
          subject: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          available_tokens?: string[] | null
          body?: string
          category?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name?: string
          subject?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      employee_audit_log: {
        Row: {
          action: string
          changed_fields: string[] | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          notes: string | null
          old_values: Json | null
          performed_at: string | null
          performed_by: string
          performed_by_email: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          changed_fields?: string[] | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by: string
          performed_by_email?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          changed_fields?: string[] | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by?: string
          performed_by_email?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      employee_certificates: {
        Row: {
          archived_at: string | null
          cert_class: string | null
          cert_name: string | null
          cert_number: string | null
          cert_type: string
          created_at: string | null
          created_by: string | null
          employee_id: string
          expires_at: string | null
          external_verification_id: string | null
          external_verified_at: string | null
          file_key: string | null
          id: string
          issued_date: string | null
          issuing_authority: string | null
          issuing_country: string | null
          updated_at: string | null
          updated_by: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          archived_at?: string | null
          cert_class?: string | null
          cert_name?: string | null
          cert_number?: string | null
          cert_type: string
          created_at?: string | null
          created_by?: string | null
          employee_id: string
          expires_at?: string | null
          external_verification_id?: string | null
          external_verified_at?: string | null
          file_key?: string | null
          id?: string
          issued_date?: string | null
          issuing_authority?: string | null
          issuing_country?: string | null
          updated_at?: string | null
          updated_by?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          archived_at?: string | null
          cert_class?: string | null
          cert_name?: string | null
          cert_number?: string | null
          cert_type?: string
          created_at?: string | null
          created_by?: string | null
          employee_id?: string
          expires_at?: string | null
          external_verification_id?: string | null
          external_verified_at?: string | null
          file_key?: string | null
          id?: string
          issued_date?: string | null
          issuing_authority?: string | null
          issuing_country?: string | null
          updated_at?: string | null
          updated_by?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_certificates_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_documents: {
        Row: {
          archived_at: string | null
          description: string | null
          document_name: string
          document_type: string
          employee_id: string
          file_key: string
          file_name: string
          file_size: number | null
          id: string
          is_current: boolean | null
          mime_type: string | null
          previous_version_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          valid_from: string | null
          valid_to: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          version: number | null
        }
        Insert: {
          archived_at?: string | null
          description?: string | null
          document_name: string
          document_type: string
          employee_id: string
          file_key: string
          file_name: string
          file_size?: number | null
          id?: string
          is_current?: boolean | null
          mime_type?: string | null
          previous_version_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          valid_from?: string | null
          valid_to?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Update: {
          archived_at?: string | null
          description?: string | null
          document_name?: string
          document_type?: string
          employee_id?: string
          file_key?: string
          file_name?: string
          file_size?: number | null
          id?: string
          is_current?: boolean | null
          mime_type?: string | null
          previous_version_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          valid_from?: string | null
          valid_to?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_documents_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "employee_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_timesheets: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          assignment_id: number | null
          client_name: string | null
          created_at: string | null
          created_by: string | null
          employee_id: string
          end_time: string | null
          id: string
          night_hours: number | null
          overtime_hours: number | null
          regular_hours: number | null
          rejection_reason: string | null
          start_time: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          vessel_name: string | null
          work_date: string
          work_description: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: number | null
          client_name?: string | null
          created_at?: string | null
          created_by?: string | null
          employee_id: string
          end_time?: string | null
          id?: string
          night_hours?: number | null
          overtime_hours?: number | null
          regular_hours?: number | null
          rejection_reason?: string | null
          start_time?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          vessel_name?: string | null
          work_date: string
          work_description?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: number | null
          client_name?: string | null
          created_at?: string | null
          created_by?: string | null
          employee_id?: string
          end_time?: string | null
          id?: string
          night_hours?: number | null
          overtime_hours?: number | null
          regular_hours?: number | null
          rejection_reason?: string | null
          start_time?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          vessel_name?: string | null
          work_date?: string
          work_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_timesheets_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "active_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_timesheets_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "archived_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_timesheets_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_timesheets_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          archive_reason: string | null
          archived_at: string | null
          archived_by: string | null
          bank_account: string | null
          candidate_id: string | null
          clerk_user_id: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          date_of_birth: string | null
          default_work_arrangement: string | null
          email: string
          employee_number: string | null
          employment_type: string | null
          end_date: string | null
          first_name: string
          hourly_rate: number | null
          id: string
          last_name: string
          national_id: string | null
          nationality: string | null
          next_of_kin_name: string | null
          next_of_kin_phone: string | null
          next_of_kin_relation: string | null
          phone: string | null
          postal_city: string | null
          postal_code: string | null
          seaman_book_expires: string | null
          seaman_book_issued: string | null
          seaman_book_number: string | null
          start_date: string | null
          status: string | null
          street_address: string | null
          tax_municipality: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          archive_reason?: string | null
          archived_at?: string | null
          archived_by?: string | null
          bank_account?: string | null
          candidate_id?: string | null
          clerk_user_id?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          default_work_arrangement?: string | null
          email: string
          employee_number?: string | null
          employment_type?: string | null
          end_date?: string | null
          first_name: string
          hourly_rate?: number | null
          id?: string
          last_name: string
          national_id?: string | null
          nationality?: string | null
          next_of_kin_name?: string | null
          next_of_kin_phone?: string | null
          next_of_kin_relation?: string | null
          phone?: string | null
          postal_city?: string | null
          postal_code?: string | null
          seaman_book_expires?: string | null
          seaman_book_issued?: string | null
          seaman_book_number?: string | null
          start_date?: string | null
          status?: string | null
          street_address?: string | null
          tax_municipality?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          archive_reason?: string | null
          archived_at?: string | null
          archived_by?: string | null
          bank_account?: string | null
          candidate_id?: string | null
          clerk_user_id?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          default_work_arrangement?: string | null
          email?: string
          employee_number?: string | null
          employment_type?: string | null
          end_date?: string | null
          first_name?: string
          hourly_rate?: number | null
          id?: string
          last_name?: string
          national_id?: string | null
          nationality?: string | null
          next_of_kin_name?: string | null
          next_of_kin_phone?: string | null
          next_of_kin_relation?: string | null
          phone?: string | null
          postal_city?: string | null
          postal_code?: string | null
          seaman_book_expires?: string | null
          seaman_book_issued?: string | null
          seaman_book_number?: string | null
          start_date?: string | null
          status?: string | null
          street_address?: string | null
          tax_municipality?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      employment_contracts: {
        Row: {
          assignment_id: number | null
          candidate_id: string | null
          contract_number: string | null
          contract_template_used: string | null
          contract_type: string
          created_at: string | null
          created_by: string
          currency: string | null
          customer_id: string | null
          end_date: string | null
          generated_pdf_key: string | null
          hourly_rate: number | null
          id: string
          monthly_salary: number | null
          notice_period_weeks: number | null
          position_title: string
          probation_period_months: number | null
          sent_at: string | null
          signed_at: string | null
          signed_by_candidate: boolean | null
          signed_by_employer: boolean | null
          signed_pdf_key: string | null
          start_date: string
          status: string | null
          terminated_at: string | null
          termination_reason: string | null
          updated_at: string | null
          weekly_hours: number | null
        }
        Insert: {
          assignment_id?: number | null
          candidate_id?: string | null
          contract_number?: string | null
          contract_template_used?: string | null
          contract_type: string
          created_at?: string | null
          created_by: string
          currency?: string | null
          customer_id?: string | null
          end_date?: string | null
          generated_pdf_key?: string | null
          hourly_rate?: number | null
          id?: string
          monthly_salary?: number | null
          notice_period_weeks?: number | null
          position_title: string
          probation_period_months?: number | null
          sent_at?: string | null
          signed_at?: string | null
          signed_by_candidate?: boolean | null
          signed_by_employer?: boolean | null
          signed_pdf_key?: string | null
          start_date: string
          status?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Update: {
          assignment_id?: number | null
          candidate_id?: string | null
          contract_number?: string | null
          contract_template_used?: string | null
          contract_type?: string
          created_at?: string | null
          created_by?: string
          currency?: string | null
          customer_id?: string | null
          end_date?: string | null
          generated_pdf_key?: string | null
          hourly_rate?: number | null
          id?: string
          monthly_salary?: number | null
          notice_period_weeks?: number | null
          position_title?: string
          probation_period_months?: number | null
          sent_at?: string | null
          signed_at?: string | null
          signed_by_candidate?: boolean | null
          signed_by_employer?: boolean | null
          signed_pdf_key?: string | null
          start_date?: string
          status?: string | null
          terminated_at?: string | null
          termination_reason?: string | null
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_contracts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          receipt_url: string | null
          updated_at: string
          vendor: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date: string
          description: string
          id?: string
          receipt_url?: string | null
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          receipt_url?: string | null
          updated_at?: string
          vendor?: string | null
        }
        Relationships: []
      }
      gdpr_audit_log: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          request_id: string
          request_type: string | null
          requested_at: string | null
          status: string | null
          user_identifier: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_id: string
          request_type?: string | null
          requested_at?: string | null
          status?: string | null
          user_identifier: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_id?: string
          request_type?: string | null
          requested_at?: string | null
          status?: string | null
          user_identifier?: string
        }
        Relationships: []
      }
      hms_incident_actions: {
        Row: {
          action_description: string
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          created_by: string
          due_date: string | null
          id: string
          incident_id: string | null
          responsible_person: string
          status: string | null
        }
        Insert: {
          action_description: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          created_by: string
          due_date?: string | null
          id?: string
          incident_id?: string | null
          responsible_person: string
          status?: string | null
        }
        Update: {
          action_description?: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          created_by?: string
          due_date?: string | null
          id?: string
          incident_id?: string | null
          responsible_person?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hms_incident_actions_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "hms_incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      hms_incidents: {
        Row: {
          arbeidstilsynet_case_number: string | null
          arbeidstilsynet_report_date: string | null
          assignment_id: number | null
          attachment_keys: string[] | null
          candidate_id: string | null
          category: string
          closed_at: string | null
          closed_by: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: string
          immediate_action: string | null
          incident_date: string
          incident_number: string | null
          involved_persons: string[] | null
          location: string | null
          preventive_measures: string | null
          reported_by: string
          reported_to_arbeidstilsynet: boolean | null
          root_cause: string | null
          severity: string
          status: string | null
          title: string
          updated_at: string | null
          witness_names: string[] | null
        }
        Insert: {
          arbeidstilsynet_case_number?: string | null
          arbeidstilsynet_report_date?: string | null
          assignment_id?: number | null
          attachment_keys?: string[] | null
          candidate_id?: string | null
          category: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: string
          immediate_action?: string | null
          incident_date: string
          incident_number?: string | null
          involved_persons?: string[] | null
          location?: string | null
          preventive_measures?: string | null
          reported_by: string
          reported_to_arbeidstilsynet?: boolean | null
          root_cause?: string | null
          severity: string
          status?: string | null
          title: string
          updated_at?: string | null
          witness_names?: string[] | null
        }
        Update: {
          arbeidstilsynet_case_number?: string | null
          arbeidstilsynet_report_date?: string | null
          assignment_id?: number | null
          attachment_keys?: string[] | null
          candidate_id?: string | null
          category?: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: string
          immediate_action?: string | null
          incident_date?: string
          incident_number?: string | null
          involved_persons?: string[] | null
          location?: string | null
          preventive_measures?: string | null
          reported_by?: string
          reported_to_arbeidstilsynet?: boolean | null
          root_cause?: string | null
          severity?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          witness_names?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "hms_incidents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_incidents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_incidents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_incidents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_incidents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_incidents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      hms_kpi: {
        Row: {
          antall_hms_avvik: number | null
          antall_nestenulykker: number | null
          antall_skader: number | null
          arbeidstimer: number | null
          avvik_lukket_i_tid_prosent: number | null
          created_at: string | null
          created_by: string | null
          gjennomsnittlig_lukketid_dager: number | null
          h_verdi: number | null
          hms_opplæring_fullført_prosent: number | null
          id: string
          kundetilfredshet_hms_score: number | null
          langtidssykefravær_antall: number | null
          måned: string
          sykefravær_prosent: number | null
          updated_at: string | null
        }
        Insert: {
          antall_hms_avvik?: number | null
          antall_nestenulykker?: number | null
          antall_skader?: number | null
          arbeidstimer?: number | null
          avvik_lukket_i_tid_prosent?: number | null
          created_at?: string | null
          created_by?: string | null
          gjennomsnittlig_lukketid_dager?: number | null
          h_verdi?: number | null
          hms_opplæring_fullført_prosent?: number | null
          id?: string
          kundetilfredshet_hms_score?: number | null
          langtidssykefravær_antall?: number | null
          måned: string
          sykefravær_prosent?: number | null
          updated_at?: string | null
        }
        Update: {
          antall_hms_avvik?: number | null
          antall_nestenulykker?: number | null
          antall_skader?: number | null
          arbeidstimer?: number | null
          avvik_lukket_i_tid_prosent?: number | null
          created_at?: string | null
          created_by?: string | null
          gjennomsnittlig_lukketid_dager?: number | null
          h_verdi?: number | null
          hms_opplæring_fullført_prosent?: number | null
          id?: string
          kundetilfredshet_hms_score?: number | null
          langtidssykefravær_antall?: number | null
          måned?: string
          sykefravær_prosent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hms_kpi_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_access"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_kpi_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hms_training: {
        Row: {
          certificate_url: string | null
          completed_date: string
          created_at: string | null
          expires_date: string | null
          id: string
          notes: string | null
          training_provider: string | null
          training_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          completed_date: string
          created_at?: string | null
          expires_date?: string | null
          id?: string
          notes?: string | null
          training_provider?: string | null
          training_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          completed_date?: string
          created_at?: string | null
          expires_date?: string | null
          id?: string
          notes?: string | null
          training_provider?: string | null
          training_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hms_training_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_access"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hms_training_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interest_leads: {
        Row: {
          id: string
          navn: string
          epost: string
          telefon: string | null
          type: string
          melding: string | null
          created_at: string
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          navn: string
          epost: string
          telefon?: string | null
          type: string
          melding?: string | null
          created_at?: string
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          navn?: string
          epost?: string
          telefon?: string | null
          type?: string
          melding?: string | null
          status?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          job_posting_id: string | null
          candidate_id: string | null
          name: string
          email: string
          phone: string | null
          cover_letter: string | null
          cv_key: string | null
          certificates_key: string | null
          ip_address: string | null
          user_agent: string | null
          source: string | null
          status: string | null
          vipps_verified: boolean | null
          vipps_name: string | null
          vipps_phone: string | null
          vipps_sub: string | null
          vipps_verified_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          job_posting_id?: string | null
          candidate_id?: string | null
          name: string
          email: string
          phone?: string | null
          cover_letter?: string | null
          cv_key?: string | null
          certificates_key?: string | null
          ip_address?: string | null
          user_agent?: string | null
          source?: string | null
          status?: string | null
          vipps_verified?: boolean | null
          vipps_name?: string | null
          vipps_phone?: string | null
          vipps_sub?: string | null
          vipps_verified_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          job_posting_id?: string | null
          candidate_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          cover_letter?: string | null
          cv_key?: string | null
          certificates_key?: string | null
          ip_address?: string | null
          user_agent?: string | null
          source?: string | null
          status?: string | null
          vipps_verified?: boolean | null
          vipps_name?: string | null
          vipps_phone?: string | null
          vipps_sub?: string | null
          vipps_verified_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "active_job_postings_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_count: number | null
          application_deadline: string | null
          benefits: string[] | null
          category: string
          company_name: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          description: string
          duration_days: number | null
          end_date: string | null
          expires_at: string | null
          fylke: string
          id: string
          job_type: string
          kommune: string
          location: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          region: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_max: number | null
          salary_min: number | null
          salary_text: string | null
          short_description: string | null
          slug: string
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          vessel_name: string | null
          view_count: number | null
        }
        Insert: {
          application_count?: number | null
          application_deadline?: string | null
          benefits?: string[] | null
          category: string
          company_name?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          description: string
          duration_days?: number | null
          end_date?: string | null
          expires_at?: string | null
          fylke: string
          id?: string
          job_type: string
          kommune: string
          location: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          region?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          short_description?: string | null
          slug: string
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          vessel_name?: string | null
          view_count?: number | null
        }
        Update: {
          application_count?: number | null
          application_deadline?: string | null
          benefits?: string[] | null
          category?: string
          company_name?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          description?: string
          duration_days?: number | null
          end_date?: string | null
          expires_at?: string | null
          fylke?: string
          id?: string
          job_type?: string
          kommune?: string
          location?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          region?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          short_description?: string | null
          slug?: string
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          vessel_name?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      job_requirements: {
        Row: {
          assigned_to: string | null
          assignment_id: string | null
          created_at: string | null
          created_by: string | null
          customer_name: string
          customer_special_requirements: string | null
          end_date: string | null
          experience_level: string | null
          id: string
          language_requirements: string | null
          location: string | null
          period: string | null
          required_certifications: string[] | null
          required_skills: string[] | null
          role: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          assigned_to?: string | null
          assignment_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_name: string
          customer_special_requirements?: string | null
          end_date?: string | null
          experience_level?: string | null
          id?: string
          language_requirements?: string | null
          location?: string | null
          period?: string | null
          required_certifications?: string[] | null
          required_skills?: string[] | null
          role: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          assigned_to?: string | null
          assignment_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_name?: string
          customer_special_requirements?: string | null
          end_date?: string | null
          experience_level?: string | null
          id?: string
          language_requirements?: string | null
          location?: string | null
          period?: string | null
          required_certifications?: string[] | null
          required_skills?: string[] | null
          role?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      kpi_snapshots: {
        Row: {
          active_jobs: number | null
          candidates_registered_this_period: number | null
          created_at: string | null
          csat_score: number | null
          documents_expiring_30days: number | null
          documents_expiring_7days: number | null
          expired_documents_count: number | null
          filled_jobs_this_period: number | null
          id: string
          incidents_per_100_jobs: number | null
          nps_score: number | null
          open_capa_actions: number | null
          perfect_releases_count: number | null
          releases_with_issues_count: number | null
          releases_without_deficiencies_pct: number | null
          snapshot_date: string
          time_to_fill_median_days: number | null
          time_to_fill_p90_days: number | null
        }
        Insert: {
          active_jobs?: number | null
          candidates_registered_this_period?: number | null
          created_at?: string | null
          csat_score?: number | null
          documents_expiring_30days?: number | null
          documents_expiring_7days?: number | null
          expired_documents_count?: number | null
          filled_jobs_this_period?: number | null
          id?: string
          incidents_per_100_jobs?: number | null
          nps_score?: number | null
          open_capa_actions?: number | null
          perfect_releases_count?: number | null
          releases_with_issues_count?: number | null
          releases_without_deficiencies_pct?: number | null
          snapshot_date?: string
          time_to_fill_median_days?: number | null
          time_to_fill_p90_days?: number | null
        }
        Update: {
          active_jobs?: number | null
          candidates_registered_this_period?: number | null
          created_at?: string | null
          csat_score?: number | null
          documents_expiring_30days?: number | null
          documents_expiring_7days?: number | null
          expired_documents_count?: number | null
          filled_jobs_this_period?: number | null
          id?: string
          incidents_per_100_jobs?: number | null
          nps_score?: number | null
          open_capa_actions?: number | null
          perfect_releases_count?: number | null
          releases_with_issues_count?: number | null
          releases_without_deficiencies_pct?: number | null
          snapshot_date?: string
          time_to_fill_median_days?: number | null
          time_to_fill_p90_days?: number | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          clerk_user_id: string | null
          company: string
          contact: string
          county: string
          created_at: string
          description: string | null
          email: string
          email_encrypted: string | null
          gdpr_client_consent: boolean
          id: string
          is_encrypted: boolean | null
          municipality: string | null
          name_encrypted: string | null
          need_duration: string
          need_type: string
          num_people: string | null
          org_number: string | null
          phone: string
          phone_encrypted: string | null
          source_ip: string | null
          start_date: string | null
          submitted_at: string | null
          urgency: string | null
          work_location: string | null
        }
        Insert: {
          clerk_user_id?: string | null
          company: string
          contact: string
          county: string
          created_at?: string
          description?: string | null
          email: string
          email_encrypted?: string | null
          gdpr_client_consent?: boolean
          id?: string
          is_encrypted?: boolean | null
          municipality?: string | null
          name_encrypted?: string | null
          need_duration: string
          need_type: string
          num_people?: string | null
          org_number?: string | null
          phone: string
          phone_encrypted?: string | null
          source_ip?: string | null
          start_date?: string | null
          submitted_at?: string | null
          urgency?: string | null
          work_location?: string | null
        }
        Update: {
          clerk_user_id?: string | null
          company?: string
          contact?: string
          county?: string
          created_at?: string
          description?: string | null
          email?: string
          email_encrypted?: string | null
          gdpr_client_consent?: boolean
          id?: string
          is_encrypted?: boolean | null
          municipality?: string | null
          name_encrypted?: string | null
          need_duration?: string
          need_type?: string
          num_people?: string | null
          org_number?: string | null
          phone?: string
          phone_encrypted?: string | null
          source_ip?: string | null
          start_date?: string | null
          submitted_at?: string | null
          urgency?: string | null
          work_location?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          clerk_user_id: string
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          read_at: string | null
          sender: string
          sender_name: string | null
        }
        Insert: {
          clerk_user_id: string
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          sender: string
          sender_name?: string | null
        }
        Update: {
          clerk_user_id?: string
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          sender?: string
          sender_name?: string | null
        }
        Relationships: []
      }
      nc_routing_rules: {
        Row: {
          created_at: string | null
          id: string
          nc_type: string
          priority: number | null
          target_role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nc_type: string
          priority?: number | null
          target_role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nc_type?: string
          priority?: number | null
          target_role?: string
        }
        Relationships: []
      }
      nonconformities: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assigned_department: string | null
          assigned_to: string | null
          assignment_id: number | null
          attachment_keys: string[] | null
          authority_case_number: string | null
          candidate_id: string | null
          capa_actions: Json | null
          capa_completed_date: string | null
          capa_implementation_notes: string | null
          capa_plan_approved_by: string | null
          capa_plan_approved_date: string | null
          closed_at: string | null
          closed_by: string | null
          closure_notes: string | null
          correction_by: string | null
          correction_date: string | null
          correction_text: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          description: string
          detected_by: string | null
          detected_date: string
          doc_change: Json | null
          effectiveness_method: string | null
          effectiveness_notes: string | null
          effectiveness_result: string | null
          effectiveness_verification_date: string | null
          effectiveness_verified_by: string | null
          escalated_at: string | null
          escalated_to: string | null
          escalation_reason: string | null
          is_recurrence: boolean | null
          location: string | null
          nc_id: string
          nc_number: string
          nc_type: string
          planned_rca_date: string | null
          rca_5whys_plaintext: string | null
          rca_5whys_richtext: Json | null
          rca_category: string | null
          rca_completed_by: string | null
          rca_completed_date: string | null
          recurrence_of: string | null
          related_nc_ids: string[] | null
          reported_to_authority: boolean | null
          reported_to_authority_date: string | null
          reported_to_customer: boolean | null
          reported_to_customer_date: string | null
          requires_capa: boolean | null
          responsible_owner: string | null
          risk_after: number | null
          risk_before: number | null
          risk_likelihood: number | null
          risk_severity: number | null
          severity: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_department?: string | null
          assigned_to?: string | null
          assignment_id?: number | null
          attachment_keys?: string[] | null
          authority_case_number?: string | null
          candidate_id?: string | null
          capa_actions?: Json | null
          capa_completed_date?: string | null
          capa_implementation_notes?: string | null
          capa_plan_approved_by?: string | null
          capa_plan_approved_date?: string | null
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          correction_by?: string | null
          correction_date?: string | null
          correction_text?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          description: string
          detected_by?: string | null
          detected_date?: string
          doc_change?: Json | null
          effectiveness_method?: string | null
          effectiveness_notes?: string | null
          effectiveness_result?: string | null
          effectiveness_verification_date?: string | null
          effectiveness_verified_by?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_reason?: string | null
          is_recurrence?: boolean | null
          location?: string | null
          nc_id?: string
          nc_number: string
          nc_type: string
          planned_rca_date?: string | null
          rca_5whys_plaintext?: string | null
          rca_5whys_richtext?: Json | null
          rca_category?: string | null
          rca_completed_by?: string | null
          rca_completed_date?: string | null
          recurrence_of?: string | null
          related_nc_ids?: string[] | null
          reported_to_authority?: boolean | null
          reported_to_authority_date?: string | null
          reported_to_customer?: boolean | null
          reported_to_customer_date?: string | null
          requires_capa?: boolean | null
          responsible_owner?: string | null
          risk_after?: number | null
          risk_before?: number | null
          risk_likelihood?: number | null
          risk_severity?: number | null
          severity: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_department?: string | null
          assigned_to?: string | null
          assignment_id?: number | null
          attachment_keys?: string[] | null
          authority_case_number?: string | null
          candidate_id?: string | null
          capa_actions?: Json | null
          capa_completed_date?: string | null
          capa_implementation_notes?: string | null
          capa_plan_approved_by?: string | null
          capa_plan_approved_date?: string | null
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          correction_by?: string | null
          correction_date?: string | null
          correction_text?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          description?: string
          detected_by?: string | null
          detected_date?: string
          doc_change?: Json | null
          effectiveness_method?: string | null
          effectiveness_notes?: string | null
          effectiveness_result?: string | null
          effectiveness_verification_date?: string | null
          effectiveness_verified_by?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_reason?: string | null
          is_recurrence?: boolean | null
          location?: string | null
          nc_id?: string
          nc_number?: string
          nc_type?: string
          planned_rca_date?: string | null
          rca_5whys_plaintext?: string | null
          rca_5whys_richtext?: Json | null
          rca_category?: string | null
          rca_completed_by?: string | null
          rca_completed_date?: string | null
          recurrence_of?: string | null
          related_nc_ids?: string[] | null
          reported_to_authority?: boolean | null
          reported_to_authority_date?: string | null
          reported_to_customer?: boolean | null
          reported_to_customer_date?: string | null
          requires_capa?: boolean | null
          responsible_owner?: string | null
          risk_after?: number | null
          risk_before?: number | null
          risk_likelihood?: number | null
          risk_severity?: number | null
          severity?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nonconformities_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonconformities_recurrence_of_fkey"
            columns: ["recurrence_of"]
            isOneToOne: false
            referencedRelation: "nonconformities"
            referencedColumns: ["nc_id"]
          },
        ]
      }
      placements: {
        Row: {
          candidate_interest_id: string | null
          contract_url: string | null
          created_at: string | null
          customer_id: string | null
          customer_rate: number | null
          end_date: string | null
          hourly_rate: number | null
          id: string
          margin_percent: number | null
          role: string
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          candidate_interest_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_rate?: number | null
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          margin_percent?: number | null
          role: string
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          candidate_interest_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_rate?: number | null
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          margin_percent?: number | null
          role?: string
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "placements_candidate_interest_id_fkey"
            columns: ["candidate_interest_id"]
            isOneToOne: false
            referencedRelation: "candidate_interest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "placements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      police_certificates: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          expiry_date: string | null
          file_key: string | null
          id: string
          issue_date: string
          updated_at: string | null
          verification_notes: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          expiry_date?: string | null
          file_key?: string | null
          id?: string
          issue_date: string
          updated_at?: string | null
          verification_notes?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          expiry_date?: string | null
          file_key?: string | null
          id?: string
          issue_date?: string
          updated_at?: string | null
          verification_notes?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "police_certificates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "police_certificates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "police_certificates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "police_certificates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_candidates: {
        Row: {
          created_at: string | null
          email: string | null
          erfaring: string | null
          id: string
          import_id: string | null
          import_source: string | null
          imported_at: string | null
          lokasjon: string | null
          name: string
          phone: string | null
          prod_id: string | null
          rolle: string | null
          sertifikater: Json | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          tilgjengelighet: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          erfaring?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          lokasjon?: string | null
          name: string
          phone?: string | null
          prod_id?: string | null
          rolle?: string | null
          sertifikater?: Json | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tilgjengelighet?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          erfaring?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          lokasjon?: string | null
          name?: string
          phone?: string | null
          prod_id?: string | null
          rolle?: string | null
          sertifikater?: Json | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tilgjengelighet?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_crm_contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          import_id: string | null
          import_source: string | null
          imported_at: string | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          prod_id: string | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      raw_customers: {
        Row: {
          adresse: string | null
          created_at: string | null
          epost: string | null
          id: string
          import_id: string | null
          import_source: string | null
          imported_at: string | null
          kontaktperson: string | null
          name: string
          prod_id: string | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          telefon: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string | null
          epost?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          kontaktperson?: string | null
          name: string
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          telefon?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string | null
          epost?: string | null
          id?: string
          import_id?: string | null
          import_source?: string | null
          imported_at?: string | null
          kontaktperson?: string | null
          name?: string
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          telefon?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      release_checklists: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approver_role: string | null
          candidate_id: string
          candidate_name: string
          checklist_notes: string | null
          contract_signed: boolean | null
          created_at: string | null
          customer_requirements_met: boolean | null
          document_ids: string[] | null
          id: string
          id_verified: boolean | null
          job_requirement_id: string | null
          language_requirements_met: boolean | null
          logistics_confirmed: boolean | null
          medical_cert_valid: boolean | null
          package_url: string | null
          pdf_hash: string | null
          pdf_url: string | null
          prepared_at: string | null
          prepared_by: string | null
          references_checked: boolean | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string | null
          stcw_valid: boolean | null
          updated_at: string | null
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approver_role?: string | null
          candidate_id: string
          candidate_name: string
          checklist_notes?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          customer_requirements_met?: boolean | null
          document_ids?: string[] | null
          id?: string
          id_verified?: boolean | null
          job_requirement_id?: string | null
          language_requirements_met?: boolean | null
          logistics_confirmed?: boolean | null
          medical_cert_valid?: boolean | null
          package_url?: string | null
          pdf_hash?: string | null
          pdf_url?: string | null
          prepared_at?: string | null
          prepared_by?: string | null
          references_checked?: boolean | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string | null
          stcw_valid?: boolean | null
          updated_at?: string | null
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approver_role?: string | null
          candidate_id?: string
          candidate_name?: string
          checklist_notes?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          customer_requirements_met?: boolean | null
          document_ids?: string[] | null
          id?: string
          id_verified?: boolean | null
          job_requirement_id?: string | null
          language_requirements_met?: boolean | null
          logistics_confirmed?: boolean | null
          medical_cert_valid?: boolean | null
          package_url?: string | null
          pdf_hash?: string | null
          pdf_url?: string | null
          prepared_at?: string | null
          prepared_by?: string | null
          references_checked?: boolean | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string | null
          stcw_valid?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "release_checklists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "job_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "release_checklists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "jobs_needing_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      role_responsibilities: {
        Row: {
          created_at: string | null
          id: string
          iso_reference: string | null
          responsibility: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          iso_reference?: string | null
          responsibility: string
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          iso_reference?: string | null
          responsibility?: string
          role?: string
        }
        Relationships: []
      }
      staffing_needs: {
        Row: {
          id: string
          fartoytype: string
          stillinger: string[]
          antall: number
          oppstart: string | null
          rotasjon: string | null
          kontakt_navn: string
          kontakt_epost: string
          kontakt_telefon: string | null
          bedrift: string | null
          merknad: string | null
          created_at: string
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          fartoytype: string
          stillinger: string[]
          antall: number
          oppstart?: string | null
          rotasjon?: string | null
          kontakt_navn: string
          kontakt_epost: string
          kontakt_telefon?: string | null
          bedrift?: string | null
          merknad?: string | null
          created_at?: string
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          fartoytype?: string
          stillinger?: string[]
          antall?: number
          oppstart?: string | null
          rotasjon?: string | null
          kontakt_navn?: string
          kontakt_epost?: string
          kontakt_telefon?: string | null
          bedrift?: string | null
          merknad?: string | null
          status?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      sync_conflicts: {
        Row: {
          detected_at: string | null
          differences: Json | null
          id: string
          prod_data: Json | null
          prod_id: string | null
          raw_data: Json | null
          raw_id: string | null
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          table_name: string
        }
        Insert: {
          detected_at?: string | null
          differences?: Json | null
          id?: string
          prod_data?: Json | null
          prod_id?: string | null
          raw_data?: Json | null
          raw_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          table_name: string
        }
        Update: {
          detected_at?: string | null
          differences?: Json | null
          id?: string
          prod_data?: Json | null
          prod_id?: string | null
          raw_data?: Json | null
          raw_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          table_name?: string
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          assignment_id: string | null
          clerk_user_id: string
          created_at: string | null
          date: string
          description: string | null
          hours: number
          id: string
          rejected_reason: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: string | null
          clerk_user_id: string
          created_at?: string | null
          date: string
          description?: string | null
          hours: number
          id?: string
          rejected_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: string | null
          clerk_user_id?: string
          created_at?: string | null
          date?: string
          description?: string | null
          hours?: number
          id?: string
          rejected_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          clerk_user_id: string
          expires_at: string | null
          filename: string
          id: string
          name: string
          storage_path: string | null
          type: string
          uploaded_at: string | null
        }
        Insert: {
          clerk_user_id: string
          expires_at?: string | null
          filename: string
          id?: string
          name: string
          storage_path?: string | null
          type: string
          uploaded_at?: string | null
        }
        Update: {
          clerk_user_id?: string
          expires_at?: string | null
          filename?: string
          id?: string
          name?: string
          storage_path?: string | null
          type?: string
          uploaded_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          active: boolean | null
          clerk_user_id: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          position: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          clerk_user_id?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          clerk_user_id?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      verification_logs: {
        Row: {
          action: string
          candidate_id: string
          confidence_score: number | null
          created_at: string | null
          details: Json | null
          id: string
          performed_by: string
          result: string | null
        }
        Insert: {
          action: string
          candidate_id: string
          confidence_score?: number | null
          created_at?: string | null
          details?: Json | null
          id?: string
          performed_by: string
          result?: string | null
        }
        Update: {
          action?: string
          candidate_id?: string
          confidence_score?: number | null
          created_at?: string | null
          details?: Json | null
          id?: string
          performed_by?: string
          result?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_logs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_logs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_logs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_logs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_assignments: {
        Row: {
          archived_at: string | null
          candidate_id: string | null
          contract_url: string | null
          created_at: string | null
          customer_id: string | null
          hourly_rate: number | null
          hours_worked: number | null
          id: number | null
          invoice_number: string | null
          invoice_status: string | null
          location: string | null
          period: string | null
          role: string | null
          status: string | null
          tripletex_invoice_id: number | null
        }
        Insert: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number | null
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          period?: string | null
          role?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
        }
        Update: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number | null
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          period?: string | null
          role?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
        }
        Relationships: []
      }
      active_candidates: {
        Row: {
          archived_at: string | null
          available_from: string | null
          available_to: string | null
          bankid_verified_at: string | null
          certs_key: string | null
          county: string | null
          created_at: string | null
          cv_key: string | null
          deck_class: string | null
          deck_has: string | null
          email: string | null
          flagged_reason: string | null
          fylke: string | null
          gdpr_consent: boolean | null
          id: string | null
          kommune: string | null
          municipality: string | null
          name: string | null
          national_id_hash: string | null
          ocr_confidence_score: number | null
          other_comp: string | null
          phone: string | null
          skills: string | null
          source_ip: string | null
          status: string | null
          stcw_confirm: boolean | null
          stcw_confirmed: boolean | null
          stcw_has: string | null
          stcw_mod: string[] | null
          submitted_at: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          wants_temporary: string | null
          work_main: string[] | null
        }
        Insert: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          county?: string | null
          created_at?: string | null
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string | null
          kommune?: string | null
          municipality?: string | null
          name?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone?: string | null
          skills?: string | null
          source_ip?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Update: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          county?: string | null
          created_at?: string | null
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string | null
          kommune?: string | null
          municipality?: string | null
          name?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone?: string | null
          skills?: string | null
          source_ip?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Relationships: []
      }
      active_crm_contacts: {
        Row: {
          archived_at: string | null
          assigned_to: string | null
          campaign_tag: string | null
          company: string | null
          contact_status: string | null
          created_at: string | null
          email: string | null
          id: string | null
          interest_level: number | null
          last_contact_at: string | null
          linkedin_url: string | null
          name: string | null
          notes: string | null
          phone: string | null
          position: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      active_customers: {
        Row: {
          archived_at: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string | null
          location: string | null
          name: string | null
          org_number: string | null
          phone: string | null
          projects: number | null
          status: string | null
          tripletex_id: number | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      active_job_postings_with_stats: {
        Row: {
          application_count: number | null
          application_deadline: string | null
          benefits: string[] | null
          category: string | null
          company_name: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          description: string | null
          duration_days: number | null
          end_date: string | null
          expires_at: string | null
          fylke: string | null
          hired_count: number | null
          id: string | null
          job_type: string | null
          kommune: string | null
          location: string | null
          meta_description: string | null
          meta_title: string | null
          pending_applications: number | null
          published_at: string | null
          region: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          reviewed_applications: number | null
          salary_max: number | null
          salary_min: number | null
          salary_text: string | null
          short_description: string | null
          slug: string | null
          start_date: string | null
          status: string | null
          title: string | null
          total_applications: number | null
          updated_at: string | null
          vessel_name: string | null
          view_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "leads_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      archived_assignments: {
        Row: {
          archived_at: string | null
          candidate_id: string | null
          contract_url: string | null
          created_at: string | null
          customer_id: string | null
          hourly_rate: number | null
          hours_worked: number | null
          id: number | null
          invoice_number: string | null
          invoice_status: string | null
          location: string | null
          period: string | null
          role: string | null
          status: string | null
          tripletex_invoice_id: number | null
        }
        Insert: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number | null
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          period?: string | null
          role?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
        }
        Update: {
          archived_at?: string | null
          candidate_id?: string | null
          contract_url?: string | null
          created_at?: string | null
          customer_id?: string | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number | null
          invoice_number?: string | null
          invoice_status?: string | null
          location?: string | null
          period?: string | null
          role?: string | null
          status?: string | null
          tripletex_invoice_id?: number | null
        }
        Relationships: []
      }
      archived_candidates: {
        Row: {
          archived_at: string | null
          available_from: string | null
          available_to: string | null
          bankid_verified_at: string | null
          certs_key: string | null
          county: string | null
          created_at: string | null
          cv_key: string | null
          deck_class: string | null
          deck_has: string | null
          email: string | null
          flagged_reason: string | null
          fylke: string | null
          gdpr_consent: boolean | null
          id: string | null
          kommune: string | null
          municipality: string | null
          name: string | null
          national_id_hash: string | null
          ocr_confidence_score: number | null
          other_comp: string | null
          phone: string | null
          skills: string | null
          source_ip: string | null
          status: string | null
          stcw_confirm: boolean | null
          stcw_confirmed: boolean | null
          stcw_has: string | null
          stcw_mod: string[] | null
          submitted_at: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          wants_temporary: string | null
          work_main: string[] | null
        }
        Insert: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          county?: string | null
          created_at?: string | null
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string | null
          kommune?: string | null
          municipality?: string | null
          name?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone?: string | null
          skills?: string | null
          source_ip?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Update: {
          archived_at?: string | null
          available_from?: string | null
          available_to?: string | null
          bankid_verified_at?: string | null
          certs_key?: string | null
          county?: string | null
          created_at?: string | null
          cv_key?: string | null
          deck_class?: string | null
          deck_has?: string | null
          email?: string | null
          flagged_reason?: string | null
          fylke?: string | null
          gdpr_consent?: boolean | null
          id?: string | null
          kommune?: string | null
          municipality?: string | null
          name?: string | null
          national_id_hash?: string | null
          ocr_confidence_score?: number | null
          other_comp?: string | null
          phone?: string | null
          skills?: string | null
          source_ip?: string | null
          status?: string | null
          stcw_confirm?: boolean | null
          stcw_confirmed?: boolean | null
          stcw_has?: string | null
          stcw_mod?: string[] | null
          submitted_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Relationships: []
      }
      archived_crm_contacts: {
        Row: {
          archived_at: string | null
          assigned_to: string | null
          campaign_tag: string | null
          company: string | null
          contact_status: string | null
          created_at: string | null
          email: string | null
          id: string | null
          interest_level: number | null
          last_contact_at: string | null
          linkedin_url: string | null
          name: string | null
          notes: string | null
          phone: string | null
          position: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      archived_customers: {
        Row: {
          archived_at: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string | null
          location: string | null
          name: string | null
          org_number: string | null
          phone: string | null
          projects: number | null
          status: string | null
          tripletex_id: number | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          org_number?: string | null
          phone?: string | null
          projects?: number | null
          status?: string | null
          tripletex_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_log_readable: {
        Row: {
          action: string | null
          action_description: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          action?: string | null
          action_description?: never
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string | null
          action_description?: never
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      best_candidate_matches: {
        Row: {
          assignment_created: string | null
          assignment_id: number | null
          assignment_role: string | null
          blockers: string[] | null
          can_assign: boolean | null
          candidate_email: string | null
          candidate_id: string | null
          candidate_location: string | null
          candidate_name: string | null
          candidate_phone: string | null
          created_at: string | null
          id: number | null
          matched_at: string | null
          rank: number | null
          reasons: string[] | null
          score: number | null
          warnings: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "active_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "archived_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_pipeline_stats: {
        Row: {
          avg_rating: number | null
          count: number | null
          hot_count: number | null
          pipeline_status: string | null
        }
        Relationships: []
      }
      candidates_secure: {
        Row: {
          available_from: string | null
          certs_key: string | null
          cv_key: string | null
          email: string | null
          fylke: string | null
          id: string | null
          kommune: string | null
          name: string | null
          other_comp: string | null
          phone: string | null
          skills: string | null
          source_ip: string | null
          status: string | null
          stcw_confirm: boolean | null
          submitted_at: string | null
          wants_temporary: string | null
          work_main: string[] | null
        }
        Insert: {
          available_from?: string | null
          certs_key?: string | null
          cv_key?: string | null
          email?: never
          fylke?: string | null
          id?: string | null
          kommune?: string | null
          name?: never
          other_comp?: string | null
          phone?: never
          skills?: string | null
          source_ip?: never
          status?: string | null
          stcw_confirm?: boolean | null
          submitted_at?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Update: {
          available_from?: string | null
          certs_key?: string | null
          cv_key?: string | null
          email?: never
          fylke?: string | null
          id?: string | null
          kommune?: string | null
          name?: never
          other_comp?: string | null
          phone?: never
          skills?: string | null
          source_ip?: never
          status?: string | null
          stcw_confirm?: boolean | null
          submitted_at?: string | null
          wants_temporary?: string | null
          work_main?: string[] | null
        }
        Relationships: []
      }
      capa_kpi: {
        Row: {
          avg_closure_days: number | null
          capa_planned: number | null
          capa_planned_on_time: number | null
          closed_ncs: number | null
          critical_ncs: number | null
          data_ncs: number | null
          effective_capas: number | null
          hse_ncs: number | null
          ineffective_capas: number | null
          major_ncs: number | null
          minor_ncs: number | null
          observations: number | null
          open_ncs: number | null
          quality_ncs: number | null
          recurrences: number | null
          total_ncs: number | null
        }
        Relationships: []
      }
      crm_audit_view: {
        Row: {
          action: string | null
          action_display: string | null
          changes: Json | null
          created_at: string | null
          entity_display: string | null
          entity_id: string | null
          entity_type: string | null
          id: string | null
          metadata: Json | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          action_display?: never
          changes?: Json | null
          created_at?: string | null
          entity_display?: never
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          action_display?: never
          changes?: Json | null
          created_at?: string | null
          entity_display?: never
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crm_contacts_overdue: {
        Row: {
          activity_count_30d: number | null
          address: string | null
          archived_at: string | null
          archived_reason: string | null
          assigned_to: string | null
          campaign_tag: string | null
          company: string | null
          contact_status: string | null
          created_at: string | null
          days_overdue: number | null
          deal_value: number | null
          email: string | null
          follow_up_date: string | null
          hubspot_id: string | null
          hubspot_owner_id: string | null
          hubspot_synced_at: string | null
          id: string | null
          industry: string | null
          interest_level: number | null
          last_contact_at: string | null
          last_quote_sent_at: string | null
          linkedin_url: string | null
          location: string | null
          manual_entry: boolean | null
          merged_from: Json | null
          merged_into: string | null
          name: string | null
          next_activity: string | null
          notes: string | null
          notes_updated_at: string | null
          notes_updated_by: string | null
          org_number: string | null
          owner_id: string | null
          phone: string | null
          pinned_note: string | null
          position: string | null
          priority: string | null
          probability: number | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          urgency: string | null
          website: string | null
        }
        Insert: {
          activity_count_30d?: number | null
          address?: string | null
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          days_overdue?: never
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          hubspot_owner_id?: string | null
          hubspot_synced_at?: string | null
          id?: string | null
          industry?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          last_quote_sent_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          merged_into?: string | null
          name?: string | null
          next_activity?: string | null
          notes?: string | null
          notes_updated_at?: string | null
          notes_updated_by?: string | null
          org_number?: string | null
          owner_id?: string | null
          phone?: string | null
          pinned_note?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          urgency?: never
          website?: string | null
        }
        Update: {
          activity_count_30d?: number | null
          address?: string | null
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          days_overdue?: never
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          hubspot_owner_id?: string | null
          hubspot_synced_at?: string | null
          id?: string | null
          industry?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          last_quote_sent_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          merged_into?: string | null
          name?: string | null
          next_activity?: string | null
          notes?: string | null
          notes_updated_at?: string | null
          notes_updated_by?: string | null
          org_number?: string | null
          owner_id?: string | null
          phone?: string | null
          pinned_note?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          urgency?: never
          website?: string | null
        }
        Relationships: []
      }
      crm_meetings_upcoming: {
        Row: {
          attendees: Json | null
          calendar_event_id: string | null
          calendar_link: string | null
          calendar_synced_at: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          date: string | null
          description: string | null
          duration_minutes: number | null
          id: string | null
          location: string | null
          meeting_provider: string | null
          meeting_url: string | null
          notes: string | null
          organizer: string | null
          recording_url: string | null
          status: string | null
          time: string | null
          timezone: string | null
          title: string | null
          transcript_url: string | null
          updated_at: string | null
        }
        Insert: {
          attendees?: Json | null
          calendar_event_id?: string | null
          calendar_link?: string | null
          calendar_synced_at?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string | null
          location?: string | null
          meeting_provider?: string | null
          meeting_url?: string | null
          notes?: string | null
          organizer?: string | null
          recording_url?: string | null
          status?: string | null
          time?: string | null
          timezone?: string | null
          title?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Update: {
          attendees?: Json | null
          calendar_event_id?: string | null
          calendar_link?: string | null
          calendar_synced_at?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string | null
          location?: string | null
          meeting_provider?: string | null
          meeting_url?: string | null
          notes?: string | null
          organizer?: string | null
          recording_url?: string | null
          status?: string | null
          time?: string | null
          timezone?: string | null
          title?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_meetings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      crm_overdue_contacts: {
        Row: {
          archived_at: string | null
          archived_reason: string | null
          assigned_to: string | null
          campaign_tag: string | null
          company: string | null
          contact_status: string | null
          created_at: string | null
          days_overdue: number | null
          deal_value: number | null
          email: string | null
          follow_up_date: string | null
          hubspot_id: string | null
          id: string | null
          interest_level: number | null
          last_contact_at: string | null
          linkedin_url: string | null
          manual_entry: boolean | null
          merged_from: Json | null
          name: string | null
          next_activity: string | null
          notes: string | null
          owner_id: string | null
          phone: string | null
          position: string | null
          priority: string | null
          probability: number | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          days_overdue?: never
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          name?: string | null
          next_activity?: string | null
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_reason?: string | null
          assigned_to?: string | null
          campaign_tag?: string | null
          company?: string | null
          contact_status?: string | null
          created_at?: string | null
          days_overdue?: never
          deal_value?: number | null
          email?: string | null
          follow_up_date?: string | null
          hubspot_id?: string | null
          id?: string | null
          interest_level?: number | null
          last_contact_at?: string | null
          linkedin_url?: string | null
          manual_entry?: boolean | null
          merged_from?: Json | null
          name?: string | null
          next_activity?: string | null
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          position?: string | null
          priority?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      crm_pipeline_summary: {
        Row: {
          avg_probability: number | null
          contact_count: number | null
          status: string | null
          total_value: number | null
          weighted_value: number | null
        }
        Relationships: []
      }
      crm_potential_duplicates: {
        Row: {
          contact1_company: string | null
          contact1_email: string | null
          contact1_id: string | null
          contact1_name: string | null
          contact2_company: string | null
          contact2_email: string | null
          contact2_id: string | null
          contact2_name: string | null
          match_type: string | null
        }
        Relationships: []
      }
      crm_tasks_active: {
        Row: {
          assigned_to: string | null
          automation_rule_id: string | null
          category: string | null
          completed_at: string | null
          completed_by: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          due_date: string | null
          id: string | null
          owner: string | null
          owner_name: string | null
          priority: string | null
          source: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          assigned_to?: string | null
          automation_rule_id?: string | null
          category?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          owner?: string | null
          owner_name?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          assigned_to?: string | null
          automation_rule_id?: string | null
          category?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          owner?: string | null
          owner_name?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      documents_expiring_soon: {
        Row: {
          candidate_id: string | null
          candidate_name: string | null
          created_at: string | null
          days_until_expiry: number | null
          document_type: string | null
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          id: string | null
          is_valid: boolean | null
          issue_date: string | null
          notes: string | null
          updated_at: string | null
          uploaded_by: string | null
          urgency_level: string | null
          verification_method: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id?: string | null
          candidate_name?: string | null
          created_at?: string | null
          days_until_expiry?: never
          document_type?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string | null
          is_valid?: never
          issue_date?: string | null
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          urgency_level?: never
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string | null
          candidate_name?: string | null
          created_at?: string | null
          days_until_expiry?: never
          document_type?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string | null
          is_valid?: never
          issue_date?: string | null
          notes?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          urgency_level?: never
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      jobs_needing_candidates: {
        Row: {
          assigned_to: string | null
          assignment_id: string | null
          candidate_count: number | null
          created_at: string | null
          created_by: string | null
          customer_name: string | null
          customer_special_requirements: string | null
          end_date: string | null
          experience_level: string | null
          id: string | null
          language_requirements: string | null
          location: string | null
          period: string | null
          required_certifications: string[] | null
          required_skills: string[] | null
          role: string | null
          selected_count: number | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          urgency: string | null
        }
        Relationships: []
      }
      latest_kpi_dashboard: {
        Row: {
          active_jobs: number | null
          candidates_registered_this_period: number | null
          created_at: string | null
          csat_score: number | null
          documents_expiring_30days: number | null
          documents_expiring_7days: number | null
          expired_documents_count: number | null
          filled_jobs_this_period: number | null
          id: string | null
          incidents_per_100_jobs: number | null
          nps_score: number | null
          open_capa_actions: number | null
          perfect_releases_count: number | null
          releases_with_issues_count: number | null
          releases_without_deficiencies_pct: number | null
          snapshot_date: string | null
          time_to_fill_median_days: number | null
          time_to_fill_p90_days: number | null
        }
        Relationships: []
      }
      leads_secure: {
        Row: {
          company: string | null
          contact: string | null
          email: string | null
          id: string | null
          num_people: string | null
          org_number: string | null
          phone: string | null
          start_date: string | null
          submitted_at: string | null
          work_location: string | null
        }
        Insert: {
          company?: string | null
          contact?: never
          email?: never
          id?: string | null
          num_people?: string | null
          org_number?: string | null
          phone?: never
          start_date?: string | null
          submitted_at?: string | null
          work_location?: string | null
        }
        Update: {
          company?: string | null
          contact?: never
          email?: never
          id?: string | null
          num_people?: string | null
          org_number?: string | null
          phone?: never
          start_date?: string | null
          submitted_at?: string | null
          work_location?: string | null
        }
        Relationships: []
      }
      my_capa_actions: {
        Row: {
          action_number: number | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string | null
          is_overdue: boolean | null
          nc_id: string | null
          nc_number: string | null
          nc_title: string | null
          responsible_user: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capa_action_log_nc_id_fkey"
            columns: ["nc_id"]
            isOneToOne: false
            referencedRelation: "nonconformities"
            referencedColumns: ["nc_id"]
          },
        ]
      }
      pending_candidate_imports: {
        Row: {
          created_at: string | null
          email: string | null
          erfaring: string | null
          id: string | null
          import_id: string | null
          import_source: string | null
          import_type: string | null
          imported_at: string | null
          lokasjon: string | null
          name: string | null
          phone: string | null
          prod_id: string | null
          rolle: string | null
          sertifikater: Json | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          tilgjengelighet: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          erfaring?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          lokasjon?: string | null
          name?: string | null
          phone?: string | null
          prod_id?: string | null
          rolle?: string | null
          sertifikater?: Json | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tilgjengelighet?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          erfaring?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          lokasjon?: string | null
          name?: string | null
          phone?: string | null
          prod_id?: string | null
          rolle?: string | null
          sertifikater?: Json | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tilgjengelighet?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_candidates_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "candidates_secure"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_crm_imports: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string | null
          import_id: string | null
          import_source: string | null
          import_type: string | null
          imported_at: string | null
          name: string | null
          notes: string | null
          phone: string | null
          position: string | null
          prod_id: string | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts_overdue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_overdue_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact1_id"]
          },
          {
            foreignKeyName: "raw_crm_contacts_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "crm_potential_duplicates"
            referencedColumns: ["contact2_id"]
          },
        ]
      }
      pending_customer_imports: {
        Row: {
          adresse: string | null
          created_at: string | null
          epost: string | null
          id: string | null
          import_id: string | null
          import_source: string | null
          import_type: string | null
          imported_at: string | null
          kontaktperson: string | null
          name: string | null
          prod_id: string | null
          status: string | null
          synced_at: string | null
          synced_to_prod: boolean | null
          telefon: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string | null
          epost?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          kontaktperson?: string | null
          name?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          telefon?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string | null
          epost?: string | null
          id?: string | null
          import_id?: string | null
          import_source?: string | null
          import_type?: never
          imported_at?: string | null
          kontaktperson?: string | null
          name?: string | null
          prod_id?: string | null
          status?: string | null
          synced_at?: string | null
          synced_to_prod?: boolean | null
          telefon?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "active_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "archived_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raw_customers_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_email_notifications: {
        Row: {
          candidate_certificates: string | null
          candidate_phone: string | null
          candidate_region: string | null
          email_type: string | null
          error_message: string | null
          id: string | null
          metadata: Json | null
          recipient_email: string | null
          recipient_name: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          success: boolean | null
        }
        Relationships: []
      }
      pending_release_approvals: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approver_role: string | null
          candidate_id: string | null
          candidate_name: string | null
          checklist_notes: string | null
          contract_signed: boolean | null
          created_at: string | null
          customer_name: string | null
          customer_requirements_met: boolean | null
          document_ids: string[] | null
          id: string | null
          id_verified: boolean | null
          job_requirement_id: string | null
          language_requirements_met: boolean | null
          logistics_confirmed: boolean | null
          medical_cert_valid: boolean | null
          package_url: string | null
          pdf_hash: string | null
          pdf_url: string | null
          prepared_at: string | null
          prepared_by: string | null
          references_checked: boolean | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          role: string | null
          start_date: string | null
          status: string | null
          stcw_valid: boolean | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "release_checklists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "job_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "release_checklists_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "jobs_needing_candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      recent_sync_activity: {
        Row: {
          action: string | null
          changes_made: Json | null
          id: string | null
          notes: string | null
          prod_id: string | null
          prod_name: string | null
          raw_id: string | null
          raw_name: string | null
          synced_at: string | null
          synced_by: string | null
          table_name: string | null
        }
        Relationships: []
      }
      role_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assigned_by_name: string | null
          assignment_id: string | null
          email: string | null
          full_name: string | null
          role: string | null
          user_id: string | null
        }
        Relationships: []
      }
      user_access: {
        Row: {
          account_type: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string | null
          phone: string | null
          position: string | null
          roles: string[] | null
          updated_at: string | null
        }
        Relationships: []
      }
      v_expiring_certificates: {
        Row: {
          archived_at: string | null
          cert_class: string | null
          cert_name: string | null
          cert_number: string | null
          cert_type: string | null
          created_at: string | null
          created_by: string | null
          days_until_expiry: number | null
          email: string | null
          employee_id: string | null
          employee_number: string | null
          expires_at: string | null
          expiry_status: string | null
          external_verification_id: string | null
          external_verified_at: string | null
          file_key: string | null
          first_name: string | null
          id: string | null
          issued_date: string | null
          issuing_authority: string | null
          issuing_country: string | null
          last_name: string | null
          updated_at: string | null
          updated_by: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_certificates_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      auto_assign_nc: {
        Args: { nc_id_param: string; nc_type_param: string }
        Returns: string
      }
      create_audit_log: {
        Args: {
          p_action: string
          p_entity_id: string
          p_entity_type: string
          p_metadata?: Json
          p_new_values?: Json
          p_old_values?: Json
        }
        Returns: string
      }
      crm_audit_record: {
        Args: {
          p_action: string
          p_changes?: Json
          p_entity_id?: string
          p_entity_type: string
          p_ip_address?: unknown
          p_metadata?: Json
          p_user_email: string
          p_user_id: string
        }
        Returns: string
      }
      crm_log_audit: {
        Args: {
          p_action: string
          p_contact_id: string
          p_created_by?: string
          p_created_by_name?: string
          p_field_changed?: string
          p_is_sensitive?: boolean
          p_new_value?: string
          p_note?: string
          p_old_value?: string
        }
        Returns: string
      }
      crm_merge_contacts: {
        Args: {
          p_canonical_id: string
          p_dry_run?: boolean
          p_merged_by: string
          p_merged_by_name?: string
          p_secondary_ids: string[]
        }
        Returns: Json
      }
      decrypt_pii: { Args: { ciphertext: string }; Returns: string }
      detect_sync_conflict: {
        Args: { p_prod_id: string; p_raw_id: string; p_table_name: string }
        Returns: string
      }
      encrypt_pii: { Args: { plaintext: string }; Returns: string }
      generate_contract_number:
        | { Args: never; Returns: string }
        | { Args: { p_type: string; p_year?: number }; Returns: string }
      generate_incident_number: { Args: never; Returns: string }
      generate_nc_number: { Args: { p_type: string }; Returns: string }
      get_user_by_role: {
        Args: { target_role: string }
        Returns: {
          email: string
          full_name: string
          user_id: string
        }[]
      }
      get_user_roles: { Args: { check_user_id: string }; Returns: string[] }
      increment_application_count: {
        Args: { posting_id: string }
        Returns: undefined
      }
      log_employee_audit: {
        Args: {
          p_action: string
          p_changed_fields: string[]
          p_entity_id: string
          p_entity_type: string
          p_new_values: Json
          p_notes?: string
          p_old_values: Json
          p_performed_by: string
          p_performed_by_email?: string
        }
        Returns: string
      }
      mark_raw_synced: {
        Args: {
          p_prod_id: string
          p_raw_id: string
          p_synced_by: string
          p_table_name: string
        }
        Returns: undefined
      }
      normalize_email: { Args: { email: string }; Returns: string }
      normalize_phone: { Args: { phone: string }; Returns: string }
      send_status_email: {
        Args: {
          p_email: string
          p_name: string
          p_status: string
          p_type?: string
        }
        Returns: string
      }
      user_has_role: {
        Args: { check_role: string; check_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const


// Convenience type aliases
export type JobPosting = Database["public"]["Tables"]["job_postings"]["Row"];
export type JobPostingInsert = Database["public"]["Tables"]["job_postings"]["Insert"];
export type JobApplication = Database["public"]["Tables"]["job_applications"]["Row"];
export type JobApplicationInsert = Database["public"]["Tables"]["job_applications"]["Insert"];
export type Candidate = Database["public"]["Tables"]["candidates"]["Row"];
