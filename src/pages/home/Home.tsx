import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      console.log(res);

      setProducts(res.products);
      setTotalProducts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        <main className="p-6 bg-soft-white flex-1">
          <h2 className="text-2xl font-bold text-soft-blue">Home</h2>

          <div className="flex flex-col rounded-2xl bg-soft-white p-6 shadow-md">
            <p>Total Products</p>
            <p className="font-semibold">{totalProducts}</p>
          </div>

          {/* <ul className="">
            {products.map((product, index) => (
              <li key={index}>{product.brand}</li>
            ))}
          </ul> */}
        </main>
      </div>
    </>
  );
};

export default Home;
