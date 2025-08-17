import { getAllProducts } from "../../services/productServices";
import { getAllRecipes } from "../../services/recipesService";
import { getAllcarts } from "../../services/cartServices";
import { getAllPosts } from "../../services/postServices";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";
import BarChart from "../../components/charts/BarChart";
import DonutsChart from "../../components/charts/DonutsChart";
import { MdOutlineAttachMoney } from "react-icons/md";
import LineChart from "../../components/charts/LineChart";
import LineChartDummy from "../../components/charts/LineChartDummy";

import type { Cart } from "../../types/app";
import type { Recipe } from "../../types/app";
import type { Product } from "../../types/app";
import type { Post } from "../../types/app";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [carts, setcarts] = useState<Cart[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [topSelling, setTopSelling] = useState<any[]>([]);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();

      setProducts(res.products as Product[]);
      setTotalProducts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllcarts = async () => {
    try {
      const res = await getAllcarts();

      setcarts(res.carts as Cart[]);

      const sum: number = res.carts.reduce(
        (acc: number, cart: Cart) => acc + cart.total,
        0
      );

      const allProducts = res.carts.flatMap((cart: Cart) => cart.products);

      const topSellingProducts = allProducts
        .sort((a: Product, b: Product) => (b.quantity ?? 0) - (a.quantity ?? 0))
        .slice(0, 5);

      setTopSelling(topSellingProducts);

      setTotalCarts(sum);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      const res = await getAllRecipes();

      setRecipes(res.recipes as Recipe[]);
      setTotalRecipes(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPost = async () => {
    try {
      const res = await getAllPosts();

      setPosts(res.posts as Post[]);

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCarts = carts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="p-4 my-20">
        <h1 className="text-3xl font-bold mb-6">Home</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="col-span-1">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold text-soft-gray ">
                    Total Products
                  </p>
                  <p className="lg:text-4xl text-2xl font-bold mt-1">
                    {totalProducts}
                  </p>
                </div>
                <div className="bg-blue-400 p-3 rounded-full text-white">
                  <FaShoppingCart size={26} />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <p className="text-sm mt-4 text-green-500">
                  Increased By <span className="font-semibold">8.6%</span> ↑
                </p>

                <div className="w-[120px] md:w-[150px] lg:w-[120px] h-[100px]">
                  <LineChartDummy color="#66cdaa" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold text-soft-gray ">
                    Total Revenue
                  </p>
                  <p className="lg:text-4xl text-2xl font-bold mt-1">
                    $ {Math.round(totalCarts)}
                  </p>
                </div>
                <div className="bg-red-400 p-3 rounded-full text-white">
                  <MdOutlineAttachMoney size={26} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm mt-4 text-green-500">
                  Increased By <span className="font-semibold">17.6%</span> ↑
                </p>

                <div className="w-[120px] md:w-[150px] lg:w-[120px] h-[100px]">
                  <LineChartDummy color="#66cdaa" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:row-span-2">
            <div className="bg-white rounded-xl p-6 flex flex-col shadow-md h-full gap-4">
              <p className="text-xl  text-soft-gray font-semibold mb-5">
                Top-Selling Products
              </p>

              {topSelling.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-[50px] p-2 bg-gray-200 rounded-md"
                    />
                    <div>
                      <p className="text-md text-soft-gray ">{item.title}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-md font-bold">
                      $ {Math.round(item.price * item.quantity)}
                    </p>
                    <p className="text-md text-soft-gray">
                      {item.quantity} Sales
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 ">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold text-soft-gray ">
                    Total Recipes
                  </p>
                  <p className="lg:text-4xl text-2xl font-bold mt-1">
                    {totalRecipes}
                  </p>
                </div>
                <div className="bg-pink-400 p-3 rounded-full text-white">
                  <FaUtensils size={26} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm mt-4 text-green-500">
                  Increased By <span className="font-semibold">10.6%</span> ↑
                </p>

                <div className="w-[120px] md:w-[150px] lg:w-[120px] h-[100px]">
                  <LineChartDummy color="#66cdaa" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 ">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold text-soft-gray ">
                    Total Post
                  </p>
                  <p className="lg:text-4xl text-2xl font-bold mt-1">
                    {totalPosts}
                  </p>
                </div>
                <div className="bg-orange-400 p-3 rounded-full text-white">
                  <VscPreview size={26} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm mt-4 text-red-500">
                  Decreased By <span className="font-semibold">15.7%</span> ↓
                </p>

                <div className="w-[120px] md:w-[150px] lg:w-[120px] h-[100px]">
                  <LineChartDummy color="#ff7f7f" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <BarChart categoryCounts={categoryCounts} />
          </div>

          <div className="col-span-1">
            <div className="bg-gradient-to-br h-full from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between">
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png"
                  alt="Headphones"
                  className="w-28 h-28 object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Today's Sale</h2>

                <p className="text-green-400 font-semibold mb-1">
                  Up to 20% Off on{" "}
                  <span className="text-white font-medium">HeadPhones</span>
                </p>
                <p className="text-white mb-4">
                  Price: <span className="font-semibold">$9.99</span> &nbsp;
                  Discount: <span className="font-semibold">20%</span>
                </p>
              </div>

              {/* Tombol */}
              <button className="w-full bg-pink-500 hover:bg-pink-600 transition-colors duration-300 font-semibold py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xl font-semibold text-soft-gray ">Recipes</p>

                <div className="flex items-center border border-soft-gray px-4 py-2 rounded-md bg-soft-gray">
                  View All
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recipes.slice(0, 8).map((recipe: Recipe, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />

                    <div className="p-4">
                      <h2 className="lg:text-xl text-md font-semibold mb-2 text-gray-800 leading-relaxed line-clamp-1">
                        {recipe.name}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="lg:text-sm text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {recipe.cuisine}
                        </span>
                        <span className="lg:text-sm text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {recipe.difficulty}
                        </span>
                        <span className="lg:text-sm text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          {recipe.cookTimeMinutes} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between lg:text-sm text-xs text-gray-600">
                        <span>⭐ {recipe.rating}</span>
                        <span>{recipe.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:row-span-1">
            <DonutsChart products={products} />
          </div>

          <div className="lg:col-span-2 lg:row-span-2">
            <div className="bg-white rounded-xl p-6 flex flex-col shadow-md h-full">
              <div className="text-xl font-semibold mb-5 text-soft-gray">
                Carts
              </div>

              <div>
                <TableContainer className="w-full overflow-x-auto bg-soft-white rounded-lg shadow">
                  <Table className="min-w-[800px]" aria-label="products table">
                    <TableHead className="bg-soft-blue">
                      <TableRow>
                        <TableCell
                          sx={{ color: "#f8fafc", fontWeight: "bold" }}
                        >
                          ID Cart
                        </TableCell>
                        <TableCell
                          sx={{ color: "#f8fafc", fontWeight: "bold" }}
                        >
                          Total Product
                        </TableCell>
                        <TableCell
                          sx={{ color: "#f8fafc", fontWeight: "bold" }}
                        >
                          Total Price
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "#f8fafc", fontWeight: "bold" }}
                        >
                          Total Diskon
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "#f8fafc", fontWeight: "bold" }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {paginatedCarts.map((cart, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            className={
                              index % 2 === 0
                                ? "bg-soft-white"
                                : "bg-soft-gray/20"
                            }
                          >
                            <TableCell>{cart.id}</TableCell>
                            <TableCell>{cart.totalProducts}</TableCell>
                            <TableCell>${Math.round(cart.total)}</TableCell>
                            <TableCell sx={{ color: "red" }}>
                              -${Math.round(cart.discountedTotal)}
                            </TableCell>
                            <TableCell
                              sx={{ color: "green", fontWeight: "bold" }}
                            >
                              ${Math.round(cart.total - cart.discountedTotal)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={carts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-soft-white text-soft-blue [&_.MuiSelect-icon]:text-soft-blue"
                  />
                </TableContainer>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:row-span-1">
            <div className=" rounded-2xl shadow-md p-4 bg-white h-full">
              <p className="text-xl font-semibold  text-soft-gray mb-5 ">
                Top Recipes By rating
              </p>

              <LineChart color="#ff7f7f" type={true} recipes={recipes} />
            </div>
          </div>

          <div className="lg:col-span-3 lg:row-span-2">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xl font-semibold  text-soft-gray ">Post</p>

                <div className="flex items-center border border-soft-gray px-4 py-2 rounded-md bg-soft-gray">
                  View All
                </div>
              </div>

              <div className="grid gird-cols-1 lg:grid-cols-2 gap-4">
                {posts.slice(0, 4).map((items, index) => (
                  <div
                    key={index}
                    className="bg-white mx-auto shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="px-6 py-4">
                      <h2 className="lg:text-xl text-md font-bold text-gray-800 mb-2">
                        {items.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {items.tags[0]}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {items.tags[1]}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {items.tags[2]}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {items.body}
                      </p>
                    </div>

                    <div className="px-6 py-4 flex items-center justify-between text-gray-500 text-sm border-t">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <AiFillLike size={24} color="#ff7f7f" />
                          <span>{items.reactions?.likes || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <AiFillDislike size={24} />
                          <span>{items.reactions?.dislikes || 0}</span>
                        </span>
                      </div>
                      <span>Views: {items.views}</span>
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

export default Home;
