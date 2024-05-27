import moment from "moment/moment";
import css from "./Layout.module.css";

import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useUser } from "../../hook/useUser";
import SkeletonLoader from "../skeletonLoader/skeletonLoader";

const Layout = () => {
  const navigate  = useNavigate();

  const { pathname } = useLocation()

  const { loading , userData, stats, history} = useUser();

  function nav () {
    navigate('/edit')
  }


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
          <div className="flex flex-row">
            {loading ? 
              <div className={css.profile}>
                {/* <img src={userData.pic} alt="person image" /> */}
                <div className={css.details}>
                <div
                    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded h-3 w-48"
                    style={{
                      animation: "shimmer 1.5s infinite, pulse 1.5s infinite",
                      backgroundSize: "200% 100%",
                    }}
                  ></div>
                  <div
                    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded h-3 w-16"
                    style={{
                      animation: "shimmer 1.5s infinite, pulse 1.5s infinite",
                      backgroundSize: "200% 100%",
                    }}
                  ></div>
                  <div
                    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded h-3 w-48"
                    style={{
                      animation: "shimmer 1.5s infinite, pulse 1.5s infinite",
                      backgroundSize: "200% 100%",
                    }}
                  ></div>
                </div>
              </div> 
              : 
              <div className={css.profile}>
                <img src={userData.pic} alt="person image" />
                <div className={css.details}>
                  <span>{userData.name}</span>
                  <span>{userData.age}</span>
                  <span>{userData.email}</span>
                </div>
              </div>
            }
          <div>
          <svg onClick={nav}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer hover:text">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>

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
