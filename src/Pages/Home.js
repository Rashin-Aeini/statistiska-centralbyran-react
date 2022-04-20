import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Home = () => {

    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === "/") {
            navigate("/year");
        }
    }, [location]);

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            StatistiskaCentralbyrån
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={"nav-link" + (location.pathname === '/year' ? ' active' : '')} to="/year">
                                        Tid
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={"nav-link" + (location.pathname === '/gender' ? ' active' : '')} to="/gender">
                                        Kön
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main role="main">
                <Outlet />
            </main>
        </div>
    );
};

export default Home;
