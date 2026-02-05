import { useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, CreditCard, QrCode, Shield, Lock, Check } from "lucide-react";
import { toast } from "sonner";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Castanha do Pará Premium",
    price: 89.90,
    quantity: 2,
    image: "/images/brazil-nuts-1.jpg",
  },
  {
    id: 2,
    name: "Mix Gourmet Tropical",
    price: 79.90,
    quantity: 1,
    image: "/images/mixed-nuts-1.jpg",
  },
];

export default function Checkout() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [addressData, setAddressData] = useState({
    recipientName: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 19.90;
  const pixDiscount = paymentMethod === "pix" ? subtotal * 0.05 : 0;
  const total = subtotal - pixDiscount + shipping;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchAddress = async () => {
    if (addressData.zipCode.length < 8) return;
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${addressData.zipCode}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddressData((prev) => ({
          ...prev,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Pedido realizado com sucesso!");
    navigate("/conta/pedidos");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-perla-dark pt-24 pb-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-ouro transition-colors">Início</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/carrinho">
              <span className="hover:text-ouro transition-colors">Carrinho</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cacau">Checkout</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Finalizar Compra
          </h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: "Entrega" },
              { num: 2, label: "Pagamento" },
              { num: 3, label: "Confirmação" },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s.num
                      ? "bg-ouro text-cacau"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    step >= s.num ? "text-cacau" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {index < 2 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step > s.num ? "bg-ouro" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="font-serif">Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Nome do Destinatário</Label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        value={addressData.recipientName}
                        onChange={handleAddressChange}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={addressData.phone}
                        onChange={handleAddressChange}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={addressData.zipCode}
                        onChange={handleAddressChange}
                        onBlur={fetchAddress}
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        name="street"
                        value={addressData.street}
                        onChange={handleAddressChange}
                        placeholder="Nome da rua"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        name="number"
                        value={addressData.number}
                        onChange={handleAddressChange}
                        placeholder="123"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="complement">Complemento (opcional)</Label>
                      <Input
                        id="complement"
                        name="complement"
                        value={addressData.complement}
                        onChange={handleAddressChange}
                        placeholder="Apto, bloco, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={addressData.neighborhood}
                        onChange={handleAddressChange}
                        placeholder="Bairro"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        placeholder="Cidade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>

                  <Button className="btn-gold" onClick={() => setStep(2)}>
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="font-serif">Forma de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {/* Pix Option */}
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === "pix"
                          ? "border-ouro bg-ouro/5"
                          : "border-border hover:border-ouro/50"
                      }`}
                      onClick={() => setPaymentMethod("pix")}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="pix" id="pix" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-ouro" />
                            <Label htmlFor="pix" className="font-medium cursor-pointer">
                              Pix
                            </Label>
                            <span className="text-xs bg-folha text-perla px-2 py-0.5 rounded">
                              5% OFF
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pagamento instantâneo via Mercado Pago
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Credit Card Option */}
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === "credit_card"
                          ? "border-ouro bg-ouro/5"
                          : "border-border hover:border-ouro/50"
                      }`}
                      onClick={() => setPaymentMethod("credit_card")}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-ouro" />
                            <Label htmlFor="credit_card" className="font-medium cursor-pointer">
                              Cartão de Crédito
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Em até 3x sem juros via Efí
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Card Form */}
                  {paymentMethod === "credit_card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          name="number"
                          value={cardData.number}
                          onChange={handleCardChange}
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          name="name"
                          value={cardData.name}
                          onChange={handleCardChange}
                          placeholder="Como está no cartão"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/AA"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Voltar
                    </Button>
                    <Button className="btn-gold" onClick={() => setStep(3)}>
                      Revisar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="font-serif">Confirmar Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address Summary */}
                  <div>
                    <h4 className="font-medium text-cacau mb-2">Endereço de Entrega</h4>
                    <p className="text-sm text-muted-foreground">
                      {addressData.recipientName}<br />
                      {addressData.street}, {addressData.number}
                      {addressData.complement && ` - ${addressData.complement}`}<br />
                      {addressData.neighborhood}, {addressData.city} - {addressData.state}<br />
                      CEP: {addressData.zipCode}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-ouro"
                      onClick={() => setStep(1)}
                    >
                      Editar
                    </Button>
                  </div>

                  <Separator />

                  {/* Payment Summary */}
                  <div>
                    <h4 className="font-medium text-cacau mb-2">Forma de Pagamento</h4>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === "pix" ? (
                        <>Pix (5% de desconto)</>
                      ) : (
                        <>Cartão de Crédito - **** {cardData.number.slice(-4)}</>
                      )}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-ouro"
                      onClick={() => setStep(2)}
                    >
                      Editar
                    </Button>
                  </div>

                  <Separator />

                  {/* Items */}
                  <div>
                    <h4 className="font-medium text-cacau mb-4">Itens do Pedido</h4>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-cacau">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qtd: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Voltar
                    </Button>
                    <Button
                      className="btn-gold flex-1"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processando..."
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Confirmar e Pagar R$ {total.toFixed(2).replace(".", ",")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {pixDiscount > 0 && (
                    <div className="flex justify-between text-sm text-folha">
                      <span>Desconto Pix (5%)</span>
                      <span>-R$ {pixDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span>
                      {shipping === 0
                        ? "Grátis"
                        : `R$ ${shipping.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                {/* Security */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-folha" />
                    <span>Compra 100% Segura</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
