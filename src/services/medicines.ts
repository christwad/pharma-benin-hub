
import api from "./api";
import { Tables } from "@/types/supabase";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Service pour les médicaments
export const medicinesService = {
  async getAllMedicines(pharmacyId?: string, category?: string) {
    let url = "/medicines";
    const params = new URLSearchParams();
    
    if (pharmacyId) {
      params.append("pharmacy_id", pharmacyId);
    }
    
    if (category && category !== "all") {
      params.append("category", category);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },

  async getMedicineById(id: string) {
    const response = await api.get(`/medicines/${id}`);
    return response.data;
  },

  async createMedicine(data: Partial<Tables<'medicines'>>) {
    const response = await api.post("/medicines", data);
    return response.data;
  },

  async updateMedicine(id: string, data: Partial<Tables<'medicines'>>) {
    const response = await api.put(`/medicines/${id}`, data);
    return response.data;
  },

  async deleteMedicine(id: string) {
    const response = await api.delete(`/medicines/${id}`);
    return response.data;
  }
};

// Hook pour utiliser le service des médicaments
export const useMedicines = (pharmacyId?: string, category?: string) => {
  const [medicines, setMedicines] = useState<Tables<'medicines'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await medicinesService.getAllMedicines(pharmacyId, category);
        if (data) {
          setMedicines(data as Tables<'medicines'>[]);
        }
      } catch (err: any) {
        console.error('Erreur lors du chargement des médicaments:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les médicaments. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [pharmacyId, category, toast]);

  return { medicines, loading, error };
};

// Hook pour utiliser les détails d'un médicament
export const useMedicineDetails = (medicineId: string) => {
  const [medicine, setMedicine] = useState<Tables<'medicines'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        if (medicineId) {
          const data = await medicinesService.getMedicineById(medicineId);
          if (data) {
            setMedicine(data as Tables<'medicines'>);
          }
        }
      } catch (err: any) {
        console.error('Erreur lors du chargement des détails du médicament:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails du médicament. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (medicineId) {
      fetchMedicineDetails();
    }
  }, [medicineId, toast]);

  return { medicine, loading, error };
};
