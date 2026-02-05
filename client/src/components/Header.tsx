import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Search, User, ShoppingBag, Menu, X, Heart, Package, MapPin, LogOut, Settings } from "lucide-react";
interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Cart count will be implemented with cart router
  const cartCount = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const shouldBeTransparent = transparent && isHome && !isScrolled;

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/shop", label: "Produtos" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/contato", label: "Contato" },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeTransparent
          ? "bg-transparent"
          : "bg-perla/95 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <span
              className={`text-2xl font-serif font-bold tracking-wide transition-colors ${
                shouldBeTransparent ? "text-perla" : "text-cacau"
              }`}
            >
              NUTALLIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium tracking-wide elegant-underline transition-colors ${
                    shouldBeTransparent
                      ? "text-perla hover:text-ouro"
                      : "text-cacau hover:text-ouro"
                  } ${location === link.href ? "text-ouro" : ""}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className={`${shouldBeTransparent ? "text-perla hover:text-ouro hover:bg-white/10" : "text-cacau hover:text-ouro"}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${shouldBeTransparent ? "text-perla hover:text-ouro hover:bg-white/10" : "text-cacau hover:text-ouro"}`}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.name || "Minha Conta"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/conta/pedidos">
                      <Package className="mr-2 h-4 w-4" />
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/conta/favoritos">
                      <Heart className="mr-2 h-4 w-4" />
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/conta/enderecos">
                      <MapPin className="mr-2 h-4 w-4" />
                      Endereços
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/conta">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Painel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className={`${shouldBeTransparent ? "text-perla hover:text-ouro hover:bg-white/10" : "text-cacau hover:text-ouro"}`}
                onClick={() => void startLogin()}
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Cart */}
            <Link href="/carrinho">
              <Button
                variant="ghost"
                size="icon"
                className={`relative ${shouldBeTransparent ? "text-perla hover:text-ouro hover:bg-white/10" : "text-cacau hover:text-ouro"}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-ouro text-cacau text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden ${shouldBeTransparent ? "text-perla hover:text-ouro hover:bg-white/10" : "text-cacau hover:text-ouro"}`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-perla">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-serif font-bold text-cacau">NUTALLIS</span>
                  </div>
                  
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link href={link.href}>
                          <span
                            className={`text-lg font-medium text-cacau hover:text-ouro transition-colors ${
                              location === link.href ? "text-ouro" : ""
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="mt-auto pt-8 border-t border-border">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Olá, {user?.name || "Cliente"}
                        </p>
                        <SheetClose asChild>
                          <Link href="/conta">
                            <Button variant="outline" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Minha Conta
                            </Button>
                          </Link>
                        </SheetClose>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-destructive"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full btn-gold"
                        onClick={() => void startLogin()}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Entrar / Cadastrar
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ouro"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
