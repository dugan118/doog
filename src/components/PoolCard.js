import React, { useState, useEffect } from 'react';

export default function PoolCard( props ){
    //pool_id, owner_id, pool_name, is_active, org_name, price_per_block, payout_model, available, game_id, bought_cells
    const [poolData, setPoolData] = useState([]); 

    //game_id, espn_id, spot_name, league_name, game_name, short_name, home_team_name, away_team_name, end_score_home, end_score_away, date_of_event
    const [gameData, setGameData] = useState([]); 


    useEffect(() =>{    //pull pool data from database WHERE id = userid
        const data = {
            'pool_id': props.pool_id, //defaults to userid=0
        };
        fetch("http://localhost:3000/api/pools/getPoolInfo", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((data) => {   
            setPoolData(data[0]);


            const data1 = { espn_id: data[0].espn_id }
            console.log('data1: ',data1)
            fetch("http://localhost:3000/api/sports/getSportGame", {
                method: 'POST',
                body: JSON.stringify(data1),
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => res.json())
            .then((data) => {   
                console.log('ssss: ',data[0])
                setGameData(data[0])
            })

        })

        
    }, []);
    console.log("setPoolData: ", poolData);
    console.log("setGameData: ", gameData);

    let cellArr=[];
    if(poolData.bought_cells != ''){
        cellArr = poolData.bought_cells?.split(',');
    }
    
    

    return(
        <>
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-gray-100 hover:bg-gray-200 m-4">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{poolData.pool_name}</div>
                <p className="text-gray-700 text-base">
                    {poolData.org_name}   |    ${poolData.price_per_block} per Block    |    Payout {poolData.payout_model}%
                </p>
                <p className="text-gray-700 text-base">
                     {gameData?.short_name} | {gameData?.league_name}    |    Cells Taken: {cellArr?.length}/100 
                </p>
            </div>
        </div>
        </>
    )
}