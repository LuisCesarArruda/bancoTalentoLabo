import { Search } from 'lucide-react';

export function SearchBar({ searchTerm, onSearch, genero, onGeneroChange, generos }) {
    return (
        <div className="mb-8 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
                />
            </div>

            <div>
                <label className="text-sm text-slate-400 mb-2 block">Filtrar por gênero:</label>
                <select
                    value={genero}
                    onChange={(e) => onGeneroChange(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                    <option value="">Todos os gêneros</option>
                    {generos.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}