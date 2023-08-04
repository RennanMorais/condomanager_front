import { Condominio } from './Condominio';

export interface Predio {
  id: number;
  nome: string;
  condominio: Condominio;
}
