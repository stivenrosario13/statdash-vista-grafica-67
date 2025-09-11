import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientTable } from "@/components/clients/ClientTable";
import { InvoiceGenerator } from "@/components/clients/InvoiceGenerator";
import { AccountStatement } from "@/components/clients/AccountStatement";
import { BulkInvoiceGenerator } from "@/components/clients/BulkInvoiceGenerator";
import { DocumentImport } from "@/components/dashboard/DocumentImport";
import { Client, Invoice } from "@/types/client";
import { Users, FileText, Upload, Receipt, CreditCard, Files } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getManagersList } from "@/data/employeesData";
import { useRealtimeUpdates, getGlobalClients, addGlobalClient } from '@/hooks/useRealtimeUpdates';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { toast } = useToast();
  const { lastUpdate } = useRealtimeUpdates();

  const managers = getManagersList();

  // Sincronizar con los datos globales
  useEffect(() => {
    console.log('ClientsPage: Syncing with global data...');
    const globalClients = getGlobalClients();
    console.log('ClientsPage: Found', globalClients.length, 'global clients');
    setClients(globalClients);
  }, [lastUpdate]);

  const handleAddClient = (newClient: Client) => {
    console.log('ClientsPage: Adding new client:', newClient);
    addGlobalClient(newClient);
    setClients([...clients, newClient]);
    toast({
      title: "Cliente registrado exitosamente",
      description: `${newClient.name} ha sido añadido a la cartera de clientes.`,
    });
  };

  const handleEditClient = (client: Client) => {
    // TODO: Implement edit functionality
    toast({
      title: "Editar cliente",
      description: "Funcionalidad de edición en desarrollo.",
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(c => c.id !== clientId));
    setInvoices(invoices.filter(inv => inv.clientId !== clientId));
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado de la cartera.",
      variant: "destructive"
    });
  };

  const handleInvoiceGenerated = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
    
    // Actualizar la deuda del cliente
    const updatedClients = clients.map(client => {
      if (client.id === invoice.clientId) {
        return {
          ...client,
          debt: client.debt + invoice.amount,
          invoices: client.invoices + 1
        };
      }
      return client;
    });
    setClients(updatedClients);
    
    toast({
      title: "Factura generada",
      description: `Factura ${invoice.invoiceNumber} creada exitosamente.`,
    });
  };

  const handleBulkInvoicesGenerated = (newInvoices: Invoice[]) => {
    setInvoices([...invoices, ...newInvoices]);
    
    // Actualizar las deudas de los clientes
    const updatedClients = clients.map(client => {
      const clientInvoices = newInvoices.filter(inv => inv.clientId === client.id);
      if (clientInvoices.length > 0) {
        const totalNewDebt = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        return {
          ...client,
          debt: client.debt + totalNewDebt,
          invoices: client.invoices + clientInvoices.length
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const totalDebt = clients.reduce((sum, client) => sum + client.debt, 0);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Cartera de Clientes
          </h1>
          <p className="text-blue-600 mt-2">Gestión profesional integral de clientes, inmuebles y facturación</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="px-4 py-2 text-blue-700 border-blue-300">
            <Users className="h-4 w-4 mr-2" />
            Total: {clients.length} clientes
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-green-700 border-green-300">
            Deuda Total: RD${totalDebt.toLocaleString()}
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-purple-700 border-purple-300">
            <Receipt className="h-4 w-4 mr-2" />
            Facturas: {invoices.length}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-blue-100 to-blue-200">
          <TabsTrigger value="register" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Registrar Cliente
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Lista de Clientes
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Generar Facturas
          </TabsTrigger>
          <TabsTrigger value="bulk-invoices" className="flex items-center gap-2">
            <Files className="h-4 w-4" />
            Facturas Masivas
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Estado de Cuentas
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importar Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-6">
          <ClientForm 
            onClientAdd={handleAddClient} 
            managers={managers}
          />
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <ClientTable 
            clients={clients}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
          />
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <InvoiceGenerator 
            clients={clients}
            onInvoiceGenerated={handleInvoiceGenerated}
          />
        </TabsContent>

        <TabsContent value="bulk-invoices" className="space-y-6">
          <BulkInvoiceGenerator 
            clients={clients}
            invoices={invoices}
            onBulkInvoicesGenerated={handleBulkInvoicesGenerated}
          />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <AccountStatement 
            clients={clients}
            invoices={invoices}
          />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <DocumentImport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientsPage;
