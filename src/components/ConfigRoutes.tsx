import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./products";
import Header from "./Header";
import ProductDetails from "./product-details";

const ConfigRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigRoutes;
