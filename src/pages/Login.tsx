
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// import imagem from "ma"

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const senha = (document.getElementById("senha") as HTMLInputElement).value;

    const payload = {
      email,
      senha,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("sobrenome", data.sobrenome);
      localStorage.setItem("email", data.email);
      localStorage.setItem("telefone", data.telefone);
      localStorage.setItem("data_nasc", data.data_nasc);
      localStorage.setItem("senha", data.senha);
      localStorage.setItem("receitas_favoritas", JSON.stringify(data.receitas_favoritas));

      login(); // Atualiza o estado global
      navigate("/");

    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Algo deu errado ao tentar entrar na sua conta.",
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
            Acesse sua conta
          </h1>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="lg:order-2 mt-80">
              <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
                Bem-vindo(a)!
              </h2>
              <p className="text-gray-600 mb-8">
                Preencha os campos abaixo para acessar sua conta e aproveitar todos os recursos disponíveis.
              </p>

              <form className="space-y-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="Seu senha"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />

                    <div className="text-left mt-4">
                      <button
                        type="button"
                        className="text-sm text-recipe-tomato-red hover:underline"
                        onClick={() => navigate("/esqueci-senha")}
                      >
                        Esqueci minha senha
                      </button>
                    </div>

                  </div>

                </div>
                <div className="flex flex-row gap-20">
                  <Button variant="recipe" size="lg" className="w-full md:w-auto"
                    onClick={() => (navigate('/'))}>
                    Voltar
                  </Button>
                  <Button variant="recipe" size="lg" className="w-full md:w-auto"
                    onClick={handleLogin}>
                    Acessar
                  </Button>
                </div>

              </form>
            </div>
            <div className="relative">
              <img
                src="https://thesageapron.com/wp-content/uploads/2021/04/new-feature.jpg"
                alt="Fresh vegetables and herbs"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-recipe-tomato-red p-6 rounded-lg shadow-lg max-w-[200px]">
                <p className="font-playfair text-white italic text-lg">
                  "We believe great cooking starts with great ingredients."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
