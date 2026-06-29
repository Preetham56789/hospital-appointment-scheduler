import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ❌ CANCEL
  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h2>👨‍⚕️ Doctor Dashboard</h2>

      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        appointments.map((a) => (
          <div key={a._id} style={card}>
            <h3>Patient ID: {a.patientId || "N/A"}</h3>
            <p>📅 {a.date}</p>
            <p>⏰ {a.time}</p>
            <p>Status: {a.status}</p>

            {a.status === "booked" && (
              <button
                style={btn}
                onClick={() => cancelAppointment(a._id)}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))
      )}
    </DashboardLayout>
  );
};

const card = {
  background: "#1e293b",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
};

const btn = {
  marginTop: "10px",
  padding: "8px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DoctorDashboard;