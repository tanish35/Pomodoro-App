import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [initialTimeFocus, setInitialTimeFocus] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(15 * 60);
  const [timer, setTimer] = useState(initialTimeFocus);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimerType, setCurrentTimerType] = useState("pomodoro");
  const [autoStartBreak, setAutoStartBreak] = useState(false);
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState("pomodoro")

  const updateTimer = (newTime) => {
    setTimer(newTime)
  }

  return (
    <TimerContext.Provider
      value={{
        initialTimeFocus,
        setInitialTimeFocus,
        shortBreak,
        setShortBreak,
        longBreak,
        setLongBreak,
        updateTimer,
        setIsRunning,
        isRunning,
        timer,
        setTimer,
        currentTimerType,
        setCurrentTimerType,
        autoStartBreak,
        setAutoStartBreak,
        autoStartPomodoro,
        setAutoStartPomodoro,
        setSelectedTimer,
        selectedTimer
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  return useContext(TimerContext);
};
