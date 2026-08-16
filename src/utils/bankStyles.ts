import { Landmark } from 'lucide-react';

export const BANK_STYLES: Record<string, { color: string, logo: string, textColor: string }> = {
  nubank: { color: '#820ad1', logo: 'Nubank', textColor: 'white' },
  inter: { color: '#ff7a00', logo: 'Inter', textColor: 'white' },
  itau: { color: '#ec7000', logo: 'Itaú', textColor: 'white' },
  caixa: { color: '#005ca9', logo: 'Caixa', textColor: 'white' },
  bb: { color: '#fcf100', logo: 'Banco do Brasil', textColor: '#003a8c' },
  bradesco: { color: '#cc092f', logo: 'Bradesco', textColor: 'white' },
  santander: { color: '#ec0000', logo: 'Santander', textColor: 'white' },
};

export function getBankStyle(bank: string | null) {
  if (!bank || !BANK_STYLES[bank]) return null;
  return BANK_STYLES[bank];
}
