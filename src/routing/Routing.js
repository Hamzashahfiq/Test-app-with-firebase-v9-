import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../componets/Header'
import Home from '../componets/Home'
import Login from '../componets/Login'
import Logout from '../componets/Logout'
import MainPage from '../componets/MainPage'
import Personal from '../componets/Personal'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { useSelector } from 'react-redux'
import SignUp from '../componets/SignUp'

export default function Routing() {
    const isLoginUser = useSelector((store) => store.AuthReducer.isLoginUser)
    const isLogout = useSelector((store) => store.AuthReducer.isLogout)

    return (
        <BrowserRouter >
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />


                <Route element={<PrivateRoute isLoginUser={isLoginUser} isLogout = {isLogout}></PrivateRoute>} >
                    <Route path="/personal" element={<Personal />} />
                    <Route path="/home" element={<Home />} />
                </ Route>

                <Route element={<PublicRoute isLoginUser={isLoginUser} ></PublicRoute>} >
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Logout" element={<Logout />} />
                    <Route path="/signup" element={<SignUp />} />
                </ Route>
            </Routes>
        </ BrowserRouter >
    )
}
