import { Client } from 'pg';

export default async function handler(req, res) {
    let ret
    const client = new Client({
        database: process.env.PGSQL_DATABASE,
        host: process.env.PGSQL_HOST,
        port: process.env.PGSQL_PORT,
        user: process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
      });
    await client.connect();
    //filters: date, ( later: sport, league, team_name, )
    const DEFAULT_DATE = "2022-10-18"

    let date
    if(req.body.date){
        console.log('full req.body: ',req.body)
        date = req.body.date
    }else{
        console.log('empty req.body: ',req.body)
        date = "2022-10-18"
    }

    const result = await client.query("SELECT * FROM sport_games WHERE date_of_event=$1",[date])
    await client.end();
    res.status(200).json(result.rows);
  }