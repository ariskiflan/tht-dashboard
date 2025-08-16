import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import { getAllProducts, searchProducts } from "../../services/productServices";

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

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(""); // untuk sorting

  // ambil semua produk
  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.products);
    } catch (error) {
      console.log(error);
    }
  };

  // pisahkan logic search ke function tersendiri
  const fetchSearchData = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      fetchAllProducts();
      return;
    }
    setLoading(true);
    try {
      const data = await searchProducts(searchQuery);
      setProducts(data.products || []);
      setPage(0); // reset ke page pertama
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // load awal
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // search otomatis dengan debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchData(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // sorting
  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    let sorted = [...products];

    if (criteria === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (criteria === "rating-asc") {
      sorted.sort((a, b) => a.rating - b.rating);
    } else if (criteria === "rating-desc") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    setProducts(sorted);
    setPage(0);
  };

  // handle select checkbox
  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4 my-20">
      {/* Search Input */}
      <div className="my-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
        />

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      <TableContainer className="w-full overflow-x-auto bg-soft-white rounded-lg shadow">
        <Table className="min-w-[800px]" aria-label="products table">
          <TableHead className="bg-soft-blue">
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < products.length
                  }
                  checked={
                    products.length > 0 && selected.length === products.length
                  }
                  onChange={handleSelectAll}
                  sx={{ color: "#f8fafc", fontWeight: "bold" }}
                />
              </TableCell>
              <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                Product
              </TableCell>
              <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                SKU
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#f8fafc", fontWeight: "bold" }}
              >
                Qty
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#f8fafc", fontWeight: "bold" }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#f8fafc", fontWeight: "bold" }}
              >
                Rating
              </TableCell>
              <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product, idx) => (
              <TableRow
                key={product.id}
                className={idx % 2 === 0 ? "bg-soft-white" : "bg-soft-gray/20"}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(product.id)}
                    onChange={() => handleSelect(product.id)}
                    className="text-soft-blue [&.Mui-checked]:text-soft-blue"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-[50px] h-[50px] rounded-md object-cover"
                    />
                    {product.title}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.sku || "-"}</TableCell>
                <TableCell align="right">{product.stock || 0}</TableCell>
                <TableCell align="right" className="text-soft-blue font-bold">
                  ${product.price}
                </TableCell>
                <TableCell align="right">
                  <Rating
                    name={`rating-${product.id}`}
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <span
                    className={`
                text-white font-bold inline-block min-w-[80px] text-center px-2 py-1 rounded-md
                ${
                  product.availabilityStatus === "In Stock"
                    ? "bg-green-600"
                    : product.availabilityStatus === "Low Stock"
                      ? "bg-red-600"
                      : "bg-gray-500"
                }
              `}
                  >
                    {product.availabilityStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-soft-white text-soft-blue [&_.MuiSelect-icon]:text-soft-blue"
        />
      </TableContainer>
    </div>
  );
};

export default Product;
