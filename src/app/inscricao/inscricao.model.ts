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
  acompanhante3: string;
  acompanhante4: string;
  area: string;
  supervisor: string;
  lider: string;
  confirmado: string;
  idade: number;
  periodo: string;
}

interface VagasValidas {
  inscricoes: number;
  limite: number;
}
