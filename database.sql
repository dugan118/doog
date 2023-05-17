
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
    bought_cells text NOT NULL
);
INSERT INTO pools (owner_id, pool_name, is_active, org_name, price_per_block, payout_model, available, bought_cells) 
            VALUES (1, 'Pool Name', true, 'Organization Name', 5, 54, 'open', '');



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
