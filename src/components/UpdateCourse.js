import {useGetCourseByIDQuery, useGetInstructorsQuery, useUpdateCourseMutation} from "../redux/services/apiSlice";
import {
    Box,
    Button,
    CircularProgress,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {courseSchema} from "../utils/CourseSchema.js"


const UpdateCourseForm = ({handleClose, id, refetchInstructors, courseByID}) => {
    const {
        data: instructors,
    } = useGetInstructorsQuery();

    const [updateCourse] = useUpdateCourseMutation();

    const instructorSelect = instructors.map((instructor) => (
        <MenuItem key={instructor.id} value={instructor.id}>
            {instructor.firstname} {instructor.lastname}
        </MenuItem>
    ))

    const courseFormik = useFormik({
        initialValues: courseByID,
        validationSchema: courseSchema,
        onSubmit: (values) => {
            try {
                updateCourse({id, ...values})
                    .then(
                        (res) => {
                            if (res.error)
                                Swal.fire(
                                    'Nope!',
                                    "You did not update the course!",
                                    'error'
                                )
                            else {
                                Swal.fire(
                                    'Great!',
                                    'You updated the course!',
                                    'success'
                                ).then(refetchInstructors())
                            }
                        })
                    .then(handleClose())
            } catch (e) {
                console.log(e)
                handleClose()
            }
        },
    });

    return (
        <form
            onSubmit={courseFormik.handleSubmit}
            style={{
                padding: 10,
                width: {xs: "auto", sm: "300px"},
                display: "flex",
                flexDirection: "column",
                gap: 15,
            }}
        >
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
                helperText={
                    courseFormik.touched.instructorId && courseFormik.errors.instructorId
                }
                error={
                    courseFormik.touched.instructorId && Boolean(courseFormik.errors.instructorId)
                }
                onChange={courseFormik.handleChange}
            >
                {instructorSelect}
            </TextField>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button type="submit">submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </form>
    );
}


export const UpdateCourse = ({id, handleClose, refetchInstructors}) => {
    const {data: courseByID, isLoading: loadingCourse} = useGetCourseByIDQuery(id);

    if (loadingCourse) return (<CircularProgress size={150}/>)
    return (
        <>
            <DialogTitle>Update Course</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the information to this course.
                </DialogContentText>
                <UpdateCourseForm handleClose={handleClose} id={id} courseByID={courseByID}
                                  refetchInstructors={refetchInstructors}/>
            </DialogContent>
        </>
    )
}