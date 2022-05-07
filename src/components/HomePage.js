import { useState, useEffect } from "react";
import { Box, Container, Typography, Card, CardActions,CardContent,Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
// import { fetchItems, selectAllItems } from "../features/item/itemSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetItemsQuery } from "../slices/itemSlice";

export const HomePage = () => {
    // const [items, setItems] = useState({
    //     items: [],
    //     numItems: 0
    // })
    let navigate = useNavigate();

  const { data: items, error, isLoading } = useGetItemsQuery();
  
  return (
    <>
      <Container>
        <Typography
          sx={{ textDecoration: "underline", mb: 8 }}
          fontFamily={"Oxygen"}
          gutterBottom
          component="div"
          variant="h2"
        >
          Home Page
        </Typography>
      </Container>
      <Card sx={{ maxWidth: 300, ml: "10%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            You have {items.length} Items saved
          </Typography>

          <Typography variant="body1">
            <br />
            Do you want to see them or add more?
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/items`)} sx={{ mx: "auto" }} size="small">
            See your Items
          </Button>
        </CardActions>
      </Card>
    </>
    // { items }
  );
}
