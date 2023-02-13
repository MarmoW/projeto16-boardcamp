import { Router } from 'express';
import ValidateMiddleware from '../middlewares/ValidateMiddleware.js';
import { GameSchema } from '../schema/GameSchema.js';
import {GetGames, InsertGames} from '../controllers/GameController.js'

const GameRouter = Router();

GameRouter.get("/games", GetGames);
GameRouter.post("/games", ValidateMiddleware(GameSchema), InsertGames);

export default GameRouter;