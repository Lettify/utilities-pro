import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Package, User, ArrowRight, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "NUT-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 259.70,
    items: [
      { name: "Castanha do Pará Premium", quantity: 2, price: 89.90 },
      { name: "Mix Gourmet Tropical", quantity: 1, price: 79.90 },
    ],
    trackingCode: "BR123456789",
  },
  {
    id: "NUT-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 169.80,
    items: [
      { name: "Castanha de Caju Torrada", quantity: 2, price: 69.90 },
      { name: "Frete", quantity: 1, price: 29.90 },
    ],
    trackingCode: "BR987654321",
  },
  {
    id: "NUT-2024-003",
    date: "2024-01-25",
    status: "processing",
    total: 94.90,
    items: [
      { name: "Mix Energia Plus", quantity: 1, price: 94.90 },
    ],
  },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-800", icon: Package },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function Orders() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20">
          <div className="max-w-md mx-auto text-center">
            <User className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-serif font-bold text-cacau mb-4">
              Faça login para continuar
            </h1>
            <p className="text-muted-foreground mb-8">
              Acesse sua conta para ver seus pedidos.
            </p>
            <Button className="btn-gold" onClick={() => void startLogin("/conta/pedidos")}>
              Entrar na Conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
            <Link href="/conta">
              <span className="hover:text-ouro transition-colors">Minha Conta</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cacau">Meus Pedidos</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Meus Pedidos
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o status de todos os seus pedidos
          </p>
        </div>
      </div>

      <div className="container py-8">
        {mockOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-xl font-serif font-bold text-cacau mb-4">
              Nenhum pedido encontrado
            </h2>
            <p className="text-muted-foreground mb-8">
              Você ainda não fez nenhum pedido. Que tal explorar nossos produtos?
            </p>
            <Link href="/shop">
              <Button className="btn-gold">
                Explorar Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif font-semibold text-cacau">
                            Pedido #{order.id}
                          </h3>
                          <Badge className={status.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Realizado em {new Date(order.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-cacau">
                          R$ {order.total.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "item" : "itens"}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-border pt-4">
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-muted-foreground">
                            + {order.items.length - 2} mais itens
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-border">
                      <Button variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {order.trackingCode && (
                        <Button variant="outline" className="flex-1">
                          <Truck className="h-4 w-4 mr-2" />
                          Rastrear Pedido
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Button className="btn-gold flex-1">
                          Comprar Novamente
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
