import { TalentCard } from './talentCard';

export function TalentGrid({ talents }) {
    if (talents.length === 0) {
        return (
            <div className="col-span-full text-center py-12">
                <p className="text-slate-400">Nenhum talento encontrado</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent, idx) => (
                <TalentCard key={idx} talent={talent} />
            ))}
        </div>
    );
}


// src/components/LoadingSpinner.jsx
export function LoadingSpinner() {
    return (
        <div className="text-center py-12">
            <p className="text-slate-400">Carregando talentos...</p>
        </div>
    );
}