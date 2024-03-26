import { Apartamento } from './Apartamento';
import { Condominio } from './Condominio';
import { Pavimento } from './Pavimento';

export class Predio {
  id?: number;
  nome: string | undefined;
  condominio: Condominio | undefined;
  pavimentos: Pavimento[] = [];
}
