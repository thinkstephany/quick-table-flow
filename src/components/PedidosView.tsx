
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pedido, Mesa, ItemCardapio } from '@/types';
import { ClipboardList, Clock, CheckCircle, Eye, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PedidosViewProps {
  pedidos: Pedido[];
  mesas: Mesa[];
  cardapio: ItemCardapio[];
  onPedidoUpdate: (pedidoId: number, status: Pedido['status']) => void;
}

const PedidosView = ({ pedidos, mesas, cardapio, onPedidoUpdate }: PedidosViewProps) => {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [busca, setBusca] = useState('');

  const getStatusColor = (status: Pedido['status']) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-500';
      case 'preparando': return 'bg-blue-500';
      case 'pronto': return 'bg-green-500';
      case 'entregue': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Pedido['status']) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'preparando': return 'Preparando';
      case 'pronto': return 'Pronto';
      case 'entregue': return 'Entregue';
      default: return 'Desconhecido';
    }
  };

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus;
    const mesa = mesas.find(m => m.id === pedido.mesaId);
    const matchBusca = mesa?.numero.toString().includes(busca) || 
                      pedido.garcom.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const statusCounts = {
    pendente: pedidos.filter(p => p.status === 'pendente').length,
    preparando: pedidos.filter(p => p.status === 'preparando').length,
    pronto: pedidos.filter(p => p.status === 'pronto').length,
    entregue: pedidos.filter(p => p.status === 'entregue').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
          <p className="text-gray-600">Acompanhe e gerencie todos os pedidos do restaurante</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      {/* Resumo dos Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pendente}</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.preparando}</div>
            <div className="text-sm text-gray-600">Preparando</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.pronto}</div>
            <div className="text-sm text-gray-600">Prontos</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.entregue}</div>
            <div className="text-sm text-gray-600">Entregues</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por mesa ou garçom..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['todos', 'pendente', 'preparando', 'pronto', 'entregue'].map(status => (
            <Button
              key={status}
              variant={filtroStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroStatus(status)}
            >
              {status === 'todos' ? 'Todos' : getStatusLabel(status as Pedido['status'])}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Pedidos ({pedidosFiltrados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Mesa</TableHead>
                <TableHead>Garçom</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.map((pedido) => {
                const mesa = mesas.find(m => m.id === pedido.mesaId);
                return (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">#{pedido.id}</TableCell>
                    <TableCell>Mesa {mesa?.numero || 'N/A'}</TableCell>
                    <TableCell>{pedido.garcom}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {pedido.horario}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(pedido.status)} text-white`}>
                        {getStatusLabel(pedido.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      R$ {pedido.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalhes do Pedido #{pedido.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Mesa:</span>
                                  <div className="font-medium">Mesa {mesa?.numero}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Garçom:</span>
                                  <div className="font-medium">{pedido.garcom}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Horário:</span>
                                  <div className="font-medium">{pedido.horario}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Status:</span>
                                  <Badge className={`${getStatusColor(pedido.status)} text-white`}>
                                    {getStatusLabel(pedido.status)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500">Total:</span>
                                  <span className="text-lg font-bold text-green-600">
                                    R$ {pedido.total.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {pedido.status !== 'entregue' && (
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => {
                              const nextStatus = 
                                pedido.status === 'pendente' ? 'preparando' :
                                pedido.status === 'preparando' ? 'pronto' : 'entregue';
                              onPedidoUpdate(pedido.id, nextStatus);
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {pedidosFiltrados.length === 0 && (
            <div className="text-center py-8">
              <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600">Ajuste os filtros ou aguarde novos pedidos.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidosView;
