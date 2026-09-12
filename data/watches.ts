export type Watch = {
  id: 'w1' | 'w2' | 'w3';
  image: string;
  priceAED?: number;
};

export const watches: Watch[] = [
  { id: 'w1', image: '/watch-black.png' },
  { id: 'w2', image: '/watch-silver.png' },
  { id: 'w3', image: '/watch-rose.png' },
];
