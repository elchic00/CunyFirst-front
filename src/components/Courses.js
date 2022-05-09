import {useState, useEffect} from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Skeleton,
    IconButton, Dialog, CircularProgress
} from "@mui/material";
import {
    useDeleteCourseMutation,
    useGetCoursesQuery
} from "../redux/apiSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {AddCourse} from "./addCourse";
import {UpdateCourse} from "./updateCourse";
import axios from "axios";


export const Courses = () => {
    const {data: courses, isFetching, isLoading, error, refetch} = useGetCoursesQuery();
    const [deleteCourse, {isLoading: loadingDeleteCourse}] = useDeleteCourseMutation();
    const [open, setOpen] = useState(false);
    const [idToUpdate, setIDToUpdate] = useState(0);

    if (isLoading) return (<>
        <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
            Courses
        </Typography>
        <CircularProgress size={200}/> </>)
    if (!courses) return <Typography sx={{ml: '2%'}} fontFamily={"Inconsolata"} gutterBottom component="div"
                                     variant="h4">
        No courses available. Add one now with the button on the bottom right.</Typography>


    const handleClickOpenUpdate = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    async function handleDeleteConfirmation(id) {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCourse(id).then(refetch())
                    .then(
                        Swal.fire(
                            'Deleted!',
                            'This course has been deleted.',
                            'success'
                        ))
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your course is safe.',
                    'error'
                )
            }
        })
    }

    function updateCourse(id) {
        setIDToUpdate(id)
        handleClickOpenUpdate()
    }

    return (
        <>
            <Container>
                <Typography
                    sx={{ /*textDecoration: "underline",*/ mb: 5}}
                    fontFamily={"Oxygen"}
                    gutterBottom
                    component="div"
                    variant="h2"
                >
                    Courses
                </Typography>
            </Container>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, ml: 1}}>
                {(courses.length !== 0 && isLoading === false) ? (
                    courses.map((course, index) => (
                        <Card
                            sx={{
                                width: {xs: "auto", sm: "250px"},
                                borderRadius: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            key={course.id}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom fontFamily={"Oxygen"}>
                                    {course.title}
                                </Typography>

                                <Typography variant="body1" fontFamily={"Oxygen"}>
                                    by {course.instructor.firstname} {course.instructor.lastname}
                                    <br/>
                                    {course.location}, {course.timeslot}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => updateCourse(course.id)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    disabled={loadingDeleteCourse}
                                    onClick={() => handleDeleteConfirmation(course.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))
                ) : (<Typography
                        sx={{ml: '2%'}}
                        fontFamily={"Inconsolata"}
                        gutterBottom
                        component="div"
                        variant="h4"
                    >
                        No courses available. Add one now with the button on the bottom right.
                    </Typography>
                )}
            </Box>

            <AddCourse/>

            <Dialog open={open} onClose={handleClose}>
                <UpdateCourse id={idToUpdate} refetchCourses={refetch} handleClose={handleClose}/>
            </Dialog>

        </>
    );
};
