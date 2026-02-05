import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingBag, Eye, Filter, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "Castanha do Pará Premium",
    slug: "castanha-do-para-premium",
    price: 89.90,
    compareAtPrice: 109.90,
    image: "/images/brazil-nuts-1.jpg",
    category: "castanhas",
    nutritionalObjective: "imunidade",
    shortDescription: "Castanhas selecionadas da Amazônia brasileira",
    stock: 50,
  },
  {
    id: 2,
    name: "Mix Gourmet Tropical",
    slug: "mix-gourmet-tropical",
    price: 79.90,
    image: "/images/mixed-nuts-1.jpg",
    category: "mix",
    nutritionalObjective: "energia",
    shortDescription: "Combinação exclusiva de castanhas e frutas secas",
    stock: 35,
  },
  {
    id: 3,
    name: "Castanha de Caju Torrada",
    slug: "castanha-de-caju-torrada",
    price: 69.90,
    image: "/images/mixed-nuts-2.jpg",
    category: "castanhas",
    nutritionalObjective: "coração",
    shortDescription: "Caju premium levemente torrado",
    stock: 42,
  },
  {
    id: 4,
    name: "Mix Energia Plus",
    slug: "mix-energia-plus",
    price: 94.90,
    compareAtPrice: 119.90,
    image: "/images/nuts-tray.jpg",
    category: "mix",
    nutritionalObjective: "energia",
    shortDescription: "Mix especial para alto desempenho",
    stock: 28,
  },
  {
    id: 5,
    name: "Amêndoas Californianas",
    slug: "amendoas-californianas",
    price: 74.90,
    image: "/images/brazil-nuts-2.jpg",
    category: "castanhas",
    nutritionalObjective: "cerebro",
    shortDescription: "Amêndoas importadas de alta qualidade",
    stock: 60,
  },
  {
    id: 6,
    name: "Edição Limitada Natal",
    slug: "edicao-limitada-natal",
    price: 149.90,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028671915/DmqzkafUOnmssCjn.png",
    category: "limitadas",
    nutritionalObjective: "geral",
    shortDescription: "Seleção especial de fim de ano",
    stock: 15,
    isLimitedEdition: true,
  },
];

const categories = [
  { id: "castanhas", name: "Castanhas" },
  { id: "mix", name: "Mix Gourmet" },
  { id: "limitadas", name: "Edições Limitadas" },
];

const nutritionalObjectives = [
  { id: "energia", name: "Energia" },
  { id: "imunidade", name: "Imunidade" },
  { id: "coração", name: "Coração" },
  { id: "cerebro", name: "Cérebro" },
  { id: "pele", name: "Pele" },
  { id: "geral", name: "Bem-estar Geral" },
];

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  nutritionalObjective: string;
  shortDescription: string;
  stock: number;
  isLimitedEdition?: boolean;
}

export default function Shop() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    params.get("category") ? [params.get("category")!] : []
  );
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Filter by category
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by nutritional objective
    if (selectedObjectives.length > 0) {
      products = products.filter((p) => selectedObjectives.includes(p.nutritionalObjective));
    }

    // Filter by price
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [selectedCategories, selectedObjectives, priceRange, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleObjective = (objectiveId: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objectiveId)
        ? prev.filter((o) => o !== objectiveId)
        : [...prev, objectiveId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedObjectives([]);
    setPriceRange([0, 200]);
  };

  const addToCart = (product: Product) => {
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const addToWishlist = (product: Product) => {
    toast.success(`${product.name} adicionado aos favoritos!`);
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-serif font-semibold text-cacau mb-4">Categorias</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={`cat-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-serif font-semibold text-cacau mb-4">Preço</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200}
          step={10}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>

      {/* Nutritional Objectives */}
      <div>
        <h3 className="font-serif font-semibold text-cacau mb-4">
          Objetivo Nutricional
        </h3>
        <div className="space-y-3">
          {nutritionalObjectives.map((objective) => (
            <div key={objective.id} className="flex items-center gap-3">
              <Checkbox
                id={`obj-${objective.id}`}
                checked={selectedObjectives.includes(objective.id)}
                onCheckedChange={() => toggleObjective(objective.id)}
              />
              <Label
                htmlFor={`obj-${objective.id}`}
                className="text-sm cursor-pointer"
              >
                {objective.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 ||
        selectedObjectives.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 200) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );

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
            <span className="text-cacau">Produtos</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Nossos Produtos
          </h1>
          <p className="text-muted-foreground mt-2">
            Descubra nossa seleção premium de castanhas e mixes gourmet
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </p>
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destaque</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group product-card border-0 shadow-md overflow-hidden"
                >
                  <div className="relative aspect-square image-zoom-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover product-image"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.compareAtPrice && (
                        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                          -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                        </span>
                      )}
                      {product.isLimitedEdition && (
                        <span className="bg-ouro text-cacau text-xs px-2 py-1 rounded">
                          Edição Limitada
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 bg-perla/90 hover:bg-perla"
                        onClick={() => addToWishlist(product)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 bg-perla/90 hover:bg-perla"
                        onClick={() => setQuickViewProduct(product)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Add to Cart Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cacau/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        className="w-full btn-gold"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Link href={`/produto/${product.slug}`}>
                      <h3 className="font-serif font-semibold text-cacau hover:text-ouro transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-cacau">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.compareAtPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="max-w-3xl">
          {quickViewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">
                    {quickViewProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground mt-2">
                  {quickViewProduct.shortDescription}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-2xl font-bold text-cacau">
                    R$ {quickViewProduct.price.toFixed(2).replace(".", ",")}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {quickViewProduct.compareAtPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1 btn-gold"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToWishlist(quickViewProduct)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Link href={`/produto/${quickViewProduct.slug}`}>
                  <Button
                    variant="link"
                    className="w-full mt-4 text-ouro"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    Ver Detalhes Completos
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
