export class EnderecoRequest {
  id!: number;
  endereco!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  idEstado!: number | undefined;
  idCidade!: number | undefined;
}
