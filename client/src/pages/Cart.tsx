import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight, Truck } from "lucide-react";
import { toast } from "sonner";

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Castanha do Pará Premium",
    slug: "castanha-do-para-premium",
    price: 89.90,
    image: "/images/brazil-nuts-1.jpg",
    quantity: 2,
    stock: 50,
  },
  {
    id: 2,
    productId: 2,
    name: "Mix Gourmet Tropical",
    slug: "mix-gourmet-tropical",
    price: 79.90,
    image: "/images/mixed-nuts-1.jpg",
    quantity: 1,
    stock: 35,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shipping = shippingCost || 0;
  const total = subtotal - discount + shipping;

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, newQuantity)) }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Item removido do carrinho");
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "NUTALLIS10") {
      setAppliedCoupon({ code: "NUTALLIS10", discount: 10 });
      toast.success("Cupom aplicado! 10% de desconto");
    } else if (couponCode.toUpperCase() === "PRIMEIRA20") {
      setAppliedCoupon({ code: "PRIMEIRA20", discount: 20 });
      toast.success("Cupom aplicado! 20% de desconto");
    } else {
      toast.error("Cupom inválido ou expirado");
    }
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Cupom removido");
  };

  const calculateShipping = () => {
    if (zipCode.length < 8) {
      toast.error("Digite um CEP válido");
      return;
    }
    // Simulate shipping calculation
    if (subtotal >= 150) {
      setShippingCost(0);
      toast.success("Frete grátis! Compras acima de R$ 150");
    } else {
      setShippingCost(19.90);
      toast.success("Frete calculado com sucesso");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20">
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-serif font-bold text-cacau mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8">
              Adicione produtos incríveis ao seu carrinho e aproveite nossas ofertas!
            </p>
            <Link href="/shop">
              <Button className="btn-gold">
                Explorar Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <span className="text-cacau">Carrinho</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Seu Carrinho
          </h1>
          <p className="text-muted-foreground mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/produto/${item.slug}`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link href={`/produto/${item.slug}`}>
                          <h3 className="font-serif font-semibold text-cacau hover:text-ouro transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-lg font-bold text-cacau mt-1">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Subtotal */}
                        <p className="font-semibold text-cacau">
                          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <Link href="/shop">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-cacau mb-4">
                  Cupom de Desconto
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-folha/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-folha" />
                      <span className="font-medium text-folha">
                        {appliedCoupon.code} (-{appliedCoupon.discount}%)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeCoupon}
                      className="text-destructive hover:text-destructive"
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-cacau mb-4">
                  Calcular Frete
                </h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite seu CEP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  />
                  <Button variant="outline" onClick={calculateShipping}>
                    <Truck className="h-4 w-4" />
                  </Button>
                </div>
                {shippingCost !== null && (
                  <p className="text-sm text-muted-foreground mt-3">
                    {shippingCost === 0 ? (
                      <span className="text-folha font-medium">Frete Grátis!</span>
                    ) : (
                      <>Frete: R$ {shippingCost.toFixed(2).replace(".", ",")}</>
                    )}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Frete grátis para compras acima de R$ 150
                </p>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-cacau mb-4">
                  Resumo do Pedido
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-folha">
                      <span>Desconto</span>
                      <span>-R$ {discount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  {shippingCost !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span>
                        {shippingCost === 0
                          ? "Grátis"
                          : `R$ ${shippingCost.toFixed(2).replace(".", ",")}`}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-cacau">Total</span>
                    <span className="text-cacau">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ou 3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros
                  </p>
                </div>
                <Link href="/checkout">
                  <Button className="w-full btn-gold mt-6">
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="text-center text-sm text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                Compra 100% Segura
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
