
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import MesasView from '@/components/MesasView';
import CardapioView from '@/components/CardapioView';
import { Mesa, Pedido, ItemCardapio } from '@/types';

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

  const handleMesaUpdate = (mesaId: number, updates: Partial<Mesa>) => {
    setMesas(mesas.map(mesa => 
      mesa.id === mesaId ? { ...mesa, ...updates } : mesa
    ));
  };

  const handleItemUpdate = (item: ItemCardapio) => {
    console.log('Atualizando item:', item);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard mesas={mesas} pedidos={pedidos} />;
      case 'mesas':
        return <MesasView mesas={mesas} onMesaUpdate={handleMesaUpdate} />;
      case 'cardapio':
        return <CardapioView cardapio={cardapio} onItemUpdate={handleItemUpdate} />;
      case 'pedidos':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pedidos</h1>
            <p className="text-gray-600">Sistema de pedidos em desenvolvimento...</p>
          </div>
        );
      case 'estoque':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Estoque</h1>
            <p className="text-gray-600">Controle de estoque em desenvolvimento...</p>
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
