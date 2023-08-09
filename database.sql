
/* users table
*/
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    img VARCHAR(50) DEFAULT 'gray'
);
INSERT INTO users (email, pass, first_name, last_name) 
            VALUES ('admin@admin.com', 'admin', 'admin', 'admin');




/* pools table
*/ 
DROP TABLE IF EXISTS pools;
CREATE TABLE pools(
    pool_id SERIAL PRIMARY KEY,
    owner_id integer NOT NULL,
    pool_name VARCHAR(100) NOT NULL,
    is_active boolean NOT NULL,
    org_name VARCHAR(100) NOT NULL,
    price_per_block integer NOT NULL,
    payout_model integer NOT NULL,
    available VARCHAR(100) NOT NULL,
    espn_id integer NOT NULL,
    bought_cells text NOT NULL
);
INSERT INTO pools (owner_id, pool_name, is_active, org_name, price_per_block, payout_model, available, espn_id, bought_cells) 
            VALUES (1, 'Pool Name', true, 'Organization Name', 5, 54, 'open', 11111111,'');



/* users_pools table
    - add to this table when a user 'joins' a pool
*/
DROP TABLE IF EXISTS user_pools;
CREATE TABLE user_pools(
    user_id integer NOT NULL,
    pool_id integer NOT NULL,
    user_bought_cells text NOT NULL
);
INSERT INTO user_pools (user_id, pool_id, user_bought_cells) 
            VALUES (1, 1, '');


/* sport_games table
    - contains data for each game being wagered on
    - end_of_event : approx time (+ ~30min?) time to check for winner
 */
 DROP TABLE IF EXISTS sport_games;
 CREATE TABLE sport_games(
    game_id SERIAL PRIMARY KEY,
    espn_id BIGINT NOT NULL,
    sport_name VARCHAR(100) NOT NULL,
    league_name VARCHAR(100) NOT NULL,
    game_name VARCHAR(100) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    home_team_name VARCHAR(100) NOT NULL,
    away_team_name VARCHAR(100) NOT NULL,
    end_score_home integer,
    end_score_away integer,
    date_of_event DATE NOT NULL,
    timestamp_of_event TIMESTAMP NOT NULL
 );
 INSERT INTO sport_games(espn_id, sport_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event, timestamp_of_event)
            VALUES (11111111, 'Basketball', 'NBA', 'Away Team at Home Team', 'AWAY @ HOME','Home Team', 'Away Team', 69, 96, '2022-10-18', '2022-10-18T20:30Z');


/* 
    GET /games 
    {
        id: 326118
        date: "2022-09-30T10:00:00+00:00"
        time: "10:00"
        timestamp: 1664532000
        timezone: "UTC"
        stage: null
        week: null
        status: {
            long: "Game Finished"
            short: "FT"
            timer: null
        }
        league: {
            id: 12
            name: "NBA"
            type: "League"
            season: "2022-2023"
            logo: "https://media-1.api-sports.io/basketball/leagues/12.png"
        }
        country: {
            id: 5
            name: "USA"
            code: "US"
            flag: "https://media-3.api-sports.io/flags/us.svg"
            }
        teams: {
            home: {
                id: 161
                name: "Washington Wizards"
                logo: "https://media-3.api-sports.io/basketball/teams/161.png"
            }
            away: {
                id: 141
                name: "Golden State Warriors"
                logo: "https://media-3.api-sports.io/basketball/teams/141.png"
                }
        }
        scores: {
            home: {
                quarter_1: 12
                quarter_2: 25
                quarter_3: 27
                quarter_4: 23
                over_time: null
                total: 87
            }
            away: {
                quarter_1: 16
                quarter_2: 25
                quarter_3: 28
                quarter_4: 27
                over_time: null
                total: 96
            }
        }
    }
*/