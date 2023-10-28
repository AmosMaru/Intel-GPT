import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useContext } from 'react';
import { Context } from '../../ContextProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

import {donut} from '../../display.json'


export default function Donut() {
  let { Data } = useContext(Context);

  let options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Display the legend (labels) at the bottom
      },
      title: {
        display: true,
        text: donut.title,
      },
    },
  };

  let data = {
    labels: donut.labels,
    datasets: [
      {
        data: donut.datasets,
        backgroundColor: ['#1d4ed8','#ffff00','#ee0000'],
        borderColor: ['#3e95cd','#2e1065','#042f2e'],
        borderWidth: 1,
      },
    ],
  };

  return (
      <Doughnut data={data} options={options} />
  )
}