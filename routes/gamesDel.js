import express from 'express'; 
import { PrismaClient } from '@prisma/client'; // Importando Prisma Client

const prisma = new PrismaClient();
const router = express.Router();  // Usando express.Router() para definir as rotas

// Endpoint para deletar um jogo com base no id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Verifica se o jogo existe antes de tentar deletar
    const game = await prisma.game.findUnique({
      where: { id: id }, // Passando o id como string
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Deleta os Highlights relacionados ao jogo
    await prisma.highlight.deleteMany({
      where: { gameId: id }, // Exclui os registros de Highlights relacionados ao jogo
    });

    // Deleta os registros de Requirements relacionados ao jogo
    await prisma.requirements.deleteMany({
      where: { gameId: id }, // Exclui os registros de Requirements relacionados ao jogo
    });

    // Deleta o jogo
    await prisma.game.delete({
      where: { id: id }, // Passando o id como string
    });

    res.status(200).json({ message: `Game with id ${id} and related Highlights and Requirements deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting game', error });
  }
});

// Exportando a rota
export default router;
