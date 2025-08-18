import { getAllcarts } from "../services/cartServices";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import type { Cart } from "../types/app";

interface NumberProps {
  numberRows: number;
}

const TableCarts = ({ numberRows }: NumberProps) => {
  const [carts, setcarts] = useState<Cart[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(numberRows);

  const fetchAllCarts = async () => {
    try {
      const res = await getAllcarts();

      setcarts(res.carts as Cart[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCarts();
  });

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
      <div className="bg-white shadow-md rounded-xl p-6 h-full">
        <div className="text-xl font-semibold mb-5 text-soft-gray">Carts</div>
        <div className="overflow-x-auto">
          <TableContainer className="w-full overflow-x-auto bg-soft-white rounded-lg shadow">
            <Table className="min-w-[800px]" aria-label="products table">
              <TableHead className="bg-soft-blue">
                <TableRow>
                  <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                    ID Cart
                  </TableCell>
                  <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                    Total Product
                  </TableCell>
                  <TableCell sx={{ color: "#f8fafc", fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#f8fafc", fontWeight: "bold" }}
                  >
                    Discount Price
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
                {paginatedCarts.map((cart: Cart, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      hover
                      className={
                        index % 2 === 0 ? "bg-soft-white" : "bg-soft-gray/20"
                      }
                    >
                      <TableCell>{cart.id}</TableCell>
                      <TableCell>{cart.totalProducts}</TableCell>
                      <TableCell>${Math.round(cart.total)}</TableCell>
                      <TableCell sx={{ color: "red" }}>
                        -${Math.round(cart.discountedTotal)}
                      </TableCell>
                      <TableCell sx={{ color: "green", fontWeight: "bold" }}>
                        ${Math.round(cart.total - cart.discountedTotal)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10]}
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
    </>
  );
};

export default TableCarts;
