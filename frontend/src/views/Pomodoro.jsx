import Timer from "../components/Timer.jsx";
import Header from "../components/Header";
import { useState } from "react";
import Setting from "../components/Setting";
import { TimerProvider } from "../components/TimerContext";
import backgroundImage from "../assets/background-1.jpg";
import { useUser } from "../hook/useUser.jsx";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";


export default function TimerPomodoro() {
  const {loading, userData} = useUser(); 

  

  if (!loading && userData.length == 0) {
    return <Navigate to="/signin" />;
  }
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleSettingClick = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };

  return (
    <TimerProvider>
      <div
        style={{
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          position: "relative",
          zIndex: "98",
        }}
      >
        {" "}
        <Header onSettingClick={handleSettingClick}></Header>
    <Sidebar />
        <Timer></Timer>
        {isSettingOpen && <Setting onClose={handleCloseSetting} />}
      </div>
    </TimerProvider>
  );
}
