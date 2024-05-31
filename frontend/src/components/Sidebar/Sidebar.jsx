import css from './Sidebar.module.css';
import { MdPunchClock, MdSpaceDashboard } from "react-icons/md";
import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logos/OIG2.hG2hz7QR.jpeg'
const Sidebar = () => {
    const navigate = useNavigate();
    function navigateTimer(e) {
        e.preventDefault();
        navigate("/timer")
    }
    function navigateDashboard() {
        navigate("/profile/dashboard")
    }
    function navigateTable() {
        navigate("/profile/users")
    }
    return (
        <div className={css.container}>

            <img src={logo} alt="logo"  className="w-9 h-9 rounded-full" />


            <div className={css.menu}>
                
                    <MdSpaceDashboard size={30} onClick={navigateDashboard} />
                

                
                    <MdPunchClock size={30} onClick={navigateTimer} />
                
                
                    <AiOutlineTable size={30} onClick={navigateTable} />

               
            </div>
        </div>
    )
}

export default Sidebar
