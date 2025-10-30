import { useState } from 'react';
import { Mail, Phone, Instagram, Play } from 'lucide-react';

export function TalentCard({ talent }) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10">
            {/* Foto/Video */}
            <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
                {showVideo && talent.video ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={talent.video}
                        title="Apresentação"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <>
                        {talent.foto ? (
                            <img
                                src={talent.foto}
                                alt={talent.nome}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-slate-600">Sem foto</div>
                        )}
                        {talent.video && (
                            <button
                                onClick={() => setShowVideo(true)}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition opacity-0 hover:opacity-100"
                            >
                                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                                    <Play size={28} className="text-white fill-white" />
                                </div>
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1">{talent.nome}</h3>

                <div className="space-y-1 text-sm text-slate-400 mb-3">
                    {talent.idade && <p>📍 {talent.idade} anos</p>}
                    {talent.genero && <p>👤 {talent.genero}</p>}
                </div>

                {/* Contato */}
                <div className="flex gap-2 pt-3 border-t border-slate-700">
                    {talent.email && (
                        <a
                            href={`mailto:${talent.email}`}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded transition text-sm text-slate-300"
                            title="Email"
                        >
                            <Mail size={16} />
                            <span className="hidden sm:inline">Email</span>
                        </a>
                    )}
                    {talent.telefone && (
                        <a
                            href={`tel:${talent.telefone}`}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded transition text-sm text-slate-300"
                            title="Telefone"
                        >
                            <Phone size={16} />
                            <span className="hidden sm:inline">Chamar</span>
                        </a>
                    )}
                    {talent.instagram && (
                        <a
                            href={talent.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-linear-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 rounded transition text-sm text-white"
                            title="Instagram"
                        >
                            <Instagram size={16} />
                            <span className="hidden sm:inline">IG</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}