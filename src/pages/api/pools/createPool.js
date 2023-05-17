import { Client } from 'pg';

/* req.body
    const data = {
        'orgName': document.getElementById('grid-org-name').value,
    X   'isCharity': document.getElementById('grid-availability').value,
        'pricePerBlock': document.getElementById('grid-price-per-block').value,
        'payoutModel': document.getElementById('grid-payout-model').value,
        'availability': document.getElementById('charity-checkbox').value,
        'ownerID' : session?.user.id,
        'name' : document.getElementById('grid-pool-name').value,
    }
*/
export default async function handler(req, res) {
  const client = new Client({
    database: "blockpools",//process.env.PGSQL_DATABASE,
    host: "localhost",//process.env.PGSQL_HOST,
    port: 5432,//process.env.PGSQL_PORT,
    user: "postgres",//process.env.PGSQL_USER,
    password: "root",//process.env.PGSQL_PASSWORD,
  });

  await client.connect();
  console.log("------------CREATE POOL API---------------");
  console.log(req.body);
  const result = await client.query('INSERT INTO pools (owner_id, pool_name, is_active, org_name, price_per_block, payout_model, available, bought_cells) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING pool_id;',
                                    [req.body.ownerID, req.body.name, true, req.body.orgName, req.body.pricePerBlock, req.body.payoutModel, req.body.availability, '']);
  //const result = await client.query('INSERT INTO pools (ownerid, bought_cells) VALUES ($1,$2) RETURNING pool_id',[req.body.ownerID, '']);
  //console.log("getAllPoolIDs result:");
  console.log(result.rows[0]);

  await client.end();

  res.status(200).json(result.rows[0]);
}