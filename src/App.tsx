import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Product from "./pages/products/Product";
import Carts from "./pages/carts/carts";
import Recipes from "./pages/recipes/recipes";
import Layout from "./layouts/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/recipes" element={<Recipes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
