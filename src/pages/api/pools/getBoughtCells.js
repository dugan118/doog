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

  const result = await client.query('SELECT bought_cells FROM pools WHERE pool_id=$1',[req.body.id]);

  console.log("getBoughtCells result:");
  console.log(result.rows);

  await client.end();

  res.status(200).json(result.rows);
}