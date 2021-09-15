import { React, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

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
      <Button variant="contained" color="primary" type="submit">
        Add Player
      </Button>
    </form>
  );
};
export default PlayerForm;
