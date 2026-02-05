import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Package, TrendingUp, Users, Eye } from "lucide-react";

// Mock data
const stats = [
  {
    title: "Vendas do Mês",
    value: "R$ 45.890,00",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Pedidos",
    value: "156",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Produtos",
    value: "48",
    change: "+3",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Clientes",
    value: "892",
    change: "+15.3%",
    trend: "up" as const,
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "NUT-2024-156",
    customer: "Maria Silva",
    total: 259.70,
    status: "processing",
    date: "2024-02-05",
  },
  {
    id: "NUT-2024-155",
    customer: "João Santos",
    total: 169.80,
    status: "shipped",
    date: "2024-02-05",
  },
  {
    id: "NUT-2024-154",
    customer: "Ana Costa",
    total: 94.90,
    status: "delivered",
    date: "2024-02-04",
  },
  {
    id: "NUT-2024-153",
    customer: "Pedro Oliveira",
    total: 449.60,
    status: "processing",
    date: "2024-02-04",
  },
  {
    id: "NUT-2024-152",
    customer: "Carla Mendes",
    total: 179.80,
    status: "delivered",
    date: "2024-02-03",
  },
];

const topProducts = [
  { name: "Castanha do Pará Premium", sales: 89, revenue: 8001.10 },
  { name: "Mix Gourmet Tropical", sales: 67, revenue: 5353.30 },
  { name: "Castanha de Caju Torrada", sales: 54, revenue: 3774.60 },
  { name: "Mix Energia Plus", sales: 42, revenue: 3985.80 },
  { name: "Edição Limitada Natal", sales: 28, revenue: 4197.20 },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-cacau">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do seu e-commerce
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-cacau mt-2">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      {stat.change} vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-ouro/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-ouro" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-serif">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-cacau">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded mt-1 ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-cacau">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-serif">Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-ouro">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-cacau truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} vendas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-cacau">
                      R$ {product.revenue.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="font-serif">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-ouro hover:bg-ouro/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-ouro" />
              </div>
              <div className="text-left">
                <p className="font-medium text-cacau">Adicionar Produto</p>
                <p className="text-sm text-muted-foreground">
                  Cadastrar novo produto
                </p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-ouro hover:bg-ouro/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-ouro" />
              </div>
              <div className="text-left">
                <p className="font-medium text-cacau">Ver Pedidos</p>
                <p className="text-sm text-muted-foreground">
                  Gerenciar todos os pedidos
                </p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-ouro hover:bg-ouro/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-ouro" />
              </div>
              <div className="text-left">
                <p className="font-medium text-cacau">Ver Loja</p>
                <p className="text-sm text-muted-foreground">
                  Visualizar site público
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
