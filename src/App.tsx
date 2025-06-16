import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";

import Index from "./pages/Index";
import Recipes from "./pages/Recipes";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import RecipeItem from "./pages/RecipeItem";
import CategorieRecipes from "./pages/CategorieRecipes";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyRecipes from "./pages/MyRecipes";
import EsqueciSenha from "@/pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> {}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meusDados" element={<MyAccount />} />
          <Route path="/minhasReceitas" element={<MyRecipes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/categories/:id" element={<CategorieRecipes />} />
          <Route path="/recipes/:id" element={<RecipeItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
