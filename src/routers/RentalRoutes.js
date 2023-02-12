import { Router } from 'express';
import ValidateMiddleware from '../middlewares/ValidateMiddleware.js';
import { RentalSchema } from '../schema/RentalSchema.js';
import {ListRentals, RentGame, DepositGame, DeleteRental} from '../controllers/RentalController.js'

const RentalRouter = Router();

RentalRouter.get("/rentals", ListRentals)
RentalRouter.post("/rentals", ValidateMiddleware(RentalSchema), RentGame)
RentalRouter.post("/rentals/:id/return", DepositGame)
RentalRouter.delete("/rentals/:id", DeleteRental)