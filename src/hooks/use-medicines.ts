
import { useState, useEffect } from 'react';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';

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
        let url = "/medicines";
        const params = new URLSearchParams();
        
        if (pharmacyId) {
          params.append("pharmacy_id", pharmacyId);
        }
        
        if (category && category !== 'all') {
          params.append("category", category);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const { data } = await api.get(url);
        setMedicines(data || []);
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
        if (!medicineId) return;
        
        const { data } = await api.get(`/medicines/${medicineId}`);
        setMedicine(data);
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
