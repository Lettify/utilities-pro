import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ArrowRight, Leaf, Heart, Globe, Users } from "lucide-react";

const timeline = [
  {
    year: "2014",
    title: "O Início",
    description: "Nascemos de uma paixão por conectar pessoas à pureza da natureza amazônica.",
  },
  {
    year: "2016",
    title: "Primeiras Parcerias",
    description: "Estabelecemos parcerias diretas com comunidades extrativistas da Amazônia.",
  },
  {
    year: "2018",
    title: "Certificação Orgânica",
    description: "Conquistamos a certificação orgânica para toda nossa linha de produtos.",
  },
  {
    year: "2020",
    title: "Expansão Nacional",
    description: "Levamos nossas castanhas premium para todo o Brasil.",
  },
  {
    year: "2022",
    title: "Sustentabilidade",
    description: "Lançamos nosso programa de reflorestamento e carbono neutro.",
  },
  {
    year: "2024",
    title: "Inovação",
    description: "Inauguramos nossa linha de mixes gourmet e edições limitadas.",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Cada castanha colhida respeita o ciclo natural da floresta, garantindo a preservação para as próximas gerações.",
  },
  {
    icon: Heart,
    title: "Qualidade Premium",
    description: "Seleção artesanal rigorosa que garante apenas o melhor em cada embalagem que chega até você.",
  },
  {
    icon: Globe,
    title: "Comércio Justo",
    description: "Remuneração justa para as comunidades extrativistas que são guardiãs da floresta amazônica.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Apoiamos projetos sociais e educacionais nas regiões onde atuamos, fortalecendo comunidades locais.",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
            <span className="text-cacau">Sobre Nós</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-cacau overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/brazil-nuts-1.jpg)" }}
          />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Nossa História
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-perla mt-4 mb-6">
              Nuts + Vitalis = <span className="text-gradient-gold">Nutallis</span>
            </h1>
            <p className="text-lg text-perla/80">
              A fusão perfeita entre a riqueza das castanhas e a vitalidade da natureza. 
              Nascemos para levar o melhor da Amazônia brasileira até você, com respeito 
              ao meio ambiente e às comunidades que preservam nossa floresta.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section
        id="manifesto"
        data-animate
        className="py-20 bg-gradient-section"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                isVisible["manifesto"]
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <span className="text-ouro text-sm font-medium tracking-widest uppercase">
                Manifesto
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacau mt-4 mb-6">
                A Natureza em Sua Forma Mais Elegante
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Acreditamos que a verdadeira sofisticação está na simplicidade da natureza. 
                  Cada castanha que selecionamos carrega consigo a história milenar da 
                  Amazônia, o trabalho dedicado de comunidades extrativistas e nosso 
                  compromisso inabalável com a qualidade.
                </p>
                <p>
                  Nutallis não é apenas uma marca de castanhas premium. É um convite para 
                  reconectar-se com o que há de mais puro e autêntico. É a celebração de 
                  sabores que a natureza levou milhões de anos para aperfeiçoar.
                </p>
                <p>
                  Quando você escolhe Nutallis, você está escolhendo apoiar a preservação 
                  da maior floresta tropical do mundo e as pessoas que a protegem há gerações.
                </p>
              </div>
            </div>
            <div
              className={`relative transition-all duration-700 ${
                isVisible["manifesto"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="/images/brazil-nuts-2.jpg"
                  alt="Castanhas do Brasil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-ouro p-6 rounded-xl shadow-xl">
                <p className="text-cacau font-serif text-3xl font-bold">100%</p>
                <p className="text-cacau/80 text-sm">Natural</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        data-animate
        className="py-20 bg-cacau"
      >
        <div className="container">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["timeline"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Nossa Jornada
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-perla mt-4 mb-4">
              Uma Década de Excelência
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-ouro/30 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
                    isVisible["timeline"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Year Badge */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:text-left md:pl-12"
                    }`}
                  >
                    <span className="inline-block bg-ouro text-cacau font-bold px-4 py-2 rounded-lg">
                      {item.year}
                    </span>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ouro border-4 border-cacau hidden md:block" />

                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:order-2 md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <Card className="bg-cacau-light border-0">
                      <CardContent className="p-6">
                        <h3 className="font-serif text-xl font-semibold text-perla mb-2">
                          {item.title}
                        </h3>
                        <p className="text-perla/70">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        data-animate
        className="py-20 bg-gradient-section"
      >
        <div className="container">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["values"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Nossos Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacau mt-4 mb-4">
              O Que Nos Move
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`border-0 shadow-lg text-center transition-all duration-700 ${
                  isVisible["values"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-ouro/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-ouro" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-cacau mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        data-animate
        className="py-20 bg-folha"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Nossa Missão
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-perla mt-4 mb-6">
              Preservar para Prosperar
            </h2>
            <p className="text-perla/80 text-lg mb-8">
              Nossa missão vai além de oferecer as melhores castanhas do Brasil. 
              Estamos comprometidos com a preservação da Amazônia, o fortalecimento 
              das comunidades extrativistas e a promoção de um modelo de negócio 
              verdadeiramente sustentável. Cada compra é um voto pela floresta em pé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="btn-gold px-8 py-6">
                  Conhecer Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  variant="outline"
                  className="border-perla text-perla hover:bg-perla hover:text-folha px-8 py-6"
                >
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
