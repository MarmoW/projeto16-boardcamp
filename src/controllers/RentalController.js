import { CustomerSchema } from "../schema/CustomerSchema.js";
import {db} from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function ListRentals(req, res){
    const {customerId} = req.params;

    try{

        const getRentals = await db.query("SELECT * FROM rentals");

        res.send(getRentals.rows);
        
    }catch(err){
        res.status(500).send(err.message)
    }
} // listar jogos alugados

export async function RentGame(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const Today = dayjs().format("YYYY-MM-DD");

    if(daysRented < 1) res.sendStatus(400);

    try{   
        console.log(customerId)
        const checkCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
         
        if (checkCustomer.rows.length < 1) return res.sendStatus(400);
        
        const getGameInfo = await db.query("SELECT * FROM games WHERE id=$1", [gameId]);

        if (getGameInfo.rows.length < 1) return res.sendStatus(400);
        
        const checkGameRentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);

        if(checkGameRentals.rows.length >= getGameInfo.rows[0].stockTotal) return res.sendStatus(400);

        const EstPrice = getGameInfo.rows[0].pricePerDay * daysRented;

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`, [customerId, gameId, Today, daysRented, null, EstPrice, null]);

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message)

    }
} // alugar jogo

export async function DepositGame(req, res){
    const {id} = req.params;
    const Today = dayjs().format("YYYY-MM-DD");
    
    try{
        const GetGame = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])

        if(GetGame.rows.length < 1) return res.sendStatus(404)
        if(GetGame.rows[0].returnDate != null) return res.sendStatus(400)

        console.log(GetGame.rows[0].rentDate)
        if(GetGame.rows[0].rentDate.diff(Today, 'days') <= GetGame.rows[0].daysRented){
            await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=0 WHERE id=$2`, [Today, id])
            res.sendStatus(200)
        }
        
        const extraDays= GetGame.rows[0].rentDate.diff(Today, 'days') - GetGame.rows[0].rentedDays
        const priceDay = GetGame.rows[0].originalPrice/GetGame.rows[0].daysRented
        const extraFee = priceDay*extraDays
        
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,[Today, extraFee, id])

        res.sendStatus(200)

    }catch(err){
        res.status(500).send(err.message)
    }
} // devolver o jogo

export async function DeleteRental(req, res){
const {id} = req.params;
try{
    const findRental = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id])
    if(findRental.rows.length < 1) return res.sendStatus(404)
    if(findRental.rows[0].returnDate != null) return res.sendStatus(400)

    await db.query(`DELETE FROM rentals WHERE id=$1`, [id])

    res.sendStatus(200)
}catch(err){
    res.status(500).send(err.message)
}

} // deleta locação