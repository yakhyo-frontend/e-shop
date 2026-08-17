import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Categories from "./components/Category";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/layout/dashboard");
    else navigate("/login");
  }, [accessToken]);

  return (
    <div>
      <Toaster />

      <Routes>
        {accessToken ? (
          <Route path="/layout" element={<Layout />}>
            <Route path="/layout/dashboard" element={<Dashboard />} />
            <Route path="/layout/category" element={<Categories />} />
            <Route path="/layout/products" element={<Products />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
