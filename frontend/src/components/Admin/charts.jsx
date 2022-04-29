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
        curve: 'straight',
        width: 2
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
      <div className="info">
        <p>{title}</p>
        <a href="#">view report</a>
      </div>
        <div className="left">
        </div>
      <div className="info">
        <p className="price">{middleTotal}</p>
        <p>2%</p>
      </div>
      <Chart
        options={stat.options}
        series={stat.series}

        type={chartType}/>
    </>
  )
}
