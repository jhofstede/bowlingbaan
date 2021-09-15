import React from "react";
import { useSelector } from "react-redux";

const PinSelector = (props) => {
  const nextPins = useSelector((game) => game.nextPins);

  const onClickHandler = (amount) => (e) => {
    props.onRoll(amount);
  };

  return (
    <div>
      {[...Array(11)].map((i, index) => {
        return <button key={`button_${index}`} disabled={index > nextPins} onClick={onClickHandler(index)}>{index}</button>;
      })}
    </div>
  );
};

export default PinSelector;
