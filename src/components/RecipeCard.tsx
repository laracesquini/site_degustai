
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { set } from "date-fns";
import { Clock, Heart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  category: string;
  likes: number;
  receita: any;
}

const RecipeCard = ({ id, title, image, prepTime, category, likes, receita }: RecipeCardProps) => {

  const navigate = useNavigate();
  const [favoritada, setFavoritada] = useState(false)

  const { toast } = useToast();

  const handleFavoritar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
        userId: localStorage.getItem("userId"),  // ID real do usuário
        receita: receita                   // objeto da receita inteira
      }),
    });

    if (response.ok) {
      // Atualiza localStorage
      const receitasSalvas = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]");
      // Evita adicionar duplicadas (compara por ID)
      const jaExiste = receitasSalvas.some((r: any) => r.id === receita.id);

      if (!jaExiste) {
        const atualizados = [...receitasSalvas, receita];
        localStorage.setItem("receitas_favoritas", JSON.stringify(atualizados));
      }
      setFavoritada(true);
    }
  }
  const handleDesfavoritar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/desfavoritar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),  // ID real do usuário
        receitaId: receita.id                   // objeto da receita inteira
      }),
    });

    if (response.ok) {
      // Atualiza localStorage
      const receitasSalvas = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]");
      console.log("receitasSalvas", receitasSalvas)
      console.log("receita.id", receita.id)

      // Remove do array local a receita que tem aquele ID
      const atualizadas = receitasSalvas.filter((r: any) => r.id !== receita.id);

      localStorage.setItem("receitas_favoritas", JSON.stringify(atualizadas))
      userFavoriteRecipes = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]")
      setFavoritada(false);
    }
  }

  let userFavoriteRecipes = JSON.parse(localStorage.getItem("receitas_favoritas") || "[]")

  console.log("userFavoriteRecipes", userFavoriteRecipes);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-recipe-tomato-red text-white text-xs font-medium py-1 px-2 rounded">
          {category}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-playfair text-xl font-semibold mb-3 text-recipe-dark-green">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-recipe-herb-green mr-1" />
            <span>{prepTime}</span>
          </div>
          <div className="flex items-center">
            {(userFavoriteRecipes.find((receitaUser) => receitaUser.id === receita.id) || favoritada) ? (
              <Heart className="h-4 w-4 text-recipe-herb-green mr-1 fill-recipe-herb-green" onClick={handleDesfavoritar} />
            ) : (
              <Heart className="h-4 w-4 text-recipe-herb-green mr-1" onClick={handleFavoritar} />
            )}
            <span>{likes}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <button className="text-recipe-herb-green text-sm font-medium hover:text-recipe-tomato-red transition-colors" onClick={() => {
          navigate(`/recipes/${id}`)
        }}>
          Ver receita →
        </button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
