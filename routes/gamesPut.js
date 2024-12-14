import express from 'express';
import { PrismaClient } from '@prisma/client'; // Importando Prisma Client

const prisma = new PrismaClient();
const router = express.Router();

// Endpoint para atualizar parcialmente um jogo com base no id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body; // Dados enviados para atualização

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        // Verifica se o jogo existe
        const game = await prisma.game.findUnique({
            where: { id: id },
        });

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Atualiza apenas os campos fornecidos no corpo da requisição
        const updatedGame = await prisma.game.update({
            where: { id: id },
            data: updatedFields,
        });

        res.status(200).json({ message: 'Game updated successfully', game: updatedGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating game', error });
    }
});

export default router;