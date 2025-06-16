import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ItemEstoque } from '@/types';
import { Plus, Package, AlertTriangle, Download, Upload } from 'lucide-react';
import EstoqueCadastroModal from './EstoqueCadastroModal';
import CSVImportModal from './CSVImportModal';
import { exportToCSV } from '@/utils/csvUtils';

interface EstoqueViewProps {
  estoque: ItemEstoque[];
  onItemAdd: (item: Omit<ItemEstoque, 'id'>) => void;
}

const EstoqueView = ({ estoque, onItemAdd }: EstoqueViewProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const itensEmFalta = estoque.filter(item => item.quantidade <= item.estoqueMinimo);
  const valorTotalEstoque = estoque.reduce((total, item) => total + (item.quantidade * item.preco), 0);

  const handleExportCSV = () => {
    const exportData = estoque.map(item => ({
      nome: item.nome,
      categoria: item.categoria,
      quantidade: item.quantidade,
      unidade: item.unidade,
      estoqueMinimo: item.estoqueMinimo,
      preco: item.preco,
      valorTotal: (item.quantidade * item.preco).toFixed(2)
    }));

    exportToCSV({
      filename: `estoque_${new Date().toISOString().split('T')[0]}`,
      data: exportData,
      headers: ['nome', 'categoria', 'quantidade', 'unidade', 'estoqueMinimo', 'preco', 'valorTotal']
    });
  };

  const handleImportCSV = (data: any[]) => {
    data.forEach(row => {
      const item = {
        nome: row.nome || '',
        categoria: row.categoria || 'Outros',
        quantidade: parseFloat(row.quantidade) || 0,
        unidade: row.unidade || 'un',
        estoqueMinimo: parseFloat(row.estoqueMinimo) || 0,
        preco: parseFloat(row.preco) || 0
      };
      onItemAdd(item);
    });
  };

  const getCategoriaColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      'Carnes': 'bg-red-100 text-red-800',
      'Vegetais': 'bg-green-100 text-green-800',
      'Laticínios': 'bg-blue-100 text-blue-800',
      'Temperos': 'bg-yellow-100 text-yellow-800',
      'Bebidas': 'bg-purple-100 text-purple-800',
      'Grãos': 'bg-amber-100 text-amber-800',
      'Frutas': 'bg-pink-100 text-pink-800',
      'Limpeza': 'bg-gray-100 text-gray-800',
      'Outros': 'bg-indigo-100 text-indigo-800'
    };
    return colors[categoria] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600">Gerencie ingredientes e suprimentos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV} disabled={estoque.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline" onClick={() => setImportModalOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Importar CSV
          </Button>
          <Button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Item
          </Button>
        </div>
      </div>

      {/* Alertas de Estoque Baixo */}
      {itensEmFalta.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Atenção: {itensEmFalta.length} itens com estoque baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {itensEmFalta.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded">
                  <span className="font-medium">{item.nome}</span>
                  <Badge variant="outline" className="text-orange-700">
                    {item.quantidade} {item.unidade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{estoque.length}</div>
            <div className="text-sm text-gray-600">Itens Cadastrados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{itensEmFalta.length}</div>
            <div className="text-sm text-gray-600">Estoque Baixo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              R$ {valorTotalEstoque.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Valor Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(estoque.map(i => i.categoria)).size}
            </div>
            <div className="text-sm text-gray-600">Categorias</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {estoque.map((item) => {
          const percentualEstoque = (item.quantidade / item.estoqueMinimo) * 100;
          const statusEstoque = item.quantidade <= item.estoqueMinimo ? 'baixo' : 'normal';
          
          return (
            <Card key={item.id} className={`hover:shadow-lg transition-shadow ${
              statusEstoque === 'baixo' ? 'border-orange-200' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.nome}</CardTitle>
                  <Badge className={getCategoriaColor(item.categoria)}>
                    {item.categoria}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quantidade:</span>
                  <div className="flex items-center space-x-1">
                    <span className={`font-bold ${statusEstoque === 'baixo' ? 'text-orange-600' : 'text-gray-900'}`}>
                      {item.quantidade}
                    </span>
                    <span className="text-sm text-gray-500">{item.unidade}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estoque mín.:</span>
                  <span className="text-sm text-gray-500">
                    {item.estoqueMinimo} {item.unidade}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Preço unit.:</span>
                  <span className="font-medium">R$ {item.preco.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Valor total:</span>
                  <span className="font-bold text-green-600">
                    R$ {(item.quantidade * item.preco).toFixed(2)}
                  </span>
                </div>

                {statusEstoque === 'baixo' && (
                  <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 p-2 rounded">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Estoque baixo!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <EstoqueCadastroModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onItemAdd={onItemAdd}
      />

      <CSVImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImportCSV}
        title="Importar Estoque do CSV"
        expectedHeaders={['nome', 'categoria', 'quantidade', 'unidade', 'estoqueMinimo', 'preco']}
      />
    </div>
  );
};

export default EstoqueView;
