import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/appointments/admin/report",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 📊 Bar Chart Data
  const barData = {
    labels: ["Users", "Doctors", "Appointments"],
    datasets: [
      {
        label: "System Overview",
        data: [
          data.totalUsers,
          data.totalDoctors,
          data.totalAppointments
        ]
      }
    ]
  };

  // 🥧 Pie Chart Data
  const pieData = {
    labels: ["Users", "Doctors", "Appointments"],
    datasets: [
      {
        data: [
          data.totalUsers,
          data.totalDoctors,
          data.totalAppointments
        ]
      }
    ]
  };

  return (
    <div style={containerStyle}>
      
      <h2>Admin Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 📊 Cards */}
          <div style={cardContainer}>
            <div style={card}>
              <h3>Users</h3>
              <p>{data.totalUsers}</p>
            </div>

            <div style={card}>
              <h3>Doctors</h3>
              <p>{data.totalDoctors}</p>
            </div>

            <div style={card}>
              <h3>Appointments</h3>
              <p>{data.totalAppointments}</p>
            </div>
          </div>

          {/* 📊 Bar Chart */}
          <div style={chartBox}>
            <h3>System Overview</h3>
            <Bar data={barData} />
          </div>

          {/* 🥧 Pie Chart */}
          <div style={chartBox}>
            <h3>Distribution Overview</h3>
            <Pie data={pieData} />
          </div>
        </>
      )}
    </div>
  );
}

/* 🎨 Styles */

const containerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh"
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
  flexWrap: "wrap"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "180px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const chartBox = {
  width: "500px",
  margin: "30px auto"
};

export default AdminDashboard;