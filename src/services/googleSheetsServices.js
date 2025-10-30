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
        genero: cleanGenero(row[5] || ""),        // Coluna E
        idade: row[6] || "",                       // Coluna F
        video: formatVideo(row[7] || ""),         // Coluna G
        email: row[4] || "",                       // Coluna H (Email)
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

