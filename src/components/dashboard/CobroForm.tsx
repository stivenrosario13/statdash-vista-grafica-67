
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, User, Calendar, CreditCard, Building2, CheckCircle } from "lucide-react";
import { useGlobalData } from '@/contexts/GlobalDataContext';
import { toast } from "sonner";

export function CobroForm() {
  const { state, addCobro } = useGlobalData();
  const { clients, settings } = state;
  
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    method: '',
    description: '',
    employeeName: '',
    invoiceNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo', icon: DollarSign },
    { value: 'transferencia', label: 'Transferencia', icon: Building2 },
    { value: 'cheque', label: 'Cheque', icon: CreditCard },
    { value: 'tarjeta', label: 'Tarjeta', icon: CreditCard }
  ];

  const employees = [
    'Ana López',
    'Carlos Ruiz', 
    'María González',
    'Juan Pérez',
    'Sofia Martínez',
    'Luis Rodriguez'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientId || !formData.amount || !formData.method || !formData.employeeName) {
      toast.error('Complete todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedClient = clients.find(c => c.id === formData.clientId || c.clientId === formData.clientId);
      
      const cobroData = {
        clientId: formData.clientId,
        clientName: selectedClient?.name || 'Cliente Desconocido',
        amount: parseFloat(formData.amount),
        monto: parseFloat(formData.amount), // For compatibility
        method: formData.method,
        description: formData.description || `Pago ${formData.method}`,
        employeeName: formData.employeeName,
        employeeId: `EMP-${employees.indexOf(formData.employeeName) + 1}`,
        invoiceNumber: formData.invoiceNumber || `INV-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        fecha: new Date().toISOString().split('T')[0], // For compatibility
        status: 'Completado',
        teamId: Math.floor(Math.random() * 4) + 1 // Random team assignment for demo
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      addCobro(cobroData);

      // Reset form
      setFormData({
        clientId: '',
        amount: '',
        method: '',
        description: '',
        employeeName: '',
        invoiceNumber: ''
      });

      toast.success(
        `Cobro registrado exitosamente: ${settings.currency} ${parseFloat(formData.amount).toLocaleString()}`,
        {
          description: `Cliente: ${selectedClient?.name}`,
          action: {
            label: 'Ver Dashboard',
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      );

    } catch (error) {
      toast.error('Error al registrar el cobro');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedClient = clients.find(c => c.id === formData.clientId || c.clientId === formData.clientId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Cliente *</label>
          <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Seleccione un cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{client.name}</span>
                    <Badge variant={client.status === 'Activo' ? 'default' : 'destructive'} className="ml-2">
                      {client.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedClient && (
            <Card className="mt-2">
              <CardContent className="p-3">
                <div className="text-xs text-gray-600">
                  <p><strong>Deuda:</strong> {settings.currency} {selectedClient.debt?.toLocaleString()}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Teléfono:</strong> {selectedClient.phone}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Monto ({settings.currency}) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="pl-10 bg-white border-gray-300"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Método de Pago *</label>
          <Select value={formData.method} onValueChange={(value) => setFormData({...formData, method: value})}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Seleccione método" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{method.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Employee */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Empleado Responsable *</label>
          <Select value={formData.employeeName} onValueChange={(value) => setFormData({...formData, employeeName: value})}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Seleccione empleado" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee} value={employee}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{employee}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Invoice Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Número de Factura</label>
          <Input
            value={formData.invoiceNumber}
            onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
            className="bg-white border-gray-300"
            placeholder="Opcional - se generará automáticamente"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-white border-gray-300"
            placeholder="Descripción opcional del cobro"
          />
        </div>
      </div>

      {/* Summary */}
      {formData.amount && formData.clientId && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-800 mb-2">Resumen del Cobro</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Cliente:</strong> {selectedClient?.name}</p>
                <p><strong>Monto:</strong> {settings.currency} {parseFloat(formData.amount || '0').toLocaleString()}</p>
              </div>
              <div>
                <p><strong>Método:</strong> {formData.method}</p>
                <p><strong>Empleado:</strong> {formData.employeeName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setFormData({
            clientId: '',
            amount: '',
            method: '',
            description: '',
            employeeName: '',
            invoiceNumber: ''
          })}
        >
          Limpiar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.clientId || !formData.amount || !formData.method || !formData.employeeName}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Procesando...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Registrar Cobro
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
