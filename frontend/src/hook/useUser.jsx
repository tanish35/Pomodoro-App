import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [stats, setStats] = useState([]);

    async function getUserData() {
        const res = await axios.get(`${BACKEND_URL}/api/user/me`, {
            withCredentials: true,
        });
        setUserData(res.data);
        if (!res.data.username) {
            setLoading(false);
            return;
        }
        const stats = await axios.get(`${BACKEND_URL}/api/stats/${res.data.username}`, {
            withCredentials: true,
        });
        setStats(stats.data);
        setLoading(false);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return { loading, userData, stats };
}