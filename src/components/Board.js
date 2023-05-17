//import styles from "@/styles/Components.module.css";

import BoughtCells from "@/components/BoughtCells";
import React, { useState } from 'react';

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
    const arr = Array(100).fill(0);
    const [ownedBy,setOwnedBy] = setState([arr]);
    const [boughtCells, setBoughtCells] = useState(props.bcells.map(Number));
    const [selectedCells, setSelectedCells] = useState([]);

    const renderCell = (id) => {

      let isBought = boughtCells.includes(id);
      let isSelected = selectedCells.includes(id);
      return (
        <Cell
          key={id}
          id={id}
          isBought={isBought}
          isSelected={isSelected}
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
        //update client
        const x = boughtCells.concat(selectedCells);
        setBoughtCells(x);
        setSelectedCells([]);
    };

    const handleCellClick = (id) => {
        if (boughtCells.includes(id)) return;
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
          <button onClick={handleBuyCells} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Buy Cells</button>
          <button onClick={resetSelected} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Reset Selected Cells</button>
          <button onClick={updateCells} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'>Update Cells</button>
          
          <br />
          <BoughtCells boughtCells={boughtCells} selectedCells={selectedCells}/>
        </div>
      </>
        
    );
  }


 


