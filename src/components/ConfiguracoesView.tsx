
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Store, 
  Bell, 
  Printer, 
  CreditCard, 
  Users, 
  Save,
  Download,
  Upload,
  Trash2
} from 'lucide-react';

const ConfiguracoesView = () => {
  const [configuracoes, setConfiguracoes] = useState({
    restaurante: {
      nome: 'Restaurante Exemplo',
      endereco: 'Rua das Flores, 123',
      telefone: '(11) 99999-9999',
      email: 'contato@restaurante.com',
      cnpj: '12.345.678/0001-90'
    },
    sistema: {
      notificacoesSonoras: true,
      impressaoAutomatica: false,
      tempoLimiteAtendimento: 30,
      percentualTaxa: 10
    },
    aparencia: {
      tema: 'claro',
      idioma: 'pt-BR',
      mostraLogotipos: true
    }
  });

  const handleSave = () => {
    console.log('Configurações salvas:', configuracoes);
    // Aqui seria implementada a lógica de salvamento
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setConfiguracoes(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações do sistema e do restaurante</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="restaurante" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="restaurante" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Restaurante
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="integracoes" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Backup
          </TabsTrigger>
        </TabsList>

        {/* Configurações do Restaurante */}
        <TabsContent value="restaurante">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Informações do Restaurante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Restaurante</Label>
                  <Input
                    id="nome"
                    value={configuracoes.restaurante.nome}
                    onChange={(e) => handleInputChange('restaurante', 'nome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={configuracoes.restaurante.telefone}
                    onChange={(e) => handleInputChange('restaurante', 'telefone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracoes.restaurante.email}
                    onChange={(e) => handleInputChange('restaurante', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={configuracoes.restaurante.cnpj}
                    onChange={(e) => handleInputChange('restaurante', 'cnpj', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input
                  id="endereco"
                  value={configuracoes.restaurante.endereco}
                  onChange={(e) => handleInputChange('restaurante', 'endereco', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações do Sistema */}
        <TabsContent value="sistema">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Sonoras</Label>
                    <p className="text-sm text-gray-600">
                      Ativar sons para novos pedidos e alertas
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.sistema.notificacoesSonoras}
                    onCheckedChange={(checked) => 
                      handleInputChange('sistema', 'notificacoesSonoras', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Impressão Automática</Label>
                    <p className="text-sm text-gray-600">
                      Imprimir pedidos automaticamente na cozinha
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.sistema.impressaoAutomatica}
                    onCheckedChange={(checked) => 
                      handleInputChange('sistema', 'impressaoAutomatica', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tempoLimite">Tempo Limite de Atendimento (min)</Label>
                    <Input
                      id="tempoLimite"
                      type="number"
                      min="5"
                      max="120"
                      value={configuracoes.sistema.tempoLimiteAtendimento}
                      onChange={(e) => 
                        handleInputChange('sistema', 'tempoLimiteAtendimento', parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxa">Taxa de Serviço (%)</Label>
                    <Input
                      id="taxa"
                      type="number"
                      min="0"
                      max="20"
                      value={configuracoes.sistema.percentualTaxa}
                      onChange={(e) => 
                        handleInputChange('sistema', 'percentualTaxa', parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { id: 'novoPedido', label: 'Novo Pedido', desc: 'Notificar quando um novo pedido for recebido' },
                  { id: 'pedidoPronto', label: 'Pedido Pronto', desc: 'Notificar quando um pedido estiver pronto' },
                  { id: 'estoqueMinimo', label: 'Estoque Mínimo', desc: 'Alertar quando itens atingirem estoque mínimo' },
                  { id: 'mesaLiberada', label: 'Mesa Liberada', desc: 'Notificar quando uma mesa for liberada' }
                ].map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label>{notif.label}</Label>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrações */}
        <TabsContent value="integracoes">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  Impressoras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Impressora da Cozinha</h4>
                      <p className="text-sm text-gray-600">HP LaserJet Pro - Conectada</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">Conectada</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Impressora do Caixa</h4>
                      <p className="text-sm text-gray-600">Epson TM-T20 - Desconectada</p>
                    </div>
                    <Badge variant="secondary">Desconectada</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Métodos de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { nome: 'Dinheiro', ativo: true },
                    { nome: 'Cartão de Débito', ativo: true },
                    { nome: 'Cartão de Crédito', ativo: true },
                    { nome: 'PIX', ativo: true },
                    { nome: 'Vale Refeição', ativo: false }
                  ].map((metodo) => (
                    <div key={metodo.nome} className="flex items-center justify-between">
                      <Label>{metodo.nome}</Label>
                      <Switch defaultChecked={metodo.ativo} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup e Dados */}
        <TabsContent value="backup">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Backup e Restauração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Download className="h-6 w-6" />
                    <span>Fazer Backup</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6" />
                    <span>Restaurar Backup</span>
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Últimos Backups</h4>
                  <div className="space-y-2">
                    {[
                      { data: '2024-06-12', tamanho: '2.4 MB' },
                      { data: '2024-06-11', tamanho: '2.3 MB' },
                      { data: '2024-06-10', tamanho: '2.1 MB' }
                    ].map((backup) => (
                      <div key={backup.data} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <span className="font-medium">{backup.data}</span>
                          <span className="text-sm text-gray-600 ml-2">({backup.tamanho})</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesView;
