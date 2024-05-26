import css from './Statistics.module.css'
import { BsArrowUpShort } from 'react-icons/bs'
import { groupNumber } from '../../data'
import StatisticsChart from '../StatisticsChart/StatisticsChart'
import { useUser } from '../../hook/useUser'


const Statistics = () => {
    // const {loading} = useUser();
    return (
        
        <div className={`${css.container} theme-container`}>
            {/*  */}


            <StatisticsChart/>
        </div>
    )
}

export default Statistics