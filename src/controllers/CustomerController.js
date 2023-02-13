import { CustomerSchema } from "../schema/CustomerSchema.js";
import {db} from '../database/database.connection.js';
import { response } from "express";

export async function SignUp(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        const checkCpf = await db.query("SELECT * FROM customers WHERE cpf=$1", [cpf]);

        if(checkCpf.rows.length > 0) return res.status(409).send();

        await db.query("INSERT INTO customers (name, phone, cpf, birthday) WHERE ($1,$2,$3,$4)", [name, phone, cpf, birthday]);

        res.sendStatus(201);
        
    }catch(err){
        res.status(500).send(err.message);
    }
} 

export async function UpdateUser(req, res){
    const {id} = req.query;
    const {name, phone, cpf, birthday} = req.body;
    try{
        const checkUpdateCpf = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf])

        if(checkUpdateCpf.rows.length > 0) return res.sendStatus(409);

        await db.query(`UPDATE users (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4) WHERE id=$5`, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);

    }catch(err){
        res.send(err.message);
    }

}

export async function GetAllUsers(req, res){

    try{
        const customers = await db.query("SELECT * FROM users");

        res.send(customers.rows);

    }catch(err){
        res.send(err.message);

    }
}

export async function GetById(req,res){
    const {id} = req.query;

    try{
        const getWithId = await db.query("SELECT * FROM customers WHERE id=$1", [id]);

        if(id.rows.length < 1) return res.sendStatus(404);

        res.send(getWithId.rows);

    }catch(err){
        res.send(err.message);
    }
}