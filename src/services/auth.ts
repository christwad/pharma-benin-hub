
import api from "./api";
import { Tables } from "@/types/supabase";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  role: "client" | "pharmacist" | "admin";
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
  profile?: Tables<'profiles'>;
}

// Service d'authentification
const authService = {
  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    // Stocker le token d'authentification
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  // Inscription
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    // Stocker le token si renvoyé (si auto-connexion après inscription)
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("authToken");
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },

  // Récupérer le profil utilisateur
  async getProfile(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>("/auth/profile");
    return response.data;
  },
};

export default authService;
