
import axios from "axios";

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // La réponse a été reçue avec un code d'erreur
      if (error.response.status === 401) {
        // Non autorisé - Déconnecter l'utilisateur
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Hook pour utiliser l'API avec les toasts
export const useApi = () => {
  const handleRequest = async <T,>(
    requestFn: () => Promise<{ data: T }>
  ): Promise<T | null> => {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error: any) {
      console.error("Erreur API:", error);
      const errorMessage =
        error.response?.data?.message || "Une erreur est survenue";
      
      // Ici, utiliser une méthode de notification appropriée
      console.error("Erreur:", errorMessage);
      
      return null;
    }
  };

  return { handleRequest };
};
