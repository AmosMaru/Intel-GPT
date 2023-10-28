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
import {line} from '../../display.json'

console.log(line);

let colours = ['#3e95cd','#ffff00','#ee0000','']
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
        text: line.title,
      },
    },
    scales: {
      y: {
        min:0,
      }
    },
  };


  let input = {
    labels:line.labels,
    datasets: line.labels.map((item,i) => {
      return({
        label: item,
        data: line.datasets[i],
        cubicInterpolationMode: "monotone",
        borderColor: colours[i],
      })
    }),
  };

  return(
        <Line options={options} data={input} />
  )
}
  