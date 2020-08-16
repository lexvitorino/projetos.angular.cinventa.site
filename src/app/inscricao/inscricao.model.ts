interface InscricaoModel {
  data: Inscricao;
  message: Message;
}

interface InscricoesModel {
  data: Inscricao[];
  message: Message;
}

interface VagasValidasModel {
  data: VagasValidas;
  message: Message;
}

interface Inscricao {
  id: number;
  evento: string;
  cadeira: string;
  data: string;
  email: string;
  nome: string;
  sobrenome: string;
  conjuge: string;
  area: string;
  supervisor: string;
  lider: string;
  confirmado: string;
  idade: number;
}

interface VagasValidas {
  inscricoes: number;
  limite: number;
}
