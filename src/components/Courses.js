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
    DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, IconButton, Grid
} from "@mui/material";
import { useNavigate } from "react-router";
// import { fetchItems, selectAllItems } from "../features/item/itemSlice";
import {useAddNewCourseMutation, useDeleteCourseMutation, useGetCoursesQuery} from "../redux/apiSlice";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";


export const Courses = () => {
    const initialData = {
        title: "",
        timeslot: "",
        location: "",
        instructorId: 1
    }

    const [formData, setFormData] = useState(initialData);
    const [isDisabled, setIsDisabled] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialData)
    };
      let navigate = useNavigate();
      const { data: courses,  isFetching, isLoading, refetch } = useGetCoursesQuery();

    async function handleChange(e) {
        const { name, value } = e.target
       setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const [addCourse, { isLoading: loadingAddPost }] = useAddNewCourseMutation();
    async function handleSubmit(e) {
        e.preventDefault();
        setIsDisabled(true);
        try {
            addCourse(formData).then(() => setFormData(initialData));
            handleClose()
            setIsDisabled(false);
        } catch (e) {
            console.log(e)
            handleClose()
            // sendNotification("Error trying to call the add location api", "error");
            setIsDisabled(false);
        }
    }
    const [deleteCourse, { isLoading: loadingDeleteCourse}] = useDeleteCourseMutation();
    function handleDeleteConfirmation(id) {
        deleteCourse(id).then(refetch());
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {courses ? (
        courses.map((course,index) => (

          <Card
              sx={{
              width: { xs: "auto", sm: "250px" },
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column"
          }}key={course.id}>

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
            <CardActions>
                <IconButton disabled={loadingDeleteCourse} onClick={()=>handleDeleteConfirmation(course.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Skeleton variant="rectangular" width={500} height={118} />
      )}
        </Box>
      <Fab onClick={handleClickOpen}  sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary" aria-label="add">
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
                <Button onClick={handleSubmit} disabled={loadingAddPost}  type="submit">
                    submit
                </Button>
            </DialogActions>
        </Dialog>
    </>
  );
};
