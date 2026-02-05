import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Package, Heart, MapPin, CreditCard, User, LogOut, ArrowRight } from "lucide-react";

const menuItems = [
  {
    icon: Package,
    title: "Meus Pedidos",
    description: "Acompanhe seus pedidos e histórico de compras",
    href: "/conta/pedidos",
  },
  {
    icon: Heart,
    title: "Lista de Desejos",
    description: "Produtos salvos para comprar depois",
    href: "/conta/favoritos",
  },
  {
    icon: MapPin,
    title: "Endereços",
    description: "Gerencie seus endereços de entrega",
    href: "/conta/enderecos",
  },
  {
    icon: CreditCard,
    title: "Formas de Pagamento",
    description: "Cartões e métodos de pagamento salvos",
    href: "/conta/pagamentos",
  },
];

export default function Account() {
  const { user, loading, isAuthenticated, logout } = useAuth();

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
              Acesse sua conta para ver seus pedidos, favoritos e muito mais.
            </p>
            <Button className="btn-gold" onClick={() => void startLogin("/conta")}>
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
            <span className="text-cacau">Minha Conta</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Minha Conta
          </h1>
          <p className="text-muted-foreground mt-2">
            Olá, {user?.name || "Cliente"}! Gerencie sua conta e pedidos.
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-ouro/10 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-ouro" />
                  </div>
                  <h3 className="font-serif font-semibold text-cacau">
                    {user?.name || "Cliente"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user?.email}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-ouro" />
                        </div>
                        <div>
                          <h3 className="font-serif font-semibold text-cacau">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent Orders Preview */}
            <Card className="border-0 shadow-md mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif">Pedidos Recentes</CardTitle>
                  <Link href="/conta/pedidos">
                    <Button variant="link" className="text-ouro p-0">
                      Ver Todos
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Você ainda não fez nenhum pedido.</p>
                  <Link href="/shop">
                    <Button variant="link" className="text-ouro mt-2">
                      Explorar Produtos
                    </Button>
                  </Link>
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
