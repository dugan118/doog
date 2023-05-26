import React, { useState, useEffect } from 'react';

export default function PoolCard( props ){
    const [poolData, setPoolData] = useState([]);


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
        })
    }, []);
    console.log("setPoolData:");
    console.log(poolData);

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
                    March Madness 2023    |    Cells Taken: {cellArr?.length}/100
                </p>
            </div>
        </div>
        </>
    )
}