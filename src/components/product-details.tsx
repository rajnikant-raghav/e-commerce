import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Grid from "@mui/material/Grid";
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Paper,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/productsSlice";
interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState<product | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      //   console.log(data);
      setProductDetails(data);
    };
    fetchProduct();
  }, [id]);
  //   console.log(productDetails);
  if (!productDetails) return <Typography>Loading...</Typography>;
  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: "900px",
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={productDetails.image}
              alt={productDetails.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 2,
                objectFit: "contain",
                backgroundColor: "#fff",
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {productDetails.title}
            </Typography>

            <Chip
              label={productDetails.category}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" color="primary.main" gutterBottom>
              ${productDetails.price.toFixed(2)}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating
                value={productDetails.rating?.rate || 0}
                precision={0.1}
                readOnly
              />
              <Typography variant="body2" color="text.secondary">
                ({productDetails.rating?.count} reviews)
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {productDetails.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ textTransform: "none", borderRadius: 2 }}
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                  let doesExits = false;
                  const updatedCart = cart.map((product:any)=>{
                    if(product.id === productDetails.id){
                      doesExits = true;
                      return {...product, quantity: product.quantity + 1};
                    }
                    return product;
                  })
                  if(!doesExits){
                    updatedCart.push({...productDetails, quantity: 1});
                  }
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  console.log(updatedCart);
                //   const product = { ...productDetails, quantity: 1 };
                //   const updated = [...cart, productDetails];
                //   console.log(updated);
                //   localStorage.setItem("cart", JSON.stringify(updated));
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
