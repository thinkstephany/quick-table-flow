
import React, { useState } from 'react';
import { Home, Users, ClipboardList, Package, BarChart3, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Layout = ({ children, activeView, onViewChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'mesas', label: 'Mesas', icon: Users },
    { id: 'pedidos', label: 'Pedidos', icon: ClipboardList },
    { id: 'cardapio', label: 'Cardápio', icon: Package },
    { id: 'estoque', label: 'Estoque', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } lg:w-64 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`transition-opacity duration-200 ${sidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0'}`}>
              <h1 className="text-xl font-bold text-primary">MesaFácil</h1>
              <p className="text-sm text-muted-foreground">Gestão de Restaurante</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${
                      isActive ? 'bg-primary text-primary-foreground' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className={`transition-opacity duration-200 ${
                      sidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 hidden lg:block'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center space-x-3 ${
            sidebarOpen || window.innerWidth >= 1024 ? '' : 'justify-center lg:justify-start'
          }`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">G</span>
            </div>
            <div className={`transition-opacity duration-200 ${
              sidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 hidden lg:block'
            }`}>
              <p className="text-sm font-medium">Gerente</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
