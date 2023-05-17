import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    database: "blockpools",//process.env.PGSQL_DATABASE,
    host: "localhost",//process.env.PGSQL_HOST,
    port: 5432,//process.env.PGSQL_PORT,
    user: "postgres",//process.env.PGSQL_USER,
    password: "root",//process.env.PGSQL_PASSWORD,
  });

  await client.connect();

  const result = await client.query('SELECT * FROM pools WHERE available=$1 ;',['open']);


  await client.end();

  res.status(200).json(result.rows);
}