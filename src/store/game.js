import { createStore } from "redux";

const defaultState = {
  players: [],
  frames: [],
  started: false,
  finished: false,
  nextPins: 10,
};

const gameReducer = (game = defaultState, action) => {
  const addToIndex = (value, player_index, frame_index, frames) => {
    return frames.map((frame, frameindex) => {
      if (frameindex === frame_index) {
        return frame.map((player_frame, pfindex) =>
          pfindex === player_index ? [...player_frame, value] : player_frame
        );
      } else {
        return frame;
      }
    });
  };

  const isPlayerFrameOver = (frame) => {
    return frame.length === 2 || frame[0] === 10;
  };

  let state = Object.assign({}, game);

  switch (action.type) {
    case "add_player":
      return {
        ...game,
        players: [...game.players, action.payload],
      };
    case "roll":
      const current_frame = state.frames.length;
      const current_frame_index = current_frame - 1;
     
      // Get the last frame
      let frame = game.frames[current_frame - 1];
      let playerIndex = null;
      let playerFrameOver = null;
      let new_frames = [];
      let lastPlayer = false;
      let nextPins = 10 - action.payload;
      if (current_frame < 10) {
        // Find the player where to store this roll
        // It's the first player with empty rolls, or just one roll, exept a strike.
        playerIndex = frame.findIndex((item) => {
          return (
            (item[0] !== null && item[0] < 10 && item[1] == null) ||
            item.length === 0
          );
        });
      } else {
        playerIndex = frame.findIndex((item) => {
          return (
            item.length < 2 || // Less than 2, always pick this
            (item[0] + item[1] === 10 && !item[2]) ||
            (item[0] + item[1] === 20 && !item[2])
          );
        });
      }
      
      // Add the pins/score to the player
      new_frames = addToIndex(
        action.payload,
        playerIndex,
        current_frame_index,
        game.frames
      );
      
      // Check if it's the last player
      lastPlayer = playerIndex + 1 === state.players.length;
      
      // Check if players turn is over and determine how many pins 
      const frame_to_check = new_frames[current_frame_index][playerIndex];
      if (current_frame < 10) {
        playerFrameOver = isPlayerFrameOver(frame_to_check);
        if (playerFrameOver) {
          nextPins = 10;
        }
      } else {
        playerFrameOver =
          frame_to_check.length === 3 ||
          (frame_to_check.length === 2 &&
            frame_to_check[0] + frame_to_check[1] < 10);
        if ((frame_to_check[0] === 10 && frame_to_check.length === 1) || playerFrameOver) {
          nextPins = 10;
        }
        if (
          (frame_to_check[0] === 10 || // Strike Ball 1
            frame_to_check[0] + frame_to_check[1] === 10) && // Spare
          frame_to_check.length === 2
        ) {
          nextPins = 10;
        }
      }

      
      if (playerFrameOver && lastPlayer) {
        if (current_frame < 10) {
            // Prepare next frame if there are more frames to play
            new_frames.push(game.players.map(() => []));
        }
      }
      if (false) {
        console.log("=============DEBUG:=============");
        console.log("Frame:", current_frame);
        console.log("Nxet set of PINS:", nextPins);
        console.log("lastPlayer?", lastPlayer);
        console.log("playerIndex", playerIndex);
        console.log("playerFrameOver", playerFrameOver);
      }
      
      return {
        ...game,
        frames: new_frames,
        finished: playerFrameOver && lastPlayer && current_frame === 10,
        nextPins: nextPins,
      };
    case "reset":
      return Object.assign({}, defaultState);
    case "start":
      return { ...game, started: true, frames: [state.players.map(() => [])] };
    default:
      return state;
  }
};

const gameStore = createStore(gameReducer);

export default gameStore;