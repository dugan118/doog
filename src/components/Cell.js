//import styles from "@/styles/Components.module.css";
import React, { useState } from 'react';

export default function Cell(props) {

    const [hover, setHover] = useState(false);

    const handleClick = () => {
      props.onCellClick(props.id);
    };

    const toggleHover = () => {
        setHover(!hover);
    };
    
    return (
        <div
        className="m-auto inline-block w-12 h-12 outline-1 outline-black outline"
        style={{ backgroundColor: 
            props.isBought ? "pink"
            : props.isLocked ? "blue" 
            : props.isSelected ? "green"
            : hover ? "grey" : "white" }}
        onClick={handleClick}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        {props.id}
      </div>
    );
  }