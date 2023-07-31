import { Cidade } from "./Cidade";
import { Estado } from "./Estado";

export interface Endereco {
  id: number;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: Estado;
  cidade: Cidade;

}
