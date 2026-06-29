import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/appointments");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#07132b,#020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "rgba(15,23,42,0.75)",
          border: "1px solid #1e293b",
          borderRadius: "30px",
          padding: "40px",
          backdropFilter: "blur(15px)",
          boxShadow:
            "0 0 40px rgba(37,99,235,0.25)",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              margin: "0 auto",
              borderRadius: "24px",
              border: "3px solid #2563eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "42px",
              color: "#3b82f6",
              marginBottom: "20px",
            }}
          >
            ✚
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            MERN{" "}
            <span
              style={{
                color: "#3b82f6",
              }}
            >
              Hospital
            </span>
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Welcome back! Please sign in
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Email address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Password
            </label>

            <div
              style={{
                position: "relative",
              }}
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <div
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  color: "#60a5fa",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                fontSize: "14px",
              }}
            >
              <input
                type="checkbox"
                style={{
                  marginRight: "8px",
                }}
              />
              Remember me
            </label>

            <span
              style={{
                color: "#3b82f6",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Forgot password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              border: "none",
              borderRadius: "16px",
              color: "white",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "25px",
            }}
          >
            Sign In
          </button>
        </form>

        {/* OR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#334155",
            }}
          ></div>

          <span
            style={{
              color: "#94a3b8",
              padding: "0 15px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#334155",
            }}
          ></div>
        </div>

        {/* GOOGLE */}
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "16px",
            border: "1px solid #334155",
            background: "#fff",
            color: "#111827",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>

        {/* SIGNUP */}
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "14px",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

export default Login;