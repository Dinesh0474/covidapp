import React, { Fragment, useState, useEffect } from "react";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer,  } from "react-toastify";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin"
import AdminDashboard from "./components/AdminDashboard";
import AddCenters from "./components/AddCenters";



function App() {
  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          {/* Add ToastContainer here */}
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route
              exact
              path="/"
              element = {<Admin setAuth={setAuth}/>}
            />
            <Route
              exact
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              exact
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/dashboard"
              element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/admin"
              element={isAuthenticated ? <AdminDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/admin/create"
              element={isAuthenticated ? <AddCenters setAuth={setAuth} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
