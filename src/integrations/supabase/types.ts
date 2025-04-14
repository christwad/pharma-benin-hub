export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      medicines: {
        Row: {
          brand: string
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          pharmacy_id: string | null
          price: number
          requires_prescription: boolean | null
          stock_quantity: number
        }
        Insert: {
          brand: string
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          pharmacy_id?: string | null
          price: number
          requires_prescription?: boolean | null
          stock_quantity: number
        }
        Update: {
          brand?: string
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          pharmacy_id?: string | null
          price?: number
          requires_prescription?: boolean | null
          stock_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "medicines_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          related_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          medicine_id: string | null
          order_id: string | null
          pharmacy_id: string | null
          price: number
          quantity: number
          subtotal: number
        }
        Insert: {
          id?: string
          medicine_id?: string | null
          order_id?: string | null
          pharmacy_id?: string | null
          price: number
          quantity: number
          subtotal: number
        }
        Update: {
          id?: string
          medicine_id?: string | null
          order_id?: string | null
          pharmacy_id?: string | null
          price?: number
          quantity?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          delivery_address: string | null
          delivery_fee: number
          delivery_method: string
          id: string
          notes: string | null
          payment_method: string
          payment_status: string
          status: string
          total_amount: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_address?: string | null
          delivery_fee: number
          delivery_method: string
          id?: string
          notes?: string | null
          payment_method: string
          payment_status: string
          status: string
          total_amount: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_address?: string | null
          delivery_fee?: number
          delivery_method?: string
          id?: string
          notes?: string | null
          payment_method?: string
          payment_status?: string
          status?: string
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          address: string
          city: string
          created_at: string | null
          description: string | null
          email: string
          gps_coordinates: Json | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          logo_url: string | null
          name: string
          opening_hours: Json | null
          owner_id: string | null
          phone: string
          subscription_status: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          description?: string | null
          email: string
          gps_coordinates?: Json | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone: string
          subscription_status: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string
          gps_coordinates?: Json | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone?: string
          subscription_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_schedule: {
        Row: {
          end_date: string
          id: string
          is_24h: boolean | null
          pharmacy_id: string | null
          start_date: string
        }
        Insert: {
          end_date: string
          id?: string
          is_24h?: boolean | null
          pharmacy_id?: string | null
          start_date: string
        }
        Update: {
          end_date?: string
          id?: string
          is_24h?: boolean | null
          pharmacy_id?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_schedule_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          notes: string | null
          pharmacy_id: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          notes?: string | null
          pharmacy_id?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          notes?: string | null
          pharmacy_id?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          role: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          role: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          medicine_id: string | null
          pharmacy_id: string | null
          rating: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          medicine_id?: string | null
          pharmacy_id?: string | null
          rating: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          medicine_id?: string | null
          pharmacy_id?: string | null
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
