import { CustomertSchema } from "../schema/CustomerSchema.js";
import db from '../database/database.connection.js';

export async function SignUp(req, res){
    const {name, phone, cpf, birthday} = req.body

    try{
        const CheckCpf = await db.query("SELECT * FROM customers WHERE cpf =$1", [cpf])

        
    }catch{

    }
} 


export async function UpdateUser(req, res){

}

export async function GetAllUsers(req, res){}

export async function GetById(req,res){}