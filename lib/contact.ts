export const CONTACT = {
  whatsapp: '971500000000',
  whatsappDisplay: '+971 50 000 0000',
  email: 'hello@dubaiwatchstore.ae',
  instagram: 'dubaiwatchstore',
  revolut: 'https://revolut.me/sirjevspavels?currency=AED&amount=550000',
};

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
}
