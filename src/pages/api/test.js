import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({
      database: 'doogpools',
      host: 'database-1.cnfjlic5wuot.us-east-1.rds.amazonaws.com',
      port: process.env.PGSQL_PORT,
      user: process.env.PGSQL_USER,
      password: 'root1998',
    });
  
    await client.connect();

    console.log('req.body test');
    console.log(req.body);

    const result4 = await client.query("SELECT * FROM users;");


    console.log(result4.rows)
    await client.end();
  
    res.status(200).json(result4.rows);
  }