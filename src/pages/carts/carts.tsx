import { useEffect, useState } from "react";
import { getAllcarts } from "../../services/cartServices";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import LineChartDummy from "../../components/charts/LineChartDummy";
import type { Cart } from "../../types/app";
import TableCarts from "../../components/TableCarts";

const carts = () => {
  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [totalSold, setTotalSold] = useState<number>(0);
  const [totalDiskon, setTotalDiskon] = useState<number>(0);

  const fetchAllCarts = async () => {
    try {
      const res = await getAllcarts();

      const sum: number = res.carts.reduce(
        (acc: number, cart: Cart) => acc + cart.total,
        0
      );

      const totalSold = res.carts.reduce(
        (acc: number, cart: Cart) => acc + cart.totalQuantity,
        0
      );

      const totalDiskon = res.carts.reduce(
        (acc: number, cart: Cart) => acc + (cart.total - cart.discountedTotal),
        0
      );

      setTotalDiskon(totalDiskon);
      setTotalSold(totalSold);

      setTotalCarts(sum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCarts();
  });

  return (
    <>
      <div className="p-4 my-20">
        <h1 className="text-3xl font-bold mb-6">Carts</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] mt-6">
          <div className="col-span-1">
            <div className="bg-gradient-to-r h-full from-blue-500 to-blue-700 rounded-2xl shadow-lg p-6 flex items-center justify-between text-white">
              <div>
                <h2 className="text-lg font-semibold">Total Products Sold</h2>
                <p className="text-3xl font-bold mt-2">
                  {totalSold.toLocaleString()}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  From {carts.length} transactions
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <FaShoppingCart size={36} />
              </div>
            </div>
          </div>
          <div className=" lg:col-span-2 col-span-1">
            <div className="bg-gradient-to-r h-full from-rose-500 to-pink-600 text-white shadow-xl rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Total Discount Price</h2>
                <p className="text-3xl font-bold mt-2">
                  ${totalDiskon.toFixed(2)}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  Accumulated from all carts
                </p>
              </div>
              <BiSolidDiscount size={100} />
            </div>
          </div>

          <div className="lg:col-span-1 col-span-1">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-md h-full gap-5">
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

              <div className="flex-1">
                <LineChartDummy color="#66cdaa" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1">
            <TableCarts numberRows={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default carts;
