
-- Enable Row Level Security for all tables
ALTER DATABASE postgres SET timezone TO 'UTC';

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  phone_number TEXT,
  address TEXT,
  city TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'pharmacist', 'admin')),
  avatar_url TEXT
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  opening_hours JSONB,
  gps_coordinates JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  subscription_status TEXT NOT NULL CHECK (subscription_status IN ('free', 'basic', 'premium')),
  owner_id UUID REFERENCES public.profiles(id),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create medicines table
CREATE TABLE public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  is_available BOOLEAN DEFAULT TRUE,
  requires_prescription BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  total_amount INTEGER NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'mobile_money', 'card')),
  delivery_method TEXT NOT NULL CHECK (delivery_method IN ('delivery', 'pickup')),
  delivery_address TEXT,
  delivery_fee INTEGER NOT NULL,
  notes TEXT
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  medicine_id UUID REFERENCES public.medicines(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  pharmacy_id UUID REFERENCES public.pharmacies(id)
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  image_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'validated', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pharmacy_id UUID REFERENCES public.pharmacies(id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  medicine_id UUID REFERENCES public.medicines(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Une review doit concerner soit une pharmacie, soit un médicament, mais pas les deux en même temps
  CONSTRAINT review_target_check CHECK (
    (pharmacy_id IS NULL AND medicine_id IS NOT NULL) OR
    (pharmacy_id IS NOT NULL AND medicine_id IS NULL)
  )
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  type TEXT NOT NULL CHECK (type IN ('order_status', 'promotion', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  related_id UUID
);

-- Create pharmacy_schedule table (pour les pharmacies de garde)
CREATE TABLE public.pharmacy_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_24h BOOLEAN DEFAULT FALSE,
  CHECK (end_date >= start_date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_schedule ENABLE ROW LEVEL SECURITY;

-- Create Row Level Security Policies

-- Profiles: utilisateurs peuvent voir leur profil, les admins peuvent tout voir
CREATE POLICY "Profiles are viewable by users who created them and admins"
  ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id
  );

-- Pharmacies: visibles par tous, modifiables par leur propriétaire et les admins
CREATE POLICY "Pharmacies are viewable by everyone"
  ON public.pharmacies
  FOR SELECT USING (true);

CREATE POLICY "Pharmacies can be updated by their owner or admins"
  ON public.pharmacies
  FOR UPDATE USING (
    owner_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Pharmacies can be inserted by owners or admins"
  ON public.pharmacies
  FOR INSERT WITH CHECK (
    owner_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Medicines: visibles par tous, modifiables par les propriétaires de pharmacie et les admins
CREATE POLICY "Medicines are viewable by everyone"
  ON public.medicines
  FOR SELECT USING (true);

CREATE POLICY "Medicines can be updated by pharmacy owner or admins"
  ON public.medicines
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.pharmacies
      WHERE pharmacies.id = medicines.pharmacy_id
      AND pharmacies.owner_id = auth.uid()
    ) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Medicines can be inserted by pharmacy owner or admins"
  ON public.medicines
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pharmacies
      WHERE pharmacies.id = NEW.pharmacy_id
      AND pharmacies.owner_id = auth.uid()
    ) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders: visibles par l'acheteur, la pharmacie concernée et les admins
CREATE POLICY "Orders are viewable by the customer who created them"
  ON public.orders
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
    EXISTS (
      SELECT 1 FROM public.order_items
      JOIN public.pharmacies ON order_items.pharmacy_id = pharmacies.id
      WHERE order_items.order_id = orders.id
      AND pharmacies.owner_id = auth.uid()
    )
  );

CREATE POLICY "Orders can be created by authenticated users"
  ON public.orders
  FOR INSERT WITH CHECK (
    auth.uid() = NEW.user_id
  );

-- Finalisation des tables et index pour optimiser les requêtes

-- Créer des index pour optimiser les requêtes fréquentes
CREATE INDEX idx_medicines_pharmacy ON public.medicines (pharmacy_id);
CREATE INDEX idx_medicines_category ON public.medicines (category);
CREATE INDEX idx_orders_user ON public.orders (user_id);
CREATE INDEX idx_order_items_order ON public.order_items (order_id);
CREATE INDEX idx_reviews_pharmacy ON public.reviews (pharmacy_id);
CREATE INDEX idx_reviews_medicine ON public.reviews (medicine_id);
CREATE INDEX idx_notifications_user ON public.notifications (user_id);
CREATE INDEX idx_pharmacy_schedule_date_range ON public.pharmacy_schedule (start_date, end_date);
