import {AppBar, Box, Container, Icon, MenuItem, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import SchoolIcon from '@mui/icons-material/School';
import CF from '../CF.svg'

export const Navbar = () => {
  const pages = ["Courses", "Instructors"];
  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
              <SchoolIcon onClick={()=>navigate('/')} sx={{cursor: "pointer", color:'black', fontSize:"400%", mr:1}}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                textAlign: "center",
                mr: "3%",
                display: "flex-inline",
                fontFamily: "Oxygen",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              HOME
            </Typography>
            {pages.map((page) => (
              <MenuItem
                sx={{ textAlign: "center" }}
                key={page}
                onClick={() => navigate(`/${page.charAt(0).toLowerCase()+page.substring(1)}`)}
              >
                <Typography fontFamily={"Oxygen"}>{page}</Typography>
              </MenuItem>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

