import css from './Sidebar.module.css';
import { MdPunchClock, MdSpaceDashboard } from "react-icons/md";
import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
    function navigateTimer() {
        navigate("/timer2")
    }
    function navigateDashboard() {
        navigate("/profile/dashboard")
    }
    function navigateTable() {
        navigate("/profile/users")
    }
    return (
        <div className={css.container}>

            {/* <img src="./logo.png" alt="logo" className={css.logo} /> */}


            <div className={css.menu}>
                
                    <MdSpaceDashboard size={30} onClick={navigateDashboard} />
                

                
                    <MdPunchClock size={30} onClick={navigateTimer} />
                
                
                    <AiOutlineTable size={30} onClick={navigateTable} />

               
            </div>
        </div>
    )
}

export default Sidebar