
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-recipe-dark-green mb-4">
            Categorias de receitas
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Navegue pelas nossas deliciosas receitas por categoria e encontre exatamente o que você procura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.name}`}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-recipe-dark-green/90 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-playfair text-2xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.count} receitas</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
