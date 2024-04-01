export default function Log({ logFile }) {
  let log = logFile.flat().reverse();
  return (
    <ol>
      {log.map((item) => {
        return (
          <li
            key={`${item.square.row}${item.square.col}`}
            style={{ textAlign: "center" }}
          >
            {item.player} selected {item.square.row},{item.square.col}
          </li>
        );
      })}
    </ol>
  );
}
