
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "./SearchBar";
import { recipes } from "@/data/recipes.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogged, login, logout } = useAuth();

  const navigate = useNavigate();
  const logedUser = localStorage.getItem("userId");

  return (
    <nav className="w-full bg-recipe-dark-green/95 backdrop-blur-sm fixed top-0 z-50 py-4">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-playfair text-2xl font-bold tracking-wide text-white">Degustaí</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-recipe-tomato-red transition-colors">Home</Link>
          <Link to="/recipes" className="text-white hover:text-recipe-tomato-red transition-colors">Receitas</Link>
          <Link to="/categories" className="text-white hover:text-recipe-tomato-red transition-colors">Categorias</Link>
          <Link to="/about" className="text-white hover:text-recipe-tomato-red transition-colors">Sobre</Link>
          <Link to="/contact" className="text-white hover:text-recipe-tomato-red transition-colors">Contate-nos</Link>
        </div>

        {/* Search and button */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar receitas={recipes} />
          {logedUser ? (
            <>
              <div className="text-white hover:bg-white/10 w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer"
                onClick={() => { navigate('/meusDados') }}>
                <CircleUserRound className="text-2xl" />
              </div>
            </>
          ) : (
            <>
              <Button
                className="bg-recipe-tomato-red hover:bg-recipe-tomato-red/90 text-white rounded-full px-6"
                onClick={() => {
                  navigate('/register')
                }}
              >
                Cadastre-se
              </Button>
              <Button className="bg-recipe-tomato-red hover:bg-recipe-tomato-red/90 text-white rounded-full px-6" onClick={() => { navigate('/login') }}>
                Login
              </Button>
            </>
          )
          }

        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-recipe-dark-green border-t border-recipe-herb-green/20 py-4">
          <div className="container flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-recipe-tomato-red transition-colors py-2">Home</Link>
            <Link to="/recipes" className="text-white hover:text-recipe-tomato-red transition-colors py-2">Receitas</Link>
            <Link to="/categories" className="text-white hover:text-recipe-tomato-red transition-colors py-2">Categorias</Link>
            <Link to="/about" className="text-white hover:text-recipe-tomato-red transition-colors py-2">Sobre</Link>
            <Link to="/contact" className="text-white hover:text-recipe-tomato-red transition-colors">Contate-nos</Link>
            <div className="flex items-center justify-between pt-2 border-t border-recipe-herb-green/20">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button className="bg-recipe-tomato-red hover:bg-recipe-tomato-red/90 text-white rounded-full px-6">
                Submit Recipe
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
