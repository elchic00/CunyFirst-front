import { useState, useEffect } from "react";
import {
    useAddNewCourseMutation,
    useAddNewInstructorMutation,
    useGetCoursesQuery,
    useGetInstructorsQuery
} from "../redux/apiSlice";
import {
    Box,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab, MenuItem, Select, Skeleton,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {Formik, getIn, useFormik} from "formik";
import Swal from "sweetalert2";
import {instructorSchema} from "../utils/InstructorSchema.js"

export const AddInstructor = ({onAddCourse}) => {
    const initialFormData = {
        firstname: "",
        lastname: "",
        department: "",
        imageUrl: '',
    }
    const instructorFormik = useFormik({
        initialValues: initialFormData,
        validationSchema: instructorSchema,
        onSubmit: (values, {resetForm}) => {
            try {
                addInstructor(values).then(
                    Swal.fire(
                        'Great!',
                        'You added the course!',
                        'success'
                    )).then(resetForm() );
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

    const [addInstructor, { isLoading: loadingAddPost }] = useAddNewInstructorMutation();

    // if (cou === undefined) return(console.log(courseByID, loadingCourse ),<CircularProgress size={150}/>)


    const { data: courses,  isFetching, isLoading, refetch } = useGetCoursesQuery();

    const instructorSelect = courses !== undefined && courses.map((instructor)=>(
        <MenuItem key={instructor.id} value={instructor.id}>
            {instructor.firstname} {instructor.lastname}
        </MenuItem>
    ))

    return(
        <>
            <Fab onClick={handleClickOpenAddCourse}  sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCloseAddCourse}>
                <DialogTitle>Add New Instructor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter information for a new instructor.
                    </DialogContentText>
                    <form component='form' onSubmit={instructorFormik.handleSubmit}
                          style={{
                              padding: 10,
                              width: { xs: "auto", sm: "300px" },
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
                        {/*<Button onClick={handleCloseAddCourse}>Cancel</Button>*/}
                        <Button disabled={loadingAddPost}  type="submit">
                            submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}