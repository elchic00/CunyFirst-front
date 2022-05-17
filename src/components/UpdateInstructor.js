import {useGetInstructorByIDQuery, useUpdateInstructorMutation} from "../redux/services/apiSlice";
import {Box, Button, CircularProgress, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {instructorSchema} from "../utils/InstructorSchema.js"


const UpdateInstructorForm = ({handleClose, instructorByID, id}) => {
    const [updateInstructor, {isLoading}] = useUpdateInstructorMutation();

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
                                    "You did not update the instructor!",
                                    'error'
                                )
                            else
                                Swal.fire(
                                    'Great!',
                                    'You updated the instructor!',
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
        <form
            onSubmit={instructorFormik.handleSubmit}
            style={{
                padding: 10,
                width: {xs: "auto", sm: "300px"},
                display: "flex",
                flexDirection: "column",
                gap: 15,
            }}
        >
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
                helperText={
                    instructorFormik.touched.lastname && instructorFormik.errors.lastname
                }
                error={
                    instructorFormik.touched.lastname && Boolean(instructorFormik.errors.lastname)
                }
                onChange={instructorFormik.handleChange}
            />
            <TextField
                name="department"
                label="Department"
                value={instructorFormik.values.department}
                helperText={
                    instructorFormik.touched.department && instructorFormik.errors.department
                }
                error={
                    instructorFormik.touched.department &&
                    Boolean(instructorFormik.errors.department)
                }
                onChange={instructorFormik.handleChange}
            />
            <TextField
                name="imageUrl"
                label="Image URL"
                value={instructorFormik.values.imageUrl}
                helperText={
                    instructorFormik.touched.imageUrl && instructorFormik.errors.imageUrl
                }
                error={
                    instructorFormik.touched.imageUrl && Boolean(instructorFormik.errors.imageUrl)
                }
                onChange={instructorFormik.handleChange}
            />
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button type="submit">submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </form>
    );
}


export const UpdateInstructor = ({id, handleClose}) => {
    const {
        data: instructorByID,
        isFetching,
        refetch: refetchByID,
        isLoading: loadingInstructor
    } = useGetInstructorByIDQuery(id);

    if (loadingInstructor) return (<CircularProgress size={150}/>)

    return (
        <>
            <DialogTitle>Update Instructor</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the information of this instructor.
                </DialogContentText>
                <UpdateInstructorForm handleClose={handleClose} id={id} instructorByID={instructorByID}/>
            </DialogContent>
        </>
    )
}