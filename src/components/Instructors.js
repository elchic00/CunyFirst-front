import {useState} from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Dialog,
    IconButton,
    Typography
} from "@mui/material";
import {useDeleteInstructorMutation, useGetCoursesQuery, useGetInstructorsQuery} from "../redux/services/apiSlice";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddInstructor} from './AddInstructor'
import {UpdateInstructor} from "./UpdateInstructor";

export const Instructors = () => {
    const {data: instructors, isLoading, refetch: refetchInstructors} = useGetInstructorsQuery();
    const [deleteInstructor, {isLoading: loadingDeleteInstructor}] = useDeleteInstructorMutation();
    const {refetch: refetchCourses} = useGetCoursesQuery();

    const [open, setOpen] = useState(false);
    const [idToUpdate, setIDToUpdate] = useState(undefined);

    if (isLoading) return (<>
        <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
            Instructors loading...
        </Typography>
        <CircularProgress size={200}/> </>)

    if (!instructors) return (<>
        <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
            Instructors
        </Typography>
        <Typography sx={{ml: '2%'}} fontFamily={"Inconsolata"} gutterBottom component="div"
                    variant="h4">
            No instructors available. Add one now with the button on the bottom right.</Typography>
        <AddInstructor/></>)


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
                deleteInstructor(id).then(refetchInstructors()).then(refetchCourses())
                    .then(
                        Swal.fire(
                            'Deleted!',
                            'This instructor has been deleted.',
                            'success'
                        ))
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your instructor is safe.',
                    'info'
                )
            }
        })
    }

    function openUpdateInstructorForm(id) {
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
                    Instructors
                </Typography>
            </Container>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, ml: 1}}>
                {instructors.length > 0 && isLoading === false ? (
                    instructors.map((instructor, index) => (
                        <Card
                            sx={{
                                width: "300px",
                                borderRadius: 2,
                                height: "425px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            key={instructor.id}
                        >
                            <CardMedia
                                component="img"
                                height="210"
                                image={instructor.imageUrl}
                                alt="instructor-image"
                            />
                            <CardContent>
                                <Typography
                                    sx={{textDecoration: "underline"}}
                                    variant="h5"
                                    gutterBottom
                                    fontFamily={"Oxygen"}
                                >
                                    {instructor.firstname} {instructor.lastname}
                                </Typography>

                                <Typography variant="body1" fontFamily={"Oxygen"}>
                                    {/*{instructor.location}, {instructor.timeslot}*/}
                                    {instructor.department ? `${instructor.department} Department`:
                                        <>Edit instructor to assign a department.</>}
                                    <br/>
                                    {instructor.courses.length > 0 ? (
                                        `Courses: ${instructor.courses.map((course) => {
                                            return ` ${course.title}`;})} `) :
                                        (<>No courses available. <br/>
                                            Register a course with this instructor on the courses page.</>)}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{mt: "auto"}}>
                                <IconButton onClick={() => openUpdateInstructorForm(instructor.id)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton disabled={loadingDeleteInstructor}
                                            onClick={() => handleDeleteConfirmation(instructor.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Typography
                        sx={{ml: "2%"}}
                        fontFamily={"Inconsolata"}
                        gutterBottom
                        component="div"
                        variant="h4"
                    >
                        No instructors available. Add one now with the button on the bottom right.
                    </Typography>
                )}
            </Box>
            <AddInstructor/>
            <Dialog open={open} onClose={handleCloseUpdate}>
                <UpdateInstructor
                    id={idToUpdate}
                    refetchInstructors={refetchInstructors}
                    handleClose={handleCloseUpdate}
                />
            </Dialog>
        </>
    );
};
