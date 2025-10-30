import React from 'react'
export function ErrorMessage({ message }) {
    return (
        <div className="bg-yellow-500/10 border border-yellow-600/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 text-sm">{message}</p>
            <p className="text-slate-400 text-sm mt-2">Mostrando dados de exemplo...</p>
        </div>
    );
}