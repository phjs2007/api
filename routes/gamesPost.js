import express from "express";
import { PrismaClient } from "@prisma/client";
import { getGameImages } from './gameImages.js';  // Importando a função para buscar imagens

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para adicionar um jogo ao banco de dados
router.post("/", async (req, res) => {
    const {
        name,
        price,
        desconto,
        title,
        description,
        destaque,
        vendido,
        highlightsTitle,
        highlights,
        closingDescription,
        finalNote,
        genre,
        plataforma,
        lancamento,
        empresa,
        size,
        requirements,
    } = req.body;

    try {
        // Buscar imagens da RAWG e Giant Bomb
        const { rawgImageUrl, giantbombImageUrl } = await getGameImages(name);

        // Adicionar jogo ao banco de dados
        const game = await prisma.game.create({
            data: {
                name,
                price,
                desconto,
                title,
                description,
                destaque,
                vendido,
                highlightsTitle,
                closingDescription,
                finalNote,
                genre,
                plataforma,
                lancamento: new Date(lancamento),
                empresa,
                size,
                rawgImageUrl,
                giantbombImageUrl,
                requirements: {
                    create: requirements,
                },
                highlights: {
                    create: highlights,
                },
            },
        });

        res.status(201).json(game);
    } catch (error) {
        console.error("Erro ao adicionar o jogo:", error);
        res.status(500).json({ error: "Erro ao adicionar o jogo" });
    }
});

export default router;