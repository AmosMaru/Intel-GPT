import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { Context } from '../../ContextProvider';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import {bar} from '../../display.json'

let colours = ['#3e95cd','#ffff00','#ee0000','']
export default function Bur() {
  let { Data } = useContext(Context);

  let labels = []
  
  let options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: bar.title,
      },
    },
  };

  let input = {
    labels: bar.labels,
    datasets: bar.labels.map((item,i) => {
      return({
        label: item,
        data: bar.datasets[i],
        backgroundColor: colours[i],
      })
    }
    )
  };

  return <Bar options={options} data={input} />;
}