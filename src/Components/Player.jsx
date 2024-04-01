import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onHandleSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function onHandleEdit() {
    setIsEditing(!isEditing);
    if (isEditing) {
      onHandleSave(symbol, playerName);
    }
  }
  function onHandleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {console.log("playerNmae", playerName)}
        {isEditing ? (
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => {
              onHandleChange(e);
            }}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onHandleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
