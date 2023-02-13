import {db} from '../database/database.connection.js';


export async function SignUp(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        const checkCpf = await db.query("SELECT * FROM customers WHERE cpf=$1", [cpf]);

        if(checkCpf.rows.length > 0) return res.sendStatus(409);

        await db.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)", [name, phone, cpf, birthday]);

        res.sendStatus(201);
        
    }catch(err){
        res.status(500).send(err.message);
    }
} 

export async function UpdateUser(req, res){
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;

    try{
        const checkCpf = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);
        const checkId = await db.query(`SELECT * FROM customers WHERE id=$1`,[id])

        if(checkCpf.rows.length > 0 && checkCpf.rows[0].id != id) return res.sendStatus(409);
        
        if(checkId.rows.length < 1) return res.sendStatus(409);
        
        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id]);
        
        res.sendStatus(200);

    }catch(err){
        res.status(500).send(err.message);
    }

}

export async function GetAllUsers(req, res){

    try{
        const allCustomers = await db.query("SELECT * FROM customers");

        res.status(200).send(allCustomers.rows);

    }catch(err){
        res.status(500).send(err.message);

    }
}

export async function GetById(req,res){
    const { id } = req.params;
     
    try{
        const getWithId = await db.query("SELECT * FROM customers WHERE id=$1", [id]);

        if(getWithId.rows.length < 1) return res.sendStatus(404);

        res.send(getWithId.rows[0]);

    }catch(err){
        res.status(500).send(err.message);
    }
}