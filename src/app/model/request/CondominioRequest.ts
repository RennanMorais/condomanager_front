import { EnderecoRequest } from "./EnderecoRequest";

export class CondominioRequest {
	id!: number;
	nome!: string;
	cnpj!: string;
  email!: string;
  endereco: EnderecoRequest = new EnderecoRequest;
}
