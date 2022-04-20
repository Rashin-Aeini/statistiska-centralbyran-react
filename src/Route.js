import React from "react";
import { BrowserRouter, Routes, Route as RouteRouter } from "react-router-dom";
import Home from './Pages/Home';
import Year from './Pages/Year';
import Region from './Pages/Region';
import Gender from './Pages/Gender';


const Route = () => {
    return(
        <BrowserRouter>
            <Routes>
                <RouteRouter exact path="/" element={<Home />}>
                    <RouteRouter path="year" element={<Year />} />
                    <RouteRouter path="region/:name" element={<Region />} />
                    <RouteRouter path="gender" element={<Gender />} />
                </RouteRouter>
            </Routes>
        </BrowserRouter>
    );
}

export default Route;