import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Skeleton,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router";
import {useAddNewCourseMutation, useDeleteCourseMutation, useGetCoursesQuery} from "../redux/apiSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {AddCourse} from "./addCourse";

export const Courses = () => {
      let navigate = useNavigate();
      const { data: courses,  isFetching, isLoading, refetch } = useGetCoursesQuery();

    const [deleteCourse, { isLoading: loadingDeleteCourse}] = useDeleteCourseMutation();
    function handleDeleteConfirmation(id) {
        Swal.fire({
            title: 'Are you sure you?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCourse(id).then(refetch())
                Swal.fire(
                    'Deleted!',
                    'This course has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your course is safe :)',
                    'error'
                )
            }
        })
    }

    function updateCourse() {

    }
    return (
    <>
      <Container>
        <Typography
          sx={{ /*textDecoration: "underline",*/ mb: 5 }}
          fontFamily={"Oxygen"}
          gutterBottom
          component="div"
          variant="h2"
        >
          Courses
        </Typography>
      </Container>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, ml:1 }}>
        {courses ? (
        courses.map((course,index) => (

          <Card
              sx={{
              width: { xs: "auto", sm: "250px" },
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column"
          }}key={course.id}>

            <CardContent>
              <Typography variant="h5" gutterBottom fontFamily={"Oxygen"}>
                {course.title}
              </Typography>

              <Typography variant="body1" fontFamily={"Oxygen"}>
                by {course.instructor.firstname} {course.instructor.lastname}
                <br />
                {course.location}, {course.timeslot}
              </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={updateCourse}>
                    <EditIcon />
                </IconButton>
                <IconButton disabled={loadingDeleteCourse} onClick={()=>handleDeleteConfirmation(course.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Skeleton variant="rectangular" width={500} height={118} />
      )}
        </Box>
        <AddCourse />
    </>
  );
};
