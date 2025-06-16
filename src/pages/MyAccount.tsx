import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CircleUserRound, Heart, LogOut, User, ArrowLeft } from "lucide-react";

const MyAccount = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    setNome(localStorage.getItem("nome") || "");
    setSobrenome(localStorage.getItem("sobrenome") || "");
    setEmail(localStorage.getItem("email") || "");
    setTelefone(localStorage.getItem("telefone") || "");
    setDataNasc(localStorage.getItem("data_nasc") || "");
    setSenha(localStorage.getItem("senha") || "");
  }, []);

  const camposPreenchidos = () => {
    return (
      nome.trim() !== "" &&
      sobrenome.trim() !== "" &&
      telefone.trim() !== "" &&
      dataNasc.trim() !== "" &&
      senha.trim() !== ""
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!camposPreenchidos()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos antes de salvar.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/alterar-dados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, sobrenome, telefone, dataNasc, senha, email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Salva no localStorage só se deu certo
      localStorage.setItem("nome", nome);
      localStorage.setItem("sobrenome", sobrenome);
      localStorage.setItem("telefone", telefone);
      localStorage.setItem("data_nasc", dataNasc);
      localStorage.setItem("senha", senha);

      toast({
        title: "Dados atualizados com sucesso!",
        description: "Suas informações foram salvas.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar dados",
        description: (error as Error).message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Bem-vindo(a)!
          </h1>
        </div>
      </div>

      <section className="py-16 text-gray-600">
        <div className="max-w-full mx-auto mt-10 flex gap-6">
          <aside className="w-1/6 bg-white rounded shadow p-4 ml-20 flex flex-col">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-recipe-dark-green hover:underline"
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="flex items-center gap-2 w-full max-w-[200px]">
                <CircleUserRound className="text-4xl" />
                <p className="font-semibold text-xl truncate">{email}</p>
              </div>
            </div>

            <ul className="text-xl space-y-4 cursor-pointer flex-grow">
              <li>
                <div
                  className="flex items-center gap-2 hover:text-recipe-dark-green"
                  onClick={() => navigate("/meusDados")}
                >
                  <User /> Meus dados
                </div>
              </li>
              <li>
                <div
                  className="flex items-center gap-2 hover:text-recipe-dark-green"
                  onClick={() => navigate("/minhasReceitas")}
                >
                  <Heart /> Minhas receitas
                </div>
              </li>

              <li>
                <div
                  className="flex items-center gap-2 hover:text-recipe-dark-green"
                  onClick={handleLogout}
                >
                  <LogOut /> Sair
                </div>
              </li>
            </ul>
          </aside>

          <main className="w-1/2 bg-white rounded shadow p-8">
            <h1 className="text-4xl font-semibold mb-2">Meu perfil</h1>
            <p className="text-xl text-gray-600 mb-6">Gerenciar seus dados</p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="text-white bg-recipe-dark-green"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="sobrenome"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="sobrenome"
                    type="text"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    className="text-white bg-recipe-dark-green"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="telefone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="text-white bg-recipe-dark-green"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="data_nasc"
                    className="text-sm font-medium text-gray-700"
                  >
                    Data de nascimento
                  </label>
                  <Input
                    id="data_nasc"
                    type="date"
                    value={dataNasc}
                    onChange={(e) => setDataNasc(e.target.value)}
                    className="text-white bg-recipe-dark-green"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="senha"
                  className="text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="text-white bg-recipe-dark-green"
                />
              </div>

              <Button
                variant="recipe"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleSave}
              >
                Salvar
              </Button>
            </form>
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyAccount;
