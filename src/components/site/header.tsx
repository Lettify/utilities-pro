import Link from "next/link";
import { CartDrawer } from "@/components/store/cart-drawer";

export const Header = () => (
  <header className="sticky top-0 z-20 border-b border-forest/12 bg-cream/95 backdrop-blur">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="display-font text-2xl text-forest tracking-tight">
        Nutallis Brasil
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/80 md:flex">
        <Link href="#beneficios" className="hover:text-forest">
          Beneficios
        </Link>
        <Link href="#catalogo" className="hover:text-forest">
          Catalogo
        </Link>
        <Link href="#assinatura" className="hover:text-forest">
          Assinatura
        </Link>
      </nav>
      <CartDrawer />
    </div>
  </header>
);
