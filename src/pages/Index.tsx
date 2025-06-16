
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import CategorySection from "@/components/CategorySection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { recipes,  } from "@/data/recipes.js";
import { categories } from "@/data/categories.js";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      <div className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl font-bold text-recipe-dark-green mb-4">
              Cozinha sem estresse
            </h2>
            <p className="text-gray-600">
              Descubra o prazer de cozinhar sem estresse! Receitas práticas e adaptadas ao seu gosto. Simples, rápidas e feitas para o seu dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="rounded-full bg-recipe-light-green/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-recipe-light-green">
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"></path>
                  <path d="M2 20h20"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2 text-recipe-dark-green">
                Ingredientes simples
              </h3>
              <p className="text-gray-600">
                Encontre receitas com os ingredientes que você tem em casa.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="rounded-full bg-recipe-light-green/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-recipe-light-green">
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="m2 14 6-6"></path>
                  <path d="m22 14-6-6"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2 text-recipe-dark-green">
                Salve receitas favoritas
              </h3>
              <p className="text-gray-600">
                Favorite receitas da sua preferência para fazer sempre que quiser.
              </p>
            </div>


          </div>
        </div>
      </div>

      <CategorySection categories={categories} />
      <FeaturedRecipes recipes={recipes} />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default Index;
