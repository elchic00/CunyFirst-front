import {useState} from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Dialog,
    IconButton,
    Typography
} from "@mui/material";
import {useDeleteCourseMutation, useGetCoursesQuery, useGetInstructorsQuery} from "../redux/services/apiSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {AddCourse} from "./AddCourse";
import {UpdateCourse} from "./UpdateCourse";


export const Courses = () => {
    const {data: courses, isFetching, isLoading, error, refetch: refetchCourses} = useGetCoursesQuery();
    const [deleteCourse, {isLoading: loadingDeleteCourse}] = useDeleteCourseMutation();
    const {refetch: refetchInstructors} = useGetInstructorsQuery();
    const [open, setOpen] = useState(false);
    const [idToUpdate, setIDToUpdate] = useState(0);

    if (isLoading) return (<>
        <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
            Courses loading...
        </Typography>
        <CircularProgress size={200}/> </>)

    if (!courses) return (<>
        <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
            Courses
        </Typography>
        <Typography sx={{ml: '2%'}} fontFamily={"Inconsolata"} gutterBottom component="div"
                    variant="h4">
            No courses available. Add one now with the button on the bottom right.</Typography>
        <AddCourse refetchInstructors={refetchInstructors}/>
    </>)


    const handleClickOpenUpdate = () => {
        setOpen(true);
    };
    const handleCloseUpdate = () => {
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
                deleteCourse(id).then(refetchCourses()).then(refetchInstructors)
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
                                width: {xs: "auto", sm: "300px"},
                                borderRadius: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            key={course.id}
                        >
                            <CardContent>
                                <Typography sx={{textDecoration: 'underline'}} variant="h5" gutterBottom
                                            fontFamily={"Oxygen"}>
                                    {course.title}
                                </Typography>

                                <Typography variant="body1" fontFamily={"Oxygen"}>
                                    Time: {course.timeslot}
                                    <br/>
                                    {course.location ? `Location: ${course.location}` :
                                        <>Update this course to chose a location.</>}
                                    <br/>
                                    {course.instructor ? `Instructor: ${course.instructor.firstname} ${course.instructor.lastname}` :
                                        <>No instructor assigned to this course. <br/>
                                            Edit this course to assign one.</>}
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
                ) : (<Typography sx={{ml: '2%'}} fontFamily={"Inconsolata"} gutterBottom component="div" variant="h4">
                    No courses available. Add one now with the button on the bottom right.
                </Typography>)
                }
            </Box>
            <AddCourse refetchInstructors={refetchInstructors}/>
            <Dialog open={open} onClose={handleCloseUpdate}>
                <UpdateCourse id={idToUpdate} refetchInstructors={refetchInstructors} handleClose={handleCloseUpdate}/>
            </Dialog>

        </>
    );
};
