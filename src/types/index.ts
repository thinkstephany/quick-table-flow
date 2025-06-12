
export type MesaStatus = 'livre' | 'ocupada' | 'aguardando' | 'atendimento';

export interface Mesa {
  id: number;
  numero: number;
  status: MesaStatus;
  capacidade: number;
  garcom?: string;
  horaAbertura?: string;
  totalConta?: number;
}

export interface ItemCardapio {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  disponivel: boolean;
  imagem?: string;
}

export interface ItemPedido {
  id: number;
  itemCardapio: ItemCardapio;
  quantidade: number;
  observacoes?: string;
}

export interface Pedido {
  id: number;
  mesaId: number;
  itens: ItemPedido[];
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue';
  horario: string;
  garcom: string;
  total: number;
}

export interface ItemEstoque {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  estoqueMinimo: number;
  preco: number;
}

export interface Funcionario {
  id: number;
  nome: string;
  cargo: 'garcom' | 'cozinheiro' | 'gerente' | 'caixa';
  telefone: string;
  email: string;
  ativo: boolean;
  dataAdmissao: string;
}

export interface Turno {
  id: number;
  funcionarioId: number;
  data: string;
  horaInicio: string;
  horaFim?: string;
  status: 'ativo' | 'finalizado' | 'pausado';
}
