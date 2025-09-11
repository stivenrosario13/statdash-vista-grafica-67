
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Send, Calendar, Filter, PrinterIcon } from "lucide-react";
import { Client, Invoice } from "@/types/client";
import { useToast } from "@/hooks/use-toast";

interface BulkInvoiceGeneratorProps {
  clients: Client[];
  invoices: Invoice[];
  onBulkInvoicesGenerated: (invoices: Invoice[]) => void;
}

export function BulkInvoiceGenerator({ clients, invoices, onBulkInvoicesGenerated }: BulkInvoiceGeneratorProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedClients(clients.map(c => c.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleClientSelect = (clientId: string, checked: boolean) => {
    if (checked) {
      setSelectedClients([...selectedClients, clientId]);
    } else {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
      setSelectAll(false);
    }
  };

  const generateBulkInvoices = () => {
    if (!selectedDate || selectedClients.length === 0) {
      toast({
        title: "Error",
        description: "Seleccione una fecha y al menos un cliente.",
        variant: "destructive"
      });
      return;
    }

    const newInvoices: Invoice[] = [];
    
    selectedClients.forEach(clientId => {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      client.properties.forEach(property => {
        const activeServices = property.services.filter(s => s.isActive);
        if (activeServices.length === 0) return;

        const totalAmount = activeServices.reduce((total, service) => total + service.rate, 0);

        const invoice: Invoice = {
          id: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          invoiceNumber: `FAC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
          clientId: client.id,
          propertyId: property.id,
          services: activeServices,
          amount: totalAmount,
          issueDate: selectedDate,
          dueDate: new Date(new Date(selectedDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          generatedAutomatically: true
        };

        newInvoices.push(invoice);
      });
    });

    onBulkInvoicesGenerated(newInvoices);
    toast({
      title: "Facturas Generadas",
      description: `Se generaron ${newInvoices.length} facturas exitosamente.`,
    });

    // Reset form
    setSelectedDate("");
    setSelectedClients([]);
    setSelectAll(false);
  };

  const filterInvoicesByDate = () => {
    if (!selectedDate) return [];
    return invoices.filter(inv => inv.issueDate === selectedDate);
  };

  const printBulkInvoices = () => {
    const filteredInvoices = filterInvoicesByDate();
    if (filteredInvoices.length === 0) {
      toast({
        title: "Sin facturas",
        description: "No hay facturas para la fecha seleccionada.",
        variant: "destructive"
      });
      return;
    }

    // Simular impresión
    window.print();
    toast({
      title: "Imprimiendo",
      description: `Imprimiendo ${filteredInvoices.length} facturas.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generación Masiva de Facturas
          </CardTitle>
          <CardDescription className="text-purple-100">
            Genere múltiples facturas simultáneamente para fechas específicas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate" className="text-purple-800 font-semibold">Fecha de Facturación</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-purple-300 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-800 font-semibold">Facturas Existentes para esta Fecha</Label>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <Badge variant="outline" className="text-purple-700">
                  {selectedDate ? filterInvoicesByDate().length : 0} facturas encontradas
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-purple-800 font-semibold">Seleccionar Clientes</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll" className="text-sm text-purple-700">
                  Seleccionar todos ({clients.length})
                </Label>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {clients.map(client => (
                  <div key={client.id} className="flex items-center space-x-2 bg-white p-2 rounded border">
                    <Checkbox
                      id={client.id}
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={(checked) => handleClientSelect(client.id, checked as boolean)}
                    />
                    <Label htmlFor={client.id} className="text-sm cursor-pointer flex-1">
                      {client.clientId} - {client.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-800">Clientes seleccionados:</span>
                <Badge className="bg-purple-600">{selectedClients.length}</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={generateBulkInvoices}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              disabled={!selectedDate || selectedClients.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generar Facturas Masivas
            </Button>
            
            <Button 
              onClick={printBulkInvoices}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
              disabled={!selectedDate}
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              Imprimir por Fecha
            </Button>
            
            <Button 
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedDate && filterInvoicesByDate().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Facturas del {selectedDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filterInvoicesByDate().map(invoice => {
                const client = clients.find(c => c.id === invoice.clientId);
                return (
                  <div key={invoice.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                    <div>
                      <span className="font-medium">{invoice.invoiceNumber}</span>
                      <span className="text-gray-600 ml-2">{client?.name}</span>
                    </div>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      ${invoice.amount}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
