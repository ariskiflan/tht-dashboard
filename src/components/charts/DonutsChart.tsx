import { Doughnut } from "react-chartjs-2";
import _ChartJS from "../../config/chartConfig";
import type { Product } from "../../types/app";

interface DonutsChartProps {
  products: Product[];
}

const DonutsChart = ({ products }: DonutsChartProps) => {
  const categoryCounts = products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const labels = Object.keys(categoryCounts);
  const values = Object.values(categoryCounts);

  const data = {
    labels,
    datasets: [
      {
        label: "Product Proportion by Category",
        data: values,
        backgroundColor: [
          "#1e3a8a", // soft blue
          "#94a3b8", // soft gray
          "#38bdf8", // cyan
          "#facc15", // yellow
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="h-full rounded-2xl shadow-md p-4 bg-white flex flex-col">
        <p className="text-xl text-soft-gray font-semibold mb-5">
          Product Proportion by Category
        </p>
        <div className="flex-1 relative">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default DonutsChart;
