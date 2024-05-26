import { useEffect, useState } from "react";
import Orders from "../../components/Orders/Orders";
import Statistics from "../../components/Statistics/Statistics";
import { cardsData, groupNumber, userData } from "../../data";
import css from "./Dashboard.module.css";
import { useUser } from "../../hook/useUser";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { loading, userData, stats } = useUser();

  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Dashboard</span>

            {/* <div className={css.durationButton}>
            <select>
              <option value="">1 week</option>
              <option value="">1 month</option>
              <option value="">1 year</option>
            </select>
          </div> */}
          </div>
          <div className={css.cards}>
            {cardsData.map((card, index) => (
              <div className={css.card}>
                <div className={css.cardHead}>
                  <span>{card ? card.title : "Test"}</span>
                  {/* <span>+{card.change}</span> */}
                </div>

                {loading ? (
                  <div
                    className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded h-4 w-16"
                    style={{
                      animation: "shimmer 1.5s infinite, pulse 1.5s infinite",
                      backgroundSize: "200% 100%",
                    }}
                  ></div>
                ) : (
                  <div>
                    {card.title === "Total Time Studied" && (
                      <div className={css.cardAmount}>
                        <span>Hours</span>
                        {stats && stats.totalTimeStudied !== undefined ? (
                          <span>{groupNumber(stats.totalTimeStudied)}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </div>
                    )}
                    {card.title === "Max Time Studied" && (
                      <div className={css.cardAmount}>
                        <span>Hours</span>
                        {stats && stats.maxTimeStudied !== undefined ? (
                          <span>{groupNumber(stats.maxTimeStudied)}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </div>
                    )}
                    {card.title === "Streak" && (
                      <div className={css.cardAmount}>
                        <span>Days</span>
                        {stats && stats.streak !== undefined ? (
                          <span>{groupNumber(stats.streak)}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* {loading ? <div>Loading...</div> : <div className={css.chart}> */}

        <Statistics />
      </div>

      <Orders />
    </div>
  );
};

export default Dashboard;
