import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import axios from 'axios'

import { useUser } from '../../hook/useUser';
const StatisticsChart =  () => {

    function getCurrentDateFormatted(date) {
        // const date = new Date();
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
      

    const {loading, history} = useUser();

    if (loading) {
        return <div>Loading...</div>
    } 
    
    const x_axis = [];
    const y_axis = [];

    if (history.length > 0) {
        history.map((history) => {
            x_axis.push(getCurrentDateFormatted(history.date))
            y_axis.push(history.timeStudied)
        })
    }

    

    const option = {
        color: ['var(--orange)'],

        toolbox: {
            feature: {
                saveAsImage: {},
            }
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross"
            },
            backgroundColor: "rgba(0, 0, 0, 0.59)",
            borderWidth: 0,
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            show: false,
        },

        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: x_axis,
            }
        ],
        yAxis: [
            {
                type: "value",
                splitLine: {
                    show: false,
                }
            }
        ],
        series: [
            {
                type: "line",
                smooth: true,
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(255, 191, 0)",
                        },
                        {
                            offset: 1,
                            color: "#F450D3"
                        }
                    ]),
                    width: 4
                },
                areaStyle: {
                    opacity: .5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        {
                            offset: 0,
                            color: "#FE4C00"
                        },
                        {
                            offset: 1,
                            color: "rgba(255,144,70,0.1)"
                        }
                    ])
                },
                emphasis: {
                    focus: "series",
                },
                showSymbol: false,
                data: y_axis
            }
        ]
    }

    return (
        <ReactECharts option={option}
        />
    )
}

export default StatisticsChart