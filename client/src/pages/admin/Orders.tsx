import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";

const mockOrders = [
  {
    id: "NUT-2024-156",
    customer: { name: "Maria Silva", email: "maria@email.com" },
    total: 259.70,
    status: "processing",
    date: "2024-02-05T10:30:00",
    items: 2,
  },
  {
    id: "NUT-2024-155",
    customer: { name: "João Santos", email: "joao@email.com" },
    total: 169.80,
    status: "shipped",
    date: "2024-02-05T09:15:00",
    items: 1,
    trackingCode: "BR123456789",
  },
  {
    id: "NUT-2024-154",
    customer: { name: "Ana Costa", email: "ana@email.com" },
    total: 94.90,
    status: "delivered",
    date: "2024-02-04T14:20:00",
    items: 1,
  },
  {
    id: "NUT-2024-153",
    customer: { name: "Pedro Oliveira", email: "pedro@email.com" },
    total: 449.60,
    status: "processing",
    date: "2024-02-04T11:45:00",
    items: 4,
  },
  {
    id: "NUT-2024-152",
    customer: { name: "Carla Mendes", email: "carla@email.com" },
    total: 179.80,
    status: "delivered",
    date: "2024-02-03T16:30:00",
    items: 2,
  },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-800", icon: Clock },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-cacau">Pedidos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todos os pedidos da loja
        </p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pedido ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-cacau">Pedido</th>
                  <th className="text-left p-4 font-medium text-cacau">Cliente</th>
                  <th className="text-left p-4 font-medium text-cacau">Data</th>
                  <th className="text-left p-4 font-medium text-cacau">Itens</th>
                  <th className="text-left p-4 font-medium text-cacau">Total</th>
                  <th className="text-left p-4 font-medium text-cacau">Status</th>
                  <th className="text-right p-4 font-medium text-cacau">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="p-4">
                        <p className="font-medium text-cacau">{order.id}</p>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-cacau">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-muted-foreground">{order.items}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-cacau">
                          R$ {order.total.toFixed(2).replace(".", ",")}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge className={status.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
