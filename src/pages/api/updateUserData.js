import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({
      database: process.env.PGSQL_DATABASE,
      host: process.env.PGSQL_HOST,
      port: process.env.PGSQL_PORT,
      user: process.env.PGSQL_USER,
      password: process.env.PGSQL_PASSWORD,
    });
  
    await client.connect();

    console.log('req.body test');
    console.log(req.body);
  
    const result = await client.query('UPDATE users SET first_name = $1, last_name = $2, img=$3 WHERE user_id = $4;',[req.body.first_name, req.body.last_name, req.body.img, req.body.user_id]);
  

  
    await client.end();
  
    res.status(200).json(result.rows);
  }