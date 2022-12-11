import React from "react";

const Die = ({dies, holdDice}) => {
    
    return(
        <div onClick={holdDice } className={`die ${dies.isHeld && "freeze"}`}>
        {dies.value}
        </div>
    )
    
}


export default Die;