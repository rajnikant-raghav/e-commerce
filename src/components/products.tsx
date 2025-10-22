import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../app/productsSlice";
import Card from "./Card";

const Products = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.products);
  // console.log(data);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {data.map((value: any) => {
        return <Card data={value} />;
      })}
      <Card data={data} />
    </Box>
  );
};

export default Products;
