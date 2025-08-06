export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      form_submissions: {
        Row: {
          data: Json
          form_id: string | null
          id: string
          ip_address: string | null
          submitted_at: string | null
        }
        Insert: {
          data: Json
          form_id?: string | null
          id?: string
          ip_address?: string | null
          submitted_at?: string | null
        }
        Update: {
          data?: Json
          form_id?: string | null
          id?: string
          ip_address?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string | null
          description: string | null
          fields: Json
          id: string
          is_active: boolean | null
          short_url: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          fields: Json
          id?: string
          is_active?: boolean | null
          short_url: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          short_url?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      short_urls: {
        Row: {
          clicks: number | null
          created_at: string | null
          form_id: string | null
          id: string
          original_url: string
          short_code: string
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          original_url: string
          short_code: string
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          original_url?: string
          short_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "short_urls_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
