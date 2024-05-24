import { useEffect, useState } from 'react';
import Orders from '../../components/Orders/Orders';
import Statistics from '../../components/Statistics/Statistics';
import { cardsData, groupNumber } from '../../data';
import css from './Dashboard.module.css';
import { useUser } from '../../hook/useUser';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const Dashboard = () => {

  const { username, loading, stats } = useUser();
  // const [stats, setStats] = useState([])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (!username) {
  //   return <Navigate to="/signin" />
  // }

  

  return <div className={css.container}>

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
            {
              stats.map((card, index)=> (
                <div className={css.card}>
                  <div className={css.cardHead}>
                    <span>{card ? card.title : "Test"}</span>
                    {/* <span>+{card.change}</span> */}
                  </div>

                
                  <div className={css.cardAmount}>
                    {card.title != 'Streak' && <span>Hrs</span>}
                    {card.title == 'Streak' && <span>Days</span>}
                    <span>{groupNumber(card ? card.amount : 0)}</span>
                  </div>
                  
                </div>
              ))
            }
          </div>
      </div>



      <Statistics/>

    </div>


      <Orders/>
  </div>
}

export default Dashboard