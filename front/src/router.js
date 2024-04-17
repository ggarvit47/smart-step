import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import ProfileAcademic from "./pages/ProfileAcademic"
import Layout from "./components/Layout"
import AuthLayout from "./components/AuthLayout"
import Explore from "./pages/Explore"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />

            <Route element={<AuthLayout authentication={false} />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthLayout authentication={true} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/study-preferences" element={<ProfileAcademic />} />
            </Route>
        </Route>
    ),
    // {basename: "/smart-steps",}
)

export default router;