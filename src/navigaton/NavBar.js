import {AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import SchoolIcon from '@mui/icons-material/School';
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
    let navigate = useNavigate();
    const pages = ["Courses", "Instructors", "Login"];
    const [anchorElNav, setAnchorElNav] = useState(null);

    function handleOpenNavMenu(event){
        // console.log(page)
        // navigate(`/${page.charAt(0).toLowerCase() + page.substring(1)}`)
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };



    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography onClick={() => navigate(`/${page.charAt(0).toLowerCase() + page.substring(1)}`)} textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <SchoolIcon onClick={() => navigate('/CunyFirstRemade')}
                                    sx={{cursor: "pointer", color: 'black', fontSize: "400%", mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            onClick={() => navigate("/CunyFirstRemade")}
                            sx={{
                                textAlign: "center",
                                mr: {xs:"40%", md:"3%"},
                                fontFamily: "Oxygen",
                                fontWeight: {md:600, sm:500},
                                letterSpacing: ".2rem",
                                color: "inherit",
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                        >
                            HOME
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <MenuItem
                                sx={{textAlign: "center"}}
                                key={page}
                                onClick={() => navigate(`/${page.charAt(0).toLowerCase() + page.substring(1)}`)}
                            >
                                <Typography fontFamily={"Oxygen"}>{page}</Typography>
                            </MenuItem>
                        ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

