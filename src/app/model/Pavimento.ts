import { Apartamento } from "./Apartamento";

export class Pavimento {
  id?: number;
  pavimento: string | undefined;
  idPredio?: number | undefined;
  apartamentos: Apartamento[] = [];
}
