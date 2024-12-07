import axios from "axios";

const getGameImages = async (gameName) => {
    try {
        // Chamada à API da RAWG
        const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
            params: {
                key: '5c9096f394604df78773f0ae90827f33',
                page_size: 1,
                search: gameName,
            },
        });
        const rawgImageUrl = rawgResponse.data.results[0]?.background_image;

        // Chamada à API da Giant Bomb
        const giantbombResponse = await axios.get(`https://www.giantbomb.com/api/search`, {
            params: {
                api_key: '0fd33f6e40cbced5aca486335bf8b2b3349dbd53',
                format: 'json',
                query: gameName,
                resources: 'game',
            },
        });
        const giantbombImageUrl = giantbombResponse.data.results[0]?.image?.medium_url;

        return {
            rawgImageUrl,
            giantbombImageUrl,
        };
    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        return { rawgImageUrl: null, giantbombImageUrl: null };
    }
};

// Exportar a função
export { getGameImages };