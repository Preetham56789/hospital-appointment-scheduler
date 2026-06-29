import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
    booked: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/appointments/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Doctors</h3>
          <p>{stats.doctors}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Appointments</h3>
          <p>{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  padding: "20px",
  background: "#eee",
  borderRadius: "10px",
  width: "200px",
};

export default AdminDashboard;