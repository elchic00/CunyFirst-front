import {useState} from "react";
import {useAddNewCourseMutation, useGetInstructorsQuery} from "../redux/services/apiSlice";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    MenuItem,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {courseSchema} from "../utils/CourseSchema.js"

export const AddCourse = ({refetchInstructors}) => {
    const initialFormData = {
        title: "",
        timeslot: "",
        location: "",
        instructorId: 0
    }


    const [addCourse, {isLoading: loadingAddPost}] = useAddNewCourseMutation();
    const {data: instructors, isFetching, isLoading, refetch} = useGetInstructorsQuery();

    const courseFormik = useFormik({
        initialValues: initialFormData,
        validationSchema: courseSchema,
        onSubmit: (values, {resetForm}) => {
            try {
                addCourse(values).then(
                    (res) => {
                        if (res.error){
                            console.log(res)
                            Swal.fire(
                                'Nope!',
                                "You did not add the course!",
                                'error'
                            )}
                        else {
                            Swal.fire(
                                'Great!',
                                'You added the course!',
                                'success'
                            ).then(resetForm()).then(refetchInstructors);
                        }
                    })
                handleCloseAddCourse()
            } catch (e) {
                console.log(e)
                handleCloseAddCourse()
            }
        },
    });


    const [open, setOpen] = useState(false);
    const handleClickOpenAddCourse = () => {
        setOpen(true);
    };

    const handleCloseAddCourse = () => {
        setOpen(false);
    };


    const instructorSelect = instructors !== undefined && instructors.map((instructor) => (
        <MenuItem key={instructor.id} value={instructor.id}>
            {instructor.firstname} {instructor.lastname}
        </MenuItem>
    ))

    return (
        <>
            <Fab onClick={handleClickOpenAddCourse} sx={{position: "fixed", bottom: 20, right: 30}} color="primary"
                 aria-label="add">
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCloseAddCourse}>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter information for a new course.
                    </DialogContentText>
                    <form component='form' onSubmit={courseFormik.handleSubmit}
                          style={{
                              padding: 10,
                              width: {xs: "auto", sm: "300px"},
                              display: "flex",
                              flexDirection: "column",
                              gap: 15,
                          }}>
                        <TextField
                            name="title"
                            label="Name"
                            value={courseFormik.values.title}
                            helperText={courseFormik.touched.title && courseFormik.errors.title}
                            error={courseFormik.touched.title && Boolean(courseFormik.errors.title)}
                            onChange={courseFormik.handleChange}
                        />
                        <TextField
                            name="timeslot"
                            label="Timeslot"
                            value={courseFormik.values.timeslot}
                            helperText={courseFormik.touched.timeslot && courseFormik.errors.timeslot}
                            error={courseFormik.touched.timeslot && Boolean(courseFormik.errors.timeslot)}
                            onChange={courseFormik.handleChange}
                        />

                        <TextField
                            name="location"
                            label="Location"
                            value={courseFormik.values.location}
                            helperText={courseFormik.touched.location && courseFormik.errors.location}
                            error={courseFormik.touched.location && Boolean(courseFormik.errors.location)}
                            onChange={courseFormik.handleChange}
                        />
                        <TextField
                            select
                            name="instructorId"
                            label="Instructor"
                            value={courseFormik.values.instructorId}
                            helperText={courseFormik.touched.instructorId && courseFormik.errors.instructorId}
                            error={courseFormik.touched.instructorId && Boolean(courseFormik.errors.instructorId)}
                            onChange={courseFormik.handleChange}
                        >
                            {instructorSelect}
                        </TextField>
                        <Box sx={{display: 'flex'}}>
                            <Button disabled={loadingAddPost} type="submit">
                                submit
                            </Button>
                            <Button onClick={handleCloseAddCourse}>Cancel</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}