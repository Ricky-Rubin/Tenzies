import React from "react"
import Die from "/src/Die.jsx"
import { nanoid } from "nanoid"

export default function App() {
const [dieValue, setDieValue] = React.useState(generateDiceNumbers())

  const sameNumber = dieValue.every(object => object.value === dieValue[0].value);
  const sameBoolean = dieValue.every(object => object.isHeld === true)

  if (sameNumber && sameBoolean) {
    console.log("Game Won!")
  }

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
    setDieValue(function (prevArray) {
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
      <h1 className="title">Tenzies</h1>
      <p className="game-instruction">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-box-container">
        {assignNumber}
      </div>

      <button className="roll-button" onClick={rollDice}>{sameNumber && sameBoolean ? "New Game" : "Roll Again"}</button>
    </main>
  )
}
