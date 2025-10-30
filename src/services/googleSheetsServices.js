const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

function formatDriveLink(url) {
    if (!url) return "";
    if (url.includes("drive.google.com/file/d/")) {
        const id = url.split("/d/")[1]?.split("/")[0];
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }
    return url;
}

function formatVideo(url) {
    if (!url) return "";
    if (url.includes("watch?v=")) {
        const id = url.split("watch?v=")[1];
        return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("drive.google.com/file/d/")) {
        const id = url.split("/d/")[1]?.split("/")[0];
        return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url;
}

function formatInstagram(handle) {
    if (!handle) return "";
    handle = handle.replace("@", "").trim();
    if (handle.startsWith("http")) return handle;
    return `https://instagram.com/${handle}`;
}

function cleanGenero(genero) {
    if (!genero) return "";
    return genero.trim().replace(/\s+/g, ' ');
}

function normalizeTalent(row) {
    // Como o range começa em A2, cada row é um array: [Foto, Nome, Telefone, Instagram, Gênero, Idade, Vídeo, Email]
    return {
        foto: formatDriveLink(row[0] || ""),      // Coluna A
        nome: row[1] || "",                        // Coluna B
        telefone: row[2] || "",                    // Coluna C
        instagram: formatInstagram(row[3] || ""), // Coluna D
        genero: cleanGenero(row[4] || ""),        // Coluna E
        idade: row[5] || "",                       // Coluna F
        video: formatVideo(row[6] || ""),         // Coluna G
        email: row[7] || "",                       // Coluna H (Email)
    };
}

export async function fetchTalentsFromSheet() {
    try {
        if (!API_KEY) {
            throw new Error("Configure a VITE_GOOGLE_API_KEY no arquivo .env");
        }
        if (!SPREADSHEET_ID) {
            throw new Error("Configure a VITE_SPREADSHEET_ID no arquivo .env");
        }

        const range = "A2:H"; // Linha 2 até 1000, colunas A a H (Email)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Erro ao carregar talentos");
        }

        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        const talents = rows.map((row) => normalizeTalent(row));

        return talents;
    } catch (error) {
        console.error("Erro ao buscar talentos:", error);
        throw error;
    }
}

export function getUniqueValues(data, field) {
    return [...new Set(data.map((item) => item[field]).filter(Boolean))].sort();
}

// Mock de dados para visualização
export const mockTalents = [
    {
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        nome: 'Marcus Johnson',
        telefone: '+55 85 98801-9294',
        instagram: 'https://instagram.com/marcusjohnson',
        genero: 'Homem',
        idade: '28',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        email: 'marcus@email.com',
    },
    {
        foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
        nome: 'Ana Vitória Almeida',
        telefone: '+55 85 99999-2222',
        instagram: 'https://instagram.com/anavitoria.umaso',
        genero: 'Mulher',
        idade: '25',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        email: 'anavitoria@email.com',
    },
    {
        foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
        nome: 'André Campos',
        telefone: '+55 85 99999-3333',
        instagram: 'https://instagram.com/andrecamposator',
        genero: 'Homem',
        idade: '32',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        email: 'andre@email.com',
    },
];