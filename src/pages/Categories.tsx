
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { recipes, } from "@/data/recipes.js";
import RecipeCard from "@/components/RecipeCard";

const Categories = () => {
  const [filter, setFilter] = useState<string | null>('todas');
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    setFilter(category);
    navigate(`${category}`)
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-recipe-dark-green pt-28 pb-16">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Categorias
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Navegue em nossa coleção de receitas por categoria para encontrar exatamente o que você procura
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleClick(category?.name)}
                className="group block relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-recipe-dark-green/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="font-playfair text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 mb-3">{category.count} recipes</p>
                  <span className="inline-block cursor-pointer text-white text-sm group-hover:text-recipe-tomato-red transition-colors">
                    Ver receitas →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;