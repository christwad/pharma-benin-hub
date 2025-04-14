
import api from "./api";
import { useApi } from "./api";
import { Tables } from "@/types/supabase";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Service pour les pharmacies
export const pharmaciesService = {
  async getAllPharmacies(city?: string, isVerifiedOnly: boolean = true) {
    let url = "/pharmacies";
    const params = new URLSearchParams();
    
    if (city && city !== "all") {
      params.append("city", city);
    }
    
    if (isVerifiedOnly) {
      params.append("verified", "true");
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },

  async getPharmacyById(id: string) {
    const response = await api.get(`/pharmacies/${id}`);
    return response.data;
  },

  async createPharmacy(data: Partial<Tables<'pharmacies'>>) {
    const response = await api.post("/pharmacies", data);
    return response.data;
  },

  async updatePharmacy(id: string, data: Partial<Tables<'pharmacies'>>) {
    const response = await api.put(`/pharmacies/${id}`, data);
    return response.data;
  },

  async deletePharmacy(id: string) {
    const response = await api.delete(`/pharmacies/${id}`);
    return response.data;
  }
};

// Hook pour utiliser le service des pharmacies
export const usePharmacies = (city?: string, isVerifiedOnly: boolean = true) => {
  const [pharmacies, setPharmacies] = useState<Tables<'pharmacies'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { handleRequest } = useApi();

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await handleRequest(() => 
          pharmaciesService.getAllPharmacies(city, isVerifiedOnly)
        );
        
        if (data) {
          // Utiliser une assertion de type pour résoudre l'erreur de typage
          setPharmacies(data as Tables<'pharmacies'>[]);
        }
      } catch (err: any) {
        console.error('Erreur lors du chargement des pharmacies:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les pharmacies. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [city, isVerifiedOnly, toast, handleRequest]);

  return { pharmacies, loading, error };
};

// Hook pour utiliser les détails d'une pharmacie
export const usePharmacyDetails = (pharmacyId: string) => {
  const [pharmacy, setPharmacy] = useState<Tables<'pharmacies'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { handleRequest } = useApi();

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        if (pharmacyId) {
          const data = await handleRequest(() => 
            pharmaciesService.getPharmacyById(pharmacyId)
          );
          
          if (data) {
            // Utiliser une assertion de type pour résoudre l'erreur de typage
            setPharmacy(data as Tables<'pharmacies'>);
          }
        }
      } catch (err: any) {
        console.error('Erreur lors du chargement des détails de la pharmacie:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails de la pharmacie. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (pharmacyId) {
      fetchPharmacyDetails();
    }
  }, [pharmacyId, toast, handleRequest]);

  return { pharmacy, loading, error };
};
