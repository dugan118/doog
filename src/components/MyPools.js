import Link from "next/link";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

import PoolCard from "./PoolCard";
/* 
    need to do database work add column to show who is participating in which pools

    3 sections? 
        - Pools you have bought cells in
        - bookmarked pools
        - Owned Pools
*/


export default function MyPools(){
    const [pools, setPools] = useState([]);
    //get session
    const { data: session, status } = useSession();
    const user = session?.user;
    const isLoadingUser = status === 'loading';

    useEffect(() =>{    //pull pool data from database WHERE id = userid
        const data = {
            'user_id': session? session.user.id: 0, //defaults to userid=0
        };
        fetch("http://localhost:3000/api/pools/getMyPools", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((data) => setPools(data))
    }, []);



    //map (currently entered pools) => <div> <Link href /> </div>
    //or push to new component "card" with pool info(preview?)

    const renderPools = () => {
        let ret = [];
 
        pools.map( (pool) => {
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
            <p className= "text-lg font-medium">Active Pools</p>
            <div className="h-full w-full">
                {renderPools()}
            </div>
        </div>
    </>
    )
}