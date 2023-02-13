import { Router } from 'express';
import ValidateMiddleware from '../middlewares/ValidateMiddleware.js';
import { CustomerSchema } from '../schema/CustomerSchema.js';
import { SignUp, UpdateUser, GetAllUsers, GetById } from '../controllers/CustomerController.js';

const CustomerRouter = Router();

CustomerRouter.get("/customers", GetAllUsers);
CustomerRouter.get("/customers/:id", GetById);
CustomerRouter.post("/customers", ValidateMiddleware(CustomerSchema), SignUp);
CustomerRouter.put("/customers", ValidateMiddleware(CustomerSchema), UpdateUser);


export default CustomerRouter;