import React, { useState, useEffect } from 'react';

// Neatly Displays info for Each game
function GameCard( info , updateFocusedState){
    //onButtonClick
    function handleClick(e, espn_id){
        e.preventDefault()
        //set state of selected game
        console.log('espn_id',espn_id)
        updateFocusedState(espn_id)
    }
    //espn_id, sport_name, league_name, game_name, short_name, 
    //home_team_name, away_team_name, end_score_home, end_score_away, date_of_event
    console.log("info: ", info)
    return (
    <> 
        <div className=" h-full w-60  text-center mx-auto my-2 rounded-md " >
            <button type='button' onClick={(e) => handleClick(e,info?.espn_id)} className='h-full w-full py-2 rounded-md bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-green-400'>
                <span>
                    <p>{info?.game_name}</p>
                    <p>{info?.date_of_event}</p>
                    <p>{info?.sport_name}</p>
                    <p>{info?.league_name}</p>
                    <p>{info?.short_name}</p>
                </span>
            </button>
        </div>
    </>
    )
}




//props: method to set state of selected game in parent. 
export default function EventSelector( props ) {
    const [games, setGames] = useState([])
    //Make call to DB with filters, return filtered set
    async function getGames( filters ){
        //filters: team_name, date, sport, league,
        if(!filters){
            console.log('default call')
            fetch("http://localhost:3000/api/sports/getGamesFiltered", {
                method: 'POST',
                //body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => res.json())
            .then((data) => {
                setGames(data)
            })
        }else{
            console.log('filters: ',filters)
            const data = {
                date: filters,
            }
            fetch("http://localhost:3000/api/sports/getGamesFiltered", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log('games on ',filters, ' : ', data)
                setGames(data)
            })
        }

    }

    //on mount: fetch sample size games (default dates?)
    useEffect(() => {
        getGames()
    },[])

    //filters: team_name, date, sport, league, 
    //      Just Date for now
    //when filters update: requery DB for new list of games with filters. 
    function handleSubmit(e){
        e.preventDefault()
        console.log('date submit')
        const data = {
            'date': document.getElementById('form-date').value,
        }
        console.log('date: ', data.date)
        getGames( data.date )
    } 
    //displays list of GameCards
    function drawGames(){
        const rows = []
        console.log('games.length', games.length)
        for (let i = 0; i < games.length; i++) {
            rows.push(
                <div key={i} className="">
                    {GameCard(games[i], props.setSelectedGame)}
                </div>
            );
        }
        return rows
    }
    return (
    <>
        <div className=' h-full w-96 mx-auto my-4 p-2 rounded-lg bg-gray-100'>
            <div className='bg-gray-300 rounded-lg h-full w-48 mx-auto'>
            <form className="text-center mx-auto pt-4 pb-2" >
                <div className="">
                    <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form-date">
                        Date
                    </label>
                    <input id='form-date' type='date'></input>
                </div>
                <button type='submit' onClick={handleSubmit} className='bg-green-700 disabled:bg-gray-400 hover:bg-green-800 text-white font-bold  px-2 mx-1 mt-2 rounded focus:outline-none focus:shadow-outline'>Filter Selection</button>
            </form>
            </div>
 
            <div className=' h-[500px] w-full my-2 overflow-y-scroll'>
                {drawGames()}
            </div>

        </div>
    </>
    )
}