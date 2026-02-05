import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart, User, ArrowRight, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

// Mock wishlist data
const initialWishlist = [
  {
    id: 1,
    productId: 1,
    name: "Castanha do Pará Premium",
    slug: "castanha-do-para-premium",
    price: 89.90,
    compareAtPrice: 109.90,
    image: "/images/brazil-nuts-1.jpg",
    inStock: true,
  },
  {
    id: 2,
    productId: 4,
    name: "Mix Energia Plus",
    slug: "mix-energia-plus",
    price: 94.90,
    compareAtPrice: 119.90,
    image: "/images/nuts-tray.jpg",
    inStock: true,
  },
  {
    id: 3,
    productId: 6,
    name: "Edição Limitada Natal",
    slug: "edicao-limitada-natal",
    price: 149.90,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028671915/DmqzkafUOnmssCjn.png",
    inStock: false,
  },
];

export default function Wishlist() {
  const { user, loading, isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Item removido dos favoritos");
  };

  const addToCart = (item: typeof initialWishlist[0]) => {
    toast.success(`${item.name} adicionado ao carrinho!`);
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
              Acesse sua conta para ver seus produtos favoritos.
            </p>
            <Button className="btn-gold" onClick={() => void startLogin("/conta/favoritos")}>
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
            <span className="text-cacau">Lista de Desejos</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
            Lista de Desejos
          </h1>
          <p className="text-muted-foreground mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? "produto salvo" : "produtos salvos"}
          </p>
        </div>
      </div>

      <div className="container py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-xl font-serif font-bold text-cacau mb-4">
              Sua lista de desejos está vazia
            </h2>
            <p className="text-muted-foreground mb-8">
              Adicione produtos que você gostou para comprar depois!
            </p>
            <Link href="/shop">
              <Button className="btn-gold">
                Explorar Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group product-card border-0 shadow-md overflow-hidden">
                <div className="relative aspect-square image-zoom-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover product-image"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.compareAtPrice && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        -{Math.round((1 - item.price / item.compareAtPrice) * 100)}%
                      </span>
                    )}
                    {!item.inStock && (
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        Esgotado
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 h-9 w-9 bg-perla/90 hover:bg-perla opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Add to Cart Overlay */}
                  {item.inStock && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cacau/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        className="w-full btn-gold"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <Link href={`/produto/${item.slug}`}>
                    <h3 className="font-serif font-semibold text-cacau hover:text-ouro transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-cacau">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                    {item.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {item.compareAtPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>
                  {!item.inStock && (
                    <p className="text-sm text-destructive mt-2">
                      Produto indisponível
                    </p>
                  )}
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
