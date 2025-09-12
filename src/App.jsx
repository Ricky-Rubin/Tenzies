import React from "react"
import Die from "/src/Die.jsx"

export default function App() {
const [dieValue, setDieValue] = React.useState(generateDiceNumbers())

  function generateDiceNumbers() {
    const numbersArray = [];

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push({
        value: randomNumber,
        isHeld: false
      });
    }

      return(numbersArray);
  }

  function rollDice() {
    const result = generateDiceNumbers();
    setDieValue(result);
  }

  const assignNumber = dieValue.map((dieNumber) => {
    return <Die value={dieNumber.value} />
  })

  return (
    <main>
      <div className="dice-box-container">
        {assignNumber}
      </div>

      <button className="roll-button" onClick={rollDice}>Roll Again</button>
    </main>
  )
}
