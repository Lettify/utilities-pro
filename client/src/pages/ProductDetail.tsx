import { useState } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, ShoppingBag, Minus, Plus, ChevronRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";

// Mock product data
const mockProduct = {
  id: 1,
  name: "Castanha do Pará Premium",
  slug: "castanha-do-para-premium",
  price: 89.90,
  compareAtPrice: 109.90,
  images: [
    "/images/brazil-nuts-1.jpg",
    "/images/brazil-nuts-2.jpg",
    "/images/mixed-nuts-1.jpg",
  ],
  category: "Castanhas",
  shortDescription: "Castanhas selecionadas da Amazônia brasileira, colhidas de forma sustentável.",
  description: `
    <p>As Castanhas do Pará Premium da Nutallis são cuidadosamente selecionadas das florestas da Amazônia brasileira. Cada castanha passa por um rigoroso processo de seleção para garantir apenas o melhor em sua mesa.</p>
    <p>Ricas em selênio, um poderoso antioxidante, nossas castanhas são perfeitas para quem busca uma alimentação saudável sem abrir mão do sabor. O selênio contribui para a saúde da tireoide, fortalece o sistema imunológico e protege as células contra danos oxidativos.</p>
    <p>Nossa colheita é realizada de forma sustentável, respeitando o ciclo natural da floresta e apoiando as comunidades locais. Ao escolher Nutallis, você está contribuindo para a preservação da Amazônia.</p>
  `,
  nutritionalInfo: {
    servingSize: "30g (aproximadamente 3 unidades)",
    calories: 186,
    totalFat: 19,
    saturatedFat: 4.3,
    transFat: 0,
    cholesterol: 0,
    sodium: 1,
    totalCarbs: 3.5,
    fiber: 2.1,
    sugars: 0.7,
    protein: 4.1,
    selenium: "544mcg (989% VD)",
    magnesium: "107mg (41% VD)",
    phosphorus: "206mg (29% VD)",
  },
  harmonization: [
    "Chocolate amargo 70%",
    "Mel de abelhas silvestres",
    "Queijos maturados",
    "Vinhos tintos encorpados",
    "Frutas secas como damascos e tâmaras",
  ],
  origin: "Amazônia, Brasil",
  stock: 50,
  sku: "NUT-CP-001",
  weight: "200g",
};

const relatedProducts = [
  {
    id: 2,
    name: "Mix Gourmet Tropical",
    slug: "mix-gourmet-tropical",
    price: 79.90,
    image: "/images/mixed-nuts-1.jpg",
  },
  {
    id: 3,
    name: "Castanha de Caju Torrada",
    slug: "castanha-de-caju-torrada",
    price: 69.90,
    image: "/images/mixed-nuts-2.jpg",
  },
  {
    id: 4,
    name: "Mix Energia Plus",
    slug: "mix-energia-plus",
    price: 94.90,
    image: "/images/nuts-tray.jpg",
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // In real app, fetch product by slug
  const product = mockProduct;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const addToCart = () => {
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const addToWishlist = () => {
    toast.success(`${product.name} adicionado aos favoritos!`);
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
            <Link href="/shop">
              <span className="hover:text-ouro transition-colors">Produtos</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cacau">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-xl overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? "scale-150" : ""
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />
              {product.compareAtPrice && (
                <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm px-3 py-1 rounded">
                  -{Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-ouro"
                      : "border-transparent hover:border-ouro/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-ouro text-sm font-medium tracking-wider uppercase">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau mt-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-ouro text-ouro" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 avaliações)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-bold text-cacau">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  R$ {product.compareAtPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
            </p>

            {/* Short Description */}
            <p className="text-foreground/80 mt-6">
              {product.shortDescription}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button className="flex-1 btn-gold py-6" onClick={addToCart}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={addToWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Stock Info */}
            <p className="text-sm text-muted-foreground mt-4">
              {product.stock > 10
                ? "Em estoque"
                : product.stock > 0
                ? `Apenas ${product.stock} unidades restantes`
                : "Produto esgotado"}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto text-ouro" />
                <p className="text-xs text-muted-foreground mt-2">
                  Frete Grátis acima de R$150
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto text-ouro" />
                <p className="text-xs text-muted-foreground mt-2">
                  Compra 100% Segura
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto text-ouro" />
                <p className="text-xs text-muted-foreground mt-2">
                  Troca em até 7 dias
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="ml-2 text-cacau">{product.sku}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Peso:</span>
                  <span className="ml-2 text-cacau">{product.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Origem:</span>
                  <span className="ml-2 text-cacau">{product.origin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mt-16">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-ouro data-[state=active]:bg-transparent px-6 py-3"
            >
              Descrição
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-ouro data-[state=active]:bg-transparent px-6 py-3"
            >
              Informação Nutricional
            </TabsTrigger>
            <TabsTrigger
              value="harmonization"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-ouro data-[state=active]:bg-transparent px-6 py-3"
            >
              Harmonização
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div
              className="prose prose-lg max-w-none text-foreground/80"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>

          <TabsContent value="nutrition" className="mt-8">
            <Accordion type="single" collapsible defaultValue="nutrition">
              <AccordionItem value="nutrition" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-serif">
                  Tabela Nutricional
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Porção: {product.nutritionalInfo.servingSize}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.nutritionalInfo)
                        .filter(([key]) => key !== "servingSize")
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-border"
                          >
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="font-medium">
                              {typeof value === "number" ? `${value}g` : value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="harmonization" className="mt-8">
            <div className="bg-card rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-cacau mb-4">
                Sugestões de Harmonização
              </h3>
              <p className="text-muted-foreground mb-6">
                Descubra combinações perfeitas para realçar o sabor das nossas castanhas:
              </p>
              <ul className="space-y-3">
                {product.harmonization.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-ouro" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-serif font-bold text-cacau mb-8">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/produto/${relatedProduct.slug}`}>
                <Card className="group product-card border-0 shadow-md overflow-hidden cursor-pointer">
                  <div className="relative aspect-square image-zoom-container">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover product-image"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-semibold text-cacau group-hover:text-ouro transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-cacau mt-2">
                      R$ {relatedProduct.price.toFixed(2).replace(".", ",")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
