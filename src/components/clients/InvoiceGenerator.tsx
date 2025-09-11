
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Send, Calendar } from "lucide-react";
import { Client, Invoice } from "@/types/client";

interface InvoiceGeneratorProps {
  clients: Client[];
  onInvoiceGenerated: (invoice: Invoice) => void;
}

export function InvoiceGenerator({ clients, onInvoiceGenerated }: InvoiceGeneratorProps) {
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [invoiceData, setInvoiceData] = useState({
    dueDate: "",
    notes: "",
    customAmount: ""
  });

  const selectedClient = clients.find(c => c.id === selectedClientId);
  const selectedProperty = selectedClient?.properties.find(p => p.id === selectedPropertyId);

  const generateInvoice = () => {
    if (!selectedClient || !selectedProperty) return;

    const totalAmount = selectedProperty.services
      .filter(s => s.isActive)
      .reduce((total, service) => total + service.rate, 0);

    const invoice: Invoice = {
      id: `INV-${Date.now()}`,
      invoiceNumber: `FAC-${Date.now()}`,
      clientId: selectedClient.id,
      propertyId: selectedProperty.id,
      services: selectedProperty.services.filter(s => s.isActive),
      amount: invoiceData.customAmount ? parseFloat(invoiceData.customAmount) : totalAmount,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      generatedAutomatically: false
    };

    onInvoiceGenerated(invoice);
    
    // Reset form
    setSelectedClientId("");
    setSelectedPropertyId("");
    setInvoiceData({
      dueDate: "",
      notes: "",
      customAmount: ""
    });
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generador de Facturas
        </CardTitle>
        <CardDescription className="text-green-100">
          Genere facturas personalizadas para clientes y servicios
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="client" className="text-green-800 font-semibold">Seleccionar Cliente</Label>
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger className="border-green-300 focus:ring-green-500">
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.clientId} - {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClient && (
            <div className="space-y-2">
              <Label htmlFor="property" className="text-green-800 font-semibold">Seleccionar Propiedad</Label>
              <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                <SelectTrigger className="border-green-300 focus:ring-green-500">
                  <SelectValue placeholder="Seleccionar propiedad" />
                </SelectTrigger>
                <SelectContent>
                  {selectedClient.properties.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.propertyId} - {property.address.street} {property.address.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {selectedProperty && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Servicios Activos</h4>
              <div className="space-y-2">
                {selectedProperty.services.filter(s => s.isActive).map(service => (
                  <div key={service.id} className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="font-medium">{service.type.replace('_', ' ').toUpperCase()}</span>
                    <span className="text-green-700 font-semibold">${service.rate}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center bg-green-100 p-2 rounded border border-green-300 font-bold">
                  <span>TOTAL</span>
                  <span className="text-green-800">
                    ${selectedProperty.services.filter(s => s.isActive).reduce((total, service) => total + service.rate, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-green-800 font-semibold">Fecha de Vencimiento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                  className="border-green-300 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAmount" className="text-green-800 font-semibold">Monto Personalizado (Opcional)</Label>
                <Input
                  id="customAmount"
                  type="number"
                  step="0.01"
                  placeholder="Dejar vacío para usar total automático"
                  value={invoiceData.customAmount}
                  onChange={(e) => setInvoiceData({...invoiceData, customAmount: e.target.value})}
                  className="border-green-300 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-green-800 font-semibold">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Notas o comentarios para la factura..."
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                className="border-green-300 focus:ring-green-500"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={generateInvoice}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generar Factura
              </Button>
              
              <Button 
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
              
              <Button 
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
