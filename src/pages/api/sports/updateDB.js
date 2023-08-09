import { Client } from 'pg';



/* 
    Pull mass Game Data from ESPN api calls
    sort out useful info and update DB

    - data columns
        espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event, timestamp_of_event
*/


export default async function handler(req, res) {
    const client = new Client({
        database: process.env.PGSQL_DATABASE,
        host: process.env.PGSQL_HOST,
        port: process.env.PGSQL_PORT,
        user: process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
      });
    await client.connect();


    let espn_id
    let sport_name
    let league_name
    let game_name
    let short_name
    let home_team_name
    let away_team_name
    let end_score_home
    let end_score_away
    let date_of_event
    let timestamp_of_event
    let games = []

    //limit=25 : first 25 games of the season
    await fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?limit=25&dates=20221018-20230615", {method: 'GET'})
    .then((res) => res.json())
    .then((data) => {
        Object.entries(data.events).forEach( async (event) => {
            
            // espn_id = event[1].id
            // sport_name = "Basketball"
            // league_name = "NBA"
            // game_name = event[1].name
            // short_name = event[1].shortName
            // home_team_name = event[1].competitions[0].competitors[0].team.displayName
            // away_team_name = event[1].competitions[0].competitors[1].team.displayName
            // end_score_home = event[1].competitions[0].competitors[0].score
            // end_score_away = event[1].competitions[0].competitors[1].score
            // date_of_event = event[1].date.substring(10)
            //timestamp_of_event = event[1].date

            let game = {
                espn_id : event[1].id,
                sport_name : "Basketball",
                league_name : "NBA",
                game_name : event[1].name,
                short_name : event[1].shortName,
                home_team_name : event[1].competitions[0].competitors[0].team.displayName,
                away_team_name : event[1].competitions[0].competitors[1].team.displayName,
                end_score_home : event[1].competitions[0].competitors[0].score,
                end_score_away : event[1].competitions[0].competitors[1].score,
                date_of_event : event[1].date.substring(0,10),
                timestamp_of_event : event[1].date,
            }
            console.log('push game: ', game)
            games.push(game)

            //console.log('-~- : ', espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event)

            //let result = await client.query('INSERT INTO sport_games(espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event]);

            
        })
        
        
    })
    //let result = await client.query('INSERT INTO sport_games(espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event]);
    console.log('games: ', games)
    for (let i=0;i<25;i++) {
        let result = await client.query('INSERT INTO sport_games(espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event, timestamp_of_event) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[games.at(i).espn_id, games.at(i).sport_name, games.at(i).league_name, games.at(i).game_name, games.at(i).short_name, games.at(i).home_team_name, games.at(i).away_team_name, games.at(i).end_score_home, games.at(i).end_score_away, games.at(i).date_of_event, games.at(i).timestamp_of_event]);
    }
    

  await client.end();

  res.status(200).json('');
}