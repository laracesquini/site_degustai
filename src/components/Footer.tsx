
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-recipe-dark-green pt-16 pb-8 text-white/80">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-playfair text-2xl font-bold tracking-wide text-white">Degustaí</span>
            </Link>
            <p className="mb-4">
              Descubra deliciosas receitas feitas com ingredientes frescos. Um ambiente para amantes da gastronomia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-recipe-tomato-red transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-recipe-tomato-red transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-recipe-tomato-red transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Atalhos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-white transition-colors">Receitas</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">Categorias</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Sobre</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contate-nos</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/Café da manhã" className="hover:text-white transition-colors">Café da manhã</Link>
              </li>
              <li>
                <Link to="/categories/Prato principal" className="hover:text-white transition-colors">Prato Principal</Link>
              </li>
              <li>
                <Link to="/categories/Sobremesas" className="hover:text-white transition-colors">Sobremesa</Link>
              </li>
              <li>
                <Link to="/categories/Vegetariano" className="hover:text-white transition-colors">Vegetariano</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Contate-nos</h4>
            <address className="not-italic space-y-3">
            <p className="mb-4">
              +55 (11) 91234-5678
            </p>
            <p className="mb-4">
              info@degustai.com
            </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-white/10 text-center text-sm">
          <p>© {new Date().getFullYear()} Degustaí. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
