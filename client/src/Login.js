import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    alert("Button clicked"); // 🔥 MUST SHOW

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      alert("Response received"); // 🔥 MUST SHOW

      console.log("DATA:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        alert("Token saved!");

        setTimeout(() => {
  window.location.href = "/doctors";
}, 500);
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {/* 🔥 IMPORTANT */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;