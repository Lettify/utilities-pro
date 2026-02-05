import { useState } from "react";
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
import { ChevronRight, MapPin, User, ArrowRight, Plus, Edit, Trash2, Home, Briefcase } from "lucide-react";
import { toast } from "sonner";

// Mock addresses data
const initialAddresses = [
  {
    id: 1,
    label: "Casa",
    type: "home" as "home" | "work" | "other",
    recipientName: "João Silva",
    phone: "(11) 99999-9999",
    zipCode: "01310-100",
    street: "Avenida Paulista",
    number: "1578",
    complement: "Apto 101",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    isDefault: true,
  },
  {
    id: 2,
    label: "Trabalho",
    type: "work" as "home" | "work" | "other",
    recipientName: "João Silva",
    phone: "(11) 98888-8888",
    zipCode: "04543-907",
    street: "Avenida Brigadeiro Faria Lima",
    number: "3477",
    complement: "12º andar",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    isDefault: false,
  },
];

export default function Addresses() {
  const { user, loading, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<typeof initialAddresses[0] | null>(null);

  const [formData, setFormData] = useState({
    label: "",
    type: "home" as "home" | "work" | "other",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchAddress = async () => {
    if (formData.zipCode.length < 8) return;
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.zipCode}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prev) => ({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addr, ...formData }
            : addr
        )
      );
      toast.success("Endereço atualizado com sucesso!");
    } else {
      const newAddress = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Endereço adicionado com sucesso!");
    }
    
    setIsDialogOpen(false);
    setEditingAddress(null);
    setFormData({
      label: "",
      type: "home",
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
  };

  const handleEdit = (address: typeof initialAddresses[0]) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      type: address.type,
      recipientName: address.recipientName,
      phone: address.phone,
      zipCode: address.zipCode,
      street: address.street,
      number: address.number,
      complement: address.complement || "",
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (addressId: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    toast.success("Endereço removido com sucesso!");
  };

  const setAsDefault = (addressId: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    toast.success("Endereço padrão atualizado!");
  };

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
              Acesse sua conta para gerenciar seus endereços.
            </p>
            <Button className="btn-gold" onClick={() => void startLogin("/conta/enderecos")}>
              Entrar na Conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Briefcase;
      default:
        return MapPin;
    }
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
            <Link href="/conta">
              <span className="hover:text-ouro transition-colors">Minha Conta</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cacau">Endereços</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
                Meus Endereços
              </h1>
              <p className="text-muted-foreground mt-2">
                Gerencie seus endereços de entrega
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-gold">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Endereço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Editar Endereço" : "Novo Endereço"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="label">Nome do Endereço</Label>
                      <Input
                        id="label"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        placeholder="Ex: Casa, Trabalho"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Nome do Destinatário</Label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        onBlur={fetchAddress}
                        placeholder="00000-000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Nome da rua"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento (opcional)</Label>
                    <Input
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      placeholder="Apto, bloco, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        placeholder="Bairro"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Cidade"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="UF"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingAddress(null);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="btn-gold">
                      {editingAddress ? "Salvar Alterações" : "Adicionar Endereço"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-xl font-serif font-bold text-cacau mb-4">
              Nenhum endereço cadastrado
            </h2>
            <p className="text-muted-foreground mb-8">
              Adicione um endereço para facilitar suas compras futuras.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-gold">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Endereço
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => {
              const AddressIcon = getAddressIcon(address.type);
              
              return (
                <Card key={address.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center">
                          <AddressIcon className="h-5 w-5 text-ouro" />
                        </div>
                        <div>
                          <h3 className="font-serif font-semibold text-cacau">
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <Badge variant="secondary" className="mt-1">
                              Padrão
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium text-cacau">{address.recipientName}</p>
                      <p>{address.phone}</p>
                      <p>
                        {address.street}, {address.number}
                        {address.complement && ` - ${address.complement}`}
                      </p>
                      <p>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p>CEP: {address.zipCode}</p>
                    </div>

                    <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(address)}
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Editar
                      </Button>
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAsDefault(address.id)}
                        >
                          Tornar Padrão
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(address.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
