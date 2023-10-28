import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { useContext } from 'react';
import { Context } from '../../ContextProvider';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: true,
    },
    title: {
      display: true,
      text: '% Performance',
    },
  },
};

  
export default function Pie() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;

  let labels = [...new Set(hotelData.map(item=>item[filter.depth.length==0?0:filter.depth[0]]))];

  let compute = ()=>{
    let data = []
    if (filter.inventory) //inventory mode 
    for(let i=0;i<labels.length;i++){
      let purchases = 0
      let sales = 0
      hotelData.forEach(row => {
        if(row[filter.depth.length==0?0:filter.depth[0]]==labels[i]){
          purchases+=row[1]
          sales+=row[3]
        }
      });
      data.push((purchases/sales * 100).toFixed(2))
    }
    else //sales mode
    for(let i=0;i<labels.length;i++){
      let targets = 0
      let actuals = 0
      hotelData.forEach(row => {
        if(row[filter.depth.length==0?0:filter.depth[0]]==labels[i]){
          targets+=row[4]
          actuals+=row[5]
        }
      });
      data.push((actuals/(targets==0?1:targets) * 100).toFixed(2))
    }
    return data
  }

  let data = {
    labels: labels,
    datasets: [
      {
        data: compute(),
        backgroundColor: ['#2563eb','#4338ca','#172554','#172554','#1d4ed8','#1d4ed8',],
        borderColor: ['#2563eb','#4338ca','#172554','#172554','#1d4ed8','#1d4ed8',],
      },
    ],
  };

  return (
      <PolarArea data={data} options={options} />
  );
}