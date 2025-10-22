import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Divider, IconButton, Grid } from "@mui/material";
import {
  CardMedia,
  Chip,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
} from "@mui/material";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

const CartModal = ({ open, handleClose }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (err) {
        console.error("Error parsing cart:", err);
      }
    }
  }, [open]);

  // Remove item
  const removeFromCart = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const handleIncrement = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item?.quantity + 1 } : item
    );
    // console.log(updated);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const handleDecrement = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item?.quantity - 1 } : item
    );
    // console.log(updated);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 600 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            maxHeight: "80vh", // limit modal height
            overflowY: "auto",
          }}
        >
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product) => (
              <Grid
                key={product.id}
                container
                spacing={2}
                sx={{ py: 3, bgcolor: "#f9f9f9" }}
              >
                {/* 1. Product Image */}
                <Grid item xs={12} sm={2} md={2}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      maxWidth: 140,
                      height: 140,
                      objectFit: "contain",
                      margin: "auto",
                    }}
                  />
                </Grid>

                {/* 2. Product Details & Actions */}
                <Grid item xs={12} sm={7} md={7}>
                  <Typography variant="body1" component="h2" gutterBottom>
                    {product.title?.substring(0, 50)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "success.main" }}>
                    In stock
                  </Typography>

                  {/* Fulfilled Chip */}
                  <Chip
                    label="Fulfilled"
                    size="small"
                    sx={{
                      bgcolor: "#EEEEEE",
                      color: "#565959",
                      mt: 0.5,
                      mb: 1,
                      fontWeight: 500,
                    }}
                  />

                  {/* Gift Options */}
                  <Box>
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label={
                        <Typography variant="body2">
                          This will be a gift{" "}
                          <Link
                            href="#"
                            underline="none"
                            sx={{ fontSize: "inherit" }}
                          >
                            Learn more
                          </Link>
                        </Typography>
                      }
                    />
                  </Box>

                  {/* Size Info */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    {/* <strong>Size:</strong> {product.size} */}
                  </Typography>

                  {/* Action Links & Quantity */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mt: 2 }}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    {/* Quantity Stepper */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      {product.quantity === 1 ? (
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(product.id)}
                          title="Decrease quantity"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => handleDecrement(product.id)}
                          title="Decrease quantity"
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                      )}

                      <Typography
                        sx={{ p: "0 12px", minWidth: 20, textAlign: "center" }}
                      >
                        {product.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleIncrement(product.id)}
                        title="Increase quantity"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Action Links */}
                    <Link
                      href="#"
                      underline="hover"
                      variant="body2"
                      sx={{ color: "#007185" }}
                      onClick={() => removeFromCart(product.id)}
                    >
                      Delete
                    </Link>
                  </Stack>
                </Grid>

                {/* 3. Price */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{ textAlign: { xs: "left", sm: "right" } }}
                >
                  <Typography variant="h6" component="p" fontWeight="bold">
                    ₹{product.price?.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Typography variant="h6" component="p">
              Subtotal ({cartItems.length} item):{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                ₹{total}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CartModal;
