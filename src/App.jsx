import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const App = () => {
  const [allDies, setAllDies] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [totalRoll, setTotalRoll] = React.useState(0);
  const [highestScore, setHighestScore] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [startTimer, setStartTimer] = React.useState(false);
  const [timerId, setTimerId] = React.useState(0);

  const { width, height } = useWindowSize();


  React.useEffect(() => {
    if(startTimer) {
    let  myIntervalId = setInterval(() => {
      setTime(prev => prev+1)
    }, 1000);
    setTimerId(myIntervalId);
    } else {
clearInterval(timerId)
    }

    return() => clearInterval(timerId);

  }, [startTimer])


  React.useEffect(() => {
    let firstDies = allDies[0].value;

    const allHeld = allDies.every((dies) => dies.isHeld === true);
    const allvalue = allDies.every((dies) => dies.value === firstDies);
    if (allHeld && allvalue) {
      setTenzies(true);
      if (highestScore === 0 || highestScore > totalRoll) {
        localStorage.setItem("Tenzies_score", time);
      }
      setStartTimer(false)
    } else {
      setTenzies(false);
    }
  }, [allDies]);

  React.useEffect(() => {
    setHighestScore(() => localStorage.getItem("Tenzies_score") || 0);
 
  }, [tenzies]);

  // generateNewDies
  function generateNewDies() {
    const randomnumber = Math.ceil(Math.random() * 6);
    return { id: nanoid(), value: randomnumber, isHeld: false };
  }

  // allNewDice
  function allNewDice() {
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(generateNewDies());
    }
    return randomNumbers;
  }

  // holdDice
  function holdDice(id) {
    setAllDies((oldDies) => {
      return oldDies.map((dies) => {
        if (dies.id === id) {
          return { ...dies, isHeld: !dies.isHeld };
        }
        return dies;
      });
    });
  }

  // rollDice
  function rollDice() {
    setAllDies((oldDies) => {
      return allDies.map((dies) => {
        return dies.isHeld === false ? generateNewDies() : dies;
      });
    });
    setTotalRoll((prev) => prev + 1);
  }
  // New game
  function newGame() {
 
    setTotalRoll(0);
    setTime(0)
    setAllDies(allNewDice());
   
  }



console.log("time :", time);
  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}

      <div className="container">
        <div className="game-info">
         <span style={{visibility: `${highestScore<=0 ? "hidden" : "visible"}`}}>Highest Score: {highestScore}(sec)</span>
         <span style={{visibility: `${totalRoll<=0 ? "hidden" : "visible"}`}}>Total Roll: {totalRoll}</span>
        </div>

        <h2 className="title">Tenzies 2.0</h2>

        <p className="paragraph">
          Roll until all dice are the same. Click <br /> each die to freeze it
          at its current value <br /> between rolls.
        </p>

        <div className="dies-container">
          {allDies &&
            allDies.map((dies, index) => {
              return (
                <Die
                  key={dies.id}
                  dies={dies}
                  holdDice={() => !tenzies && holdDice(dies.id)}
                  startTimer={startTimer}
                />
              );
            })}
        </div>
        {
          time>0 && <div>Time: {time}</div>
        }

        <button className="roll-btn" onClick={time===0 ? () =>setStartTimer(true) : tenzies ? newGame : rollDice}>
          {time===0 ?"Start game" : tenzies ? "New Game" : "Roll"}
        </button>



      </div>
    </main>
  );
};

export default App;





