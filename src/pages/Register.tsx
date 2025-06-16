
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
// import imagem from "ma"

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const nome = (document.getElementById("name") as HTMLInputElement).value.trim();
    const sobrenome = (document.getElementById("sobrenome") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const telefone = (document.getElementById("telefone") as HTMLInputElement).value.trim();
    const data_nasc = (document.getElementById("data_nasc") as HTMLInputElement).value.trim();
    const senha = (document.getElementById("senha") as HTMLInputElement).value.trim();

    if (!nome || !sobrenome || !email || !telefone || !data_nasc || !senha) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para cadastro.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      nome,
      sobrenome,
      email,
      telefone,
      data_nasc,
      senha,
      receitas_favoritas: [],
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Erro ao enviar dados");

      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("sobrenome") as HTMLInputElement).value = "";
      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("telefone") as HTMLInputElement).value = "";
      (document.getElementById("data_nasc") as HTMLInputElement).value = "";
      (document.getElementById("senha") as HTMLInputElement).value = "";

      navigate("/login");

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login.",
      });

    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível cadastrar. Tente novamente mais tarde.",
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
            Cadastre-se
          </h1>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="lg:order-2 mt-36">
              <h2 className="font-playfair text-3xl font-bold text-recipe-dark-green mb-6">
                Crie sua conta
              </h2>
              <p className="text-gray-600 mb-8">
                Bem-vindo(a)! Preencha os campos abaixo para criar sua conta e aproveitar todos os recursos disponíveis.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nome
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
                      Sobrenome
                    </label>
                    <Input
                      id="sobrenome"
                      type="text"
                      placeholder="Seu sobrenome"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />
                  </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <Input
                      id="telefone"
                      type="tel"
                      placeholder="Seu telefone"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Data de nascimento
                    </label>
                    <Input
                      id="data_nasc"
                      type="date"
                      required
                      className="border-gray-300 focus-visible:ring-recipe-tomato-red"
                    />
                  </div>
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
                  </div>
                </div>
                <Button variant="recipe" size="lg" className="w-full md:w-auto"
                  onClick={handleClick}>
                  Enviar
                </Button>
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

export default Register;
