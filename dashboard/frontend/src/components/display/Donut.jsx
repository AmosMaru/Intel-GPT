import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useContext } from 'react';
import { Context } from '../../ContextProvider';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Donut() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;

  let options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Display the legend (labels) at the bottom
      },
      title: {
        display: true,
        text: filter.inventory
        ?//inventory mode
        'Weekly Average Net Sales'
        ://sales mode
        'Weekly Average Sales',
      },
    },
  };

  let labels = [...new Set(hotelData.map(item=>item[filter.depth.length==0?0:filter.depth[0]]))];

  let compute = ()=>{
    let data = []
    for(let i=0;i<labels.length;i++){
      let sum = 0
      hotelData.forEach(row => {if(row[filter.depth.length==0?0:filter.depth[0]]==labels[i]) sum+=row[3]});
      data.push(sum/7)
    }
    return data
  }

  let data = {
    labels: labels,
    datasets: [
      {
        data: compute(),
        backgroundColor: ['#2563eb','#4338ca','#172554','#1d4ed8'],
        borderColor: ['#172554','#2e1065','#042f2e','#1d4ed8'],
        borderWidth: 1,
      },
    ],
  };

  return (
      <Doughnut data={data} options={options} />
  )
}