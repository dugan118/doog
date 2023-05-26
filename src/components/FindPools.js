import Link from "next/link";
import React, { useState, useEffect } from 'react';

import PoolCard from "./PoolCard";

export default function FindPools(){
    const [poolData, setPoolData] = useState([]);


    useEffect(() =>{    //pull pool data from database WHERE id = userid
        fetch("http://localhost:3000/api/pools/getOpenPools", {
            method: 'POST',
            body: JSON.stringify(""),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((data) => setPoolData(data))
    }, []);


    const renderPools = () => {
        let ret = [];
        let pools = poolData;

        poolData.map( (pool) => {
            let link = '';
            link = link.concat('/pools/', pool.pool_id);
            ret.push(
                <div key={pool.pool_id} className="">
                    <Link href={link}> 
                        <PoolCard pool_id= {pool.pool_id} />
                    </Link>
                </div>
            );
        });

        return ret;
    };

    return(
    <>
        <div className= "text-center bg-white m-4 ">
            <p className= "text-lg font-medium">Open Pools</p>
            <div className="">
                {renderPools()}
            </div>
        </div>   
    </>
    )
}