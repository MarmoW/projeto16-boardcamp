import { CustomerSchema } from "../schema/CustomerSchema.js";
import {db} from '../database/database.connection.js';
import { response } from "express";

export async function SignUp(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        const CheckCpf = await db.query("SELECT * FROM customers WHERE cpf =$1", [cpf]);
        if(CheckCpf.length > 0) return res.status(409).send();

        await db.query("INSERT INTO customers (name, phone, cpf, birthday) WHERE ($1,$2,$3,$4)", [name, phone, cpf, birthday])

        res.status(201).send();
        
    }catch{

    }
} 

export async function UpdateUser(req, res){
    try{


    }catch(err){
        res.send(err.message);
    }

}

export async function GetAllUsers(req, res){

    try{
        const Customers = await db.query("SELECT * FROM users");

        res.send(Customers);

    }catch(err){
        res.send(err.message);

    }
}

export async function GetById(req,res){
    const {id} = req.query;

    try{
        const GetWithId = await db.query("SELECT * FROM customers WHERE id=$1", [id]);

        if(id.length < 1) return res.sendStatus(404);

        res.send(GetWithId);

    }catch(err){
        res.send(err.message);
    }
}