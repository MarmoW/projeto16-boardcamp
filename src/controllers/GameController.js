import db from '../database/database.connection.js';
import { GameSchema } from '../schema/GameSchema.js';

export function GetGames(req, res){

    try{
        const AllGames = await db.query("SELECT * FROM games");

        res.send(AllGames);

    }catch(err){

        res.send(err.message);

    }
};

export function InsertGames(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{

    }catch(err){

    }

}