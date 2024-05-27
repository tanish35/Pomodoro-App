import { useEffect, useState } from "react";
import { CiPause1 } from "react-icons/ci";
import { CiUndo } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import breakSound from "../assets/EndSound.mp3";
import { useTimerContext } from "./TimerContext";
import "animate.css";
import { ButtonsTimer } from "./ButtonsTimer";
import axios from "axios";

export default function Timer() {
  const {
    timer,
    isRunning,
    currentTimerType,
    setTimer,
    setIsRunning,
    shortBreak,
    longBreak,
    setCurrentTimerType,
    initialTimeFocus,
    autoStartBreak,
    autoStartPomodoro,
    setSelectedTimer,
    selectedTimer,
  } = useTimerContext();

  const [activeIcon, setActiveIcon] = useState(null);
  const [timePassed, setTimePassed] = useState(0); // New state to store time passed

  useEffect(() => {
    let intervalId;

    const playSound = () => {
      const audio = new Audio(breakSound);
      audio.play();
    };

    if (isRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
        setTimePassed((prevTimePassed) => prevTimePassed + 1); // Update time passed
      }, 1000);
    } else if (timer === 0) {
      playSound();

      if (currentTimerType === "pomodoro") {
        setTimer(shortBreak);
        setCurrentTimerType("shortBreak");
        setIsRunning(false);
        setCurrentTimerType("shortBreak");
        if (autoStartBreak) {
          setIsRunning(true);
        }
      } else if (currentTimerType === "shortBreak") {
        setTimer(longBreak);
        setCurrentTimerType("longBreak");
        setCurrentTimerType("longBreak");
        setIsRunning(true);
        if (autoStartPomodoro) {
          setIsRunning(true);
        }
      } else {
        setTimer(initialTimeFocus);
        setCurrentTimerType("pomodoro");
        setIsRunning(false);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [
    isRunning,
    timer,
    currentTimerType,
    shortBreak,
    longBreak,
    setTimer,
    autoStartBreak,
    autoStartPomodoro,
    setIsRunning,
    setCurrentTimerType,
  ]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setActiveIcon("start");
  };

  const handleStop = () => {
    setIsRunning(false);
    setActiveIcon("stop");
  };

  const handleReset = async () => {
    setIsRunning(false);
    setTimer(initialTimeFocus);
    setActiveIcon("reset");
    await axios.post(
      "/api/stats",
      {
        minutes: Math.floor(timePassed / 60),
      },
      {
        withCredentials: true,
      }
    );
    const res = await axios.get("/api/user/me", {
      withCredentials: true,
    });
    const currentHour = new Date().getHours();
    const requestBody = {
      totalHours: Math.floor(timePassed / 60),
      age: res.data.age,
      period: currentHour.toString(),
    };
    try {
      const response = await axios.post(
        "https://ai.tanish.me/predict",
        requestBody
      );
      alert("Switch to break tab to find our suggested break time!");
      setCurrentTimerType("shortBreak");
      setTimer(parseInt(response.data.break));
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleShortBreak = () => {
    setIsRunning(false);
    setTimer(shortBreak);
    setCurrentTimerType("shortBreak");
  };

  const handlePomodoroTime = () => {
    setIsRunning(false);
    setTimer(initialTimeFocus);
    setCurrentTimerType("pomodoro");
  };

  const buttonStyles = "cursor-pointer color-white opacity-50 duration-300";

  return (
    <div className="w-screen h-screen flex  items-center justify-center ">
      <div className="w-screen h-2/5 flex flex-col justify-center items-center">
        <div className="mb-10 gap-5 flex flex-col sm:flex-row">
          <ButtonsTimer
            onClick={() => {
              handlePomodoroTime();
              setSelectedTimer("pomodoro");
            }}
            label="Pomodoro"
            isSelected={selectedTimer === "pomodoro"}
            animationClass="animate__backInLeft"
          />

          <ButtonsTimer
            onClick={() => {
              handleShortBreak();
              setSelectedTimer("shortBreak");
            }}
            label="Break"
            isSelected={selectedTimer === "shortBreak"}
            animationClass="animate__backInDown"
          />
        </div>
        <h1 className="text-white text-8xl sm:text-9xl m-0 animate__animated animate__fadeIn">
          {formatTime(timer)}
        </h1>
        <div className="flex mt-10">
          <div className="hover:opacity-50 duration-300">
            <CiPlay1
              color="white"
              size={activeIcon === "start" ? 60 : 70}
              className={`${buttonStyles} animate__animated animate__backInLeft text-6xl sm:text-7xl m-2`}
              onClick={handleStart}
            />
          </div>
          <div className="hover:opacity-50 duration-300">
            <CiPause1
              color="white"
              size={activeIcon === "stop" ? 60 : 70}
              className={`${buttonStyles} animate__animated animate__backInUp text-6xl sm:text-7xl  m-2`}
              onClick={handleStop}
            />
          </div>
          <div className="hover:opacity-50 duration-300">
            <CiUndo
              color="white"
              size={activeIcon === "reset" ? 60 : 70}
              className={`${buttonStyles} animate__animated animate__backInRight text-6xl sm:text-7xl  m-2`}
              onClick={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
