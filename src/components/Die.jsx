import React from "react";

const Die = ({dies, holdDice, startTimer}) => {
    
    return(
        <button disabled={!startTimer && true} onClick={holdDice } className={`die ${dies.isHeld && "freeze"}` } style={{cursor: `${!startTimer ? "none" : "pointer"}`, border: "none", outline: "none"}}>
        {dies.value}
        </button>
    )
    
}


export default Die;