import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

interface Product {
  id: number;
  title: string;
  sku?: string;
  qty?: number;
  price: number;
  rating: number;
  status?: string;
}

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log(res);

      const mappedData: Product[] = res.products.map(
        (p: any, index: number) => ({
          id: p.id ?? index + 1, // pastikan ada id unik
          title: p.title,
          sku: p.sku ?? `SKU-${index + 1}`,
          qty: p.stock ?? 0,
          price: p.price,
          rating: p.rating,
          status: p.status ?? "Available",
        })
      );

      console.log(mappedData);

      // setProducts(res.products);

      setProducts(mappedData);
      setTotalProducts(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: GridColDef<Product>[] = [
    { field: "title", headerName: "Product", width: 150 },
    { field: "sku", headerName: "SKU", width: 150, editable: true },
    { field: "qty", headerName: "QTY", width: 150, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 150,
      editable: true,
    },
    { field: "status", headerName: "Status", width: 150, editable: true },
  ];

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

          <Box className="mt-4" sx={{ height: 400, width: "100%" }}>
            {/* <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            /> */}

            <DataGrid
              rows={products}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
            />
          </Box>
        </main>
      </div>
    </>
  );
};

export default Products;
