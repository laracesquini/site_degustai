import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const nome = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const assunto = (document.getElementById("subject") as HTMLInputElement).value.trim();
    const mensagem = (document.getElementById("message") as HTMLInputElement).value.trim();

    if (!nome || !email || !assunto || !mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    const payload = { nome, email, assunto, mensagem };

    try {
      const response = await fetch("http://localhost:3000/api/send-to-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("subject") as HTMLInputElement).value = "";
      (document.getElementById("message") as HTMLInputElement).value = "";

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Contate-nos
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Tem dúvidas, sugestões ou quer contribuir? Entre em contato com nossa equipe
          </p>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="lg:order-2">
              <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
                Entre em contato
              </h2>
              <p className="text-gray-600 mb-8">
                Gostamos de ouvir o que você tem a dizer! Preencha o formulário abaixo e entraremos em contato com você o mais breve possível.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Seu nome
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Como podemos te ajudar?"
                    required
                    className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Sua mensagem aqui..."
                    required
                    className="min-h-[150px] border-gray-300 focus-visible:ring-recipe-tomato-red"
                  />
                </div>

                <Button
                  variant="recipe"
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={handleClick}
                >
                  Enviar
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:order-1">
              <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
                Informações de contato
              </h2>
              <p className="text-gray-600 mb-8">
                Nossa equipe está aqui para ajudar com qualquer dúvida que você possa ter sobre receitas, ingredientes ou técnicas culinárias.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-recipe-tomato-red/10 p-3 rounded-full text-recipe-tomato-red">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Número de telefone</h3>
                    <p className="text-gray-600">+55 (11) 91234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-recipe-tomato-red/10 p-3 rounded-full text-recipe-tomato-red">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@degustai.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-recipe-tomato-red/10 p-3 rounded-full text-recipe-tomato-red">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Horário de atendimento</h3>
                    <p className="text-gray-600">Segunda - Sexta: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Finais de semana: Fechado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
