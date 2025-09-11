
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Printer, FileText, Eye } from "lucide-react";
import { Client, Invoice } from "@/types/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AccountStatementProps {
  clients: Client[];
  invoices: Invoice[];
}

export function AccountStatement({ clients, invoices }: AccountStatementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.rnc?.includes(searchTerm) ||
    client.documentId?.includes(searchTerm)
  );

  const getClientInvoices = (clientId: string) => {
    return invoices.filter(invoice => invoice.clientId === clientId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid": return "Pagada";
      case "pending": return "Pendiente";
      case "overdue": return "Vencida";
      default: return status;
    }
  };

  const printClientStatement = (client: Client) => {
    const clientInvoices = getClientInvoices(client.id);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Estado de Cuenta - ${client.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .client-info { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>SR Estadísticas</h1>
              <h2>Estado de Cuenta del Cliente</h2>
            </div>
            <div class="client-info">
              <p><strong>Cliente:</strong> ${client.name}</p>
              <p><strong>ID Cliente:</strong> ${client.clientId}</p>
              <p><strong>Teléfono:</strong> ${client.phone}</p>
              <p><strong>Email:</strong> ${client.email}</p>
              <p><strong>Gestor:</strong> ${client.manager}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Número de Factura</th>
                  <th>Fecha de Emisión</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${clientInvoices.map(invoice => `
                  <tr>
                    <td>${invoice.invoiceNumber}</td>
                    <td>${new Date(invoice.issueDate).toLocaleDateString()}</td>
                    <td>${new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td>$${invoice.amount.toFixed(2)}</td>
                    <td>${getStatusLabel(invoice.status)}</td>
                  </tr>
                `).join('')}
                <tr class="total">
                  <td colspan="3"><strong>Deuda Total</strong></td>
                  <td><strong>$${client.debt.toFixed(2)}</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const printIndividualInvoice = (invoice: Invoice, client: Client) => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura ${invoice.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .client-info { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>SR Estadísticas</h1>
              <h2>Factura de Servicios</h2>
            </div>
            <div class="invoice-info">
              <div>
                <p><strong>Número de Factura:</strong> ${invoice.invoiceNumber}</p>
                <p><strong>Fecha de Emisión:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
                <p><strong>Fecha de Vencimiento:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div class="client-info">
              <h3>Información del Cliente</h3>
              <p><strong>Cliente:</strong> ${client.name}</p>
              <p><strong>ID Cliente:</strong> ${client.clientId}</p>
              <p><strong>Teléfono:</strong> ${client.phone}</p>
              <p><strong>Email:</strong> ${client.email}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Periodicidad</th>
                  <th>Tarifa</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.services.map(service => `
                  <tr>
                    <td>${service.type.replace('_', ' ').toUpperCase()}</td>
                    <td>${service.periodicity}</td>
                    <td>$${service.rate.toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr class="total">
                  <td colspan="2"><strong>Total a Pagar</strong></td>
                  <td><strong>$${invoice.amount.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Estado de Cuentas de Clientes
        </CardTitle>
        <CardDescription className="text-purple-100">
          Gestión completa de facturas y estados de cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, cliente ID, teléfono, RNC o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-300 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-50 border-purple-200">
                <TableHead className="text-purple-800 font-bold">Cliente</TableHead>
                <TableHead className="text-purple-800 font-bold">Cliente ID</TableHead>
                <TableHead className="text-purple-800 font-bold">Contacto</TableHead>
                <TableHead className="text-purple-800 font-bold">Facturas</TableHead>
                <TableHead className="text-purple-800 font-bold">Deuda Total</TableHead>
                <TableHead className="text-purple-800 font-bold">Gestor</TableHead>
                <TableHead className="text-purple-800 font-bold text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => {
                const clientInvoices = getClientInvoices(client.id);
                return (
                  <TableRow key={client.id} className="hover:bg-purple-50 transition-colors border-purple-100">
                    <TableCell>
                      <div className="font-semibold text-purple-900">{client.name}</div>
                      {client.rnc && <div className="text-sm text-purple-600">RNC: {client.rnc}</div>}
                      {client.documentId && <div className="text-sm text-purple-600">Doc: {client.documentId}</div>}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-purple-800">{client.clientId}</TableCell>
                    <TableCell>
                      <div className="text-sm text-purple-800">{client.email}</div>
                      <div className="text-sm text-purple-600">{client.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        {clientInvoices.length} facturas
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-purple-800">${client.debt.toFixed(2)}</TableCell>
                    <TableCell className="text-purple-700">{client.manager}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-300 text-purple-700 hover:bg-purple-100"
                              onClick={() => setSelectedClient(client)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-purple-800">Estado de Cuenta - {client.name}</DialogTitle>
                              <DialogDescription>
                                Historial completo de facturas del cliente
                              </DialogDescription>
                            </DialogHeader>
                            {selectedClient && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                                  <div>
                                    <strong>Cliente ID:</strong> {selectedClient.clientId}
                                  </div>
                                  <div>
                                    <strong>Teléfono:</strong> {selectedClient.phone}
                                  </div>
                                  <div>
                                    <strong>Email:</strong> {selectedClient.email}
                                  </div>
                                  <div>
                                    <strong>Gestor:</strong> {selectedClient.manager}
                                  </div>
                                </div>
                                
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Factura</TableHead>
                                      <TableHead>Emisión</TableHead>
                                      <TableHead>Vencimiento</TableHead>
                                      <TableHead>Monto</TableHead>
                                      <TableHead>Estado</TableHead>
                                      <TableHead>Acciones</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {getClientInvoices(selectedClient.id).map((invoice) => (
                                      <TableRow key={invoice.id}>
                                        <TableCell className="font-mono text-sm">{invoice.invoiceNumber}</TableCell>
                                        <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                          <Badge className={getStatusColor(invoice.status)}>
                                            {getStatusLabel(invoice.status)}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => printIndividualInvoice(invoice, selectedClient)}
                                          >
                                            <Printer className="h-3 w-3" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          size="sm"
                          onClick={() => printClientStatement(client)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Printer className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
