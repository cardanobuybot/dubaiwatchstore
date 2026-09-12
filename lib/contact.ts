export const CONTACT = {
  whatsapp: '37126275758',
  whatsappDisplay: '+371 26 275 758',
  email: 'hello@dubaiwatchstore.ae',
  instagram: 'dubaiwatchstore',
  revolut: 'https://revolut.me/sirjevspavels?currency=AED&amount=550000',
};

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
}
