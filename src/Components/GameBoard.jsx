import { useState } from "react";

export default function GameBoard({ onActivePlay, gameBoard }) {
  // const [gameBoard, setGameBoard] = useState(initialGameValue);
  // function buttonOnClick(rowIndex, colIndex) {
  //   setGameBoard((prevState) => {
  //     let newGameBoardValue = [...prevState];
  //     newGameBoardValue[rowIndex][colIndex] = activePlayer;
  //     return newGameBoardValue;
  //   });
  //   onActivePlay();

  return (
    <ol id="game-board">
      {gameBoard.map((item, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {item.map((playerSymbol, colIndex) => {
                // console.log("playerSymbol", playerSymbol);
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => onActivePlay(rowIndex, colIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
