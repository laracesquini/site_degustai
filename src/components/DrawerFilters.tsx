import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function DrawerFilters({ isOpen, onClose, filters, setFilters }) {
  const ingredientesDisponiveis = [
    "macarrão",
    "mussarela",
    "tomate",
    "batata",
    "cenoura",
    "espinafre",
    "ovo",
  ];

  const [draftFilters, setDraftFilters] = useState(filters);

  // Atualiza os filtros locais toda vez que o drawer abre
  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters);
    }
  }, [isOpen, filters]);

  const handleSalvar = () => {
    setFilters(draftFilters);
    onClose();
  };

  const handleLimpar = () => {
    const filtrosLimpos = {
      categoria: "",
      ingredientes: [],
      tempo: "",
    };
    setDraftFilters(filtrosLimpos);
    setFilters(filtrosLimpos);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg text-black font-semibold">Filtros</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-background"
              value={draftFilters.categoria}
              onChange={(e) =>
                setDraftFilters((prev) => ({ ...prev, categoria: e.target.value }))
              }
            >
              <option value="">Selecione</option>
              <option value="Café da manhã">Café da Manhã</option>
              <option value="Prato principal">Prato principal</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Vegetariano">Vegetariano</option>
            </select>
          </div>

          {/* Ingredientes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredientes
            </label>
            {ingredientesDisponiveis.map((ing) => (
              <label key={ing} className="block text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  className="accent-recipe-dark-green mr-2"
                  checked={draftFilters.ingredientes.includes(ing)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDraftFilters((prev) => {
                      const novaLista = checked
                        ? [...prev.ingredientes, ing]
                        : prev.ingredientes.filter((i) => i !== ing);
                      return { ...prev, ingredientes: novaLista };
                    });
                  }}
                />
                {ing}
              </label>
            ))}
          </div>

          {/* Tempo de preparo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Preparo (minutos)
            </label>
            <Input
              type="number"
              placeholder="Ex: até 30 minutos"
              value={draftFilters.tempo}
              onChange={(e) =>
                setDraftFilters((prev) => ({ ...prev, tempo: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-row justify-between">
            <Button variant="outline" size="sm" onClick={handleLimpar}>
              Limpar filtros
            </Button>

            <Button variant="outline" size="sm" onClick={handleSalvar}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawerFilters;
