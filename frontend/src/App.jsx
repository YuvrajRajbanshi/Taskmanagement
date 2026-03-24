import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./store/slices/authSlice";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Protected route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public route wrapper (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
