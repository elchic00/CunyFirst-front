import {Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Typography,} from "@mui/material";
import {useNavigate} from "react-router";
import {useGetCoursesQuery, useGetInstructorsQuery} from "../redux/services/apiSlice";

export const HomePage = () => {

    let navigate = useNavigate();
    const {data: courses, error, isLoading} = useGetCoursesQuery();
    const {data: instructors, isLoading: loadingInstructors} = useGetInstructorsQuery();

    if (isLoading || loadingInstructors) return (
        <>
            <Typography sx={{mb: 5}} fontFamily={"Oxygen"} gutterBottom component="div" variant="h2">
                Data loading...
            </Typography>
            <CircularProgress size={200}/>
        </>
    )

    if (!courses && !instructors) return <Typography sx={{mb: 8}} fontFamily={"Oxygen"} gutterBottom component="div"
                                                     variant="h2">
        Missing courses and instructors from the database!
    </Typography>

    return (
        <><Container>
            <Typography
                sx={{mb: 8}}
                fontFamily={"Oxygen"}
                gutterBottom
                component="div"
                variant="h2"
            >
                Home Page
            </Typography>
        </Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Card sx={{maxWidth: 315}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            You have {courses.length} courses saved
                        </Typography>
                        <Typography variant="body1">
                            <br/>
                            Do you want to see?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigate(`/courses`)} sx={{mx: "auto"}} size="small">
                            See your Courses
                        </Button>
                    </CardActions>
                </Card>

                <Card sx={{maxWidth: 340, ml: '15%'}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            You have {instructors.length} instructors saved
                        </Typography>
                        <Typography variant="body1">
                            <br/>
                            Do you want to see?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigate(`/instructors`)} sx={{mx: "auto"}} size="small">
                            See your Instructors
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
        // { items }
    );
}
