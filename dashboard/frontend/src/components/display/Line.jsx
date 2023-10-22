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
  let { Data } = useContext(Context);
  let [data, setData] = Data;

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
        text: 'Line Chart'
      },
    },
    scales: {
      y: {
        min:0,
      }
    },
  };


let labels = [0,1,2,3,4,5,6,7,8,9,10]

  const input = {
    labels,
    datasets: [],
  };

  return(
        <Line options={options} data={input} />
  )
}
  