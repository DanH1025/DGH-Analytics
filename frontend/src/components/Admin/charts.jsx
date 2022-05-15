import React from 'react'
import './chart.css'

import Chart from "react-apexcharts";

export default function Charts({title,middleTotal ,dates, chartData,chartType}) {

  const stat = {
    options: {
      chart: {
        id: "basic-bar"
      },
      toolbar: {
        show: false,
      },
      xaxis: {
        categories: dates
      },
      yaxis: {
        show: false,
      },
      stroke: {
        curve: 'smooth',
        width: 1.2
      }
    },
    series: [
      {
        name: "Total  ",
        data: chartData
      }
    ]
  }

  return (
    <>
      <div className="chartContainer">

        <div className="headerTitle">
          <p>{title}</p>
          <span>More</span>
        </div>
        
        <div className="numeric_Information">
          <p className="price">{middleTotal}</p>
          <p className='rate'>2%</p>
        </div>
        <Chart
          options={stat.options}
          series={stat.series}
          type={chartType}
          
          />
      </div>



     
    </>
  )
}
