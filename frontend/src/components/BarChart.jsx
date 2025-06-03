// components/BarChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({titleText, labels, dtLabel, dtData, bgColor}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: dtLabel,
        data: dtData,
        backgroundColor: bgColor,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
