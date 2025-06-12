
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemEstoque } from '@/types';

interface EstoqueCadastroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemAdd: (item: Omit<ItemEstoque, 'id'>) => void;
}

const EstoqueCadastroModal = ({ open, onOpenChange, onItemAdd }: EstoqueCadastroModalProps) => {
  const [novoItem, setNovoItem] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    unidade: '',
    estoqueMinimo: '',
    preco: '',
  });

  const categorias = [
    'Carnes',
    'Vegetais',
    'Laticínios',
    'Temperos',
    'Bebidas',
    'Grãos',
    'Frutas',
    'Limpeza',
    'Outros'
  ];

  const unidades = [
    'kg',
    'g',
    'L',
    'mL',
    'un',
    'pct',
    'cx',
    'dz'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onItemAdd({
      nome: novoItem.nome,
      categoria: novoItem.categoria,
      quantidade: parseFloat(novoItem.quantidade),
      unidade: novoItem.unidade,
      estoqueMinimo: parseFloat(novoItem.estoqueMinimo),
      preco: parseFloat(novoItem.preco),
    });

    setNovoItem({
      nome: '',
      categoria: '',
      quantidade: '',
      unidade: '',
      estoqueMinimo: '',
      preco: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar Item no Estoque</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Item</Label>
            <Input
              id="nome"
              value={novoItem.nome}
              onChange={(e) => setNovoItem({...novoItem, nome: e.target.value})}
              placeholder="Ex: Filé de Frango"
              required
            />
          </div>
          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={novoItem.categoria} onValueChange={(value) => setNovoItem({...novoItem, categoria: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                step="0.01"
                min="0"
                value={novoItem.quantidade}
                onChange={(e) => setNovoItem({...novoItem, quantidade: e.target.value})}
                placeholder="Ex: 10"
                required
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select value={novoItem.unidade} onValueChange={(value) => setNovoItem({...novoItem, unidade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Un." />
                </SelectTrigger>
                <SelectContent>
                  {unidades.map((unidade) => (
                    <SelectItem key={unidade} value={unidade}>
                      {unidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="estoqueMinimo">Estoque Mínimo</Label>
            <Input
              id="estoqueMinimo"
              type="number"
              step="0.01"
              min="0"
              value={novoItem.estoqueMinimo}
              onChange={(e) => setNovoItem({...novoItem, estoqueMinimo: e.target.value})}
              placeholder="Ex: 2"
              required
            />
          </div>
          <div>
            <Label htmlFor="preco">Preço Unitário (R$)</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              value={novoItem.preco}
              onChange={(e) => setNovoItem({...novoItem, preco: e.target.value})}
              placeholder="Ex: 25.90"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EstoqueCadastroModal;
