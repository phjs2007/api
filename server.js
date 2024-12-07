import express from 'express';
import cors from 'cors'; // Importando o CORS
import gamesGetRoutes from './routes/gamesGet.js';
import gamesPostRoutes from './routes/gamesPost.js';

const app = express();

// Middleware para tratar JSON
app.use(express.json());

// Habilitando o CORS
app.use(cors());

// Usando as rotas GET e POST separadas
app.use('/games', gamesGetRoutes);         // Rota para GET /games
app.use('/games/create', gamesPostRoutes); // Rota para POST /games/create

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


