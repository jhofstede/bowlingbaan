import React from "react";
import FrameCard from "./FrameCard";

const ScoreCardRow = (props) => {
  const playerFrames = props.playerFrames;
  const scores = props.scores;

  return (
    <div className="row">
      {[...Array(10)].map((e, i) => {
        return (
          <div className="column" key={`framerow${i}`}>
            {playerFrames[i] ? (
              <FrameCard
                key={`framecard${i}`}
                tenthFrame={i + 1 === 10}
                score={scores[i] || null}
                frame={i + 1}
                ball1={playerFrames[i][0] == null ? null : playerFrames[i][0]}
                ball2={playerFrames[i][1] == null ? null : playerFrames[i][1]}
                ball3={playerFrames[i][2] == null ? null : playerFrames[i][2]}
              />
            ) : (
              <FrameCard key={`framecard${i}`} tenthFrame={i + 1 === 10} frame={i + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ScoreCardRow;
