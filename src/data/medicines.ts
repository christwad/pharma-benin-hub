
export interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  category: string;
  image: string;
  pharmacy: string;
}

// Liste élargie de médicaments disponibles au Bénin
export const medicines: Medicine[] = [
  {
    id: 1,
    name: "Paracétamol 500mg",
    brand: "Doliprane",
    price: 2500,
    available: true,
    category: "Antidouleur",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 2,
    name: "Ibuprofène 400mg",
    brand: "Advil",
    price: 3200,
    available: true,
    category: "Anti-inflammatoire",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 3,
    name: "Amoxicilline 500mg",
    brand: "Clamoxyl",
    price: 4500,
    available: true,
    category: "Antibiotique",
    image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 4,
    name: "Aspirine 500mg",
    brand: "Aspégic",
    price: 1800,
    available: false,
    category: "Antidouleur",
    image: "https://images.unsplash.com/photo-1550572017-ea0751c19f10?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 5,
    name: "Artemether-Lumefantrine",
    brand: "Coartem",
    price: 6500,
    available: true,
    category: "Antipaludique",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 6,
    name: "Metformine 500mg",
    brand: "Glucophage",
    price: 3800,
    available: true,
    category: "Antidiabétique",
    image: "https://images.unsplash.com/photo-1596661642565-7f15130b9166?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 7,
    name: "Diazépam 10mg",
    brand: "Valium",
    price: 4200,
    available: true,
    category: "Anxiolytique",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 8,
    name: "Ciprofloxacine 500mg",
    brand: "Ciproxine",
    price: 5600,
    available: true,
    category: "Antibiotique",
    image: "https://images.unsplash.com/photo-1585436627924-d8128b263b2b?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 9,
    name: "Métronidazole 500mg",
    brand: "Flagyl",
    price: 3100,
    available: true,
    category: "Antiparasitaire",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 10,
    name: "Oméprazole 20mg",
    brand: "Mopral",
    price: 4800,
    available: true,
    category: "Anti-ulcéreux",
    image: "https://images.unsplash.com/photo-1631549918649-6f64c0a3419e?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 11,
    name: "Quinine 300mg",
    brand: "Quinimax",
    price: 5200,
    available: true,
    category: "Antipaludique",
    image: "https://images.unsplash.com/photo-1584017121324-74fcbb9dff35?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 12,
    name: "Loratadine 10mg",
    brand: "Clarityne",
    price: 2900,
    available: true,
    category: "Antihistaminique",
    image: "https://images.unsplash.com/photo-1544991185-13fe5d113fe3?auto=format&fit=crop&w=800&h=600",
    pharmacy: "Pharmacie des Collines",
  },
];
