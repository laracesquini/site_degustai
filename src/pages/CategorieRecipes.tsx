
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories.js";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { recipes, } from "@/data/recipes.js";
import RecipeCard from "@/components/RecipeCard";

const CategorieRecipes = () => {
  const params = useParams();

  console.log("params", params)

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

      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {params?.id === 'Café da manhã' && (
              recipes.map((recipe) => {
                if (recipe.category === 'Café da manhã')
                  return (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      prepTime={recipe.prepTime}
                      category={recipe.category}
                      likes={recipe.likes}
                      receita={recipe}
                    />
                  )
              })
            )}
            {params?.id === 'Prato principal' && (
              recipes.map((recipe) => {
                if (recipe.category === 'Prato principal')
                  return (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      prepTime={recipe.prepTime}
                      category={recipe.category}
                      likes={recipe.likes}
                      receita={recipe}
                    />
                  )
              })
            )}
            {params?.id === 'Sobremesas' && (
              recipes.map((recipe) => {
                if (recipe.category === 'Sobremesas')
                  return (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      prepTime={recipe.prepTime}
                      category={recipe.category}
                      likes={recipe.likes}
                      receita={recipe}
                    />
                  )
              })
            )}
            {params?.id === 'Vegetariano' && (
              recipes.map((recipe) => {
                if (recipe.is_vegetarian)
                  return (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      prepTime={recipe.prepTime}
                      category={recipe.category}
                      likes={recipe.likes}
                      receita={recipe}
                    />
                  )
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategorieRecipes;