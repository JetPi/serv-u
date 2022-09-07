import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Signup } from "./pages/signup.jsx";
import { Login } from "./pages/login.jsx";
import { Colecciones } from "./pages/colecciones.jsx";
import { Lecciones } from "./pages/lecciones.jsx";
import { Popular } from "./pages/popular.jsx";
import { Faq } from "./pages/faq.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

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
                        <Route element={<Colecciones />} path="/collections" />
                        <Route element={<Lecciones />} path="/lessons" />
                        <Route element={<Popular />} path="/popular" />
                        <Route element={<Faq />} path="/faq" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
