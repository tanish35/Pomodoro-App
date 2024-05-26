import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from "material-react-table";
import { userData } from '../../data';
import './DataGrid.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '../../hook/useUser';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// const DataGrid = () => {
//   const transformedData = useMemo(() => {
//     return userData.map(user => ({
//       id: user.id,
//       username: user.username,
//       totalTimeStudied: user.stats[0]?.totalTimeStudied || 0,
//       maxTimeStudied: user.stats[0]?.maxTimeStudied || 0,
//       streak: user.stats[0]?.streak || 0,
//     }));
//   }, []);

//   const columns = useMemo(() => [
//     {
//       accessorKey: "username",
//       header: 'Username',
//     },
//     {
//       accessorKey: "totalTimeStudied",
//       header: 'Total Time Studied',
//     },
//     {
//       accessorKey: "maxTimeStudied",
//       header: 'Max Time Studied',
//     },
//     {
//       accessorKey: "streak",
//       header: 'Streak',
//     },
//   ], []);

//   const theme = useMemo(
//     () => createTheme({
//       palette: {
//         mode: "dark"
//       }
//     }), []
//   );

//   return (
//     <div className="table-container">
//       <ThemeProvider theme={theme}>
//         <MaterialReactTable columns={columns} data={transformedData} />
//       </ThemeProvider>
//     </div>
//   );
// }



const DataGrid = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/bulk`, {
          withCredentials: true
        });
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // navigate('/dashboard');
      }
    };

    fetchData();
  }, [navigate]);

  const transformedData = useMemo(() => {
    return userData.map(user => ({
      id: user.id,
      username: user.username,
      totalTimeStudied: user.stats[0]?.totalTimeStudied || 0,
      maxTimeStudied: user.stats[0]?.maxTimeStudied || 0,
      streak: user.stats[0]?.streak || 0,
    }));
  }, [userData]);

  const columns = useMemo(() => [
    {
      accessorKey: "username",
      header: 'Username',
    },
    {
      accessorKey: "totalTimeStudied",
      header: 'Total Time Studied',
    },
    {
      accessorKey: "maxTimeStudied",
      header: 'Max Time Studied',
    },
    {
      accessorKey: "streak",
      header: 'Streak',
    },
  ], []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "dark"
    }
  }), []);

  return (
    loading ? <div>Loading...</div> :
    <div className="table-container">
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={transformedData} />
      </ThemeProvider>
    </div>
  );
}

export default DataGrid;
