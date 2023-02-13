import { CustomerSchema } from "../schema/CustomerSchema.js";
import {db} from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function ListRentals(req, res){
    const {customerId} = req.params;

    try{

        const getRentals = await db.query(`SELECT rentals.*,
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game FROM rentals 
        JOIN customers ON rentals."customerId" = customers.Id 
        JOIN games ON rentals."gameId"=games.id`);

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
    const today = dayjs().format('YYYY-MM-DD')

    try{
        const getGame = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        
        if(getGame.rows.length == 0) return res.sendStatus(404)

        const {rentDate, daysRented, returnDate, originalPrice} = getGame.rows[0]

        if(returnDate != null) return res.sendStatus(400)
        
        const rentedTime = dayjs().diff(rentDate, 'day')
        console.log(rentedTime, daysRented)

        if(rentedTime <= daysRented){
            await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=0 WHERE id=$2`, [today, id])
            res.sendStatus(200)
        }

        const extraDays= rentedTime - daysRented
        const priceDay = originalPrice/daysRented
        const extraFee = priceDay*extraDays
        
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,[today, extraFee, id])

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

    const {returnDate} = findRental.rows[0]
    
    if(returnDate == null) return res.sendStatus(400)
    
    await db.query(`DELETE FROM rentals WHERE id=$1`, [id])

    res.sendStatus(200)

}catch(err){
    res.status(500).send(err.message)
}

} // deleta locação