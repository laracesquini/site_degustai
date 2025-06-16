
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { recipes, } from "@/data/recipes.js";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Funnel } from "lucide-react";
import DrawerFilters from "@/components/DrawerFilters";


const Recipes = () => {

  const [filter, setFilter] = useState<string | null>('todas');
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    ingredientes: [],
    tempo: "",
    categoria: "",
  });

  const filtrarReceitas = (receitas, filtros) => {
    return receitas.filter((receita) => {
      // Filtrar por ingredientes (TODOS os selecionados devem estar na receita)
      const ingredientesSelecionados = filtros.ingredientes;
      const temIngredientes = ingredientesSelecionados.every(ing =>
        receita.ingredients.some(ri => ri.toLowerCase().includes(ing.toLowerCase()))
      );

      // Filtrar por tempo (se definido)
      const tempoSelecionado = parseInt(filtros.tempo);
      const tempoDaReceita = parseInt(receita.prepTime);
      const tempoOk = filtros.tempo ? tempoDaReceita <= tempoSelecionado : true;

      // Filtrar por categoria (se definida)
      const categoriaOk = filtros.categoria
        ? filtros.categoria === "Vegetariano"
          ? receita.is_vegetarian === true 
          : receita.category === filtros.categoria
        : true;

      return temIngredientes && tempoOk && categoriaOk;
    });
  };

  const receitasFiltradas = filtrarReceitas(recipes, filters);

  console.log(receitasFiltradas)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
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

      {/* Filters */}
      <div className="bg-gray-50 py-6 border-b">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button className={``} variant="outline" size="sm" onClick={() => setIsOpen(true)}>
                <Funnel className='text-white' />
                Filtros
              </Button>
              <DrawerFilters isOpen={isOpen} onClose={() => setIsOpen(false)} filters={filters} setFilters={setFilters} />
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="py-16">
        <div className="container">
          {receitasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {receitasFiltradas.map(receita => (
                <RecipeCard
                  key={receita.id}
                  receita={receita}
                  id={receita.id}
                  title={receita.title}
                  image={receita.image}
                  prepTime={receita.prepTime}
                  category={receita.category}
                  likes={receita.likes}
                />))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-center w-full h-52">
              <p className="text-gray-500 text-2xl">
                Nenhuma receita encontrada.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recipes;
