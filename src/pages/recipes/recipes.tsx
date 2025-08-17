import { useEffect, useState } from "react";
import { getAllRecipes, getAllTags } from "../../services/recipesService";
import { FaUtensils } from "react-icons/fa";
import LineChartDummy from "../../components/charts/LineChartDummy";

interface Recipe {
  id: number;
  name: string;
  image?: string;
  tags: string[];
  mealType: string[];
}

const recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  const fetchAllRecipes = async () => {
    try {
      const res = await getAllRecipes();

      setRecipes(res.recipes as Recipe[]);
      setTotalRecipes(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllTags = async () => {
    try {
      const res = await getAllTags();

      setTags(res as string[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
    fetchAllTags();
  }, []);

  return (
    <>
      <div className="p-4 my-20">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] mt-6">
          <div className="">
            <div className="bg-gradient-to-r  from-blue-500 to-blue-700 rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-md font-semibold text-white ">
                    Total Recipes
                  </p>
                  <p className="text-4xl font-bold mt-1 text-white">
                    {totalRecipes}
                  </p>
                </div>
                <div className="bg-pink-400 p-3 rounded-full text-white">
                  <FaUtensils size={26} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm mt-4 text-white">
                  Increased By <span className="font-semibold">10.6%</span> ↑
                </p>

                <div className="w-[120px] md:w-[150px] lg:w-[120px] h-[100px]">
                  <LineChartDummy color="#66cdaa" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xl font-semibold text-soft-gray ">
                  Popular Categories
                </p>

                <div className="flex items-center border border-soft-gray px-4 py-2 rounded-md bg-soft-gray">
                  View All
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {tags.slice(0, 15).map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium rounded-full 
                       bg-soft-blue/10 text-soft-blue hover:bg-soft-blue hover:text-white 
                       transition-colors duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className=" space-y-6">
                <div className="bg-soft-blue text-white lg:p-6 p-2 rounded-2xl shadow-md flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recipes Overview</h2>

                  <div className="flex items-center border border-white lg:px-4 px-2 py-2 rounded-md bg-transparent text-md ">
                    View All
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                  {recipes.slice(0, 12).map((recipe, index) => (
                    <div
                      key={index}
                      className="bg-soft-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="h-40 w-full overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-5">
                        {/* Nama Recipe */}
                        <h3 className="text-lg font-bold text-soft-blue mb-3">
                          {recipe.name}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {recipe.tags.map((items: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs font-medium rounded-full 
                               bg-soft-blue/10 text-soft-blue 
                               hover:bg-soft-blue hover:text-white 
                               transition-colors cursor-pointer"
                            >
                              {items}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white rounded-xl p-6  flex flex-col shadow-md h-full">
              <h2 className="text-xl font-semibold text-soft-gray mb-5">
                Recipes by Meal
              </h2>

              <div className="relative border-l-2 border-soft-blue/30 pl-6 space-y-6">
                {recipes.slice(0, 11).map((recipe, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-[11px] top-1 w-5 h-5 bg-soft-blue rounded-full border-2 border-white"></span>

                    <div className="bg-white shadow-sm p-5 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-gray-800">
                        {recipe.name}
                      </h3>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {recipe.mealType.map((meal: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-soft-blue/10 text-soft-blue font-medium"
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default recipes;
