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
  //console.log(req.body);
  const result = await client.query('SELECT bought_cells FROM pools WHERE pool_id=$1',[req.body.props.id]);
  //console.log(result);
  let bc = result.rows[0].bought_cells;//bought cells in a comma seperated string

  var boughtCells=[];
  let x=0;
  let i,j;
  //cs string to array ----- .split(')
  for(i=0;i<bc.length;i++){
    if(bc.substring(i,i+1)==','){
        boughtCells.push(bc.substring(x,i));
        x=i+1;
    }
  }
  //check for duplicates------needs work, adds the end dupe
  let selectedCells = req.body.selectedCells;
  let dupes = [];


  for(i=0;i<bc.length;i++){
    for(j=0;j<selectedCells.length;j++){
        if(boughtCells[i]==selectedCells[j]){
            dupes.push(selectedCells[j]);
            selectedCells.pop(i);
        }
    }
  }
  //merge lists
  if(bc.length<1){
      bc=bc.concat(selectedCells[0]);
      for(i=1;i<selectedCells.length;i++){
        bc=bc.concat(',',selectedCells[i]);
      }
  }else{
    for(i=0;i<selectedCells.length;i++){
      bc=bc.concat(',',selectedCells[i]);
    }
  }
  
  //console.log("bought cells merge:");
  //console.log(bc);
  //UPDATE query
  const result2 = await client.query('UPDATE pools SET bought_cells = $1 WHERE pool_id= $2',[bc,req.body.props.id]);
  
  //check if entry exists in user_pools
  const result3 = await client.query('SELECT * FROM user_pools WHERE user_id=$1 AND pool_id=$2',[req.body.props.userid,req.body.props.id]);
  console.log(result3.rowCount);
  if(result3.rowCount>=1){//if exists update
    let bc2=result3.rows[0]?.user_bought_cells;
    if(bc2==''){
      bc2=bc2.concat(req.body.selectedCells)
    }else{
      bc2=bc2.concat(',',req.body.selectedCells);
    }
    const result4 = await client.query('UPDATE user_pools SET user_bought_cells = $1 WHERE pool_id= $2',[bc2,req.body.props.id]);
  }else{// else insert
    let bc3='';
    const result5 = await client.query('INSERT INTO user_pools (user_id, pool_id, user_bought_cells) VALUES ($1, $2, $3)',[req.body.props.userid, req.body.props.id, bc3.concat(req.body.selectedCells)]);
  }


  console.log("-------result------");
  console.log(result3.rows);
  console.log(req.body.props.userid);
  
  


  //console.log("UPDATE query result:");
  //console.log(result2);

  await client.end();

  res.status(200).json(result);
}

