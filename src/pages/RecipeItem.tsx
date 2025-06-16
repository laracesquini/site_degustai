import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { recipes } from "@/data/recipes.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecipeItem = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 novo
  const receita = recipes.find(r => r.id === id);
  const { toast } = useToast();

  const [favoritada, setFavoritada] = useState(() => {
    const favoritas = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]");
    return favoritas.some((r) => r.id === receita?.id);
  });

  const [likes, setLikes] = useState(receita.likes);

  const handleFavoritar = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para favoritar receitas.",
        variant: "destructive",
      });
      return;
    }

    const response = await fetch("http://localhost:3000/favoritar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        receita,
      }),
    });

    if (response.ok) {
      const receitasSalvas = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]");
      const jaExiste = receitasSalvas.some((r) => r.id === receita.id);
      if (!jaExiste) {
        localStorage.setItem("receitas_favoritas", JSON.stringify([...receitasSalvas, receita]));
      }
      setFavoritada(true);
      setLikes((prev) => prev + 1);
    }
  };

  const handleDesfavoritar = async () => {
    const response = await fetch("http://localhost:3000/desfavoritar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        receitaId: receita.id,
      }),
    });

    if (response.ok) {
      const receitasSalvas = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]");
      const atualizadas = receitasSalvas.filter((r) => r.id !== receita.id);
      localStorage.setItem("receitas_favoritas", JSON.stringify(atualizadas));
      setFavoritada(false);
      setLikes((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Receitas
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Navegue pela nossa coleção completa de receitas deliciosas
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Texto */}
          <div className="lg:w-2/3">
            {/* Botão de voltar */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center mb-4 text-sm text-recipe-dark-green hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </button>

            <div className="flex items-center justify-between mb-4">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-recipe-dark-green">
                {receita.title}
              </h1>
              <button
                onClick={favoritada ? handleDesfavoritar : handleFavoritar}
                className="flex items-center gap-1 text-recipe-herb-green"
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    favoritada
                      ? "fill-recipe-herb-green text-recipe-herb-green"
                      : "text-gray-400 hover:text-recipe-herb-green"
                  }`}
                />
                <span className="text-lg">{likes}</span>
              </button>
            </div>

            <p className="text-black mb-6">{receita.description}</p>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-black">
                <strong>Tempo de preparo:</strong> {receita.prepTime}
              </p>
              <p className="text-black">
                <strong>Categoria:</strong> {receita.category}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-black">Ingredientes</h3>
              <ul className="text-black space-y-2">
                {receita.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4 text-black">Modo de preparo</h3>
              <ol className="text-black space-y-4">
                {receita.method?.map((step, i) => (
                  <li key={i} className="flex">
                    <span className="inline-block mr-3 font-bold text-recipe-dark-green">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Imagem */}
          <div className="lg:w-1/3 lg:sticky lg:top-28 self-start">
            <div className="bg-white p-2 rounded-lg shadow-xl">
              <img
                className="w-full h-auto rounded-lg object-cover"
                src={receita.image}
                alt={receita.title}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecipeItem;
