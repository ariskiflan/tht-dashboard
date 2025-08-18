import { Bar } from "react-chartjs-2";
import _ChartJS from "../../config/chartConfig";
import type { Product } from "../../types/app";

interface ChildChartProps {
  products: Product[];
}

const BarChart = ({ products }: ChildChartProps) => {
  const categoryCounts = products.reduce(
    (acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;

      return acc;
    },
    {}
  );

  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(153, 102, 255, 0.6)",
  ];

  const borderColors = colors.map((c) => c.replace("0.6", "1")); // versi border

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Total Products by Category",
        data: Object.values(categoryCounts),
        backgroundColor: colors,
        borderColor: Object.keys(categoryCounts).map(
          (_, idx) => borderColors[idx % borderColors.length]
        ),
        borderWidth: 1,
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
          Total Products by Category
        </p>
        <div className="flex-1 relative">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default BarChart;
