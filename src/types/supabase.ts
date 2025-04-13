
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string | null
          phone_number: string | null
          address: string | null
          city: string | null
          role: 'client' | 'pharmacist' | 'admin'
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          full_name?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          role?: 'client' | 'pharmacist' | 'admin'
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          role?: 'client' | 'pharmacist' | 'admin'
          avatar_url?: string | null
        }
      }
      pharmacies: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string
          city: string
          phone: string
          email: string
          description: string | null
          logo_url: string | null
          opening_hours: Json | null
          gps_coordinates: Json | null
          is_verified: boolean
          subscription_status: 'free' | 'basic' | 'premium'
          owner_id: string
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address: string
          city: string
          phone: string
          email: string
          description?: string | null
          logo_url?: string | null
          opening_hours?: Json | null
          gps_coordinates?: Json | null
          is_verified?: boolean
          subscription_status?: 'free' | 'basic' | 'premium'
          owner_id: string
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string
          city?: string
          phone?: string
          email?: string
          description?: string | null
          logo_url?: string | null
          opening_hours?: Json | null
          gps_coordinates?: Json | null
          is_verified?: boolean
          subscription_status?: 'free' | 'basic' | 'premium'
          owner_id?: string
          is_active?: boolean
        }
      }
      medicines: {
        Row: {
          id: string
          created_at: string
          name: string
          brand: string
          description: string | null
          category: string
          price: number
          image_url: string | null
          pharmacy_id: string
          is_available: boolean
          requires_prescription: boolean
          stock_quantity: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          brand: string
          description?: string | null
          category: string
          price: number
          image_url?: string | null
          pharmacy_id: string
          is_available?: boolean
          requires_prescription?: boolean
          stock_quantity: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          brand?: string
          description?: string | null
          category?: string
          price?: number
          image_url?: string | null
          pharmacy_id?: string
          is_available?: boolean
          requires_prescription?: boolean
          stock_quantity?: number
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          payment_status: 'pending' | 'paid' | 'failed'
          payment_method: 'cash' | 'mobile_money' | 'card'
          delivery_method: 'delivery' | 'pickup'
          delivery_address: string | null
          delivery_fee: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          payment_status?: 'pending' | 'paid' | 'failed'
          payment_method: 'cash' | 'mobile_money' | 'card'
          delivery_method: 'delivery' | 'pickup'
          delivery_address?: string | null
          delivery_fee: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount?: number
          payment_status?: 'pending' | 'paid' | 'failed'
          payment_method?: 'cash' | 'mobile_money' | 'card'
          delivery_method?: 'delivery' | 'pickup'
          delivery_address?: string | null
          delivery_fee?: number
          notes?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          medicine_id: string
          quantity: number
          price: number
          subtotal: number
          pharmacy_id: string
        }
        Insert: {
          id?: string
          order_id: string
          medicine_id: string
          quantity: number
          price: number
          subtotal: number
          pharmacy_id: string
        }
        Update: {
          id?: string
          order_id?: string
          medicine_id?: string
          quantity?: number
          price?: number
          subtotal?: number
          pharmacy_id?: string
        }
      }
      prescriptions: {
        Row: {
          id: string
          user_id: string
          image_url: string
          status: 'pending' | 'validated' | 'rejected'
          notes: string | null
          created_at: string
          pharmacy_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          status?: 'pending' | 'validated' | 'rejected'
          notes?: string | null
          created_at?: string
          pharmacy_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          status?: 'pending' | 'validated' | 'rejected'
          notes?: string | null
          created_at?: string
          pharmacy_id?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          pharmacy_id: string | null
          medicine_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pharmacy_id?: string | null
          medicine_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pharmacy_id?: string | null
          medicine_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          content: string
          is_read: boolean
          type: 'order_status' | 'promotion' | 'system'
          created_at: string
          related_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          is_read?: boolean
          type: 'order_status' | 'promotion' | 'system'
          created_at?: string
          related_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          is_read?: boolean
          type?: 'order_status' | 'promotion' | 'system'
          created_at?: string
          related_id?: string | null
        }
      }
      pharmacy_schedule: {
        Row: {
          id: string
          pharmacy_id: string
          start_date: string
          end_date: string
          is_24h: boolean
        }
        Insert: {
          id?: string
          pharmacy_id: string
          start_date: string
          end_date: string
          is_24h?: boolean
        }
        Update: {
          id?: string
          pharmacy_id?: string
          start_date?: string
          end_date?: string
          is_24h?: boolean
        }
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
  }
}

// Types pour les requêtes Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
