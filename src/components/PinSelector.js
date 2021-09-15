import React from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const PinSelector = (props) => {
  const nextPins = useSelector((game) => game.nextPins);

  const onClickHandler = (amount) => (e) => {
    props.onRoll(amount);
  };

  return (
    <div>
      {[...Array(11)].map((i, index) => {
        return (
          <Button
            variant="contained"
            color="primary"
            key={`button_${index}`}
            disabled={index > nextPins}
            onClick={onClickHandler(index)}
          >
            {index}
          </Button>
        );
      })}
    </div>
  );
};

export default PinSelector;
