import React from "react";

import "./App.css";
import ScoreCardRow from "./components/ScoreCardRow";
import PinSelector from "./components/PinSelector";
import PlayerForm from "./components/PlayerForm";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
  },
  avatar: {
    backgroundColor: red[500],
  },

  
}));

/* 
● Correctly calculates bowling scores X
● Add a variable number of players with names X
● Manually add scores for each player (so we can test)X
● Tracks the number of games won for each player
● Reset all game stats and start over X
● Visual representation using your component framework of choice (but preferably react) X
*/

/* TODO:
- 0 Pins roll
- 10th frame rendering
*/
class ScoreCalculator {
  calculateFrame10 = (frame10) => {
    let score = 0;
    let isFinal = false;

    if (frame10 === null){
      return null;
    }

    if (frame10[0] === 10 && frame10[1] && frame10[2]) {
      isFinal = true;
    } else if (this.isSpare(frame10) && frame10[2]) {
      isFinal = true;
    } else if (frame10[0] && frame10[1]) {
      isFinal = true;
    }

    if (!isFinal) {      
      return null;
    }
    if (frame10[0] === 10 && frame10[1] && frame10[2]) {
      score = 10 + frame10[1] + frame10[2];
    } else if (this.isSpare(frame10) && frame10[2]) {
      score = this.frameValue(frame10) + frame10[2];
    } else if (frame10[0] && frame10[1]) {
      score = this.frameValue(frame10);
    }
    return score;
  };

  calculateScore = (frameSet) => {
    let frameScores = [];
    if (!frameSet || !frameSet[0]) {
      return [];
    }
    for (let frame = 0; frame < frameSet.length; frame++) {
      let currentFrame = frameSet[frame];
      let nextFrame = frameSet[frame + 1];
      let next2Frame = frameSet[frame + 2];
      if (frame === 9) {
        let frame10Score = this.calculateFrame10(currentFrame);
        if (frame10Score !== null) {
          frameScores.push(frame10Score);
        }
      } else {
        if (this.frameValue(currentFrame) === 10) {
          if (this.isSpare(currentFrame) && nextFrame) {
            frameScores.push(10 + nextFrame[0]);
          } else {
            if (this.isStrike(currentFrame) && nextFrame && nextFrame[1]) {
              frameScores.push(10 + this.frameValue(nextFrame));
            }
            if (
              this.isStrike(currentFrame) &&
              this.isStrike(nextFrame) &&
              next2Frame
            ) {
              frameScores.push(10 + 10 + this.frameValue(next2Frame));
            }
          }
        } else {
          frameScores.push(this.frameValue(currentFrame));
        }
      }
    }
    return frameScores;
  };

  calculateTotal = (frameSet) => {
    const scores = this.calculateScore(frameSet);

    return scores.reduce((total, frameScore, i) => total + frameScore, 0);
  };

  // Todo:
  // Move these kinds of methods to a helper, since they are also usefull in other parts of the code

  frameValue = (frame) => {
    return (frame[0] || 0) + (frame[1] || 0);
  };

  isSpare = (frame) => {
    return frame && frame[0] + frame[1] === 10;
  };

  isStrike = (frame) => {
    return frame && frame[0] === 10;
  };
}

function App() {
  const classes = useStyles();

  const game = useSelector((game) => game);

  const gameDispatch = useDispatch();

  const incrementHandler = (pins) => {
    gameDispatch({ type: "roll", payload: pins });
  };
  const resetHandler = () => {
    gameDispatch({ type: "reset" });
  };
  const startHandler = () => {
    gameDispatch({ type: "start" });
  };

  return (
    <div className="App">
      {game.players.map((playerName, index) => {
        const playerFrames = game.frames.map((frame) => frame[index]);
        let calculator = new ScoreCalculator();
        let scores = game.started
          ? calculator.calculateScore(playerFrames)
          : [];
        let totalScore = game.started
          ? calculator.calculateTotal(playerFrames)
          : [];
        return (
          <Card className={classes.root}  key={`div_player_${index}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {playerName.substring(0,1).toUpperCase()}
              </Avatar>
            } 
            title={`${playerName}`}
            subheader={`Score: ${totalScore}`}
          />
          <CardContent>
            <ScoreCardRow
              key={`player_${index}`}
              scores={scores}
              playerFrames={playerFrames}
            />
          </CardContent>
          </Card>
          
        );
      })}
       <Card className={classes.root}>
       <CardContent>
        {!game.started && !game.finished ? (
          <div>
            <PlayerForm />
            {game.players.length > 1 ? 
            <Button variant="contained" color="primary" onClick={startHandler}>Start game</Button>
            : null }
          </div>
        ) : (
          <div>
            {!game.finished ? (
              <div>
                <p>How many pins do you want to knock over?</p>
                <PinSelector onRoll={incrementHandler} />
              </div> 
            ) : (
              <p>Afgelopen!</p>
            )}
             <Button variant="contained" color="primary" onClick={resetHandler}>RESET</Button>
          </div>
        )}
      </CardContent>
      </Card>
      <pre>
        {JSON.stringify(
          useSelector((game) => game),
          null,
          3
        )}
      </pre>
    </div>
  );
}

export default App;
