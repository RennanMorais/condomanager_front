class Pessoa{
	id: number;
	nome: string;
	cnpj: string;
  email: string;
  endereco: Endereco;

  constructor(id: number, nome: string, cnpj: string, email: string, endereco: Endereco) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.email = email;
    this.endereco = endereco;
  }

}
