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

  console.log("req.body in loginHelper");
  console.log(req.body);


  const result = await client.query('SELECT * FROM users WHERE email = $1 AND pass = $2', [req.body.username, req.body.password]);

  console.log("result in loginHelper");
  console.log(result.rows[0]);


  const formattedData = result.rows.map((row) => ({
    id: row.user_id,
    fname: row.first_name,
    lname: row.last_name,
    email: row.email,
    password: row.pass,
    name: row.first_name.concat(" ", row.last_name),
    img: row.img,
    // add more properties as needed
  }));

  await client.end();

  console.log("formattedData in loginHelper");
  console.log(formattedData[0]);

  //res.status(200).json({ data: result.rows[0] }); 

  res.status(200).json({ data: formattedData[0] });
}
