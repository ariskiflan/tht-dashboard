import _ChartJS from "../../config/chartConfig";
import { Line } from "react-chartjs-2";
import type { Recipe } from "../../types/app";

interface LineChartProps {
  color: string;
  type: boolean;
  recipes: Recipe[];
}

const LineChart = ({ color, type, recipes }: LineChartProps) => {
  const topRated = recipes.sort((a, b) => b.rating - a.rating).slice(0, 7);

  const labels = topRated.map((recipe) => recipe.name);
  const dataValues = topRated.map((recipe) => recipe.rating);

  const data = {
    labels,
    datasets: [
      {
        label: "Top Recipes By Rating",
        data: dataValues,
        fill: type,
        borderColor: color,
        pointBackgroundColor: color,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: type,
    plugins: {
      legend: {
        display: type,
      },
    },
    scales: {
      x: {
        display: false, // hilangkan axis X
        grid: {
          display: type, // hilangkan grid X
        },
      },
      y: {
        display: type, // hilangkan axis Y
        grid: {
          display: type, // hilangkan grid Y
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
