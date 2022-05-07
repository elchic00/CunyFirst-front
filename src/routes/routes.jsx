import { Route, Routes } from "react-router-dom";
import { HomePage } from "../components/HomePage"
import { Courses } from "../components/Courses";
import { Instructors } from "../components/Instructors";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/instructors' element={<Instructors />} />
      </Routes>
    );
}