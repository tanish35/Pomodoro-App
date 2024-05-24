import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import 'animate.css';


export  const ButtonsTimer = ({ onClick, label, isSelected, animationClass }) => (
  <Button
    size="lg"
    color="white"
    variant="outlined"
    className={`sm:mr-5 last:mr-0 animate__animated ${animationClass} hover:text-black hover:bg-white duration-300 relative`}
    onClick={onClick}
  >
    {label}
    {isSelected && (
      <FaAngleRight
      ripple='false'
        color="white"
        size={26}
        className="absolute color-white z-99 top-3 left-0 "
      />
    )}
  </Button>
);
