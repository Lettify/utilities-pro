import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cacau text-perla">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/">
              <span className="text-2xl font-serif font-bold tracking-wide text-ouro">
                NUTALLIS
              </span>
            </Link>
            <p className="text-perla/80 text-sm leading-relaxed">
              A natureza em sua forma mais elegante. Castanhas premium selecionadas 
              com curadoria artesanal para momentos de puro prazer.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-perla/30 flex items-center justify-center hover:border-ouro hover:text-ouro transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-perla/30 flex items-center justify-center hover:border-ouro hover:text-ouro transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-perla/30 flex items-center justify-center hover:border-ouro hover:text-ouro transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-ouro">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "Produtos" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/contato", label: "Contato" },
                { href: "/conta", label: "Minha Conta" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-perla/80 hover:text-ouro transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-ouro">
              Informações
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/politica-privacidade", label: "Política de Privacidade" },
                { href: "/termos-uso", label: "Termos de Uso" },
                { href: "/trocas-devolucoes", label: "Trocas e Devoluções" },
                { href: "/faq", label: "Perguntas Frequentes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-perla/80 hover:text-ouro transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-ouro">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ouro flex-shrink-0 mt-0.5" />
                <span className="text-perla/80 text-sm">
                  São Paulo, SP - Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-ouro flex-shrink-0" />
                <a
                  href="https://wa.me/5511999999999"
                  className="text-perla/80 hover:text-ouro transition-colors text-sm"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-ouro flex-shrink-0" />
                <a
                  href="mailto:contato@nutallis.com.br"
                  className="text-perla/80 hover:text-ouro transition-colors text-sm"
                >
                  contato@nutallis.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment & Security */}
      <div className="border-t border-perla/10">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Payment Methods */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <span className="text-xs text-perla/60 uppercase tracking-wider">
                Formas de Pagamento
              </span>
              <div className="flex items-center gap-4">
                {/* Pix */}
                <div className="w-12 h-8 bg-perla/10 rounded flex items-center justify-center">
                  <svg viewBox="0 0 512 512" className="h-5 w-5 fill-perla/60">
                    <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.9 231.1 518.9 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C257.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 128 132.6 120.2 112.6 120.2H103.3L200.7 22.76C231.1-7.586 280.3-7.586 310.6 22.76L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C ## 245.6 271.1 241.1 278.4 234.8L201.7 158.1C## 148.3 126.4 142.7 112.6 142.7H95.93L0 238.6V273.4L95.93 369.3H112.6C126.4 369.3 139.1 363.7 149.7 353.9L226.4 277.2C233.6 270.9 243 266.4 252.5 266.4C262 266.4 271.4 270.9 278.6 277.2L355.3 353.9C## 363.7 385.6 369.3 399.4 369.3H416.1L512 273.4V238.6L416.1 142.7H399.4C385.6 142.7 372.9 148.3 362.3 158.1L285.6 234.8C278.4 241.1 269 245.6 259.5 245.6C250 245.6 240.6 241.1 233.4 234.8L156.7 158.1C146.1 148.3 133.4 142.7 119.6 142.7H112.6z"/>
                  </svg>
                </div>
                {/* Visa */}
                <div className="w-12 h-8 bg-perla/10 rounded flex items-center justify-center">
                  <span className="text-perla/60 text-xs font-bold">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="w-12 h-8 bg-perla/10 rounded flex items-center justify-center">
                  <span className="text-perla/60 text-xs font-bold">MC</span>
                </div>
                {/* Elo */}
                <div className="w-12 h-8 bg-perla/10 rounded flex items-center justify-center">
                  <span className="text-perla/60 text-xs font-bold">ELO</span>
                </div>
              </div>
            </div>

            {/* Security Seals */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <span className="text-xs text-perla/60 uppercase tracking-wider">
                Compra Segura
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-perla/10 rounded">
                  <svg className="h-4 w-4 fill-perla/60" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  <span className="text-perla/60 text-xs">SSL</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-perla/10 rounded">
                  <svg className="h-4 w-4 fill-perla/60" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <span className="text-perla/60 text-xs">Seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-perla/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-perla/60 text-sm">
              © {currentYear} Nutallis Brasil. Todos os direitos reservados.
            </p>
            <p className="text-perla/40 text-xs">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
