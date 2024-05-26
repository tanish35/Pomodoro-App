import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DataGrid = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/bulk`, {
          withCredentials: true,
        });
        setUserData(res.data.users);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
        // navigate('/dashboard');
      }
    };

    fetchData();
  }, [navigate]);

  const transformedData = useMemo(() => {
    return userData.map((user) => ({
      id: user.id,
      username: user.username,
      totalTimeStudied: user.stats[0]?.totalTimeStudied || 0,
      maxTimeStudied: user.stats[0]?.maxTimeStudied || 0,
      streak: user.stats[0]?.streak || 0,
    }));
  }, [userData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "totalTimeStudied",
        header: "Total Time Studied",
      },
      {
        accessorKey: "maxTimeStudied",
        header: "Max Time Studied",
      },
      {
        accessorKey: "streak",
        header: "Streak",
      },
    ],
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="table-container">
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={transformedData} />
      </ThemeProvider>
    </div>
  );
};

export default DataGrid;
