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
import {useGetCoursesQuery, useGetInstructorsQuery} from "../redux/apiSlice";

export const HomePage = () => {
    // const [items, setItems] = useState({
    //     items: [],
    //     numItems: 0
    // })
    let navigate = useNavigate();

    const { data: courses, error, isLoading } = useGetCoursesQuery();
    const { data: instructors, isLoading: loadingInstructors } = useGetInstructorsQuery();
    if (isLoading || loadingInstructors) return <CircularProgress size={200}/>
    if (!courses && !instructors) return <div>Missing items!</div>
  
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
        </Container>
          <Box sx={{display:'flex',justifyContent:'center',flexWrap:'wrap', alignText:'center', alignItems:'center'}}>
          <Card sx={{ maxWidth: 315 }}>
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
          <Card sx={{ maxWidth: 340, ml:'15%'}}>
              <CardContent>
                  <Typography variant="h5" gutterBottom>
                      You have {instructors.length} instructors saved
                  </Typography>
                  <Typography variant="body1">
                      <br />
                      Do you want to see?
                  </Typography>
              </CardContent>
              <CardActions>
                  <Button onClick={() => navigate(`/instructors`)} sx={{ mx: "auto" }} size="small">
                      See your Instructors
                  </Button>
              </CardActions>
          </Card>
          </Box>
    </>
    // { items }
  );
}
