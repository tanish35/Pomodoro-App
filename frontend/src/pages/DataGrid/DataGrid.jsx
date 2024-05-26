import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DataGrid = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/bulk`, {
          withCredentials: true,
        });
        setUserData(res.data.users);
      } catch (error) {
        console.log(error);
        setError(error); // Set error state
        // Uncomment or adjust the navigation on error as needed
        // navigate('/dashboard');
      } finally {
        setLoading(false); // Ensure loading is set to false in both cases
      }
    };

    fetchData();
  }, [navigate]);

  const transformedData = useMemo(() => {
    if (!userData.length) return []; // Return an empty array if there's no data
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className="table-container">
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={transformedData} />
      </ThemeProvider>
    </div>
  );
};

export default DataGrid;
