import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getAllRecipes, getRecipesByTag } from "../../services/recipesService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ],
};

interface Recipe {
  id: number;
  title: string;
  description: string;
}

interface Props {
  tag: string;
}

const recipes = () => {
  const [recipesByTag, setRecipesByTag] = useState<any>([]);

  const fetchAllRecipes = async () => {
    try {
      const res = await getAllRecipes();
      console.log(res);

      setRecipesByTag(res.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataRecipesbyTags = async () => {
    setLoading(true);
    try {
      const data = await getRecipesByTag(tag);
      setRecipes(data);
    } catch (err) {
      setError("Gagal mengambil data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <>
      <div className="p-4 my-20">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>

        <Bar data={data} />

        {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center">
              Chart 1
            </div>
            <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center">
              Chart 2
            </div>
            <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center md:col-span-2">
              Chart 3
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center lg:row-span-2">
            Chart 4
          </div>
        </div> */}
      </div>
    </>
  );
};

export default recipes;
