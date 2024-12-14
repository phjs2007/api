import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Rota GET para obter os 10 primeiros jogos
router.get("/", async (req, res) => {
    try {
        const games = await prisma.game.findMany({
            take: 9,  // Limita a 10 jogos
            select: {
                id: true,
                name: true,  // Nome do jogo
                price: true,  // Preço do jogo
                desconto: true,  // Desconto do jogo
                rawgImageUrl: true,  // Imagem da GiantBomb
            },
        });

        res.status(200).json(games);
    } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        res.status(500).json({ error: "Erro ao buscar jogos." });
    }
});

// Rota GET para obter detalhes de um jogo específico


router.get("/recentes", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Limite com valor padrão de 10

    try {
        const recentGames = await prisma.game.findMany({
            take: limit, // Aplica o limite
            orderBy: {
                lancamento: "desc", // Ordena por data de lançamento em ordem decrescente
            },
            select: {
                id: true,
                name: true,
                price: true,
                desconto: true,
                rawgImageUrl: true,
                lancamento: true, // Inclui a data de lançamento na resposta
            },
        });

        res.status(200).json(recentGames);
    } catch (error) {
        console.error("Erro ao buscar jogos mais recentes:", error);
        res.status(500).json({ error: "Erro ao buscar jogos mais recentes." });
    }
});

router.get("/destaques", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Limite com valor padrão de 10

    try {
        const featuredGames = await prisma.game.findMany({
            where: {
                destaque: true, // Filtra apenas os jogos com destaque
            },
            take: limit, // Limita o número de jogos retornados
            orderBy: {
                lancamento: "desc", // Ordena por data de lançamento (opcional)
            },
            select: {
                id: true,
                name: true,
                price: true,
                desconto: true,
                rawgImageUrl: true,
                giantbombImageUrl: true,
                lancamento: true,
                destaque: true, // Inclui a propriedade destaque na resposta
            },
        });

        res.status(200).json(featuredGames);
    } catch (error) {
        console.error("Erro ao buscar jogos destacados:", error);
        res.status(500).json({ error: "Erro ao buscar jogos destacados." });
    }
});

router.get("/vendidos", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Limite com valor padrão de 10

    try {
        const soldGames = await prisma.game.findMany({
            where: {
                vendido: true, // Filtra apenas os jogos vendidos
            },
            take: limit, // Limita o número de jogos retornados
            orderBy: {
                lancamento: "desc", // Ordena por data de lançamento (opcional)
            },
            select: {
                id: true,
                name: true,
                price: true,
                desconto: true,
                rawgImageUrl: true,
                lancamento: true,
                vendido: true, // Inclui a propriedade vendido na resposta
            },
        });

        res.status(200).json(soldGames);
    } catch (error) {
        console.error("Erro ao buscar jogos vendidos:", error);
        res.status(500).json({ error: "Erro ao buscar jogos vendidos." });
    }
});

router.get("/rpg", async (req, res) => {     
    const limit = parseInt(req.query.limit) || 21; // Limite com valor padrão de 21     
    try {         
        const rpgGames = await prisma.game.findMany({             
            where: {                 
                genre: {                     
                    has: "Indie",  // Verifica se "RPG" está presente na lista de gêneros                 
                },             
            },             
            take: limit, // Limita o número de jogos retornados             
            orderBy: {
                id: 'desc', // Ordena os jogos pelo ID de forma decrescente (últimos primeiros)
            },
            select: {                 
                id: true,                 
                name: true,                 
                price: true,                 
                desconto: true,                 
                rawgImageUrl: true,                 
                lancamento: true,                 
                genre: true,  // Inclui o gênero na resposta             
            },         
        });          
        res.status(200).json(rpgGames);     
    } catch (error) {         
        console.error("Erro ao buscar jogos RPG:", error);         
        res.status(500).json({ error: "Erro ao buscar jogos RPG." });     
    } 
});

router.get("/todos", async (req, res) => {
    try {
        const allGames = await prisma.game.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                desconto: true,
                rawgImageUrl: true,
                giantbombImageUrl: true,
                genre: true
            },
        });

        res.status(200).json(allGames);
    } catch (error) {
        console.error("Erro ao buscar todos os jogos:", error);
        res.status(500).json({ error: "Erro ao buscar todos os jogos." });
    }
});


router.get("/:gameId", async (req, res) => {
    const { gameId } = req.params;  // Extrai o ID do jogo da URL

    // Permite IDs com ou sem `{}` e verifica se é hexadecimal
    if (!/^\{?[0-9a-fA-F]{24}\}?$/.test(gameId)) {
        return res.status(400).json({ error: "ID do jogo inválido." });
    }

    // Remove `{}` do ID antes de usá-lo no banco de dados
    const sanitizedGameId = gameId.replace(/[{}]/g, '');

    try {
        const game = await prisma.game.findUnique({
            where: {
                id: sanitizedGameId,  // Usa o ID sanitizado
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                desconto: true,
                giantbombImageUrl: true,
                rawgImageUrl: true,
                genre: true,
                plataforma: true,
                lancamento: true,
                empresa: true,
                size: true,
                requirements: true,
                highlights: true,
                closingDescription: true,
                finalNote: true,
            },
        });

        if (!game) {
            return res.status(404).json({ error: "Jogo não encontrado." });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error("Erro ao buscar jogo:", error);
        res.status(500).json({ error: "Erro ao buscar jogo." });
    }
});
export default router;