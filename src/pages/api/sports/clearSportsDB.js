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

    const result = await client.query("DROP TABLE IF EXISTS sport_games; CREATE TABLE sport_games(game_id SERIAL PRIMARY KEY, espn_id BIGINT NOT NULL, sport_name VARCHAR(100) NOT NULL, league_name VARCHAR(100) NOT NULL, game_name VARCHAR(100) NOT NULL, short_name VARCHAR(100) NOT NULL, home_team_name VARCHAR(100) NOT NULL, away_team_name VARCHAR(100) NOT NULL, end_score_home integer, end_score_away integer, date_of_event DATE NOT NULL, timestamp_of_event TIMESTAMP NOT NULL);")

    await client.end();
    res.status(200).json('');
  }