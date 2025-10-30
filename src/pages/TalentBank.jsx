import React from "react";
import { useState, useEffect } from "react";
import { fetchTalentsFromSheet, getUniqueValues, mockTalents } from '../services/googleSheetsServices';


import { ErrorMessage } from "../components/ErrorMessage";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TalentGrid } from "../components/TalentGrid";

export default function TalentBank() {
    const [talents, setTalents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genero, setGenero] = useState('');
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState('');
    const [useMock, setUseMock] = useState(false); // Toggle para mock

    useEffect(() => {
        const loadTalents = async () => {
            try {
                setLoading(true);

                // Usar mock se ativado, senão puxar do Google Sheets
                const data = useMock ? mockTalents : await fetchTalentsFromSheet();

                setTalents(data);
                const uniqueGeneros = getUniqueValues(data, 'genero');
                setGeneros(uniqueGeneros);
                setError('');
            } catch (err) {
                setError(err.message || 'Erro ao carregar talentos da planilha');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadTalents();
    }, [useMock]);

    const filteredTalents = talents.filter(talent => {
        const matchSearch = talent.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchGenero = !genero || talent.genero === genero;
        return matchSearch && matchGenero;
    });

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Botão de toggle Mock */}
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={() => setUseMock(!useMock)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${useMock
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                                : 'bg-slate-700 text-slate-300 border border-slate-600'
                            }`}
                    >
                        {useMock ? '📋 Usando Mock (Clique para dados reais)' : '🔗 Usando dados reais (Clique para mock)'}
                    </button>
                </div>

                {error && <ErrorMessage message={error} />}

                {!error && (
                    <>
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearch={setSearchTerm}
                            genero={genero}
                            onGeneroChange={setGenero}
                            generos={generos}
                        />

                        {loading && <LoadingSpinner />}

                        {!loading && <TalentGrid talents={filteredTalents} />}

                        
                    </>
                )}
            </main>
        </div>
    );
}