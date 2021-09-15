import React from "react";
import "./FrameCard.css";

const FrameCard = (props) => {
  let { ball1, ball2, ball3 } = props;
  let ball1Label,
    ball2Label,
    ball3Label = "";
  // Label 1
  if (props.tenthFrame && ball1 === 10) {
    ball1Label = "X"; // Tenth-frame Strike
  } else if (ball1 === 10) {
    ball1Label = ""; // Normal Strike
  } else {
    ball1Label = ball1;
  }

  // Label 2
  if (props.tenthFrame && ball2 === 10) {
    ball2Label = "X";
  } else if (ball1 === 10) {
    ball2Label = "X";
  } else if (ball1 + ball2 === 10 && ball2 > 0) {
    ball2Label = "/"; // Spare
  } else {
    ball2Label = ball2;
  }

  // Label 3
  if (props.tenthFrame && ball3 === 10) {
    ball3Label = "X"; // Tenth-frame, 3rd Strike
  } else {
    ball3Label = ball3;
  }

  return (
    <div className={props.tenthFrame ? "framebox10" : "framebox"}>
      <div className="frameno">{props.frame}</div>
      <div className="score">{props.score}</div>
      <div className="ball1">{ball1Label}</div>
      <div className="ball2">{ball2Label}</div>
      {props.tenthFrame ? <div className="ball3">{ball3Label}</div> : null}
    </div>
  );
};

export default FrameCard;
