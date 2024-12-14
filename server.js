import express from 'express';
import cors from 'cors'; // Importando o CORS
import gamesGetRoutes from './routes/gamesGet.js';
import gamesPostRoutes from './routes/gamesPost.js';
import gamesDelRoutes from './routes/gamesDel.js';
import gamesPutRoutes from './routes/gamesPut.js';

const app = express();
import dotenv from 'dotenv';
dotenv.config();

// Middleware para tratar JSON
app.use(express.json());

// Habilitando o CORS
app.use(cors());

// Usando as rotas GET e POST separadas
app.use('/games', gamesGetRoutes);         // Rota para GET /games
app.use('/games/create', gamesPostRoutes);
app.use('/games/del', gamesDelRoutes);  // Rota para POST /games/create
app.use('/games/update', gamesPutRoutes); // Rota para PUT /games/update

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


