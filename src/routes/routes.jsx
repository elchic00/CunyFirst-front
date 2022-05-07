import { Route, Routes } from "react-router-dom";
import { HomePage } from "../components/HomePage"
import { ItemCards } from "../components/ItemCards";
import { ListCards } from "../components/ListCards";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/items' element={<ItemCards />} />
        <Route path='/lists' element={<ListCards />} />
      </Routes>
    );
}