import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Task Manager</h1>
      </div>
      <div className="header-right">
        <button
          className="btn btn-icon"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <span className="user-name">{user?.name}</span>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
