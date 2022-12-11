import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const App = () => {
       const [allDies, setAllDies] = React.useState( allNewDice());
       const [tenzies, setTenzies] = React.useState( false);
       
         const { width, height } = useWindowSize()
       
       React.useEffect(() => {
                 let firstDies = allDies[0].value;
            
            const allHeld = allDies.every((dies) => dies.isHeld === true);
            const allvalue = allDies.every((dies) => dies.value === firstDies);
            if(allHeld && allvalue) {
                    setTenzies(true)
            }else{
                    setTenzies(false)
            }
 
       }, [allDies])
  
         
         
    // generateNewDies
    function generateNewDies() {
          const randomnumber = Math.ceil(Math.random()*6);
             return {id: nanoid(), value: randomnumber, isHeld: false};
    }
    
    // allNewDice
    function allNewDice() {
        let randomNumbers = [];
              for(let i=0; i<10; i++) {
                    randomNumbers.push(generateNewDies());
             }
       return randomNumbers;
       }

      // holdDice
    function holdDice (id) {
        setAllDies((oldDies) => {
               return allDies.map((dies) => {
                      if(dies.id === id) {
                      return {...dies, isHeld: !dies.isHeld}
                      }
                 return dies;
             })
        })
    }
    
    // rollDice
    function rollDice() {
         setAllDies((oldDies) => {
               return allDies.map((dies) => {
                     return dies.isHeld === false ? generateNewDies() : dies;
             })
        })
    }
    // New game
    function newGame() {
        setAllDies(allNewDice())
    }
    
    return (
        <main>
        {
            tenzies &&     <Confetti
      width={width}
      height={height}
    />
        }
        
        <div className="container"> 
        
        <h2 className="title">Tenzies</h2>
        
        <p className="paragraph">Roll until all dice are the same. Click <br/> each die to freeze it at its current value <br/> between rolls.</p>
        
        <div className="dies-container">
        {
          allDies&&  allDies.map((dies, index) => {
      return  <Die key={dies.id} dies={dies} holdDice={() => !tenzies && holdDice(dies.id)}/>
                
            })
        }
 
        </div>
        
        <button className='roll-btn' onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
        </main>
    )
}

export default App