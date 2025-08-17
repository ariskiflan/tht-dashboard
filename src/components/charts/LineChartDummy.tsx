import _ChartJS from "../../config/chartConfig";
import { Line } from "react-chartjs-2";

// label dummy

interface LineChartProps {
  color: string;
}

const LineChartDummy = ({ color }: LineChartProps) => {
  const labels = ["jan", "feb", "mar", "apr", "may", "jun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Top Recipes By Rating",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: color,
        pointBackgroundColor: color,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true, // membuat chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // hilangkan legend
      },
    },
    scales: {
      x: {
        display: false, // hilangkan axis X
        grid: {
          display: false, // hilangkan grid X
        },
      },
      y: {
        display: false, // hilangkan axis Y
        grid: {
          display: false, // hilangkan grid Y
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartDummy;
