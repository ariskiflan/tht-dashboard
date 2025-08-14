import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Product from "./pages/products/Product";
import Carts from "./pages/carts/carts";
import Recipes from "./pages/recipes/recipes";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="lg:flex h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
