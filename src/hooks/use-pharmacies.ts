
import { useState, useEffect } from 'react';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';

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
        let url = "/pharmacies";
        const params = new URLSearchParams();
        
        if (isVerifiedOnly) {
          params.append("verified", "true");
        }
        
        if (city && city !== 'all') {
          params.append("city", city);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const { data } = await api.get(url);
        setPharmacies(data as Tables<'pharmacies'>[] || []);
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
        if (!pharmacyId) return;
        
        const { data } = await api.get(`/pharmacies/${pharmacyId}`);
        setPharmacy(data as Tables<'pharmacies'>);
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
