import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import MesasView from '@/components/MesasView';
import CardapioView from '@/components/CardapioView';
import EstoqueView from '@/components/EstoqueView';
import FuncionariosView from '@/components/FuncionariosView';
import { Mesa, Pedido, ItemCardapio, ItemEstoque, Funcionario, Turno } from '@/types';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');

  // Estado das mesas (dados mock)
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, numero: 1, status: 'livre', capacidade: 2 },
    { id: 2, numero: 2, status: 'ocupada', capacidade: 4, garcom: 'João Silva', horaAbertura: '18:30', totalConta: 85.50 },
    { id: 3, numero: 3, status: 'aguardando', capacidade: 6, garcom: 'Maria Santos', horaAbertura: '19:15' },
    { id: 4, numero: 4, status: 'livre', capacidade: 2 },
    { id: 5, numero: 5, status: 'ocupada', capacidade: 4, garcom: 'Pedro Costa', horaAbertura: '19:45', totalConta: 125.80 },
    { id: 6, numero: 6, status: 'atendimento', capacidade: 8, garcom: 'Ana Lima', horaAbertura: '18:00', totalConta: 280.00 },
    { id: 7, numero: 7, status: 'livre', capacidade: 2 },
    { id: 8, numero: 8, status: 'livre', capacidade: 4 },
    { id: 9, numero: 9, status: 'ocupada', capacidade: 6, garcom: 'Carlos Rocha', horaAbertura: '20:00', totalConta: 95.30 },
    { id: 10, numero: 10, status: 'livre', capacidade: 4 },
    { id: 11, numero: 11, status: 'livre', capacidade: 2 },
    { id: 12, numero: 12, status: 'aguardando', capacidade: 4, garcom: 'Lucia Fernandes', horaAbertura: '19:30' }
  ]);

  // Pedidos mock
  const [pedidos] = useState<Pedido[]>([
    {
      id: 1,
      mesaId: 2,
      itens: [],
      status: 'preparando',
      horario: '18:45',
      garcom: 'João Silva',
      total: 85.50
    },
    {
      id: 2,
      mesaId: 5,
      itens: [],
      status: 'pendente',
      horario: '20:10',
      garcom: 'Pedro Costa',
      total: 125.80
    }
  ]);

  // Cardápio mock
  const [cardapio] = useState<ItemCardapio[]>([
    {
      id: 1,
      nome: 'Hambúrguer Artesanal',
      categoria: 'Lanches',
      preco: 28.90,
      descricao: 'Hambúrguer artesanal com carne 180g, queijo cheddar, alface, tomate e molho especial',
      disponivel: true
    },
    {
      id: 2,
      nome: 'Pizza Margherita',
      categoria: 'Pizzas',
      preco: 42.00,
      descricao: 'Pizza tradicional com molho de tomate, mussarela, manjericão e azeite',
      disponivel: true
    },
    {
      id: 3,
      nome: 'Risotto de Camarão',
      categoria: 'Pratos Principais',
      preco: 65.00,
      descricao: 'Risotto cremoso com camarões grelhados, alho, vinho branco e ervas finas',
      disponivel: false
    },
    {
      id: 4,
      nome: 'Salada Caesar',
      categoria: 'Saladas',
      preco: 22.50,
      descricao: 'Alface romana, croutons, parmesão e molho caesar tradicional',
      disponivel: true
    },
    {
      id: 5,
      nome: 'Tiramisu',
      categoria: 'Sobremesas',
      preco: 18.00,
      descricao: 'Sobremesa italiana com café, mascarpone e cacau',
      disponivel: true
    },
    {
      id: 6,
      nome: 'Caipirinha',
      categoria: 'Bebidas',
      preco: 15.00,
      descricao: 'Cachaça, limão, açúcar e gelo',
      disponivel: true
    }
  ]);

  // Estado do estoque
  const [estoque, setEstoque] = useState<ItemEstoque[]>([
    {
      id: 1,
      nome: 'Filé de Frango',
      categoria: 'Carnes',
      quantidade: 5.5,
      unidade: 'kg',
      estoqueMinimo: 3,
      preco: 18.90
    },
    {
      id: 2,
      nome: 'Tomate',
      categoria: 'Vegetais',
      quantidade: 2,
      unidade: 'kg',
      estoqueMinimo: 5,
      preco: 8.50
    },
    {
      id: 3,
      nome: 'Queijo Mussarela',
      categoria: 'Laticínios',
      quantidade: 1.2,
      unidade: 'kg',
      estoqueMinimo: 2,
      preco: 35.00
    }
  ]);

  // Estado dos funcionários
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'garcom',
      telefone: '(11) 99999-1234',
      email: 'joao@email.com',
      ativo: true,
      dataAdmissao: '2024-01-15'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'garcom',
      telefone: '(11) 99999-5678',
      email: 'maria@email.com',
      ativo: true,
      dataAdmissao: '2024-02-01'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      cargo: 'cozinheiro',
      telefone: '(11) 99999-9999',
      email: 'pedro@email.com',
      ativo: true,
      dataAdmissao: '2024-01-10'
    }
  ]);

  // Estado dos turnos
  const [turnos, setTurnos] = useState<Turno[]>([
    {
      id: 1,
      funcionarioId: 1,
      data: new Date().toISOString().split('T')[0],
      horaInicio: '18:00',
      status: 'ativo'
    }
  ]);

  const handleMesaUpdate = (mesaId: number, updates: Partial<Mesa>) => {
    setMesas(mesas.map(mesa => 
      mesa.id === mesaId ? { ...mesa, ...updates } : mesa
    ));
  };

  const handleMesaAdd = (novaMesa: Omit<Mesa, 'id'>) => {
    const novoId = Math.max(...mesas.map(m => m.id)) + 1;
    setMesas([...mesas, { ...novaMesa, id: novoId }]);
  };

  const handleItemUpdate = (item: ItemCardapio) => {
    console.log('Atualizando item:', item);
  };

  const handleEstoqueAdd = (novoItem: Omit<ItemEstoque, 'id'>) => {
    const novoId = Math.max(...estoque.map(i => i.id)) + 1;
    setEstoque([...estoque, { ...novoItem, id: novoId }]);
  };

  const handleFuncionarioAdd = (novoFuncionario: Omit<Funcionario, 'id'>) => {
    const novoId = Math.max(...funcionarios.map(f => f.id)) + 1;
    setFuncionarios([...funcionarios, { ...novoFuncionario, id: novoId }]);
  };

  const handleTurnoStart = (funcionarioId: number) => {
    const novoId = Math.max(...turnos.map(t => t.id), 0) + 1;
    const novoTurno: Turno = {
      id: novoId,
      funcionarioId,
      data: new Date().toISOString().split('T')[0],
      horaInicio: new Date().toLocaleTimeString(),
      status: 'ativo'
    };
    setTurnos([...turnos, novoTurno]);
  };

  const handleTurnoEnd = (turnoId: number) => {
    setTurnos(turnos.map(turno =>
      turno.id === turnoId 
        ? { ...turno, status: 'finalizado' as const, horaFim: new Date().toLocaleTimeString() }
        : turno
    ));
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard mesas={mesas} pedidos={pedidos} />;
      case 'mesas':
        return <MesasView mesas={mesas} onMesaUpdate={handleMesaUpdate} onMesaAdd={handleMesaAdd} />;
      case 'cardapio':
        return <CardapioView cardapio={cardapio} onItemUpdate={handleItemUpdate} />;
      case 'estoque':
        return <EstoqueView estoque={estoque} onItemAdd={handleEstoqueAdd} />;
      case 'funcionarios':
        return (
          <FuncionariosView 
            funcionarios={funcionarios} 
            turnos={turnos}
            onFuncionarioAdd={handleFuncionarioAdd}
            onTurnoStart={handleTurnoStart}
            onTurnoEnd={handleTurnoEnd}
          />
        );
      case 'pedidos':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pedidos</h1>
            <p className="text-gray-600">Sistema de pedidos em desenvolvimento...</p>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Configurações</h1>
            <p className="text-gray-600">Configurações do sistema em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard mesas={mesas} pedidos={pedidos} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default Index;
