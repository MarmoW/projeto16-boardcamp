import { CustomerSchema } from "../schema/CustomerSchema.js";
import {db} from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function ListRentals(req, res){

    try{

        const GetRentals = db.query("SELECT * FROM rentals");

        res.send(GetRentals)
        
    }catch(err){
        res.send(err.message)
    }
} // listar jogos alugados

export async function RentGame(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const Today = dayjs().format("YYYY-MM-DD");

    if(daysRented < 1) res.sendStatus(400);

    try{   
        const CheckCustomer = await db.query("SELECT * FROM customers WHERE customerId = $1", [customerId]);

        if (CheckCustomer.rows.length < 1) return res.sendStatus(400);

        const GetGameInfo = await db.query("SELECT * FROM games WHERE id=$1", [gameId]);

        if (GetGameInfo.rows.length < 1) return res.sendStatus(400);
        
        const CheckGameRentals = await db.query("SELECT * FROM rentals WHERE gameId = $1", [gameId]);

        if(CheckGameRentals.rows.length >= GetGameInfo.rows[0].stockTotal) return res.sendStatus(400);

        const EstPrice = GetGameInfo.pricePerDay * daysRented;

        await db.query("INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) VALUES ($1,$2,$3,$4,$5,$6,$7)", [customerId, gameId, Today, daysRented, null, EstPrice, null]);

        res.sendStatus(201);

    }catch(err){
        res.send(err.message)

    }
} // alugar jogo

export async function DepositGame(req, res){

    try{


    }catch(err){

    }
} // devolver o jogo

export async function DeleteRental(req, res){} // deleta locação