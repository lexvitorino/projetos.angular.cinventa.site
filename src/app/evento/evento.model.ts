interface EventoModel {
  data: any;
  message: Message;
}

interface Evento {
  id: number;
  data: string;
  chave: string;
  descricao: string;
  simples: number;
  dupla: number;
  sol_idade: number;
  ativo_as: any;
  inativo_as: any;
  ativo: any;

  dataFmt: string;
  ativoAsFmt: string;
  inativoAsFmt: string;
  dispSimples: number;
  dispDupla: number;
}

interface VagasValidasModel {
  data: VagasValidas;
  message: Message;
}

interface VagasValidas {
  inscricoes: number;
  limite: number;
}

interface Message {
  hasError: boolean;
  errors: string[];
}
