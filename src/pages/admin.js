import EventSelector from '@/components/EventSelector';
import SecureLayout from '@/components/SecureLayout';
import React, { useState, useEffect } from 'react';


export default function admin() {
    function add25(){
        fetch("http://localhost:3000/api/sports/updateDB")
    }
    function clearSportsDB(){
        fetch("http://localhost:3000/api/sports/clearSportsDB")
    }





    const [NBAData, setNBAData] = useState([]);
    function getNBAData(){
        fetch("https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba", {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {   
            console.log("sports data------------------------")
            console.log(data)
            setNBAData(data);
        })
        fetch("http://localhost:3000/api/sports/updateDB",{method: 'GET',})
        .then((res) => res.json())
        .then((data) => {   
            console.log('``````asdasdasd ---', data)

        })
    }
    function getQuery( endpoint ){
        fetch( endpoint , {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("getQuery: ", endpoint)
            console.log(data)
            if (data.gamepackageJSON){
                let home = data.gamepackageJSON.header.competitions[0].competitors[0].score
                let away = data.gamepackageJSON.header.competitions[0].competitors[1].score
                console.log('Box Score')
                console.log('Home ', home, ' : ', away, ' Away')
            }
        })
    }
    useEffect(() => {
        console.log('NBAData length: ', typeof NBAData)
        console.log('NBAData: ', NBAData)
        console.log('NBAData.$ref: ', NBAData.$ref)

        //getQuery("https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50")
        //getQuery("https://cdn.espn.com/core/mlb/boxscore?xhr=1&gameId=401472051")
        getQuery("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?limit=25&dates=20221018-20230615")
        
        Object.entries(NBAData).forEach( (entry) => {
            console.log('entry: ', entry)
            console.log('entry[1].$ref: ', entry[1].$ref)
            if(entry[1].$ref){
                getQuery(entry[1].$ref)
            }
        })
    },[NBAData]);


    // ---REQ with EventSelector---
    const [selectedGame, setSelectedGame] = useState('No Game Selected')

    return (
    <>
    <SecureLayout>
        <div className=" min-h-[800px] h-full container mx-auto bg-green-200 ">
            <p> Admin Page </p>
            <button onClick={getNBAData} type='button' className='bg-green-700 disabled:bg-gray-400 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline' > Pull Data - All NBA Games </button>
            <button disabled onClick={add25} type='button' className='bg-green-700 disabled:bg-gray-400 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline' > insert 25 games into db</button>
            <button disabled onClick={clearSportsDB} type='button' className='bg-green-700 disabled:bg-gray-400 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline' > Clear Sports DB</button>

            <p>{selectedGame}</p>
            <EventSelector setSelectedGame={setSelectedGame} />
            
        </div>  
    </SecureLayout>
    </>
    )
}