import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
// import { fetchItems, selectAllItems } from "../features/item/itemSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetCoursesQuery } from "../redux/apiSlice";

export const HomePage = () => {
    // const [items, setItems] = useState({
    //     items: [],
    //     numItems: 0
    // })
    let navigate = useNavigate();

    const { data: courses, error, isLoading } = useGetCoursesQuery();
    if (isLoading) return <CircularProgress size={200}/>
    if (!courses) return <div>Missing items!</div>
  
  return (
      <><Container>
          <Typography
            sx={{  mb: 8 }}
            fontFamily={"Oxygen"}
            gutterBottom
            component="div"
            variant="h2"
          >
            Home Page
          </Typography>
        </Container><Card sx={{ maxWidth: 315, ml: "10%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                You have {courses.length} courses saved
              </Typography>

              <Typography variant="body1">
                <br />
                Do you want to see?
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate(`/courses`)} sx={{ mx: "auto" }} size="small">
                See your Courses
              </Button>
            </CardActions>
          </Card>
    </>
    // { items }
  );
}
