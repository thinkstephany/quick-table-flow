
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mesa } from '@/types';

interface MesaCadastroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMesaAdd: (mesa: Omit<Mesa, 'id'>) => void;
  mesas: Mesa[];
}

const MesaCadastroModal = ({ open, onOpenChange, onMesaAdd, mesas }: MesaCadastroModalProps) => {
  const [novaMesa, setNovaMesa] = useState({
    numero: '',
    capacidade: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numeroMesa = parseInt(novaMesa.numero);
    const capacidadeMesa = parseInt(novaMesa.capacidade);
    
    // Verificar se o número da mesa já existe
    const mesaExiste = mesas.some(mesa => mesa.numero === numeroMesa);
    if (mesaExiste) {
      alert('Já existe uma mesa com este número!');
      return;
    }

    onMesaAdd({
      numero: numeroMesa,
      capacidade: capacidadeMesa,
      status: 'livre'
    });

    setNovaMesa({
      numero: '',
      capacidade: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Mesa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero">Número da Mesa</Label>
            <Input
              id="numero"
              type="number"
              min="1"
              value={novaMesa.numero}
              onChange={(e) => setNovaMesa({...novaMesa, numero: e.target.value})}
              placeholder="Ex: 15"
              required
            />
          </div>
          <div>
            <Label htmlFor="capacidade">Capacidade (pessoas)</Label>
            <Input
              id="capacidade"
              type="number"
              min="1"
              max="20"
              value={novaMesa.capacidade}
              onChange={(e) => setNovaMesa({...novaMesa, capacidade: e.target.value})}
              placeholder="Ex: 4"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Mesa</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MesaCadastroModal;
