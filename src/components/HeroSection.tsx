
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('imagens/tomate3.png')",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 text-center max-w-4xl px-4 py-12">
        <div className="mb-6">
          <span className="text-white uppercase tracking-widest text-sm font-poppins flex items-center justify-center">
            <span className="inline-block w-8 h-px bg-white mx-2"></span>
            Cozinhar pode ser simples
            <span className="inline-block w-8 h-px bg-white mx-2"></span>
          </span>
        </div>

        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white mb-6">
          <span className="block">Receitas</span>
          <span className="block italic">Degustaí</span>
        </h1>

        <div className="mt-12">
          <Button
            variant="recipe"
            size="xl"
            className="font-medium px-10 py-6 h-auto uppercase tracking-wide"
            onClick={() => {
              navigate('/recipes')
            }}
          >
            EXPLORE RECEITAS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
