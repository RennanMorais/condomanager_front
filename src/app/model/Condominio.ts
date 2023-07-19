import { Endereco } from "./Endereco";

export interface Condominio{
	id: number;
	nome: string;
	cnpj: string;
  email: string;
  endereco: Endereco;

}
