import moment from "moment/moment";
import css from "./Layout.module.css";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useUser } from "../../hook/useUser";

const Layout = () => {

  const { pathname } = useLocation()

  const { loading , userData, stats, history} = useUser();


  return (
    <div className={css.container}>
      <Sidebar />


      {/* making the dashboard as the default route */}
      {pathname === "/" && <Navigate to="/dashboard" />}


      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>

          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          

          {/* <div className={css.profile}>
            <img src="./profile.png" alt="person image" />
            <div className={css.details}>
              <span>Denis Steven</span>
              <span>devissteven@gmail.com</span>
            </div>
          </div> */}

          <div className={css.profile}>
            <img src={userData.pic} alt="person image" />
            <div className={css.details}>
              <span>{userData.name}</span>
              <span>{userData.email}</span>
            </div>
          </div>


        </div>


        <div className={css.content} >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
