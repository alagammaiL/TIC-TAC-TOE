export default function GameOver({
  activePlayer,
  hasDraw,
  gameover,
  onRestart,
  playerFullName,
}) {
  let winner = "";
  let player1FullName = playerFullName[0];

  let player2FullName = playerFullName[1];

  winner = activePlayer == "X" ? player1FullName : player2FullName;
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {gameover && <p>{winner} Won!</p>}
      {hasDraw && <p>Match Draw</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
