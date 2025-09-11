
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, Building2, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: 'card' | 'apple-pay' | 'transfer';
  name: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Tarjeta de Crédito/Débito',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'apple-pay',
    type: 'apple-pay',
    name: 'Apple Pay',
    icon: <Smartphone className="h-5 w-5" />
  },
  {
    id: 'transfer',
    type: 'transfer',
    name: 'Transferencia Bancaria',
    icon: <Building2 className="h-5 w-5" />
  }
];

export function PaymentSystem() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentData, setPaymentData] = useState({
    amount: '',
    clientId: '',
    invoiceId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    transferReference: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!selectedMethod || !paymentData.amount || !paymentData.clientId) {
      toast({
        title: "Error",
        description: "Complete todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Pago procesado exitosamente",
        description: `Se ha procesado el pago de $${paymentData.amount} correctamente`,
      });
      
      // Limpiar formulario
      setPaymentData({
        amount: '',
        clientId: '',
        invoiceId: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        holderName: '',
        transferReference: ''
      });
      setSelectedMethod('');
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Número de Tarjeta</label>
              <Input
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fecha de Expiración</label>
                <Input
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium">CVV</label>
                <Input
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Nombre del Titular</label>
              <Input
                value={paymentData.holderName}
                onChange={(e) => setPaymentData({...paymentData, holderName: e.target.value})}
                placeholder="Nombre completo"
              />
            </div>
          </div>
        );

      case 'apple-pay':
        return (
          <div className="text-center py-8">
            <Smartphone className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Usa Touch ID o Face ID para autorizar el pago con Apple Pay
            </p>
            <Badge variant="outline" className="mt-4">
              <Shield className="h-4 w-4 mr-2" />
              Pago Seguro
            </Badge>
          </div>
        );

      case 'transfer':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Datos Bancarios</h4>
              <div className="text-sm space-y-1">
                <p><strong>Banco:</strong> Banco Popular Dominicano</p>
                <p><strong>Cuenta:</strong> 123-456789-0</p>
                <p><strong>Titular:</strong> Steven Rosario Estadísticas</p>
                <p><strong>RNC:</strong> 123-45678-9</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Referencia de Transferencia</label>
              <Input
                value={paymentData.transferReference}
                onChange={(e) => setPaymentData({...paymentData, transferReference: e.target.value})}
                placeholder="Número de referencia"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sistema de Pagos</h2>
        <Badge variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Pagos Seguros SSL
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Procesar Pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Monto</label>
                <Input
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                  placeholder="0.00"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">ID Cliente</label>
                <Input
                  value={paymentData.clientId}
                  onChange={(e) => setPaymentData({...paymentData, clientId: e.target.value})}
                  placeholder="CLI-XXX"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">ID Factura (Opcional)</label>
              <Input
                value={paymentData.invoiceId}
                onChange={(e) => setPaymentData({...paymentData, invoiceId: e.target.value})}
                placeholder="FAC-XXX"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Método de Pago</label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedMethod === method.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    {method.icon}
                    <span className="ml-2">{method.name}</span>
                    {selectedMethod === method.id && (
                      <CheckCircle className="h-4 w-4 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {renderPaymentForm()}

            <Button 
              onClick={handlePayment} 
              className="w-full" 
              disabled={isProcessing || !selectedMethod}
            >
              {isProcessing ? "Procesando..." : `Procesar Pago - $${paymentData.amount || '0.00'}`}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">$500.00</p>
                    <p className="text-sm text-gray-600">Juan Pérez - CLI-001</p>
                  </div>
                  <Badge variant="secondary">Tarjeta</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">15/01/2024 - 10:30 AM</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">$750.00</p>
                    <p className="text-sm text-gray-600">María García - CLI-002</p>
                  </div>
                  <Badge variant="secondary">Apple Pay</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">14/01/2024 - 3:15 PM</p>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">$325.00</p>
                    <p className="text-sm text-gray-600">Carlos López - CLI-003</p>
                  </div>
                  <Badge variant="secondary">Transferencia</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">13/01/2024 - 9:45 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
