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
      activity_log: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_name: string | null
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          request_id: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          request_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          request_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_timesheets: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          assignment_id: string
          calculated_billing_nok: number | null
          calculated_employee_cost_nok: number | null
          calculated_margin_nok: number | null
          created_at: string | null
          entries: Json | null
          id: string
          invoice_id: string | null
          period_end: string
          period_start: string
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["timesheet_status"] | null
          submitted_at: string | null
          submitted_by: string | null
          total_days: number | null
          total_hours: number | null
          total_hours_overtime: number | null
          updated_at: string | null
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          assignment_id: string
          calculated_billing_nok?: number | null
          calculated_employee_cost_nok?: number | null
          calculated_margin_nok?: number | null
          created_at?: string | null
          entries?: Json | null
          id?: string
          invoice_id?: string | null
          period_end: string
          period_start: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["timesheet_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          total_days?: number | null
          total_hours?: number | null
          total_hours_overtime?: number | null
          updated_at?: string | null
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: string
          calculated_billing_nok?: number | null
          calculated_employee_cost_nok?: number | null
          calculated_margin_nok?: number | null
          created_at?: string | null
          entries?: Json | null
          id?: string
          invoice_id?: string | null
          period_end?: string
          period_start?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["timesheet_status"] | null
          submitted_at?: string | null
          submitted_by?: string | null
          total_days?: number | null
          total_hours?: number | null
          total_hours_overtime?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_timesheets_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_timesheets_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_timesheets_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_timesheets_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_timesheets_invoice"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          archived_at: string | null
          assignment_number: string
          billing_rate_amount_nok: number | null
          billing_rate_type: string | null
          candidate_id: string
          client_notes: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          employee_rate_amount_nok: number | null
          employee_rate_type: string | null
          id: string
          internal_notes: string | null
          organization_id: string
          overtime_rate_multiplier: number | null
          owner_id: string | null
          planned_end_date: string | null
          planned_start_date: string
          release_checklist: Json | null
          request_id: string | null
          role: string
          status: Database["public"]["Enums"]["assignment_status"] | null
          title: string
          updated_at: string | null
          updated_by: string | null
          vessel_imo: string | null
          vessel_name: string | null
          work_location: string | null
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          archived_at?: string | null
          assignment_number: string
          billing_rate_amount_nok?: number | null
          billing_rate_type?: string | null
          candidate_id: string
          client_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employee_rate_amount_nok?: number | null
          employee_rate_type?: string | null
          id?: string
          internal_notes?: string | null
          organization_id: string
          overtime_rate_multiplier?: number | null
          owner_id?: string | null
          planned_end_date?: string | null
          planned_start_date: string
          release_checklist?: Json | null
          request_id?: string | null
          role: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          vessel_imo?: string | null
          vessel_name?: string | null
          work_location?: string | null
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          archived_at?: string | null
          assignment_number?: string
          billing_rate_amount_nok?: number | null
          billing_rate_type?: string | null
          candidate_id?: string
          client_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employee_rate_amount_nok?: number | null
          employee_rate_type?: string | null
          id?: string
          internal_notes?: string | null
          organization_id?: string
          overtime_rate_multiplier?: number | null
          owner_id?: string | null
          planned_end_date?: string | null
          planned_start_date?: string
          release_checklist?: Json | null
          request_id?: string | null
          role?: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          vessel_imo?: string | null
          vessel_name?: string | null
          work_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "customer_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bluecrew_profiles: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          cv_key: string
          cv_uploaded_at: string | null
          date_of_birth: string | null
          email: string
          experience_years: number | null
          first_name: string
          gdpr_consent: boolean
          gdpr_consent_date: string | null
          id: string
          last_name: string
          national_id_number: string | null
          phone: string
          primary_role: string
          secondary_roles: string[] | null
          short_id: string | null
          status: string | null
          stcw_consent: boolean | null
          stcw_consent_date: string | null
          updated_at: string | null
          verified_at: string
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          cv_key: string
          cv_uploaded_at?: string | null
          date_of_birth?: string | null
          email: string
          experience_years?: number | null
          first_name: string
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          id?: string
          last_name: string
          national_id_number?: string | null
          phone: string
          primary_role: string
          secondary_roles?: string[] | null
          short_id?: string | null
          status?: string | null
          stcw_consent?: boolean | null
          stcw_consent_date?: string | null
          updated_at?: string | null
          verified_at?: string
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          cv_key?: string
          cv_uploaded_at?: string | null
          date_of_birth?: string | null
          email?: string
          experience_years?: number | null
          first_name?: string
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          id?: string
          last_name?: string
          national_id_number?: string | null
          phone?: string
          primary_role?: string
          secondary_roles?: string[] | null
          short_id?: string | null
          status?: string | null
          stcw_consent?: boolean | null
          stcw_consent_date?: string | null
          updated_at?: string | null
          verified_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bluecrew_profiles_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_applications: {
        Row: {
          campaign: string | null
          candidate_id: string | null
          created_at: string
          cv_filename: string | null
          cv_url: string | null
          email: string
          gdpr_consent: boolean
          gdpr_consent_date: string | null
          id: string
          marketing_consent: boolean | null
          name: string
          notes: string | null
          phone: string
          position: string
          segment: string
          source_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          campaign?: string | null
          candidate_id?: string | null
          created_at?: string
          cv_filename?: string | null
          cv_url?: string | null
          email: string
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          id?: string
          marketing_consent?: boolean | null
          name: string
          notes?: string | null
          phone: string
          position: string
          segment: string
          source_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          campaign?: string | null
          candidate_id?: string | null
          created_at?: string
          cv_filename?: string | null
          cv_url?: string | null
          email?: string
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          id?: string
          marketing_consent?: boolean | null
          name?: string
          notes?: string | null
          phone?: string
          position?: string
          segment?: string
          source_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_certifications: {
        Row: {
          candidate_id: string
          category: Database["public"]["Enums"]["certification_category"]
          certificate_number: string | null
          code: string
          created_at: string | null
          document_path: string | null
          document_verified: boolean | null
          expiry_date: string | null
          id: string
          is_permanent: boolean | null
          issue_date: string | null
          issuer: string | null
          issuer_country: string | null
          name: string
          notes: string | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id: string
          category: Database["public"]["Enums"]["certification_category"]
          certificate_number?: string | null
          code: string
          created_at?: string | null
          document_path?: string | null
          document_verified?: boolean | null
          expiry_date?: string | null
          id?: string
          is_permanent?: boolean | null
          issue_date?: string | null
          issuer?: string | null
          issuer_country?: string | null
          name: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string
          category?: Database["public"]["Enums"]["certification_category"]
          certificate_number?: string | null
          code?: string
          created_at?: string | null
          document_path?: string | null
          document_verified?: boolean | null
          expiry_date?: string | null
          id?: string
          is_permanent?: boolean | null
          issue_date?: string | null
          issuer?: string | null
          issuer_country?: string | null
          name?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_certifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_documents: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          candidate_id: string
          description: string | null
          document_number: string | null
          expiry_date: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_current: boolean | null
          issue_date: string | null
          mime_type: string | null
          name: string
          previous_version_id: string | null
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at: string | null
          uploaded_by: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
          version: number | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          candidate_id: string
          description?: string | null
          document_number?: string | null
          expiry_date?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_current?: boolean | null
          issue_date?: string | null
          mime_type?: string | null
          name: string
          previous_version_id?: string | null
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string | null
          uploaded_by?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          candidate_id?: string
          description?: string | null
          document_number?: string | null
          expiry_date?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_current?: boolean | null
          issue_date?: string | null
          mime_type?: string | null
          name?: string
          previous_version_id?: string | null
          type?: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string | null
          uploaded_by?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_documents_archived_by_fkey"
            columns: ["archived_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_documents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_documents_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "candidate_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_pool_memberships: {
        Row: {
          added_at: string | null
          added_by: string | null
          candidate_id: string
          id: string
          notes: string | null
          pool_id: string
        }
        Insert: {
          added_at?: string | null
          added_by?: string | null
          candidate_id: string
          id?: string
          notes?: string | null
          pool_id: string
        }
        Update: {
          added_at?: string | null
          added_by?: string | null
          candidate_id?: string
          id?: string
          notes?: string | null
          pool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_pool_memberships_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pool_memberships_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pool_memberships_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "candidate_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_pools: {
        Row: {
          archived_at: string | null
          candidate_count: number | null
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          filter_criteria: Json | null
          icon: string | null
          id: string
          is_system: boolean | null
          is_visible: boolean | null
          last_calculated_at: string | null
          name: string
          pool_type: string
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          candidate_count?: number | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          filter_criteria?: Json | null
          icon?: string | null
          id?: string
          is_system?: boolean | null
          is_visible?: boolean | null
          last_calculated_at?: string | null
          name: string
          pool_type?: string
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          candidate_count?: number | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          filter_criteria?: Json | null
          icon?: string | null
          id?: string
          is_system?: boolean | null
          is_visible?: boolean | null
          last_calculated_at?: string | null
          name?: string
          pool_type?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_pools_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_search_index: {
        Row: {
          active_certifications: string[] | null
          availability_date: string | null
          availability_status:
            | Database["public"]["Enums"]["availability_status"]
            | null
          candidate_id: string
          certification_codes: string[] | null
          certification_expiry_map: Json | null
          compliance_status:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          email: string
          experience_years: number | null
          full_name: string
          fylke: string | null
          indexed_at: string | null
          internal_rating: number | null
          kommune: string | null
          languages: string[] | null
          next_cert_expiry: string | null
          phone: string | null
          pool_ids: string[] | null
          profile_completeness: number | null
          roles: string[]
          searchable_text: unknown
          sectors: string[] | null
          tags: string[] | null
        }
        Insert: {
          active_certifications?: string[] | null
          availability_date?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          candidate_id: string
          certification_codes?: string[] | null
          certification_expiry_map?: Json | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          email: string
          experience_years?: number | null
          full_name: string
          fylke?: string | null
          indexed_at?: string | null
          internal_rating?: number | null
          kommune?: string | null
          languages?: string[] | null
          next_cert_expiry?: string | null
          phone?: string | null
          pool_ids?: string[] | null
          profile_completeness?: number | null
          roles?: string[]
          searchable_text?: unknown
          sectors?: string[] | null
          tags?: string[] | null
        }
        Update: {
          active_certifications?: string[] | null
          availability_date?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          candidate_id?: string
          certification_codes?: string[] | null
          certification_expiry_map?: Json | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          email?: string
          experience_years?: number | null
          full_name?: string
          fylke?: string | null
          indexed_at?: string | null
          internal_rating?: number | null
          kommune?: string | null
          languages?: string[] | null
          next_cert_expiry?: string | null
          phone?: string | null
          pool_ids?: string[] | null
          profile_completeness?: number | null
          roles?: string[]
          searchable_text?: unknown
          sectors?: string[] | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_search_index_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          address_city: string | null
          archived_at: string | null
          archived_by: string | null
          archived_reason: string | null
          availability_date: string | null
          availability_notes: string | null
          availability_status:
            | Database["public"]["Enums"]["availability_status"]
            | null
          availability_updated_at: string | null
          avatar_url: string | null
          compliance_checked_at: string | null
          compliance_checked_by: string | null
          compliance_expires_at: string | null
          compliance_notes: string | null
          compliance_status:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          created_at: string | null
          created_by: string | null
          cv_file_path: string | null
          cv_key: string | null
          cv_summary: string | null
          display_name: string | null
          email: string
          experience_details: Json | null
          experience_years: number | null
          first_name: string | null
          gdpr_consent: boolean | null
          gdpr_consent_date: string | null
          id: string
          internal_notes: string | null
          internal_rating: number | null
          languages: Json | null
          last_name: string | null
          legacy_id: string | null
          legacy_source: string | null
          location_preferred_regions: string[] | null
          location_willing_to_relocate: boolean | null
          name: string | null
          national_id_number: string | null
          phone: string | null
          pipeline_stage: string | null
          primary_role: string | null
          profile_completeness: number | null
          referred_by: string | null
          rotation_flexible: boolean | null
          rotation_max_weeks_on: number | null
          rotation_min_weeks_off: number | null
          rotation_preferred: string[] | null
          salary_min_monthly_nok: number | null
          salary_negotiable: boolean | null
          salary_preferred_monthly_nok: number | null
          secondary_roles: string[] | null
          sectors: string[] | null
          source: string | null
          source_details: Json | null
          status: string | null
          stcw_consent: boolean | null
          stcw_consent_date: string | null
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
          user_id: string | null
          vipps_sub: string | null
          vipps_verified: boolean | null
          vipps_verified_at: string | null
        }
        Insert: {
          address_city?: string | null
          archived_at?: string | null
          archived_by?: string | null
          archived_reason?: string | null
          availability_date?: string | null
          availability_notes?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          availability_updated_at?: string | null
          avatar_url?: string | null
          compliance_checked_at?: string | null
          compliance_checked_by?: string | null
          compliance_expires_at?: string | null
          compliance_notes?: string | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          created_at?: string | null
          created_by?: string | null
          cv_file_path?: string | null
          cv_key?: string | null
          cv_summary?: string | null
          display_name?: string | null
          email: string
          experience_details?: Json | null
          experience_years?: number | null
          first_name?: string | null
          gdpr_consent?: boolean | null
          gdpr_consent_date?: string | null
          id?: string
          internal_notes?: string | null
          internal_rating?: number | null
          languages?: Json | null
          last_name?: string | null
          legacy_id?: string | null
          legacy_source?: string | null
          location_preferred_regions?: string[] | null
          location_willing_to_relocate?: boolean | null
          name?: string | null
          national_id_number?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          primary_role?: string | null
          profile_completeness?: number | null
          referred_by?: string | null
          rotation_flexible?: boolean | null
          rotation_max_weeks_on?: number | null
          rotation_min_weeks_off?: number | null
          rotation_preferred?: string[] | null
          salary_min_monthly_nok?: number | null
          salary_negotiable?: boolean | null
          salary_preferred_monthly_nok?: number | null
          secondary_roles?: string[] | null
          sectors?: string[] | null
          source?: string | null
          source_details?: Json | null
          status?: string | null
          stcw_consent?: boolean | null
          stcw_consent_date?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          vipps_sub?: string | null
          vipps_verified?: boolean | null
          vipps_verified_at?: string | null
        }
        Update: {
          address_city?: string | null
          archived_at?: string | null
          archived_by?: string | null
          archived_reason?: string | null
          availability_date?: string | null
          availability_notes?: string | null
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          availability_updated_at?: string | null
          avatar_url?: string | null
          compliance_checked_at?: string | null
          compliance_checked_by?: string | null
          compliance_expires_at?: string | null
          compliance_notes?: string | null
          compliance_status?:
            | Database["public"]["Enums"]["compliance_status"]
            | null
          created_at?: string | null
          created_by?: string | null
          cv_file_path?: string | null
          cv_key?: string | null
          cv_summary?: string | null
          display_name?: string | null
          email?: string
          experience_details?: Json | null
          experience_years?: number | null
          first_name?: string | null
          gdpr_consent?: boolean | null
          gdpr_consent_date?: string | null
          id?: string
          internal_notes?: string | null
          internal_rating?: number | null
          languages?: Json | null
          last_name?: string | null
          legacy_id?: string | null
          legacy_source?: string | null
          location_preferred_regions?: string[] | null
          location_willing_to_relocate?: boolean | null
          name?: string | null
          national_id_number?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          primary_role?: string | null
          profile_completeness?: number | null
          referred_by?: string | null
          rotation_flexible?: boolean | null
          rotation_max_weeks_on?: number | null
          rotation_min_weeks_off?: number | null
          rotation_preferred?: string[] | null
          salary_min_monthly_nok?: number | null
          salary_negotiable?: boolean | null
          salary_preferred_monthly_nok?: number | null
          secondary_roles?: string[] | null
          sectors?: string[] | null
          source?: string | null
          source_details?: Json | null
          status?: string | null
          stcw_consent?: boolean | null
          stcw_consent_date?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          vipps_sub?: string | null
          vipps_verified?: boolean | null
          vipps_verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_archived_by_fkey"
            columns: ["archived_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_compliance_checked_by_fkey"
            columns: ["compliance_checked_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          epost: string
          id: string
          melding: string
          metadata: Json | null
          navn: string
          status: string | null
          telefon: string | null
        }
        Insert: {
          created_at?: string | null
          epost: string
          id?: string
          melding: string
          metadata?: Json | null
          navn: string
          status?: string | null
          telefon?: string | null
        }
        Update: {
          created_at?: string | null
          epost?: string
          id?: string
          melding?: string
          metadata?: Json | null
          navn?: string
          status?: string | null
          telefon?: string | null
        }
        Relationships: []
      }
      contract_parties: {
        Row: {
          contract_id: string
          created_at: string | null
          email: string
          id: string
          name: string
          national_id: string | null
          organization_name: string | null
          organization_number: string | null
          party_type: string
          phone: string | null
          signature_ip: string | null
          signature_method: string | null
          signed_at: string | null
          signing_order: number | null
          status: string | null
        }
        Insert: {
          contract_id: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          national_id?: string | null
          organization_name?: string | null
          organization_number?: string | null
          party_type: string
          phone?: string | null
          signature_ip?: string | null
          signature_method?: string | null
          signed_at?: string | null
          signing_order?: number | null
          status?: string | null
        }
        Update: {
          contract_id?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          national_id?: string | null
          organization_name?: string | null
          organization_number?: string | null
          party_type?: string
          phone?: string | null
          signature_ip?: string | null
          signature_method?: string | null
          signed_at?: string | null
          signing_order?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_parties_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          archived_at: string | null
          assignment_id: string | null
          candidate_id: string | null
          content_html: string | null
          contract_number: string
          created_at: string | null
          created_by: string | null
          description: string | null
          draft_pdf_path: string | null
          esign_expires_at: string | null
          esign_provider: string | null
          esign_request_id: string | null
          esign_status: string | null
          esign_url: string | null
          id: string
          internal_notes: string | null
          organization_id: string | null
          signed_at: string | null
          signed_pdf_path: string | null
          status: Database["public"]["Enums"]["contract_status"] | null
          template_id: string | null
          template_version: number | null
          title: string
          type: Database["public"]["Enums"]["contract_type"]
          updated_at: string | null
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
          variables: Json | null
        }
        Insert: {
          archived_at?: string | null
          assignment_id?: string | null
          candidate_id?: string | null
          content_html?: string | null
          contract_number: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          draft_pdf_path?: string | null
          esign_expires_at?: string | null
          esign_provider?: string | null
          esign_request_id?: string | null
          esign_status?: string | null
          esign_url?: string | null
          id?: string
          internal_notes?: string | null
          organization_id?: string | null
          signed_at?: string | null
          signed_pdf_path?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          template_id?: string | null
          template_version?: number | null
          title: string
          type: Database["public"]["Enums"]["contract_type"]
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
          variables?: Json | null
        }
        Update: {
          archived_at?: string | null
          assignment_id?: string | null
          candidate_id?: string | null
          content_html?: string | null
          contract_number?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          draft_pdf_path?: string | null
          esign_expires_at?: string | null
          esign_provider?: string | null
          esign_request_id?: string | null
          esign_status?: string | null
          esign_url?: string | null
          id?: string
          internal_notes?: string | null
          organization_id?: string | null
          signed_at?: string | null
          signed_pdf_path?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          template_id?: string | null
          template_version?: number | null
          title?: string
          type?: Database["public"]["Enums"]["contract_type"]
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
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
            foreignKeyName: "contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_activities: {
        Row: {
          assignment_id: string | null
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          description: string | null
          duration_minutes: number | null
          email_message_id: string | null
          id: string
          organization_id: string | null
          outcome: string | null
          participants: string[] | null
          performed_at: string | null
          performed_by: string | null
          request_id: string | null
          subject: string | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          assignment_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          email_message_id?: string | null
          id?: string
          organization_id?: string | null
          outcome?: string | null
          participants?: string[] | null
          performed_at?: string | null
          performed_by?: string | null
          request_id?: string | null
          subject?: string | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          assignment_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          email_message_id?: string | null
          id?: string
          organization_id?: string | null
          outcome?: string | null
          participants?: string[] | null
          performed_at?: string | null
          performed_by?: string | null
          request_id?: string | null
          subject?: string | null
          type?: Database["public"]["Enums"]["activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_activities_assignment"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_activities_request"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "customer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          email: string | null
          first_name: string
          id: string
          is_billing_contact: boolean | null
          is_decision_maker: boolean | null
          is_operational_contact: boolean | null
          is_primary: boolean | null
          job_title: string | null
          language: string | null
          last_name: string
          linkedin_url: string | null
          mobile: string | null
          notes: string | null
          organization_id: string
          phone: string | null
          preferred_contact_method: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          is_billing_contact?: boolean | null
          is_decision_maker?: boolean | null
          is_operational_contact?: boolean | null
          is_primary?: boolean | null
          job_title?: string | null
          language?: string | null
          last_name: string
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          organization_id: string
          phone?: string | null
          preferred_contact_method?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          is_billing_contact?: boolean | null
          is_decision_maker?: boolean | null
          is_operational_contact?: boolean | null
          is_primary?: boolean | null
          job_title?: string | null
          language?: string | null
          last_name?: string
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          organization_id?: string
          phone?: string | null
          preferred_contact_method?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_archived_by_fkey"
            columns: ["archived_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contacts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deals: {
        Row: {
          actual_close_date: string | null
          archived_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          description: string | null
          expected_close_date: string | null
          id: string
          lost_at: string | null
          lost_reason: string | null
          notes: string | null
          organization_id: string
          owner_id: string | null
          probability: number | null
          stage: Database["public"]["Enums"]["deal_stage"] | null
          title: string
          updated_at: string | null
          updated_by: string | null
          value_nok: number | null
          won_at: string | null
        }
        Insert: {
          actual_close_date?: string | null
          archived_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          lost_at?: string | null
          lost_reason?: string | null
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          value_nok?: number | null
          won_at?: string | null
        }
        Update: {
          actual_close_date?: string | null
          archived_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          lost_at?: string | null
          lost_reason?: string | null
          notes?: string | null
          organization_id?: string
          owner_id?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          value_nok?: number | null
          won_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_organizations: {
        Row: {
          address_city: string | null
          address_country: string | null
          address_postal_code: string | null
          address_street: string | null
          archived_at: string | null
          archived_by: string | null
          company_size: string | null
          created_at: string | null
          created_by: string | null
          customer_type: string | null
          email: string | null
          estimated_annual_value_nok: number | null
          id: string
          industry: string | null
          lifetime_value_nok: number | null
          logo_url: string | null
          name: string
          notes: string | null
          org_number: string | null
          outstanding_amount_nok: number | null
          owner_id: string | null
          phone: string | null
          pipeline_entered_at: string | null
          pipeline_lost_at: string | null
          pipeline_lost_reason: string | null
          pipeline_stage: Database["public"]["Enums"]["pipeline_stage"] | null
          pipeline_won_at: string | null
          preferences: Json | null
          stats: Json | null
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
          website: string | null
        }
        Insert: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_street?: string | null
          archived_at?: string | null
          archived_by?: string | null
          company_size?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_type?: string | null
          email?: string | null
          estimated_annual_value_nok?: number | null
          id?: string
          industry?: string | null
          lifetime_value_nok?: number | null
          logo_url?: string | null
          name: string
          notes?: string | null
          org_number?: string | null
          outstanding_amount_nok?: number | null
          owner_id?: string | null
          phone?: string | null
          pipeline_entered_at?: string | null
          pipeline_lost_at?: string | null
          pipeline_lost_reason?: string | null
          pipeline_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
          pipeline_won_at?: string | null
          preferences?: Json | null
          stats?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
        }
        Update: {
          address_city?: string | null
          address_country?: string | null
          address_postal_code?: string | null
          address_street?: string | null
          archived_at?: string | null
          archived_by?: string | null
          company_size?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_type?: string | null
          email?: string | null
          estimated_annual_value_nok?: number | null
          id?: string
          industry?: string | null
          lifetime_value_nok?: number | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          org_number?: string | null
          outstanding_amount_nok?: number | null
          owner_id?: string | null
          phone?: string | null
          pipeline_entered_at?: string | null
          pipeline_lost_at?: string | null
          pipeline_lost_reason?: string | null
          pipeline_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
          pipeline_won_at?: string | null
          preferences?: Json | null
          stats?: Json | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_organizations_archived_by_fkey"
            columns: ["archived_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          completed_by: string | null
          completion_notes: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          id: string
          organization_id: string | null
          priority: string | null
          reminder_at: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          completion_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          organization_id?: string | null
          priority?: string | null
          reminder_at?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          completion_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          organization_id?: string | null
          priority?: string | null
          reminder_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
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
            foreignKeyName: "crm_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_requests: {
        Row: {
          archived_at: string | null
          budget_max_daily_nok: number | null
          budget_max_monthly_nok: number | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_type: string | null
          end_date: string | null
          estimated_value_nok: number | null
          id: string
          match_count: number | null
          matched_at: string | null
          matched_by: string | null
          notes: string | null
          organization_id: string
          owner_id: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          quantity: number | null
          request_number: string
          requirements: Json | null
          role_needed: string
          start_date: string
          status: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at: string | null
          updated_by: string | null
          vessel_name: string | null
          vessel_type: string | null
          work_location: string | null
        }
        Insert: {
          archived_at?: string | null
          budget_max_daily_nok?: number | null
          budget_max_monthly_nok?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_type?: string | null
          end_date?: string | null
          estimated_value_nok?: number | null
          id?: string
          match_count?: number | null
          matched_at?: string | null
          matched_by?: string | null
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          quantity?: number | null
          request_number: string
          requirements?: Json | null
          role_needed: string
          start_date: string
          status?: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          vessel_name?: string | null
          vessel_type?: string | null
          work_location?: string | null
        }
        Update: {
          archived_at?: string | null
          budget_max_daily_nok?: number | null
          budget_max_monthly_nok?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_type?: string | null
          end_date?: string | null
          estimated_value_nok?: number | null
          id?: string
          match_count?: number | null
          matched_at?: string | null
          matched_by?: string | null
          notes?: string | null
          organization_id?: string
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          quantity?: number | null
          request_number?: string
          requirements?: Json | null
          role_needed?: string
          start_date?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          vessel_name?: string | null
          vessel_type?: string | null
          work_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_requests_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_requests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_requests_matched_by_fkey"
            columns: ["matched_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_requests_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_requests_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_requests_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_lines: {
        Row: {
          amount_nok: number
          assignment_id: string | null
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number
          sort_order: number | null
          timesheet_id: string | null
          unit: string | null
          unit_price_nok: number
        }
        Insert: {
          amount_nok: number
          assignment_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity: number
          sort_order?: number | null
          timesheet_id?: string | null
          unit?: string | null
          unit_price_nok: number
        }
        Update: {
          amount_nok?: number
          assignment_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          sort_order?: number | null
          timesheet_id?: string | null
          unit?: string | null
          unit_price_nok?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_lines_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_lines_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_lines_timesheet_id_fkey"
            columns: ["timesheet_id"]
            isOneToOne: false
            referencedRelation: "assignment_timesheets"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          credit_for_invoice_id: string | null
          currency: string | null
          due_date: string
          id: string
          internal_notes: string | null
          invoice_date: string
          invoice_number: string
          invoice_type: string | null
          notes: string | null
          organization_id: string
          paid_amount_nok: number | null
          paid_at: string | null
          payment_reference: string | null
          pdf_path: string | null
          period_end: string | null
          period_start: string | null
          sent_at: string | null
          sent_by: string | null
          status: string | null
          subtotal_nok: number
          total_nok: number
          tripletex_id: string | null
          tripletex_synced_at: string | null
          updated_at: string | null
          vat_amount_nok: number | null
          vat_rate: number | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_for_invoice_id?: string | null
          currency?: string | null
          due_date: string
          id?: string
          internal_notes?: string | null
          invoice_date?: string
          invoice_number: string
          invoice_type?: string | null
          notes?: string | null
          organization_id: string
          paid_amount_nok?: number | null
          paid_at?: string | null
          payment_reference?: string | null
          pdf_path?: string | null
          period_end?: string | null
          period_start?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string | null
          subtotal_nok: number
          total_nok: number
          tripletex_id?: string | null
          tripletex_synced_at?: string | null
          updated_at?: string | null
          vat_amount_nok?: number | null
          vat_rate?: number | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_for_invoice_id?: string | null
          currency?: string | null
          due_date?: string
          id?: string
          internal_notes?: string | null
          invoice_date?: string
          invoice_number?: string
          invoice_type?: string | null
          notes?: string | null
          organization_id?: string
          paid_amount_nok?: number | null
          paid_at?: string | null
          payment_reference?: string | null
          pdf_path?: string | null
          period_end?: string | null
          period_start?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string | null
          subtotal_nok?: number
          total_nok?: number
          tripletex_id?: string | null
          tripletex_synced_at?: string | null
          updated_at?: string | null
          vat_amount_nok?: number | null
          vat_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_credit_for_invoice_id_fkey"
            columns: ["credit_for_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          candidate_id: string | null
          certificates_key: string | null
          cover_letter: string | null
          created_at: string | null
          cv_key: string | null
          email: string
          id: string
          ip_address: string | null
          job_posting_id: string | null
          name: string
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          user_agent: string | null
          vipps_name: string | null
          vipps_phone: string | null
          vipps_sub: string | null
          vipps_verified: boolean | null
          vipps_verified_at: string | null
        }
        Insert: {
          candidate_id?: string | null
          certificates_key?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_key?: string | null
          email: string
          id?: string
          ip_address?: string | null
          job_posting_id?: string | null
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          vipps_name?: string | null
          vipps_phone?: string | null
          vipps_sub?: string | null
          vipps_verified?: boolean | null
          vipps_verified_at?: string | null
        }
        Update: {
          candidate_id?: string | null
          certificates_key?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_key?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          job_posting_id?: string | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          vipps_name?: string | null
          vipps_phone?: string | null
          vipps_sub?: string | null
          vipps_verified?: boolean | null
          vipps_verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
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
          application_deadline: string | null
          applications_count: number | null
          category: string | null
          company_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          fylke: string | null
          id: string
          job_type: string | null
          kommune: string | null
          location: string | null
          meta_description: string | null
          meta_title: string | null
          metadata: Json | null
          published_at: string | null
          region: string | null
          requirements: Json | null
          role: string | null
          rotation: string | null
          salary_max: number | null
          salary_min: number | null
          salary_range: string | null
          salary_text: string | null
          short_description: string | null
          slug: string | null
          status: string | null
          title: string
          updated_at: string | null
          vessel_type: string | null
          views_count: number | null
        }
        Insert: {
          application_deadline?: string | null
          applications_count?: number | null
          category?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          fylke?: string | null
          id?: string
          job_type?: string | null
          kommune?: string | null
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          metadata?: Json | null
          published_at?: string | null
          region?: string | null
          requirements?: Json | null
          role?: string | null
          rotation?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_range?: string | null
          salary_text?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          vessel_type?: string | null
          views_count?: number | null
        }
        Update: {
          application_deadline?: string | null
          applications_count?: number | null
          category?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          fylke?: string | null
          id?: string
          job_type?: string | null
          kommune?: string | null
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          metadata?: Json | null
          published_at?: string | null
          region?: string | null
          requirements?: Json | null
          role?: string | null
          rotation?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_range?: string | null
          salary_text?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          vessel_type?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      qms_capa_actions: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          completion_notes: string | null
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          nonconformity_id: string
          responsible_id: string | null
          status: Database["public"]["Enums"]["capa_status"] | null
          type: Database["public"]["Enums"]["capa_type"]
          updated_at: string | null
          verification_effective: boolean | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          nonconformity_id: string
          responsible_id?: string | null
          status?: Database["public"]["Enums"]["capa_status"] | null
          type: Database["public"]["Enums"]["capa_type"]
          updated_at?: string | null
          verification_effective?: boolean | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          nonconformity_id?: string
          responsible_id?: string | null
          status?: Database["public"]["Enums"]["capa_status"] | null
          type?: Database["public"]["Enums"]["capa_type"]
          updated_at?: string | null
          verification_effective?: boolean | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qms_capa_actions_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_capa_actions_nonconformity_id_fkey"
            columns: ["nonconformity_id"]
            isOneToOne: false
            referencedRelation: "qms_nonconformities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_capa_actions_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_capa_actions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      qms_document_versions: {
        Row: {
          change_description: string | null
          content_html: string | null
          created_at: string | null
          created_by: string | null
          document_id: string
          file_path: string | null
          id: string
          version: number
        }
        Insert: {
          change_description?: string | null
          content_html?: string | null
          created_at?: string | null
          created_by?: string | null
          document_id: string
          file_path?: string | null
          id?: string
          version: number
        }
        Update: {
          change_description?: string | null
          content_html?: string | null
          created_at?: string | null
          created_by?: string | null
          document_id?: string
          file_path?: string | null
          id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "qms_document_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "qms_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      qms_documents: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          archived_at: string | null
          content_html: string | null
          created_at: string | null
          created_by: string | null
          current_version: number | null
          description: string | null
          document_number: string
          file_path: string | null
          id: string
          last_reviewed_at: string | null
          last_reviewed_by: string | null
          next_review_date: string | null
          owner_id: string | null
          status: Database["public"]["Enums"]["qms_document_status"] | null
          title: string
          type: Database["public"]["Enums"]["qms_document_type"]
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
          content_html?: string | null
          created_at?: string | null
          created_by?: string | null
          current_version?: number | null
          description?: string | null
          document_number: string
          file_path?: string | null
          id?: string
          last_reviewed_at?: string | null
          last_reviewed_by?: string | null
          next_review_date?: string | null
          owner_id?: string | null
          status?: Database["public"]["Enums"]["qms_document_status"] | null
          title: string
          type: Database["public"]["Enums"]["qms_document_type"]
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
          content_html?: string | null
          created_at?: string | null
          created_by?: string | null
          current_version?: number | null
          description?: string | null
          document_number?: string
          file_path?: string | null
          id?: string
          last_reviewed_at?: string | null
          last_reviewed_by?: string | null
          next_review_date?: string | null
          owner_id?: string | null
          status?: Database["public"]["Enums"]["qms_document_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["qms_document_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qms_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_last_reviewed_by_fkey"
            columns: ["last_reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      qms_nonconformities: {
        Row: {
          closed_at: string | null
          closed_by: string | null
          closure_notes: string | null
          created_at: string | null
          created_by: string | null
          description: string
          due_date: string | null
          id: string
          immediate_action: string | null
          immediate_action_at: string | null
          nc_number: string
          related_assignment_id: string | null
          related_candidate_id: string | null
          related_organization_id: string | null
          responsible_id: string | null
          root_cause: string | null
          severity: Database["public"]["Enums"]["nc_severity"] | null
          source: string
          status: Database["public"]["Enums"]["nc_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          due_date?: string | null
          id?: string
          immediate_action?: string | null
          immediate_action_at?: string | null
          nc_number: string
          related_assignment_id?: string | null
          related_candidate_id?: string | null
          related_organization_id?: string | null
          responsible_id?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["nc_severity"] | null
          source: string
          status?: Database["public"]["Enums"]["nc_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          due_date?: string | null
          id?: string
          immediate_action?: string | null
          immediate_action_at?: string | null
          nc_number?: string
          related_assignment_id?: string | null
          related_candidate_id?: string | null
          related_organization_id?: string | null
          responsible_id?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["nc_severity"] | null
          source?: string
          status?: Database["public"]["Enums"]["nc_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qms_nonconformities_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_nonconformities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_nonconformities_related_assignment_id_fkey"
            columns: ["related_assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_nonconformities_related_candidate_id_fkey"
            columns: ["related_candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_nonconformities_related_organization_id_fkey"
            columns: ["related_organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_nonconformities_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      qms_risks: {
        Row: {
          category: Database["public"]["Enums"]["risk_category"]
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          impact: number | null
          likelihood: number | null
          mitigation_strategy: string | null
          next_review_date: string | null
          owner_id: string | null
          residual_impact: number | null
          residual_likelihood: number | null
          residual_risk_score: number | null
          risk_number: string
          risk_score: number | null
          status: Database["public"]["Enums"]["risk_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          impact?: number | null
          likelihood?: number | null
          mitigation_strategy?: string | null
          next_review_date?: string | null
          owner_id?: string | null
          residual_impact?: number | null
          residual_likelihood?: number | null
          residual_risk_score?: number | null
          risk_number: string
          risk_score?: number | null
          status?: Database["public"]["Enums"]["risk_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          impact?: number | null
          likelihood?: number | null
          mitigation_strategy?: string | null
          next_review_date?: string | null
          owner_id?: string | null
          residual_impact?: number | null
          residual_likelihood?: number | null
          residual_risk_score?: number | null
          risk_number?: string
          risk_score?: number | null
          status?: Database["public"]["Enums"]["risk_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qms_risks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_risks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      request_shortlists: {
        Row: {
          added_at: string | null
          added_by: string | null
          candidate_id: string
          candidate_response: string | null
          candidate_response_at: string | null
          customer_response: string | null
          customer_response_at: string | null
          customer_response_notes: string | null
          id: string
          match_details: Json | null
          match_score: number | null
          offer_daily_rate_nok: number | null
          offer_notes: string | null
          offer_sent_at: string | null
          offer_sent_by: string | null
          rank_position: number | null
          request_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          added_at?: string | null
          added_by?: string | null
          candidate_id: string
          candidate_response?: string | null
          candidate_response_at?: string | null
          customer_response?: string | null
          customer_response_at?: string | null
          customer_response_notes?: string | null
          id?: string
          match_details?: Json | null
          match_score?: number | null
          offer_daily_rate_nok?: number | null
          offer_notes?: string | null
          offer_sent_at?: string | null
          offer_sent_by?: string | null
          rank_position?: number | null
          request_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          added_at?: string | null
          added_by?: string | null
          candidate_id?: string
          candidate_response?: string | null
          candidate_response_at?: string | null
          customer_response?: string | null
          customer_response_at?: string | null
          customer_response_notes?: string | null
          id?: string
          match_details?: Json | null
          match_score?: number | null
          offer_daily_rate_nok?: number | null
          offer_notes?: string | null
          offer_sent_at?: string | null
          offer_sent_by?: string | null
          rank_position?: number | null
          request_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_shortlists_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_shortlists_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_shortlists_offer_sent_by_fkey"
            columns: ["offer_sent_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_shortlists_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "customer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      staffing_needs: {
        Row: {
          antall: number | null
          bedrift: string | null
          created_at: string | null
          fartoytype: string | null
          id: string
          kontakt_epost: string
          kontakt_navn: string
          kontakt_telefon: string | null
          merknad: string | null
          metadata: Json | null
          oppstart: string | null
          rotasjon: string | null
          status: string | null
          stillinger: string | null
        }
        Insert: {
          antall?: number | null
          bedrift?: string | null
          created_at?: string | null
          fartoytype?: string | null
          id?: string
          kontakt_epost: string
          kontakt_navn: string
          kontakt_telefon?: string | null
          merknad?: string | null
          metadata?: Json | null
          oppstart?: string | null
          rotasjon?: string | null
          status?: string | null
          stillinger?: string | null
        }
        Update: {
          antall?: number | null
          bedrift?: string | null
          created_at?: string | null
          fartoytype?: string | null
          id?: string
          kontakt_epost?: string
          kontakt_navn?: string
          kontakt_telefon?: string | null
          merknad?: string | null
          metadata?: Json | null
          oppstart?: string | null
          rotasjon?: string | null
          status?: string | null
          stillinger?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          archived_at: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_active_at: string | null
          onboarding_completed: boolean | null
          permissions: Json | null
          phone: string | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          last_active_at?: string | null
          onboarding_completed?: boolean | null
          permissions?: Json | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_active_at?: string | null
          onboarding_completed?: boolean | null
          permissions?: Json | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      candidates_searchable_text: {
        Args: {
          p_cv_summary: string
          p_first_name: string
          p_internal_notes: string
          p_last_name: string
          p_primary_role: string
          p_tags: string[]
        }
        Returns: unknown
      }
      is_staff: { Args: never; Returns: boolean }
      log_activity:
        | {
            Args: {
              p_action: string
              p_changes?: Json
              p_description?: string
              p_entity_id?: string
              p_entity_name?: string
              p_entity_type: string
              p_metadata?: Json
            }
            Returns: string
          }
        | {
            Args: {
              p_action: string
              p_details?: Json
              p_entity_id: string
              p_entity_type: string
            }
            Returns: string
          }
      org_searchable_text: {
        Args: { p_name: string; p_notes: string }
        Returns: unknown
      }
    }
    Enums: {
      activity_type:
        | "call"
        | "email"
        | "meeting"
        | "note"
        | "task"
        | "deal_created"
        | "deal_won"
        | "deal_lost"
        | "request_created"
        | "assignment_started"
        | "contract_signed"
        | "invoice_sent"
        | "invoice_paid"
      assignment_status:
        | "draft"
        | "pending_compliance"
        | "compliance_ok"
        | "contract_drafting"
        | "contract_sent"
        | "contract_signed"
        | "ready_for_start"
        | "active"
        | "completed"
        | "invoiced"
        | "paid"
        | "cancelled"
      availability_status:
        | "available"
        | "available_soon"
        | "on_assignment"
        | "unavailable"
        | "inactive"
      capa_status:
        | "planned"
        | "in_progress"
        | "completed"
        | "verified"
        | "closed"
      capa_type: "corrective" | "preventive"
      certification_category:
        | "competency"
        | "safety"
        | "medical"
        | "endorsement"
        | "special"
        | "other"
      compliance_status:
        | "not_started"
        | "documents_pending"
        | "review_pending"
        | "approved"
        | "expired"
        | "rejected"
      contract_status:
        | "draft"
        | "pending_review"
        | "ready_for_signature"
        | "sent"
        | "partially_signed"
        | "signed"
        | "cancelled"
        | "expired"
      contract_type:
        | "employment_temporary"
        | "employment_permanent"
        | "contractor"
        | "framework_agreement"
        | "service_agreement"
      deal_stage:
        | "qualification"
        | "needs_analysis"
        | "proposal"
        | "negotiation"
        | "closed_won"
        | "closed_lost"
      document_type:
        | "cv"
        | "passport"
        | "seabook"
        | "certificate"
        | "diploma"
        | "reference"
        | "contract"
        | "other"
      nc_severity: "observation" | "minor" | "major" | "critical"
      nc_status:
        | "open"
        | "analysis"
        | "action_planned"
        | "action_implemented"
        | "verified"
        | "closed"
      pipeline_stage:
        | "lead"
        | "contacted"
        | "meeting_scheduled"
        | "proposal_sent"
        | "negotiation"
        | "won"
        | "lost"
        | "churned"
      priority_level: "low" | "medium" | "high" | "urgent"
      qms_document_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "obsolete"
      qms_document_type: "QH" | "PRO" | "INS" | "SKJEMA"
      request_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "matching"
        | "shortlisted"
        | "offer_sent"
        | "offer_accepted"
        | "offer_rejected"
        | "converted"
        | "on_hold"
        | "cancelled"
        | "expired"
      risk_category:
        | "operational"
        | "financial"
        | "compliance"
        | "strategic"
        | "reputational"
        | "safety"
      risk_status:
        | "identified"
        | "assessed"
        | "mitigated"
        | "accepted"
        | "closed"
      timesheet_status:
        | "draft"
        | "submitted"
        | "approved"
        | "rejected"
        | "invoiced"
      user_role:
        | "super_admin"
        | "admin"
        | "recruiter"
        | "coordinator"
        | "employee"
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
    Enums: {
      activity_type: [
        "call",
        "email",
        "meeting",
        "note",
        "task",
        "deal_created",
        "deal_won",
        "deal_lost",
        "request_created",
        "assignment_started",
        "contract_signed",
        "invoice_sent",
        "invoice_paid",
      ],
      assignment_status: [
        "draft",
        "pending_compliance",
        "compliance_ok",
        "contract_drafting",
        "contract_sent",
        "contract_signed",
        "ready_for_start",
        "active",
        "completed",
        "invoiced",
        "paid",
        "cancelled",
      ],
      availability_status: [
        "available",
        "available_soon",
        "on_assignment",
        "unavailable",
        "inactive",
      ],
      capa_status: [
        "planned",
        "in_progress",
        "completed",
        "verified",
        "closed",
      ],
      capa_type: ["corrective", "preventive"],
      certification_category: [
        "competency",
        "safety",
        "medical",
        "endorsement",
        "special",
        "other",
      ],
      compliance_status: [
        "not_started",
        "documents_pending",
        "review_pending",
        "approved",
        "expired",
        "rejected",
      ],
      contract_status: [
        "draft",
        "pending_review",
        "ready_for_signature",
        "sent",
        "partially_signed",
        "signed",
        "cancelled",
        "expired",
      ],
      contract_type: [
        "employment_temporary",
        "employment_permanent",
        "contractor",
        "framework_agreement",
        "service_agreement",
      ],
      deal_stage: [
        "qualification",
        "needs_analysis",
        "proposal",
        "negotiation",
        "closed_won",
        "closed_lost",
      ],
      document_type: [
        "cv",
        "passport",
        "seabook",
        "certificate",
        "diploma",
        "reference",
        "contract",
        "other",
      ],
      nc_severity: ["observation", "minor", "major", "critical"],
      nc_status: [
        "open",
        "analysis",
        "action_planned",
        "action_implemented",
        "verified",
        "closed",
      ],
      pipeline_stage: [
        "lead",
        "contacted",
        "meeting_scheduled",
        "proposal_sent",
        "negotiation",
        "won",
        "lost",
        "churned",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      qms_document_status: [
        "draft",
        "pending_approval",
        "approved",
        "obsolete",
      ],
      qms_document_type: ["QH", "PRO", "INS", "SKJEMA"],
      request_status: [
        "draft",
        "pending_approval",
        "approved",
        "matching",
        "shortlisted",
        "offer_sent",
        "offer_accepted",
        "offer_rejected",
        "converted",
        "on_hold",
        "cancelled",
        "expired",
      ],
      risk_category: [
        "operational",
        "financial",
        "compliance",
        "strategic",
        "reputational",
        "safety",
      ],
      risk_status: [
        "identified",
        "assessed",
        "mitigated",
        "accepted",
        "closed",
      ],
      timesheet_status: [
        "draft",
        "submitted",
        "approved",
        "rejected",
        "invoiced",
      ],
      user_role: [
        "super_admin",
        "admin",
        "recruiter",
        "coordinator",
        "employee",
      ],
    },
  },
} as const

// Helper type exports
export type JobPosting = Database["public"]["Tables"]["job_postings"]["Row"]
export type Candidate = Database["public"]["Tables"]["candidates"]["Row"]
export type BluecrewProfile = Database["public"]["Tables"]["bluecrew_profiles"]["Row"]
