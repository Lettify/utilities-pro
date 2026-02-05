import { useMemo, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CreditCard, ShieldCheck, Plus, Edit, Trash2, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Payments() {
  const { user, loading, isAuthenticated } = useAuth();
  const paymentsQuery = trpc.paymentMethods.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const createMutation = trpc.paymentMethods.create.useMutation({
    onSuccess: () => paymentsQuery.refetch(),
  });
  const updateMutation = trpc.paymentMethods.update.useMutation({
    onSuccess: () => paymentsQuery.refetch(),
  });
  const removeMutation = trpc.paymentMethods.remove.useMutation({
    onSuccess: () => paymentsQuery.refetch(),
  });
  const setDefaultMutation = trpc.paymentMethods.setDefault.useMutation({
    onSuccess: () => paymentsQuery.refetch(),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    brand: "",
    cardholder: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const paymentMethods = paymentsQuery.data ?? [];

  const activeCard = useMemo(() => {
    if (editingId === null) return null;
    return paymentMethods.find((item) => item.id === editingId) ?? null;
  }, [editingId, paymentMethods]);

  const resetForm = () => {
    setFormData({
      brand: "",
      cardholder: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
    });
    setEditingId(null);
  };

  const openNewCard = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEdit = (id: number) => {
    const card = paymentMethods.find((item) => item.id === id);
    if (!card) return;
    setEditingId(id);
    setFormData({
      brand: card.brand,
      cardholder: card.cardholder,
      cardNumber: `**** **** **** ${card.last4}`,
      expMonth: card.expMonth,
      expYear: card.expYear,
      cvv: "",
    });
    setIsDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rawNumber = formData.cardNumber.replace(/\s/g, "");
    const last4 = rawNumber.slice(-4) || "0000";

    if (editingId !== null) {
      updateMutation.mutate({
        id: editingId,
        brand: formData.brand,
        cardholder: formData.cardholder,
        expMonth: formData.expMonth,
        expYear: formData.expYear,
      });
      toast.success("Forma de pagamento atualizada!");
    } else {
      createMutation.mutate({
        brand: formData.brand || "Cartao",
        cardholder: formData.cardholder,
        last4,
        expMonth: formData.expMonth,
        expYear: formData.expYear,
        isDefault: paymentMethods.length === 0,
      });
      toast.success("Forma de pagamento adicionada!");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    removeMutation.mutate({ id });
    toast.success("Forma de pagamento removida");
  };

  const setAsDefault = (id: number) => {
    setDefaultMutation.mutate({ id });
    toast.success("Forma de pagamento padrao atualizada");
  };

  if (loading || paymentsQuery.isLoading) {
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
              Faca login para continuar
            </h1>
            <p className="text-muted-foreground mb-8">
              Acesse sua conta para gerenciar seus pagamentos.
            </p>
            <Button className="btn-gold" onClick={() => void startLogin("/conta/pagamentos")}>
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

      <div className="bg-perla-dark pt-24 pb-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-ouro transition-colors">Inicio</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/conta">
              <span className="hover:text-ouro transition-colors">Minha Conta</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cacau">Pagamentos</span>
          </div>
        </div>
      </div>

      <div className="bg-perla-dark pb-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
                Formas de Pagamento
              </h1>
              <p className="text-muted-foreground mt-2">
                Salve seus cartoes para checkout mais rapido
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-gold" onClick={openNewCard}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cartao
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingId !== null ? "Editar Cartao" : "Novo Cartao"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Bandeira</Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Visa, Mastercard, Elo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholder">Nome no Cartao</Label>
                      <Input
                        id="cardholder"
                        name="cardholder"
                        value={formData.cardholder}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numero do Cartao</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      required
                      disabled={editingId !== null}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth">Mes</Label>
                      <Input
                        id="expMonth"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleChange}
                        placeholder="MM"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expYear">Ano</Label>
                      <Input
                        id="expYear"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleChange}
                        placeholder="AAAA"
                        maxLength={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        required={editingId === null}
                      />
                    </div>
                  </div>

                  {activeCard && (
                    <div className="text-sm text-muted-foreground">
                      Editando cartao final {activeCard.last4}.
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="btn-gold">
                      {editingId !== null ? "Salvar" : "Adicionar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-ouro" />
          Seus dados sensiveis sao protegidos com criptografia.
        </div>

        {paymentsQuery.error ? (
          <div className="text-center py-16 text-muted-foreground">
            Nao foi possivel carregar seus pagamentos.
          </div>
        ) : paymentMethods.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-xl font-serif font-bold text-cacau mb-4">
              Nenhuma forma de pagamento salva
            </h2>
            <p className="text-muted-foreground mb-8">
              Adicione um cartao para agilizar suas compras.
            </p>
            <Button className="btn-gold" onClick={openNewCard}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cartao
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-ouro/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-ouro" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-cacau">
                          {method.brand} **** {method.last4}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {method.cardholder}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge variant="secondary">Padrao</Badge>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    Validade {method.expMonth}/{method.expYear}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEdit(method.id)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Editar
                    </Button>
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAsDefault(method.id)}
                      >
                        Tornar Padrao
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(method.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
