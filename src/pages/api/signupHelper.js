import { Client } from 'pg';
import React from "react";

export default async function handler(req, res) {
    const client = new Client({
        database: process.env.PGSQL_DATABASE,
        host: process.env.PGSQL_HOST,
        port: process.env.PGSQL_PORT,
        user: process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
      });
  
    await client.connect();

    console.log("req.body in signupHelper");
    console.log(req.body);

    const result3 = await client.query('SELECT * FROM users WHERE email=$1',[req.body.username]);
    console.log(result3.rows[0]);

    if (result3.rows[0]){//if email exists in DB, exit, account already exists
        console.log("account already exists for:");
        console.log(req.body.username);
        await client.end();
        res.status(200).json({data: false});

    }else{
        const result = await client.query('INSERT INTO users (first_name, last_name, email, pass) VALUES ($1, $2, $3, $4);', [req.body.first_name, req.body.last_name, req.body.username, req.body.password]);
        //console.log("insert into table(dummy)");
        await client.end();

        res.status(200).json({data: true});
    }

    
}