import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { enUS } from 'date-fns/locale/en-US';

export function formatDate(dateString: string, currentLanguage: string): string {
  if (!dateString) return '';
  const date = parseISO(dateString);

  if (currentLanguage.startsWith('en')) {
    return format(date, 'MM/dd/yyyy', { locale: enUS });
  }
  
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
}
