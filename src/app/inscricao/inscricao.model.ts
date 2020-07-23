interface InscricaoModel {
  data: Inscricao;
  message: Message;
}

interface InscricoesModel {
  data: Inscricao[];
  message: Message;
}

interface EventoModel {
  data: Evento[];
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
}

interface Evento {
  id: number;
  data: string;
  chave: string;
  descricao: string;
  simples: number;
  dupla: number;
}

interface VagasValidas {
  inscricoes: number;
  limite: number;
}

interface Message {
  hasError: boolean;
  errors: string[];
}
