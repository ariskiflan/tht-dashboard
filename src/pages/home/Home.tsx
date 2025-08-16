import { getAllProducts } from "../../services/productServices";
import { getAllRecipes } from "../../services/recipesService";
import { getAllcarts } from "../../services/cartServices";
import { getAllPosts } from "../../services/postServices";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import BarChart from "../../components/charts/BarChart";
import DonutsChart from "../../components/charts/DonutsChart";

interface Product {
  id: number;
  title: string;
  images: string[];
  category: string;
  sku?: string;
  stock?: number;
  price: number;
  rating: number;
  availabilityStatus?: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();

      console.log(res);

      setProducts(res.products);
      setTotalProducts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllcarts = async () => {
    try {
      const res = await getAllcarts();

      console.log(res);

      setCarts(res.carts);
      setTotalCarts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      const res = await getAllRecipes();

      console.log(res);

      setRecipes(res.recipes);
      setTotalRecipes(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPost = async () => {
    try {
      const res = await getAllPosts();

      console.log(res);

      setPosts(res.post);
      setTotalPosts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllRecipes();
    fetchAllcarts();
    fetchAllPost();
  }, []);

  const categoryCounts = products.reduce(
    (acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;

      return acc;
    },
    {}
  );

  const dataTotals = [
    {
      title: "Total Products",
      value: totalProducts,
      increase: 2.56,
      icon: <FaShoppingCart size={20} />,
      iconBg: "bg-blue-400",
      trend: "up",
    },
    {
      title: "Total Recipes",
      value: totalRecipes,
      increase: 0.34,
      icon: <FaUtensils size={20} />,
      iconBg: "bg-pink-400",
      trend: "up",
    },
    {
      title: "Total Carts",
      value: totalCarts,
      increase: 7.66,
      icon: <FaBoxOpen size={20} />,
      iconBg: "bg-red-400",
      trend: "up",
    },
    {
      title: "Total Post",
      value: totalPosts,
      increase: 0.74,
      icon: <VscPreview size={20} />,
      iconBg: "bg-orange-400",
      trend: "down",
    },
  ];

  return (
    <>
      <div className="p-4 my-20">
        <h1 className="text-3xl font-bold mb-6">Home</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {dataTotals.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-md text-soft-gray ">{item.title}</p>
                      <p className="text-2xl font-bold mt-1">{item.value}</p>
                    </div>
                    <div
                      className={`${item.iconBg} p-3 rounded-full text-white`}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <p
                    className={`text-sm mt-4 ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.trend === "up" ? "Increased By" : "Decreased By"}{" "}
                    <span className="font-semibold">{item.increase}%</span>{" "}
                    {item.trend === "up" ? "↑" : "↓"}
                  </p>
                </div>
              ))}
            </div>

            <div className="">
              <div className="grid grid-cols-1 gap-6">
                <div className=" ">
                  <BarChart categoryCounts={categoryCounts} />
                </div>

                <div className="  ">
                  <DonutsChart products={products} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-md p-4 bg-white">
            <p className="text-xl text-soft-gray font-semibold mb-5">Post</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
