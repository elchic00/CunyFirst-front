import {useState} from "react";
import {useAddNewInstructorMutation} from "../redux/services/apiSlice";
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {instructorSchema} from "../utils/InstructorSchema.js"

export const AddInstructor = ({onAddCourse}) => {
    const initialFormData = {
        firstname: "",
        lastname: "",
        department: "",
        imageUrl: '',
    }

    const [addInstructor, {isLoading: loadingAddPost}] = useAddNewInstructorMutation();

    const instructorFormik = useFormik({
        initialValues: initialFormData,
        validationSchema: instructorSchema,
        onSubmit: (values, {resetForm}) => {
            try {
                addInstructor(values).then(
                    (res) => {
                        if (res.error)
                            Swal.fire(
                                'Nope!',
                                "You did not add the instructor!",
                                'error'
                            )
                        else {
                            Swal.fire(
                                'Great!',
                                'You added the instructor!',
                                'success'
                            ).then(resetForm())
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

    return (
        <>
            <Fab onClick={handleClickOpenAddCourse} sx={{position: "fixed", bottom: 20, right: 30}} color="primary"
                 aria-label="add">
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCloseAddCourse}>
                <DialogTitle>Add New Instructor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter information for a new instructor.
                    </DialogContentText>
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
                            helperText={instructorFormik.touched.firstname && instructorFormik.errors.firstname}
                            error={instructorFormik.touched.firstname && Boolean(instructorFormik.errors.firstname)}
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
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
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