import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
          <div className="image"></div>
        <ul>
          <li>Name: John Doe</li>
          <li>Username: johndoe</li>
          <li>Education: johndoe@gmail.com</li>
        </ul>
      </div>
      <div className="stats">
          <ul>
            <li>Total minutes studied: </li>
            <li>Highest minutes studied: </li>
            <li>Streak: </li>
            <li>Achievements: </li>
          </ul>
      </div>

      <div className="footer">
        <button className="signout">SIGN OUT</button>
        <button className="edit">EDIT PROFILE</button>
      </div>
    </>
  );
}

export default App;
