import { NavLink, Outlet } from "react-router-dom"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";



export default function FrountLayout () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}