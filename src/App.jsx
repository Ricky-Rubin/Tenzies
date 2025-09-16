import React from "react"
import Die from "/src/Die.jsx"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
const [dieValue, setDieValue] = React.useState(() => generateDiceNumbers())

  const gameWon = dieValue.every(object => object.value === dieValue[0].value) &&
                  dieValue.every(object => object.isHeld === true)

  const buttonRef = React.useRef(null)

  React.useEffect(function () {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon])

  function generateDiceNumbers() {
    const numbersArray = [];

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      });
    }

      return(numbersArray);
  }

  function rollDice() {
    gameWon ? setDieValue(generateDiceNumbers()) : setDieValue(function (prevArray) {
      return prevArray.map(eachObj => {
        return eachObj.isHeld === true ? eachObj : {...eachObj, value: Math.ceil(Math.random() * 6)}
      })
    })
  }

  function hold(id) {
    setDieValue(function (prevArray) {
      return prevArray.map(eachdie => {
        return eachdie.id === id ? {...eachdie, isHeld: !eachdie.isHeld} : eachdie
      }) 
    })
  }

  const assignNumber = dieValue.map((dieNumber) => {
    return <Die key={dieNumber.id} 
                value={dieNumber.value} 
                held={dieNumber.isHeld} 
                id={function () {
                  return hold(dieNumber.id)
                }}
            />
  })

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only"> 
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="game-instruction">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-box-container">
        {assignNumber}
      </div>

      <button className="roll-button" ref={buttonRef} onClick={rollDice}>{gameWon ? "New Game" : "Roll Again"}</button>
    </main>
  )
}
