import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Leaf, Award, Truck } from "lucide-react";

// Hero slides data
const heroSlides = [
  {
    id: 1,
    title: "A natureza em sua forma mais elegante",
    subtitle: "Castanhas premium selecionadas com curadoria artesanal",
    image: "/images/brazil-nuts-1.jpg",
    cta: "Explorar Coleção",
    link: "/shop",
  },
  {
    id: 2,
    title: "Mix Gourmet Exclusivo",
    subtitle: "Combinações únicas para paladares refinados",
    image: "/images/mixed-nuts-1.jpg",
    cta: "Descobrir",
    link: "/shop?collection=mix-gourmet",
  },
  {
    id: 3,
    title: "Edições Limitadas",
    subtitle: "Raridades da natureza em sua mesa",
    image: "/images/nuts-tray.jpg",
    cta: "Ver Edições",
    link: "/shop?collection=edicoes-limitadas",
  },
];

// Collections data
const collections = [
  {
    id: 1,
    name: "Castanhas Selecionadas",
    description: "O melhor da Amazônia brasileira",
    image: "/images/brazil-nuts-2.jpg",
    link: "/shop?category=castanhas",
  },
  {
    id: 2,
    name: "Mix Gourmet",
    description: "Combinações exclusivas",
    image: "/images/mixed-nuts-2.jpg",
    link: "/shop?category=mix",
  },
  {
    id: 3,
    name: "Edições Limitadas",
    description: "Raridades sazonais",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028671915/DmqzkafUOnmssCjn.png",
    link: "/shop?category=limitadas",
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Maria Clara",
    location: "São Paulo, SP",
    content: "A qualidade das castanhas é incomparável. Nunca experimentei algo tão fresco e saboroso. A embalagem também é um show à parte!",
    rating: 5,
  },
  {
    id: 2,
    name: "Roberto Almeida",
    location: "Rio de Janeiro, RJ",
    content: "Presenteei minha família no Natal e foi um sucesso absoluto. O mix gourmet é simplesmente perfeito para ocasiões especiais.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Beatriz",
    location: "Belo Horizonte, MG",
    content: "Assinante há 6 meses e cada entrega é uma surpresa maravilhosa. A curadoria é impecável e o atendimento excepcional.",
    rating: 5,
  },
];

// Features data
const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Sem conservantes ou aditivos artificiais",
  },
  {
    icon: Award,
    title: "Curadoria Premium",
    description: "Seleção artesanal das melhores castanhas",
  },
  {
    icon: Truck,
    title: "Entrega Expressa",
    description: "Frescor garantido em sua porta",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-cacau/70" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container">
                <div className="max-w-2xl">
                  <h1
                    className={`text-4xl md:text-6xl font-serif font-bold text-perla mb-6 transition-all duration-700 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`text-lg md:text-xl text-perla/90 mb-8 transition-all duration-700 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    {slide.subtitle}
                  </p>
                  <Link href={slide.link}>
                    <Button
                      className={`btn-gold px-8 py-6 text-lg transition-all duration-700 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                      style={{ transitionDelay: "600ms" }}
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container flex items-center justify-between">
            <div className="flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1 rounded-full transition-all ${
                    index === currentSlide ? "bg-ouro" : "bg-perla/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-perla/40 text-perla hover:bg-perla/10 hover:border-ouro"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-perla/40 text-perla hover:bg-perla/10 hover:border-ouro"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-cacau-light py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-4 text-perla"
              >
                <feature.icon className="h-8 w-8 text-ouro" />
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-perla/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section
        id="collections"
        data-animate
        className="py-20 bg-gradient-section"
      >
        <div className="container">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["collections"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Nossas Coleções
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacau mt-4 mb-4">
              Descubra o Extraordinário
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link key={collection.id} href={collection.link}>
                <Card
                  className={`group overflow-hidden border-0 shadow-lg transition-all duration-700 cursor-pointer ${
                    isVisible["collections"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative aspect-[4/5] image-zoom-container">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover product-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cacau/80 via-cacau/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-perla">
                      <h3 className="text-xl font-serif font-bold mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-perla/80 text-sm mb-4">
                        {collection.description}
                      </p>
                      <span className="inline-flex items-center text-ouro text-sm font-medium group-hover:gap-2 transition-all">
                        Explorar
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section
        id="story"
        data-animate
        className="py-20 bg-cacau"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                isVisible["story"]
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <span className="text-ouro text-sm font-medium tracking-widest uppercase">
                Nossa História
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-perla mt-4 mb-6">
                Nuts + Vitalis = <span className="text-gradient-gold">Nutallis</span>
              </h2>
              <div className="space-y-4 text-perla/80">
                <p>
                  Nascemos da paixão por conectar pessoas à pureza da natureza. 
                  Nutallis é a fusão de "Nuts" (castanhas) com "Vitalis" (vida), 
                  representando nossa missão de levar vitalidade através dos 
                  melhores frutos secos do Brasil.
                </p>
                <p>
                  Cada castanha é cuidadosamente selecionada das florestas 
                  brasileiras, respeitando o meio ambiente e as comunidades 
                  locais. Nossa curadoria artesanal garante que apenas o 
                  melhor chegue até você.
                </p>
              </div>
              <Link href="/sobre">
                <Button
                  variant="outline"
                  className="mt-8 border-ouro text-ouro hover:bg-ouro hover:text-cacau"
                >
                  Conheça Nossa Jornada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div
              className={`relative transition-all duration-700 ${
                isVisible["story"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/images/brazil-nuts-1.jpg"
                  alt="Castanhas do Brasil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-ouro p-6 rounded-xl shadow-xl">
                <p className="text-cacau font-serif text-2xl font-bold">10+</p>
                <p className="text-cacau/80 text-sm">Anos de Tradição</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        data-animate
        className="py-20 bg-gradient-section"
      >
        <div className="container">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["testimonials"]
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacau mt-4 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`border-0 shadow-lg transition-all duration-700 ${
                  isVisible["testimonials"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-ouro text-ouro"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-cacau">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-folha">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-perla mb-4">
            Pronto para Experimentar?
          </h2>
          <p className="text-perla/80 mb-8 max-w-2xl mx-auto">
            Descubra o sabor autêntico das melhores castanhas do Brasil. 
            Frete grátis em pedidos acima de R$ 150.
          </p>
          <Link href="/shop">
            <Button className="btn-gold px-8 py-6 text-lg">
              Comprar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
