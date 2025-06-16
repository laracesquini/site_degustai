
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CircleUserRound, Folder, Heart, LogOut, Settings, User } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";


const MyRecipes = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [minhasReceitas, setMinhasReceitas] = useState([]);

  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const response = await fetch(`http://localhost:3000/minhas-receitas?userId=${localStorage.getItem("userId")}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Erro ao carregar receitas");

        const data = await response.json();
        setMinhasReceitas(data?.[0]?.receitas_favoritas);
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao carregar receitas.");
      }
    };

    carregarReceitas();
  }, []);


  const handleLogout = () => {
    // Aqui você faria verificação real (ex: email/senha), por enquanto só simula
    logout(); // Atualiza o estado global
    navigate("/"); // Redireciona para home ou outra página
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Page Header */}
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Receitas favoritas
          </h1>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-16 text-gray-600">
        <div className="max-w-full mx-auto mt-10 flex gap-6">
          <aside className="w-1/6 bg-white rounded shadow p-4 ml-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 w-full max-w-[200px]">
                <CircleUserRound className="text-4xl" />
                <p className="font-semibold text-xl truncate">
                  {localStorage.getItem("email")}
                </p>
              </div>
            </div>

            <div className="text-xl">
              <ul className="space-y-4 cursor-pointer">
                <li><div className="flex items-center gap-2 hover:text-recipe-dark-green" onClick={() => { navigate('/meusDados') }}>
                  <User /> Meus dados</div></li>
                <li><div className="flex items-center gap-2 hover:text-recipe-dark-green" onClick={() => { navigate('/minhasReceitas') }}><Heart /> Minhas receitas</div></li>
                <li><div className="flex items-center gap-2 hover:text-recipe-dark-green" onClick={handleLogout}><LogOut /> Sair</div></li>
              </ul>
            </div>
          </aside>
          <main className="w-4/6 bg-white rounded shadow p-8">
            {minhasReceitas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {minhasReceitas.map(receita => (
                  <RecipeCard
                    key={receita.id}
                    id={receita.id}
                    title={receita.title}
                    image={receita.image}
                    prepTime={receita.prepTime}
                    category={receita.category}
                    likes={receita.likes}
                    receita={receita}
                  />))}
              </div>
            ) : (
              <div className="flex items-center justify-center text-center w-full h-52">
                <p className="text-gray-500 text-2xl">
                  Nenhuma receita encontrada.
                </p>
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MyRecipes;
