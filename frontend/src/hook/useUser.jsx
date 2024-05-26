import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [stats, setStats] = useState([]);
  const [history, setHistory] = useState([]);

  async function getUserData() {
    try {
      const res = await axios.get(`/api/user/me`, {
        withCredentials: true,
      });
      setUserData(res.data);

      const stats = await axios.get(`/api/stats/${res.data.username}`, {
        withCredentials: true,
      });
      if (!stats.data) {
        setStats([]);
        setLoading(false);
      }
      setStats(stats.data);

      const history = await axios.get(
        `/api/stats/history/${res.data.username}`,
        {
          withCredentials: true,
        }
      );
      if (!history.data) {
        setLoading(false);
      }
      setHistory(history.data);
      setLoading(false);
    } catch (e) {
      setUserData([]);
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return { loading, userData, stats, history };
};
