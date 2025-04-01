
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
    image: "/placeholder.svg",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 2,
    name: "Ibuprofène 400mg",
    brand: "Advil",
    price: 3200,
    available: true,
    category: "Anti-inflammatoire",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 3,
    name: "Amoxicilline 500mg",
    brand: "Clamoxyl",
    price: 4500,
    available: true,
    category: "Antibiotique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 4,
    name: "Aspirine 500mg",
    brand: "Aspégic",
    price: 1800,
    available: false,
    category: "Antidouleur",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 5,
    name: "Artemether-Lumefantrine",
    brand: "Coartem",
    price: 6500,
    available: true,
    category: "Antipaludique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 6,
    name: "Metformine 500mg",
    brand: "Glucophage",
    price: 3800,
    available: true,
    category: "Antidiabétique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 7,
    name: "Diazépam 10mg",
    brand: "Valium",
    price: 4200,
    available: true,
    category: "Anxiolytique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 8,
    name: "Ciprofloxacine 500mg",
    brand: "Ciproxine",
    price: 5600,
    available: true,
    category: "Antibiotique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 9,
    name: "Métronidazole 500mg",
    brand: "Flagyl",
    price: 3100,
    available: true,
    category: "Antiparasitaire",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie des Collines",
  },
  {
    id: 10,
    name: "Oméprazole 20mg",
    brand: "Mopral",
    price: 4800,
    available: true,
    category: "Anti-ulcéreux",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie Centrale de Cotonou",
  },
  {
    id: 11,
    name: "Quinine 300mg",
    brand: "Quinimax",
    price: 5200,
    available: true,
    category: "Antipaludique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie du Pont",
  },
  {
    id: 12,
    name: "Loratadine 10mg",
    brand: "Clarityne",
    price: 2900,
    available: true,
    category: "Antihistaminique",
    image: "/placeholder.svg",
    pharmacy: "Pharmacie des Collines",
  },
];
