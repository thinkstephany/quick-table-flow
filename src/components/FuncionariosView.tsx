
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Funcionario, Turno } from '@/types';
import { Plus, Users, Clock, User, Phone, Mail, Calendar } from 'lucide-react';

interface FuncionariosViewProps {
  funcionarios: Funcionario[];
  turnos: Turno[];
  onFuncionarioAdd: (funcionario: Omit<Funcionario, 'id'>) => void;
  onTurnoStart: (funcionarioId: number) => void;
  onTurnoEnd: (turnoId: number) => void;
}

const FuncionariosView = ({ funcionarios, turnos, onFuncionarioAdd, onTurnoStart, onTurnoEnd }: FuncionariosViewProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    cargo: 'garcom' as const,
    telefone: '',
    email: '',
    ativo: true,
    dataAdmissao: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFuncionarioAdd(novoFuncionario);
    setNovoFuncionario({
      nome: '',
      cargo: 'garcom',
      telefone: '',
      email: '',
      ativo: true,
      dataAdmissao: new Date().toISOString().split('T')[0]
    });
    setDialogOpen(false);
  };

  const getTurnoAtivo = (funcionarioId: number) => {
    return turnos.find(t => t.funcionarioId === funcionarioId && t.status === 'ativo');
  };

  const getCargoColor = (cargo: string) => {
    switch (cargo) {
      case 'garcom': return 'bg-blue-100 text-blue-800';
      case 'cozinheiro': return 'bg-green-100 text-green-800';
      case 'gerente': return 'bg-purple-100 text-purple-800';
      case 'caixa': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Funcionários</h1>
          <p className="text-gray-600">Controle de equipe e turnos de trabalho</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Funcionário</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={novoFuncionario.nome}
                  onChange={(e) => setNovoFuncionario({...novoFuncionario, nome: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Select value={novoFuncionario.cargo} onValueChange={(value: any) => setNovoFuncionario({...novoFuncionario, cargo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garcom">Garçom</SelectItem>
                    <SelectItem value="cozinheiro">Cozinheiro</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="caixa">Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={novoFuncionario.telefone}
                  onChange={(e) => setNovoFuncionario({...novoFuncionario, telefone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoFuncionario.email}
                  onChange={(e) => setNovoFuncionario({...novoFuncionario, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                <Input
                  id="dataAdmissao"
                  type="date"
                  value={novoFuncionario.dataAdmissao}
                  onChange={(e) => setNovoFuncionario({...novoFuncionario, dataAdmissao: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Funcionários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funcionarios.map((funcionario) => {
          const turnoAtivo = getTurnoAtivo(funcionario.id);
          
          return (
            <Card key={funcionario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{funcionario.nome}</CardTitle>
                  <Badge className={getCargoColor(funcionario.cargo)}>
                    {funcionario.cargo}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{funcionario.telefone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{funcionario.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Desde {new Date(funcionario.dataAdmissao).toLocaleDateString()}</span>
                </div>
                
                {turnoAtivo ? (
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Em turno
                      </Badge>
                      <span className="text-sm text-gray-600">
                        desde {turnoAtivo.horaInicio}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onTurnoEnd(turnoAtivo.id)}
                    >
                      Finalizar Turno
                    </Button>
                  </div>
                ) : (
                  <div className="pt-3 border-t">
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => onTurnoStart(funcionario.id)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Iniciar Turno
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{funcionarios.length}</div>
            <div className="text-sm text-gray-600">Total Funcionários</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {turnos.filter(t => t.status === 'ativo').length}
            </div>
            <div className="text-sm text-gray-600">Em Turno</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {funcionarios.filter(f => f.cargo === 'garcom').length}
            </div>
            <div className="text-sm text-gray-600">Garçons</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {funcionarios.filter(f => f.cargo === 'cozinheiro').length}
            </div>
            <div className="text-sm text-gray-600">Cozinheiros</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FuncionariosView;
