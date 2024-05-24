import Timer from "../components/timer";
import Header from "../components/Header";
import { useState } from "react";
import Setting from "../components/Setting";
import { TimerProvider } from "../components/TimerContext";
import backgroundImage from "../assets/background-1.jpg";

export default function TimerPomodoro() {
    const [isSettingOpen, setIsSettingOpen] = useState(false)

    const handleSettingClick = () => {
        setIsSettingOpen(!isSettingOpen);
    }

    const handleCloseSetting = () =>{
        setIsSettingOpen(false)
    }


  return (
    <TimerProvider>
<div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh', position: 'relative', zIndex: '98' }}>       <Header onSettingClick={handleSettingClick} ></Header>
      <Timer></Timer>
      {isSettingOpen && <Setting onClose={handleCloseSetting} />}
    </div>
    </TimerProvider>
  );
}