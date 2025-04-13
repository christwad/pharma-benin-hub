
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';

export const usePharmacies = (city?: string, isVerifiedOnly: boolean = true) => {
  const [pharmacies, setPharmacies] = useState<Tables<'pharmacies'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('pharmacies')
          .select('*')
          .eq('is_active', true);
        
        // Filtrer par validation si demandé
        if (isVerifiedOnly) {
          query = query.eq('is_verified', true);
        }
        
        // Filtrer par ville si spécifiée
        if (city && city !== 'all') {
          query = query.eq('city', city);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPharmacies(data || []);
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
  }, [city, isVerifiedOnly, toast]);

  return { pharmacies, loading, error };
};

export const usePharmacyDetails = (pharmacyId: string) => {
  const [pharmacy, setPharmacy] = useState<Tables<'pharmacies'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('pharmacies')
          .select('*, profiles(*)')
          .eq('id', pharmacyId)
          .single();

        if (error) {
          throw error;
        }

        setPharmacy(data);
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
  }, [pharmacyId, toast]);

  return { pharmacy, loading, error };
};
