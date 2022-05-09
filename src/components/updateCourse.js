import {useEditCourseMutation, useGetCourseByIDQuery, useGetInstructorsQuery} from "../redux/apiSlice";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem, Skeleton,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {courseSchema} from "../utils/CourseSchema.js"
import axios from "axios";


const UpdateForm = ({handleClose, id, refetchCourses}) => {
    const {data: courseByID, isFetching, refetch: refetchByID, isLoading: loadingCourse} = useGetCourseByIDQuery(id);

    const {
        data: instructors,
        isFetching: isFetchingInstructor,
        isLoading: loadingInstructors,
        refetch
    } = useGetInstructorsQuery();
    const [updateCourse, {isLoading}] = useEditCourseMutation();

    const instructorSelect = instructors.map((instructor) => (
        <MenuItem key={instructor.id} value={instructor.id}>
            {instructor.firstname} {instructor.lastname}
        </MenuItem>
    ))

    const initialFormData = {
        title: courseByID.title,
        timeslot: courseByID.timeslot,
        location: courseByID.location,
        instructorId: courseByID.instructor.id
    }

    const courseFormik = useFormik({
        initialValues: initialFormData,
        validationSchema: courseSchema,
        onSubmit: (values) => {
            try {
                // I couldn't figure out why RTK query was not working here for the PUT, so I used axios instead
                // and manually refetched with redux.
                axios.put(`api/courses/${id}`, values)
                    .then(
                        (refetchCourses())).then(
                    (res) => {
                        if (res.statusText === 'Created')
                            Swal.fire(
                                'Great!',
                                'You updated the course!',
                                'success'
                            )
                        else
                            Swal.fire(
                                'Nope!',
                                "You did not update the course!",
                                'error'
                            )
                    }).then(handleClose())
            } catch (e) {
                console.log(e)
                handleClose()
            }
        },
    });

    return (
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
            {/*<Button onClick={handleClose}>Cancel</Button>*/}
            <Button type="submit">
                submit
            </Button>
        </form>
    )
}


export const UpdateCourse = ({id, handleClose, refetchCourses}) => {
    const {data: courseByID, isFetching, refetch: refetchByID, isLoading: loadingCourse} = useGetCourseByIDQuery(id);
    const {
        data: instructors,
        isFetching: isFetchingInstructor,
        isLoading: loadingInstructors,
        refetch
    } = useGetInstructorsQuery();
    if (loadingCourse) return (<CircularProgress size={150}/>)
    return (
        <>
            <DialogTitle>Update Course</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the information to this course.
                </DialogContentText>
                <UpdateForm handleClose={handleClose} id={id} refetchCourses={refetchCourses}/>
            </DialogContent>
        </>
    )
}