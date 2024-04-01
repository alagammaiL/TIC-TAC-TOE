import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Log from "./Components/Log";
import { winningCombination } from "./Components/WinningCombinations";
import GameOver from "./Components/GameOver";
const initialGameValue = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let logs = [];
let myPlayer = "";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameBoard, setGameBoard] = useState(initialGameValue);
  const [gameOver, gameOverFunction] = useState(false);
  const [playerNameField, setPlayerName] = useState(["Player 1", "Player 2"]);

  function onSaveHandler(symbol, playerName) {
    setPlayerName((...prevPlayerName) => {
      prevPlayerName = prevPlayerName.flat();
      let player1 = prevPlayerName[0];
      let player2 = prevPlayerName[1];
      symbol == "X" ? (player1 = playerName) : (player2 = playerName);
      return [player1, player2];
    });
  }
  function activeplayerHandler(rowIndex, colIndex) {
    setActivePlayer((prevState) => {
      return prevState === "X" ? "O" : "X";
    });
    setGameBoard((prevStateGame) => {
      let newGameBoardValue = [...prevStateGame];
      newGameBoardValue[rowIndex][colIndex] = activePlayer;
      let logFile = setLogFile(rowIndex, colIndex, activePlayer);
      logs.push(logFile);

      return newGameBoardValue;
    });
    gameOverFunction((prevGameOverValue) => {
      let logValue = logs.flat().reverse();
      myPlayer = logValue[0].player;
      let currentPLayer = logValue[0].player;
      let pickUpValue = [];
      for (let eachLog of logValue) {
        if (eachLog.player === currentPLayer) {
          pickUpValue.push({
            row: eachLog.square.row,
            col: eachLog.square.col,
          });
        }
      }

      if (pickUpValue.length >= 3) {
        for (let j = 0; j < winningCombination.length; j++) {
          let counter = 0;
          let recentvalue = winningCombination[j];
          for (let i = 0; i < pickUpValue.length; i++) {
            if (
              (recentvalue[0].row == pickUpValue[i].row &&
                recentvalue[0].col == pickUpValue[i].col) ||
              (recentvalue[1].row == pickUpValue[i].row &&
                recentvalue[1].col == pickUpValue[i].col) ||
              (recentvalue[2].row == pickUpValue[i].row &&
                recentvalue[2].col == pickUpValue[i].col)
            ) {
              counter++;
            }
          }

          if (counter == 3) {
            return true;
          }
        }

        return false;
      } else {
        return false;
      }
    });
  }
  function matchRestart() {
    let initialValue = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    setGameBoard(() => {
      return initialValue;
    });
    setActivePlayer("X");

    gameOverFunction(false);
    logs = [];
    setPlayerName(() => {
      return ["Player 1", "Player 2"];
    });
    reMatch = true;
  }
  function setLogFile(row, col, acplayer) {
    return [{ square: { row: row, col: col }, player: acplayer }];
  }

  let hasDraw = logs.length == 9 && gameOver == false ? true : false;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {console.log("player1 in app", playerNameField[0])}
          <Player
            initialName={playerNameField[0]}
            symbol="X"
            isActive={activePlayer === "X"}
            onHandleSave={onSaveHandler}
          />
          {console.log("player2 in app", playerNameField[1])}
          <Player
            initialName={playerNameField[1]}
            symbol="O"
            isActive={activePlayer === "O"}
            onHandleSave={onSaveHandler}
          />
        </ol>
        {(gameOver || hasDraw) && (
          <GameOver
            activePlayer={myPlayer}
            hasDraw={hasDraw}
            gameover={gameOver}
            onRestart={matchRestart}
            playerFullName={playerNameField}
          />
        )}
        <GameBoard onActivePlay={activeplayerHandler} gameBoard={gameBoard} />
      </div>
      <Log logFile={logs} />
      <></>
    </main>
  );
}

export default App;
