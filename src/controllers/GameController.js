import {db} from '../database/database.connection.js';
import { GameSchema } from '../schema/GameSchema.js';

export async function GetGames(req, res){

    try{
        const allGames = await db.query("SELECT * FROM games");

        res.send(allGames);

    }catch(err){

        res.send(err.message);

    }
};

export async function InsertGames(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{
        const checkGame = await db.query("SELECT * FROM games WHERE name=$1", [name]);

        if(checkGame.rows[0].name == name ) return res.sendStatus(409);

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,[name, image, stockTotal, pricePerDay]);

        res.sendStatus(201);

    }catch(err){
        res.send(err.message);
    }

}