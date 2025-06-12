
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ItemCardapio } from '@/types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CardapioViewProps {
  cardapio: ItemCardapio[];
  onItemUpdate: (item: ItemCardapio) => void;
}

const CardapioView = ({ cardapio, onItemUpdate }: CardapioViewProps) => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [busca, setBusca] = useState('');

  const categorias = ['todos', ...Array.from(new Set(cardapio.map(item => item.categoria)))];
  
  const itensFilterted = cardapio.filter(item => {
    const matchCategoria = filtroCategoria === 'todos' || item.categoria === filtroCategoria;
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cardápio</h1>
          <p className="text-gray-600">Gerencie os itens do seu cardápio</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar item..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categorias.map(categoria => (
            <Button
              key={categoria}
              variant={filtroCategoria === categoria ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroCategoria(categoria)}
            >
              {categoria === 'todos' ? 'Todas' : categoria}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {itensFilterted.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              {item.imagem ? (
                <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="text-4xl">🍽️</div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{item.nome}</CardTitle>
                <Badge variant={item.disponivel ? "default" : "secondary"}>
                  {item.disponivel ? 'Disponível' : 'Indisponível'}
                </Badge>
              </div>
              <Badge variant="outline" className="w-fit">
                {item.categoria}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {item.descricao}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  R$ {item.preco.toFixed(2)}
                </span>
                
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {itensFilterted.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou adicione novos itens ao cardápio.</p>
        </div>
      )}
    </div>
  );
};

export default CardapioView;
