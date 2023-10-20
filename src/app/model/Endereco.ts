import { Cidade } from "./Cidade";
import { Estado } from "./Estado";

export class Endereco {
  id!: number;
  endereco!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  estado: Estado = new Estado;
  cidade: Cidade = new Cidade;
}
