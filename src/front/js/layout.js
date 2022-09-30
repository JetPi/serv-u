import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Signup } from "./pages/signup.jsx";
import { Section } from "./pages/section.jsx";
import { Login } from "./pages/login.jsx";
import { Profile } from "./pages/profile.jsx";
import { Faq } from "./pages/faq.jsx";
import { Post_service } from "./pages/post_service.jsx";
import { ServiceInfo } from "./pages/service_info.jsx";
import injectContext from "./store/appContext";
import { ActiveUser } from "./pages/user_register.jsx";
import { SearchResult } from "./pages/results.jsx";

import { Navbar } from "./component/navbar";
import { ServiceComment } from "./component/serviceComment.jsx";






//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Section />} path="/section" />
                        <Route element={<Faq />} path="/faq" />
                        <Route element={<Post_service />} path="/post_service" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<ServiceInfo />} path="/service/:id" />
                        <Route element={<ServiceComment services_id={1} />} path="/user/comments" />
                        <Route element={<ActiveUser />} path="/user" />
                        <Route element={<SearchResult />} path="/services/search" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
