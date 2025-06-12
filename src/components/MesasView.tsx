import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mesa, MesaStatus } from '@/types';
import { Users, Clock, DollarSign, Plus } from 'lucide-react';
import MesaCadastroModal from './MesaCadastroModal';

interface MesasViewProps {
  mesas: Mesa[];
  onMesaUpdate: (mesaId: number, updates: Partial<Mesa>) => void;
  onMesaAdd: (mesa: Omit<Mesa, 'id'>) => void;
}

const MesasView = ({ mesas, onMesaUpdate, onMesaAdd }: MesasViewProps) => {
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);

  const handleStatusChange = (mesa: Mesa, novoStatus: MesaStatus) => {
    const updates: Partial<Mesa> = { status: novoStatus };
    
    if (novoStatus === 'ocupada' && mesa.status === 'livre') {
      updates.horaAbertura = new Date().toLocaleTimeString();
      updates.garcom = 'João Silva'; // Em um app real, seria selecionado
    } else if (novoStatus === 'livre') {
      updates.horaAbertura = undefined;
      updates.garcom = undefined;
      updates.totalConta = undefined;
    }
    
    onMesaUpdate(mesa.id, updates);
    setMesaSelecionada(null);
  };

  const getStatusColor = (status: MesaStatus) => {
    switch (status) {
      case 'livre': return 'mesa-status-livre';
      case 'ocupada': return 'mesa-status-ocupada';
      case 'aguardando': return 'mesa-status-aguardando';
      case 'atendimento': return 'mesa-status-atendimento';
      default: return 'mesa-status-livre';
    }
  };

  const getStatusLabel = (status: MesaStatus) => {
    switch (status) {
      case 'livre': return 'Livre';
      case 'ocupada': return 'Ocupada';
      case 'aguardando': return 'Aguardando';
      case 'atendimento': return 'Atendimento';
      default: return 'Livre';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Mesas</h1>
          <p className="text-gray-600">Controle o status e ocupação das mesas</p>
        </div>
        <Button 
          onClick={() => setModalCadastroOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Mesa
        </Button>
      </div>

      {/* Grid de Mesas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {mesas.map((mesa) => (
          <Dialog key={mesa.id}>
            <DialogTrigger asChild>
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${getStatusColor(mesa.status)}`}
                onClick={() => setMesaSelecionada(mesa)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-lg font-bold">Mesa {mesa.numero}</div>
                  <div className="text-sm opacity-80 mb-2">{getStatusLabel(mesa.status)}</div>
                  <div className="text-xs opacity-60">{mesa.capacidade} pessoas</div>
                  
                  {mesa.status !== 'livre' && (
                    <div className="mt-2 pt-2 border-t border-current/20">
                      {mesa.garcom && (
                        <div className="text-xs opacity-80">{mesa.garcom}</div>
                      )}
                      {mesa.horaAbertura && (
                        <div className="text-xs opacity-60">{mesa.horaAbertura}</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Mesa {mesa.numero}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Capacidade:</span>
                    <div className="font-medium">{mesa.capacidade} pessoas</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <div className="font-medium capitalize">{getStatusLabel(mesa.status)}</div>
                  </div>
                  {mesa.garcom && (
                    <div>
                      <span className="text-gray-500">Garçom:</span>
                      <div className="font-medium">{mesa.garcom}</div>
                    </div>
                  )}
                  {mesa.horaAbertura && (
                    <div>
                      <span className="text-gray-500">Aberta às:</span>
                      <div className="font-medium">{mesa.horaAbertura}</div>
                    </div>
                  )}
                </div>

                {mesa.totalConta && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Total da Conta:</span>
                      <span className="text-lg font-bold text-green-600">
                        R$ {mesa.totalConta.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {mesa.status === 'livre' ? (
                    <Button 
                      onClick={() => handleStatusChange(mesa, 'ocupada')}
                      className="bg-amber-500 hover:bg-amber-600"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Ocupar Mesa
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={() => handleStatusChange(mesa, 'livre')}
                        variant="outline"
                      >
                        Liberar Mesa
                      </Button>
                      <Button 
                        onClick={() => handleStatusChange(mesa, 'aguardando')}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Aguardando
                      </Button>
                    </>
                  )}
                </div>

                {mesa.status !== 'livre' && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {/* Abrir pedidos */}}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Ver Pedidos
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Resumo */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {['livre', 'ocupada', 'aguardando', 'atendimento'].map((status) => {
          const count = mesas.filter(m => m.status === status).length;
          return (
            <Card key={status} className={`${getStatusColor(status as MesaStatus)}`}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm capitalize">{getStatusLabel(status as MesaStatus)}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <MesaCadastroModal
        open={modalCadastroOpen}
        onOpenChange={setModalCadastroOpen}
        onMesaAdd={onMesaAdd}
        mesas={mesas}
      />
    </div>
  );
};

export default MesasView;
