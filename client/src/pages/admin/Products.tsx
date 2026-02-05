import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react";
import { toast } from "sonner";

// Mock products data
const initialProducts = [
  {
    id: 1,
    name: "Castanha do Pará Premium",
    slug: "castanha-do-para-premium",
    price: 89.90,
    compareAtPrice: 109.90,
    category: "castanhas",
    stock: 50,
    status: "active",
    image: "/images/brazil-nuts-1.jpg",
  },
  {
    id: 2,
    name: "Mix Gourmet Tropical",
    slug: "mix-gourmet-tropical",
    price: 79.90,
    category: "mix",
    stock: 35,
    status: "active",
    image: "/images/mixed-nuts-1.jpg",
  },
  {
    id: 3,
    name: "Castanha de Caju Torrada",
    slug: "castanha-de-caju-torrada",
    price: 69.90,
    category: "castanhas",
    stock: 42,
    status: "active",
    image: "/images/mixed-nuts-2.jpg",
  },
  {
    id: 4,
    name: "Mix Energia Plus",
    slug: "mix-energia-plus",
    price: 94.90,
    compareAtPrice: 119.90,
    category: "mix",
    stock: 28,
    status: "active",
    image: "/images/nuts-tray.jpg",
  },
  {
    id: 5,
    name: "Amêndoas Californianas",
    slug: "amendoas-californianas",
    price: 74.90,
    category: "castanhas",
    stock: 60,
    status: "active",
    image: "/images/brazil-nuts-2.jpg",
  },
  {
    id: 6,
    name: "Edição Limitada Natal",
    slug: "edicao-limitada-natal",
    price: 149.90,
    category: "limitadas",
    stock: 0,
    status: "inactive",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028671915/DmqzkafUOnmssCjn.png",
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof initialProducts[0] | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    compareAtPrice: "",
    category: "",
    stock: "",
    status: "active",
    description: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: formData.name,
                slug: formData.slug,
                price: parseFloat(formData.price),
                compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
                category: formData.category,
                stock: parseInt(formData.stock),
                status: formData.status,
              }
            : product
        )
      );
      toast.success("Produto atualizado com sucesso!");
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
        category: formData.category,
        stock: parseInt(formData.stock),
        status: formData.status,
        image: "/images/brazil-nuts-1.jpg",
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Produto adicionado com sucesso!");
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      price: "",
      compareAtPrice: "",
      category: "",
      stock: "",
      status: "active",
      description: "",
    });
  };

  const handleEdit = (product: typeof initialProducts[0]) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      compareAtPrice: product.compareAtPrice?.toString() || "",
      category: product.category,
      stock: product.stock.toString(),
      status: product.status,
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      toast.success("Produto excluído com sucesso!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cacau">Produtos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie o catálogo de produtos
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Castanha do Pará Premium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="castanha-do-para-premium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="89.90"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Preço Anterior (opcional)</Label>
                  <Input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={handleChange}
                    placeholder="109.90"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="castanhas">Castanhas</SelectItem>
                      <SelectItem value="mix">Mix Gourmet</SelectItem>
                      <SelectItem value="limitadas">Edições Limitadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição detalhada do produto..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="btn-gold">
                  {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-cacau">Produto</th>
                  <th className="text-left p-4 font-medium text-cacau">Categoria</th>
                  <th className="text-left p-4 font-medium text-cacau">Preço</th>
                  <th className="text-left p-4 font-medium text-cacau">Estoque</th>
                  <th className="text-left p-4 font-medium text-cacau">Status</th>
                  <th className="text-right p-4 font-medium text-cacau">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-cacau">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-muted-foreground">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-cacau">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                        {product.compareAtPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            R$ {product.compareAtPrice.toFixed(2).replace(".", ",")}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-destructive"
                            : product.stock < 20
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {product.stock} un.
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={product.status === "active" ? "default" : "secondary"}
                        className={
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {product.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum produto encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
