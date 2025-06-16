import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Senhas diferentes",
        description: "A senha e a confirmação devem ser iguais.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/esqueci-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, novaSenha: password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Senha redefinida com sucesso!",
        description: "Você já pode fazer login com sua nova senha.",
      });

    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Redefinir Senha
          </h1>
        </div>
      </div>
      <section className="py-16">
        <div className="container max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded shadow">
            <p className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
              Esqueci a senha
            </p>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium text-gray-700">
                Nova senha
              </label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmar-senha" className="text-sm font-medium text-gray-700">
                Confirmar nova senha
              </label>
              <Input
                id="confirmar-senha"
                type="password"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="recipe" size="lg" className="w-full">
              Confirmar
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EsqueciSenha;
