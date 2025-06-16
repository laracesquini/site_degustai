import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ receitas }: { receitas: any[] }) {
  const [buscaAtiva, setBuscaAtiva] = useState(false);
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    console.log(valor)
    setQuery(valor);

    if (valor.trim() === "") {
      setResultados([]);
      return;
    }

    const filtradas = receitas.filter((r) =>
      r.title.toLowerCase().includes(valor.toLowerCase()) ||
      r.ingredients.some((ing: string) =>
        ing.toLowerCase().includes(valor.toLowerCase())
      )
    );
    console.log(filtradas)
    setResultados(filtradas);
  };

  return (
    <div className="relative flex flex-row gap-2">
      {buscaAtiva && (
        <input
          type="text"
          value={query}
          onChange={handleBuscar}
          placeholder="Buscar receita ou ingrediente"
          className=" rounded bg-white/10 px-2 w-64"
        />
      )}

      <div className={`text-white hover:bg-white/10 w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer`} onClick={() => { setBuscaAtiva(!buscaAtiva) }}>
        <Search className="text-2xl" />
      </div>

      {/* Resultados */}
      {(resultados.length > 0 && buscaAtiva) && (
        <div className="absolute top-full mt-3 bg-white border rounded shadow w-[600px] max-h-[400px] overflow-y-auto overflow-x-hidden z-50">
          {resultados.map((r) => (
            <div
              key={r.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-3 items-start"
              onClick={() => navigate(`/recipes/${r.id}`)}
            >
              <img
                src={r.image}
                alt={r.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-recipe-dark-green/95">{r.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
