import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Skeleton,
    Fab,
    Dialog,
    DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl
} from "@mui/material";
import { useNavigate } from "react-router";
// import { fetchItems, selectAllItems } from "../features/item/itemSlice";
import { useGetCoursesQuery } from "../redux/apiSlice";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";


export const Courses = () => {
    const [formData, setFormData] = useState({
        title: "",
        timeslot: "",
        location: "",
        instructorId: 1,
    });
    const [isDisabled, setIsDisabled] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            title: "",
            timeslot: "",
            location: "",
            instructorId: 1})
    };
      let navigate = useNavigate();
      const { data: courses,  isFetching, isLoading, refetch } = useGetCoursesQuery();

    async function handleChange(e) {
        const { name, value } = e.target
       setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsDisabled(true);
        try {
            await axios.post('/api/courses', formData)
            handleClose()
            refetch()
            setIsDisabled(false);
        } catch (e) {
            console.log(e)
            handleClose()
            // sendNotification("Error trying to call the add location api", "error");
            setIsDisabled(false);
        }
    }

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
          Courses
        </Typography>
      </Container>
      {courses ? (
        courses.map((course) => (
          <Card sx={{ maxWidth: 300, ml: "10%", mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontFamily={"Oxygen"}>
                {course.title}
              </Typography>

              <Typography variant="body1" fontFamily={"Oxygen"}>
                by {course.instructor.firstname} {course.instructor.lastname}
                <br />
                {course.location}, {course.timeslot}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button onClick={() => navigate(`/items`)} sx={{ mx: "auto" }} size="small">
                See your Items
              </Button>
            </CardActions> */}
          </Card>
        ))
      ) : (
        <Skeleton variant="rectangular" width={500} height={118} />
      )}

      <Fab onClick={handleClickOpen} sx={{mt:'24%', ml:'82%',}} color="primary" aria-label="add">
        <AddIcon/>
      </Fab>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter information for a new course
                </DialogContentText>
                {/*<FormControl>*/}
                {/*    <form onSubmit={handleSubmit}>*/}
                        <TextField
                            sx={{
                                p: 1,
                                width: { xs: "auto", sm: "300px" },
                                display: "flex",
                                flexDirection: "column",
                            }}
                            name="title"
                            label="Title"
                            // helperText="Add your location nickname, H.Q., main, etc"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{
                                p: 1,
                                width: { xs: "auto", sm: "300px" },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                            name="timeslot"
                            label="Timeslot"
                            value={formData.timeslot}
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{
                                p: 1,
                                width: { xs: "auto", sm: "300px" },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                            name="location"
                            label="Location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        <TextField
                        sx={{
                            p: 1,
                            width: { xs: "auto", sm: "300px" },
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                        type='number'
                        name="instructorId"
                        label="Instructor"
                        value={formData.instructorId}
                        onChange={handleChange}
                    />
                {/*    </form>*/}
                {/*</FormControl>*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={isDisabled} type="submit">
                    submit
                </Button>
            </DialogActions>
        </Dialog>
    </>
  );
};
