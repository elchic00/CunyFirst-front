import {Link, Route, Routes, Switch} from "react-router-dom";
import { HomePage } from "../components/HomePage"
import { Courses } from "../components/Courses";
import { Instructors } from "../components/Instructors";
import {AppBar, Box, Button, Container, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useNavigate} from "react-router";
import AdbIcon from '@mui/icons-material/Adb';


const Navbar= () =>{
    const pages = ['Courses', 'Instructors'];
    let navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Container  >
                <Toolbar disableGutters>
                    <AdbIcon />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={()=>navigate('/')}
                        sx={{
                            textAlign:'center',
                            mr: '3%',
                            display:'flex-inline',
                            fontFamily: 'Oxygen',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        HOME
                    </Typography>
                        {pages.map((page) => (
                            <MenuItem sx={{textAlign:'center'}} key={page} onClick={()=>navigate(`/${page}`)}>
                                <Typography fontFamily={'Oxygen'}>{page}</Typography>
                            </MenuItem>
                        ))}
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
export default Navbar;

export const AppRoutes = () => {
    return (
        <>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/instructors' element={<Instructors />} />
      </Routes>
        </>
    );
}