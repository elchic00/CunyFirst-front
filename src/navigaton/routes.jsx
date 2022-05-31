import {Route, Routes} from "react-router-dom";
import {HomePage} from "../components/HomePage"
import {Courses} from "../components/Courses";
import {Instructors} from "../components/Instructors";
import {Navbar} from "./NavBar";
import {SignInScreen} from "../components/SignUp"

export const AppRoutes = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<SignInScreen/>}/>
                <Route path="/CunyFirst-front" element={<HomePage/>}/>
                <Route path='/courses' element={<Courses/>}/>
                <Route path='/instructors' element={<Instructors/>}/>
                <Route path='/login' element={<SignInScreen/>}/>
            </Routes>
        </>
    );
}