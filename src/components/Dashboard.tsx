
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Mesa, Pedido } from '@/types';

interface DashboardProps {
  mesas: Mesa[];
  pedidos: Pedido[];
}

const Dashboard = ({ mesas, pedidos }: DashboardProps) => {
  const mesasLivres = mesas.filter(m => m.status === 'livre').length;
  const mesasOcupadas = mesas.filter(m => m.status === 'ocupada').length;
  const pedidosPendentes = pedidos.filter(p => p.status === 'pendente').length;
  const vendaHoje = pedidos.reduce((total, pedido) => total + pedido.total, 0);

  const estatisticas = [
    {
      title: 'Mesas Livres',
      value: mesasLivres,
      total: mesas.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Vendas Hoje',
      value: `R$ ${vendaHoje.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pedidos Pendentes',
      value: pedidosPendentes,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Taxa Ocupação',
      value: `${Math.round((mesasOcupadas / mesas.length) * 100)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const alertas = [
    'Estoque de refrigerante baixo (5 unidades)',
    'Mesa 8 aguardando há 15 minutos',
    'Pedido #123 pronto para entrega'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral das operações do restaurante</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estatisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status das Mesas */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Status das Mesas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mesasLivres}</div>
                  <div className="text-sm text-gray-600">Livres</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{mesasOcupadas}</div>
                  <div className="text-sm text-gray-600">Ocupadas</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {mesas.filter(m => m.status !== 'livre').slice(0, 3).map(mesa => (
                  <div key={mesa.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        mesa.status === 'ocupada' ? 'bg-amber-400' :
                        mesa.status === 'aguardando' ? 'bg-blue-400' : 'bg-red-400'
                      }`} />
                      <span className="font-medium">Mesa {mesa.numero}</span>
                    </div>
                    <span className="text-sm text-gray-600 capitalize">{mesa.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Alertas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{alerta}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
