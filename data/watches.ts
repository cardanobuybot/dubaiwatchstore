export type Watch = {
  id: 'w1' | 'w2' | 'w3';
  image: string;
  priceAED?: number;
};

export const watches: Watch[] = [
  {
    id: 'w1',
    image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w2',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w3',
    image:
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1200&q=80',
  },
];
