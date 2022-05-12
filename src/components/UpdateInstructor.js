import {
    useGetInstructorByIDQuery, useGetCoursesQuery, useUpdateInstructorMutation
} from "../redux/services/apiSlice";
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
import {instructorSchema} from "../utils/InstructorSchema.js"
import axios from "axios";


const UpdateInstructorForm = ({handleClose, instructorByID, id}) => {
    // const {data: instructorByID, isFetching, refetch: refetchByID, isLoading: loadingCourse} = useGetInstructorByIDQuery(id);
    // const {
    //     data: courses,
    //     isFetching: isFetchingInstructor,
    //     isLoading: loadingInstructors,
    //     refetch
    // } = useGetCoursesQuery();

    const [updateInstructor, {isLoading}] = useUpdateInstructorMutation();

    // const courseSelect = courses.map((course) => (
    //     <MenuItem key={course.id} value={course.id}>
    //         {course.title}
    //     </MenuItem>
    // ))

    const instructorFormik = useFormik({
        initialValues: instructorByID,
        validationSchema: instructorSchema,
        onSubmit: (values) => {
            try {
                updateInstructor({id, ...values})
                    .then(
                        (res) => {
                            if (res.error)
                                Swal.fire(
                                    'Nope!',
                                    "You did not update the course!",
                                    'error'
                                )
                            else
                                Swal.fire(
                                    'Great!',
                                    'You updated the course!',
                                    'success'
                                )
                        })
                    .then(handleClose())
            } catch (e) {
                console.log(e)
                handleClose()
            }
        },
    });

    return (
        <form onSubmit={instructorFormik.handleSubmit}
              style={{
                  padding: 10,
                  width: {xs: "auto", sm: "300px"},
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
              }}>
            <TextField
                name="firstname"
                label="First Name"
                value={instructorFormik.values.firstname}
                // helperText={instructorFormik.touched.firstname && instructorFormik.errors.firstname}
                // error={instructorFormik.touched.firstname && Boolean(instructorFormik.errors.firstname)}
                onChange={instructorFormik.handleChange}
            />
            <TextField
                name="lastname"
                label="Last name"
                value={instructorFormik.values.lastname}
                helperText={instructorFormik.touched.lastname && instructorFormik.errors.lastname}
                error={instructorFormik.touched.lastname && Boolean(instructorFormik.errors.lastname)}
                onChange={instructorFormik.handleChange}
            />
            <TextField
                name="department"
                label="Department"
                value={instructorFormik.values.department}
                helperText={instructorFormik.touched.department && instructorFormik.errors.department}
                error={instructorFormik.touched.department && Boolean(instructorFormik.errors.department)}
                onChange={instructorFormik.handleChange}
            />
            <TextField
                name="imageUrl"
                label="Image URL"
                value={instructorFormik.values.imageUrl}
                helperText={instructorFormik.touched.imageUrl && instructorFormik.errors.imageUrl}
                error={instructorFormik.touched.imageUrl && Boolean(instructorFormik.errors.imageUrl)}
                onChange={instructorFormik.handleChange}
            />
            {/*<TextField*/}
            {/*    select*/}
            {/*    name="imageUrl"*/}
            {/*    label="Instructor"*/}
            {/*    value={courseFormik.values.instructorId}*/}
            {/*    helperText={courseFormik.touched.instructorId && courseFormik.errors.instructorId}*/}
            {/*    error={courseFormik.touched.instructorId && Boolean(courseFormik.errors.instructorId)}*/}
            {/*    onChange={courseFormik.handleChange}*/}
            {/*>*/}
            {/*    {courseSelect}*/}
            {/*</TextField>*/}
            {/*<Button onClick={handleClose}>Cancel</Button>*/}
            <Button type="submit">
                submit
            </Button>
        </form>
    )
}


export const UpdateInstructor = ({id, handleClose, refetchInstructors}) => {
    // const {isLoading: loadingInstructor} = useGetInstructorByIDQuery(id);
    const {data: instructorByID, isFetching, refetch: refetchByID, isLoading: loadingInstructor} = useGetInstructorByIDQuery(id);

    if (loadingInstructor) return (<CircularProgress size={150}/>)

    return (
        <>
            <DialogTitle>Update Instructor</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the information of this instructor.
                </DialogContentText>
                <UpdateInstructorForm handleClose={handleClose} id={id} instructorByID={instructorByID} />
            </DialogContent>
        </>
    )
}