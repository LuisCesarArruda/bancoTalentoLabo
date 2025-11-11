import React from "react";
import { Users } from "lucide-react";


export function Header() {
    return (
        <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center">
                        <Users className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Banco de Elenco</h1>
                        <p className="text-sm text-slate-400">Cinema Unifor - Conecte com profissionais</p>
                    </div>
                </div>
            </div>
        </header>
    );
}