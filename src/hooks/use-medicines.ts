
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';

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
        let query = supabase
          .from('medicines')
          .select('*');
        
        // Filtrer par pharmacie si spécifié
        if (pharmacyId) {
          query = query.eq('pharmacy_id', pharmacyId);
        }
        
        // Filtrer par catégorie si spécifiée
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

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
        const { data, error } = await supabase
          .from('medicines')
          .select('*, pharmacies(*)')
          .eq('id', medicineId)
          .single();

        if (error) {
          throw error;
        }

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
