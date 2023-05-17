import Layout from "@/components/Layout";
import Board from  "@/components/Board";

import { useSession } from 'next-auth/react';



async function getAllPoolIDs(){
    const res = await fetch('http://localhost:3000/api/pools/getAllPoolIDs');
    const paths = await res.json(); 

    //console.log("paths in getallpoolids:");
    //console.log(paths);

    return paths.map((path) => {
        return {
            params: {
                id: path.pool_id.toString(),
                //ownerid: path.owner_id,
                //boughtCells: path.bought_cells,
            }
        }
    });
}

async function getBoughtCells(id){
    const ret = {
      "id" : id,
    }
    const res = await fetch("http://localhost:3000/api/pools/getBoughtCells", {
      method: 'POST',
      body: JSON.stringify(ret),
      headers: { "Content-Type": "application/json" }
    });
  
    const data = await res.json();
    console.log("res.boughtcells:---------------------------------------------------------");
    console.log(data[0].bought_cells);
  
    //deconstruct string to array
    let bcString = data[0].bought_cells;
    let bc = bcString.split(',');
    console.log("bc:---------------------");
    console.log(bc);


    return bc;
  
}

export async function getStaticPaths() {
    //API call to databse to retrieve all pool IDs
    const paths = await getAllPoolIDs(); //[{params: {id:'1'}, },]

    console.log("paths:");
    console.log(paths);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }){//get useful board data from server: which are taken, etc
    console.log("params:");
    console.log(params);
    
    const poolID = params.id;
    const ownerID = params.ownerID;
    //const boughtCells = params.boughtCells;
    const boughtCells = await getBoughtCells(poolID);

    const poolData1 = {
        poolID,
        boughtCells,
    };
    //console.log(poolData1);
    const poolData = JSON.stringify(poolData1);
    //console.log(poolData);
    return {
        props:{
            poolData,
        },
    }
}

export default  function ThisPool( {poolData} ) {
    console.log("pooldata:  ");
    console.log(JSON.parse(poolData));

    let thisData = JSON.parse(poolData);

    const { data: session, status } = useSession();
    
    //IF isAdmin show admin layout
    //IF NOT show regular
    return (
        <Layout>
            <h1>Hello welcome to the {thisData.poolID} pool</h1>
            <p>bought cells are: {thisData.boughtCells}</p>
            <p>Owner ID are: {thisData.ownerID}</p>
            <div className="align-center">
                <Board id={thisData.poolID} bcells={thisData.boughtCells} userid={session?.user.id.toString()}/>
            </div>
            
        </Layout>
    )
}