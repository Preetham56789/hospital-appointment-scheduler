import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  // LOAD THEME
  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    }

  }, []);

  // TOGGLE THEME
  const toggleTheme = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  const linkStyle = (path) => ({
    padding: "14px 18px",
    borderRadius: "14px",
    textDecoration: "none",
    color:
      location.pathname === path
        ? "#fff"
        : darkMode
        ? "#94a3b8"
        : "#334155",

    background:
      location.pathname === path
        ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
        : "transparent",

    marginBottom: "10px",
    display: "block",
    fontWeight: "600",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",

        background: darkMode
          ? "#060816"
          : "#f1f5f9",

        color: darkMode
          ? "white"
          : "#0f172a",

        transition: "0.3s",

        fontFamily: "sans-serif",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",

          background: darkMode
            ? "#0b1220"
            : "#ffffff",

          borderRight: darkMode
            ? "1px solid #1e293b"
            : "1px solid #cbd5e1",

          padding: "25px",
        }}
      >

        <h1
          style={{
            marginBottom: "40px",
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          🏥 Hospital
        </h1>

        <Link
          to="/"
          style={linkStyle("/")}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/appointments"
          style={linkStyle("/appointments")}
        >
          📅 Appointments
        </Link>

        <Link
          to="/doctors"
          style={linkStyle("/doctors")}
        >
          👨‍⚕️ Doctors
        </Link>

        <Link
          to="/profile"
          style={linkStyle("/profile")}
        >
          👤 Profile
        </Link>

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "14px",

            background:
              "linear-gradient(135deg,#7c3aed,#6d28d9)",

            border: "none",

            borderRadius: "14px",

            color: "white",

            fontWeight: "700",

            cursor: "pointer",
          }}
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "14px",

            background:
              "linear-gradient(135deg,#dc2626,#b91c1c)",

            border: "none",

            borderRadius: "14px",

            color: "white",

            fontWeight: "700",

            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "35px",
        }}
      >
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;