import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import { Context } from '../../ContextProvider';
import { getDatesOfWeek, getDaySuffix } from '../Calender';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let colours = ['#1d4ed8','#5b21b6','#3730a3','']
export default function Lyn() {
  let { Filters, HotelData } = useContext(Context);
  let [filter, setFilter] = Filters;
  let [hotelData, setHotelData] = HotelData;

  let options = {
    maintainAspectRatio: false,
    scaleBeginAtZero: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: filter.inventory
              ?//inventory mode
              'Net sales'
              ://sales mode
              'Total sales',
      },
    },
    scales: {
      y: {
        min:0,
      }
    },
  };


  let dates = getDatesOfWeek(filter.epoch);
  let labels = dates.map((date)=>{
    date = date.split('-');
    return `${date[1].slice(0,3)} ${date[2]}${getDaySuffix(date[2])}`
  })

  let compute = ()=>{
    let data = []
    let sum = (item)=>{//item==selection
      let totals = []
      for(let i=0;i<dates.length;i++){
        let total=0
        hotelData.forEach(row => {
          if(row[filter.depth[0]]==item && row[row.length-1]==dates[i]) total+=row[5]
        });
        totals.push(total)
      }
      console.log('Totals :: ',totals)
      return totals
    }
    let items = filter.depth.length==1?[...new Set(hotelData.map(item=>item[filter.depth[0]]))]:[filter.depth[1]];
    for(let i=0;i<items.length;i++){
      data.push(
        {
          label: items[i]==null?'All Hotels':items[i],
          data: sum(items[i]),
          cubicInterpolationMode: 'monotone',
          borderColor: colours[i],
        }
      );
    }
    return data
  }


const data = {
  labels,
  datasets: compute(),
};

  return(
        <Line options={options} data={data} />
  )
}
  