import express from  'express';
import cors from 'cors';
import CustomerRouter from './routers/CustomerRoutes.js';
import GameRouter from './routers/GameRoutes.js';
import RentalRouter from './routers/RentalRoutes.js';

const server = express();

server.use(express.json());

server.use(cors());

server.use([CustomerRouter, GameRouter, RentalRouter]);

server.listen(5000, () => {
    console.log('Server on')
  });