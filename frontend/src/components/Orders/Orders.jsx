// import React, { useState } from 'react'
// import { groupNumber, ordersData } from '../../data'
// import OrdersPieChart from '../OrdersPieChart/OrdersPieChart'
// import css from './Orders.module.css'
// import HistoryCard from './historyCard'
// import { getCoordinateSystemDimensions } from 'echarts'
// import axios from 'axios'
// import { useUser } from '../../hook/useUser'

// const  Orders = async () => {

//     const {history} = useUser();
//     // const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     if (!history) {
//         return <div>No history to show</div>
//     }

// const historyData = [
//     {
//         maxTimeStudied: 4,
//         date: '2024-05-27',
//         task: 'Mathematics Revision',
//         name: 'John Doe',
//       },
//       {
//         maxTimeStudied: 4,
//         date: '2024-05-26',
//         task: 'Mathematics Revision',
//         name: 'John Doe',
//       },
// {
//     maxTimeStudied: 5,
//     date: '2024-05-26',
//     task: 'Mathematics Revision',
//     name: 'John Doe',
//   },
//   {
//     maxTimeStudied: 6,
//     date: '2024-05-26',
//     task: 'Mathematics Revision',
//     name: 'John Doe',
//   }
// ];

//     const lastThreeReversed = history.length > 0 ? history.slice(-3).reverse() : [];

//     // console.log(lastThreeReversed);
//     // setLoading(false);
//     return (
//         loading ? <div className={`${css.container} theme-container`}>Loading...</div> :
//         <div className={`${css.container} theme-container`}>
//             <div className={css.head}>
//                 {/* <img src="./logo.png" alt="logo" /> */}
//                 <span className='text-2xl'>History</span>
//             </div>

//             {lastThreeReversed.length > 0 ? (
//           lastThreeReversed.map((his, index) => (
//             <HistoryCard key={index} {...his} />
//           ))
//         ) : (
//           <p className="text-white text-center">No history data available</p>
//         )}
//         </div>
//     )
// }

// export default Orders

import React, { useState, useEffect } from "react";
import { useUser } from "../../hook/useUser";
import HistoryCard from "./HistoryCard.jsx";
import css from "./Orders.module.css";

const Orders = () => {
  const { history } = useUser();
  const [loading, setLoading] = useState(true);

  

  const historyData = [
    {
      maxTimeStudied: 4,
      date: "2024-05-27",
      task: "Mathematics Revision",
      name: "John Doe",
    },
    {
      maxTimeStudied: 4,
      date: "2024-05-26",
      task: "Mathematics Revision",
      name: "John Doe",
    },
    {
      maxTimeStudied: 5,
      date: "2024-05-26",
      task: "Mathematics Revision",
      name: "John Doe",
    },
    {
      maxTimeStudied: 6,
      date: "2024-05-26",
      task: "Mathematics Revision",
      name: "John Doe",
    },
  ];
  if (!history) {
    return <div>No history to show</div>;
  }

  const lastThreeReversed =
    history.length > 0 ? history.slice(-3).reverse() : [];

  return (
    <div className={`${css.container} theme-container`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={css.head}>
            <span className="text-2xl">History</span>
          </div>
          {lastThreeReversed.length > 0 ? (
            lastThreeReversed.map((his, index) => (
              <HistoryCard key={index} {...his} />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No history data available
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
