import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaAppleAlt } from "react-icons/fa";
import { Switch } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useTimerContext } from "./TimerContext";

export default function Setting({ onClose }) {

  const {
    initialTimeFocus,
    shortBreak,
    longBreak,
    setInitialTimeFocus,
    setShortBreak,
    setLongBreak,
    updateTimer,
    autoStartPomodoro,
    setAutoStartPomodoro,
    autoStartBreak,
    setAutoStartBreak,
    setSelectedTimer,
  } = useTimerContext();



  const handleCloseClick = () => {
    onClose();
  };

  const handleUpdatePomodoroTime = (newValue) => {
    setInitialTimeFocus(newValue);
    updateTimer(newValue);
    setSelectedTimer('pomodoro')
  };
  
  const handleUpdateStartPomodoro = () => {
    setAutoStartPomodoro(!autoStartPomodoro);
  };

  return (
    <div className="flex  justify-end items-center w-screen h-screen absolute z-99 top-0 left-0">
      <div className="absolute p-5 top-0 min-w-96  bg-slate-900 flex flex-col opacity-100 rounded animate__animated animate__fadeIn">
        <div className="relative w-full flex justify-between items-center border-b border-t-0 border-l-0 border-r-0 border-black border-solid">
          <div>
            <p className="m-4 text-white text-2xl">Settings</p>
          </div>
          <IoMdClose
            size={30}
            className=" mr-2 cursor-pointer hover:opacity-50 duration-300 bg-cyan-400"
            onClick={handleCloseClick}
          />
        </div>
        <div>
          <div className="flex w-full text-white">
            <p className="flex mt-8 text-xl">
              TIMER
            </p>
          </div>
          <div className="bg-slate-950 rounded-2xl flex flex-col justify-evenly h-[300px] mt-5">
            <div className="flex flex-col items-center">
              <p className="mb-1 text-2xl text-white">Duration</p>
              <div className="w-[250px] h-[100px]">
                <Input
                  color="blue"
                  type="number"
                  min={1}
                  className="text-black text-3xl font-bold rounded-lg p-2 text-center"
                  value={initialTimeFocus / 60}
                  onChange={(e) =>
                    handleUpdatePomodoroTime(e.target.value * 60)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
