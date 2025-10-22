import React from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const Card = ({ data }: { data: any }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ width: 200 }}>
        <Typography gutterBottom sx={{ fontSize: 14 }}>
          {data.title}
        </Typography>
        <CardMedia
          sx={{ height: 194, width: 200 }}
          component="img"
          height="194"
          image={data.image}
          alt="Paella dish"
        />
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {data.description}
        </Typography>
        <Typography variant="body2">$ {data.price}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/product/${data.id}`}>Learn More</Link>
      </CardActions>
    </Box>
  );
};

export default Card;
