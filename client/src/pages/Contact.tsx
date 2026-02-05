import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Send, MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

const faqItems = [
  {
    question: "Qual o prazo de entrega?",
    answer: "O prazo de entrega varia de acordo com a sua região. Para capitais e regiões metropolitanas, o prazo é de 3 a 5 dias úteis. Para demais localidades, de 5 a 10 dias úteis. Você pode acompanhar seu pedido em tempo real através da sua conta.",
  },
  {
    question: "Como funciona a política de trocas e devoluções?",
    answer: "Você tem até 7 dias após o recebimento para solicitar a troca ou devolução do produto. O item deve estar lacrado e em perfeitas condições. Entre em contato conosco pelo WhatsApp ou e-mail para iniciar o processo.",
  },
  {
    question: "As castanhas são realmente orgânicas?",
    answer: "Sim! Todas as nossas castanhas possuem certificação orgânica e são colhidas de forma sustentável na Amazônia brasileira. Trabalhamos diretamente com comunidades extrativistas que preservam a floresta há gerações.",
  },
  {
    question: "Qual a validade dos produtos?",
    answer: "Nossas castanhas têm validade média de 6 meses quando armazenadas em local fresco e seco. Após aberta a embalagem, recomendamos consumir em até 30 dias e manter refrigerado para melhor conservação.",
  },
  {
    question: "Vocês fazem entregas para todo o Brasil?",
    answer: "Sim, entregamos em todo o território nacional. Para compras acima de R$ 150, o frete é grátis para todo o Brasil. Utilizamos transportadoras de confiança para garantir que seu pedido chegue em perfeitas condições.",
  },
  {
    question: "Como posso rastrear meu pedido?",
    answer: "Após a confirmação do pagamento e envio, você receberá um e-mail com o código de rastreamento. Também é possível acompanhar o status do pedido diretamente na área 'Meus Pedidos' em sua conta.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos Pix (com desconto de 5%), cartões de crédito (Visa, Mastercard, Elo, American Express) em até 3x sem juros, e cartões de débito. Todas as transações são processadas em ambiente 100% seguro.",
  },
  {
    question: "Posso presentear alguém com produtos Nutallis?",
    answer: "Claro! Oferecemos embalagens especiais para presente. Durante o checkout, você pode selecionar a opção 'Embalagem para Presente' e incluir uma mensagem personalizada. Também temos kits especiais para datas comemorativas.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Mensagem enviada com sucesso! Retornaremos em breve.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            <span className="text-cacau">Contato</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-perla-dark pb-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cacau">
              Fale Conosco
            </h1>
            <p className="text-muted-foreground mt-4">
              Estamos aqui para ajudar. Entre em contato conosco através do 
              formulário, WhatsApp ou e-mail. Nossa equipe responderá o mais 
              breve possível.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-semibold text-cacau mb-6">
                  Envie sua Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone (opcional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sobre o que deseja falar?"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escreva sua mensagem aqui..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="btn-gold w-full md:w-auto px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* WhatsApp Card */}
            <Card className="border-0 shadow-lg bg-folha text-perla">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-perla/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg">
                      Atendimento VIP
                    </h3>
                    <p className="text-perla/70 text-sm">WhatsApp Business</p>
                  </div>
                </div>
                <p className="text-perla/80 text-sm mb-4">
                  Atendimento exclusivo e personalizado para nossos clientes. 
                  Tire dúvidas, faça pedidos ou acompanhe suas entregas.
                </p>
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os produtos Nutallis."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-perla text-folha hover:bg-perla/90">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Iniciar Conversa
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-serif font-semibold text-lg text-cacau">
                  Informações de Contato
                </h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-ouro" />
                  </div>
                  <div>
                    <p className="font-medium text-cacau">E-mail</p>
                    <a
                      href="mailto:contato@nutallis.com.br"
                      className="text-muted-foreground hover:text-ouro transition-colors"
                    >
                      contato@nutallis.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-ouro" />
                  </div>
                  <div>
                    <p className="font-medium text-cacau">Telefone</p>
                    <a
                      href="tel:+5511999999999"
                      className="text-muted-foreground hover:text-ouro transition-colors"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-ouro" />
                  </div>
                  <div>
                    <p className="font-medium text-cacau">Endereço</p>
                    <p className="text-muted-foreground">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ouro/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-ouro" />
                  </div>
                  <div>
                    <p className="font-medium text-cacau">Horário de Atendimento</p>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <span className="text-ouro text-sm font-medium tracking-widest uppercase">
              Dúvidas Frequentes
            </span>
            <h2 className="text-3xl font-serif font-bold text-cacau mt-4 mb-4">
              Perguntas e Respostas
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-card shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-cacau hover:text-ouro">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
