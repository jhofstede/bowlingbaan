import { React, useState } from "react";
import { useDispatch } from "react-redux";

const PlayerForm = () => {
  const [playerName, setName] = useState("");

  const gameDispatch = useDispatch();

  const onChangeHandler = (event) => {
    setName(event.target.value);
  };

  const playerInputHandler = (event) => {
    event.preventDefault();
    gameDispatch({ type: "add_player", payload: playerName });
    setName("");
  };
  return (
    <form onSubmit={playerInputHandler}>
      <h2>Add player</h2>
      <input
        type="text"
        value={playerName}
        onChange={onChangeHandler}
        placeholder="Player name"
      />
      <button type="submit">Add Player</button>
    </form>
  );
};
export default PlayerForm;
