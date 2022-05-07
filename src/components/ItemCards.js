import { useState, useEffect } from "react";
import { Box, Container, Typography, Card, CardActions,CardContent,Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// import { fetchItems, selectAllItems } from "../features/item/itemSlice";

const selectAllItems= (state) => state.items.map((todo) => todo.id);

export const ItemCards = () => {
      let navigate = useNavigate();
      const dispatch = useDispatch();
      const getItems = useSelector(selectAllItems);
      // const itemStatus = useSelector((state) => state.items.status);

      // useEffect(() => {
      //   if (itemStatus === "idle") {
      //     dispatch(fetchItems());
      //   }
      //   // console.log(getItems.items)
      // }, [itemStatus, dispatch]);

  return (
    <>
    
      <Container>
        <Typography
          sx={{ textDecoration: "underline", mb: 5 }}
          fontFamily={"Oxygen"}
          gutterBottom
          component="div"
          variant="h3"
        >
          Items
        </Typography>
      </Container>
      { getItems.items ? (
        getItems.items.map((item) => (
          <Card sx={{ maxWidth: 300, ml: "10%", mb:3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {item.name}
              </Typography>

              <Typography variant="body1">
                <br />
                {item.category}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button onClick={() => navigate(`/items`)} sx={{ mx: "auto" }} size="small">
                See your Items
              </Button>
            </CardActions> */}
          </Card>
        ))) : ( <Skeleton variant="rectangular" width={500} height={118}/>)
      }
    </>
  );
};
