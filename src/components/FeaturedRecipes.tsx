
import RecipeCard from "./RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  category: string;
  likes: number;
}

interface FeaturedRecipesProps {
  recipes: Recipe[];
}

const FeaturedRecipes = ({ recipes }: FeaturedRecipesProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-recipe-dark-green mb-4">
            Receitas em destaque
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore nossas receitas mais populares selecionadas especialmente para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(0, 3).map((recipe) => (
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
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center border-2 border-recipe-tomato-red text-recipe-tomato-red font-medium py-3 px-8 rounded-full hover:bg-recipe-tomato-red hover:text-white transition-colors">
            Ver mais
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
