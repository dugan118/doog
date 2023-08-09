//import styles from "@/styles/Components.module.css";

import PaymentModal from "@/components/payments/PaymentModal";

import BoughtCells from "@/components/BoughtCells";
import React, { useState } from 'react';

import { socket } from "@/socket";
import { useEffect } from 'react';

import Cell from './Cell';

export async function updateBoughtCellsServer(props, selectedCells){
  const ret = {
    props,
    selectedCells,
  }

  const res = await fetch("http://localhost:3000/api/pools/buyCell", {
    method: 'POST',
    body: JSON.stringify(ret),
    headers: { "Content-Type": "application/json" }
  });
}

 

export default function Board( props ) {
    //const arr = Array(100).fill(0);
    //const [ownedBy,setOwnedBy] = useState([arr]);
    const [rooms, setRooms] = useState([]);
    const [lockedCells, setLockedCells] = useState([]);
    const [boughtCells, setBoughtCells] = useState(props.bcells.map(Number));
    const [selectedCells, setSelectedCells] = useState([]);

    const [isConnected, setIsConnected] = useState(socket.connected);



    useEffect(() => {     
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('connected')
        
      });
      socket.on('disconnect', () => {
          console.log('disconnect');
          setIsConnected(false);
      });
      socket.on('updateCells-client', data => {
          console.log('updateCells-client: ', data)
          setLockedCells((lockedCells) => lockedCells.concat(data));
          //if any cell in data == a cell in selectedCells 
          //then remove *cell* from selectedCells
          setSelectedCells((prev)=>{
            let ret=prev

            console.log('selectedCells: ', prev)
            console.log('lockedCells: ', data)
            prev.forEach(selectedCell => {
              console.log('for each ', selectedCell, ' in selectedCells')
              data.forEach(lockedCell => {
                console.log('for each ', lockedCell, ' in lockedCells')
                console.log('if ', selectedCell.toString(), '  == ', lockedCell.toString(), " then:")
                if(selectedCell.toString() == lockedCell.toString()){
                  console.log('remove ', selectedCell, ' from selected Cells')
                  ret=ret.filter( cell => cell!==selectedCell )
                }
              })
            });


            return ret;
            //return arr of selectedCells not in lockedCells
          })
          
      });
      socket.onAny((event, ...args) => {
          console.log('onAny-client: ',event, args);
          console.log('rooms: ', socket.rooms)
        });

      return () => {
          socket.off('updateCells-client');
          socket.off('connect');
          socket.off('disconnect');
      }
  }, [])

  useEffect(() => {
    let ret = { poolID: props.id, userID: props.userid}
    console.log('ret: ', ret)
    socket.emit("Join Room", ret);
    setRooms(socket.rooms)
    return () => {
      socket.emit("Leave Room", ret)
    }

  }, [])

    const renderCell = (id) => {
      let isLocked = lockedCells.includes(id);
      let isBought = boughtCells.includes(id);
      let isSelected = selectedCells.includes(id);
      return (
        <Cell
          key={id}
          id={id}
          isBought={isBought}
          isSelected={isSelected}
          isLocked={isLocked}
          onCellClick={handleCellClick}
        />
      );
    };
  
    const renderRow = (startId) => {
      const row = [];
      for (let i = 0; i < 10; i++) {
        const id = startId + i;
        row.push(renderCell(id));
      }
      return row;
    };
  
    const renderBoard = () => {
      const rows = [];
      for (let i = 0; i < 10; i++) {
        const startId = i * 10 + 1;
        rows.push(
          <div key={startId} className="flex">
            {renderRow(startId)}
          </div>
        );
      }
      return rows;
    };

    const updateCells = () =>{
      setBoughtCells(boughtCells);
      setSelectedCells([]);
    };

    const handleBuyCells = () => {
        //update server
        console.log("props:");
        console.log(props);
        updateBoughtCellsServer(props, selectedCells);
        //send to socket
        socket.emit('updateCells-server', {boardID: props.id, boughtCells: selectedCells})
        //update client
        const x = boughtCells.concat(selectedCells);
        setBoughtCells(x);
        setSelectedCells([]);
    };

    const handleCellClick = (id) => {
        if (boughtCells.includes(id)) return;
        if (lockedCells.includes(id)) return;
        if (selectedCells.includes(id)) {
        setSelectedCells(selectedCells.filter((cellId) => cellId !== id));
        } else {
        setSelectedCells([...selectedCells, id]);
        }
    };

    const resetSelected = () => {
        setSelectedCells([]);
    }

  
    return (
      <>
        <div  className="h-full w-5/6 mt-5 mx-auto bg-slate-200 text-center">
          <div className="relative content-center mt-5 mx-auto w-[500px] h-[500px]">{renderBoard()}</div>
          <PaymentModal cellPrice={props.cellPrice} numCells={selectedCells.length.toString()} handleBuyCells={handleBuyCells} /> 
          {/* <button onClick={handleBuyCells} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Buy Cells</button>*/}
          <button onClick={resetSelected} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Reset Selected Cells</button>
          <button onClick={updateCells} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Update Cells</button>
          
          <br />
          <p>Rooms: {rooms}</p>
          <p>cellPrice: {props.cellPrice}</p>
          <BoughtCells boughtCells={[]} selectedCells={selectedCells}/>
        </div>
      </>
        
    );
  }


 


