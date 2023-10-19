import { Endereco } from "./Endereco";

export class Condominio{
	id!: number;
	nome!: string;
	cnpj!: string;
  email!: string;
  endereco: Endereco = new Endereco;
}
