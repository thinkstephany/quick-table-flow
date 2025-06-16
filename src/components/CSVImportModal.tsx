
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { validateCSVFile, parseCSV } from '@/utils/csvUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CSVImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: any[]) => void;
  title: string;
  expectedHeaders?: string[];
}

const CSVImportModal = ({ 
  open, 
  onOpenChange, 
  onImport, 
  title, 
  expectedHeaders = [] 
}: CSVImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setLoading(true);

    try {
      const csvText = await validateCSVFile(selectedFile);
      const parsedData = parseCSV(csvText);
      
      if (parsedData.length === 0) {
        setError('O arquivo CSV está vazio ou não possui dados válidos');
        return;
      }

      // Validate headers if provided
      if (expectedHeaders.length > 0) {
        const fileHeaders = Object.keys(parsedData[0]);
        const missingHeaders = expectedHeaders.filter(h => !fileHeaders.includes(h));
        
        if (missingHeaders.length > 0) {
          setError(`Colunas obrigatórias não encontradas: ${missingHeaders.join(', ')}`);
          return;
        }
      }

      setFile(selectedFile);
      setCsvData(parsedData);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (csvData.length > 0) {
      onImport(csvData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setCsvData([]);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Selecionar arquivo CSV</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>

          {expectedHeaders.length > 0 && (
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Colunas esperadas:</p>
              <div className="flex flex-wrap gap-1">
                {expectedHeaders.map(header => (
                  <span key={header} className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {header}
                  </span>
                ))}
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {csvData.length > 0 && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <FileText className="h-4 w-4" />
                <span className="font-medium">
                  Arquivo válido: {csvData.length} registros encontrados
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={csvData.length === 0 || loading}
            >
              {loading ? 'Processando...' : 'Importar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportModal;
