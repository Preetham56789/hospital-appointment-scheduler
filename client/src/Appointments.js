import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment cancelled");

      // Refresh list
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} style={cardStyle}>
            <p><b>Doctor:</b> {appt.doctorId?.name}</p>
            <p><b>Date:</b> {appt.date}</p>
            <p><b>Time:</b> {appt.timeSlot}</p>
            <p><b>Status:</b> {appt.status}</p>

            {appt.status === "booked" && (
              <button onClick={() => cancelAppointment(appt._id)}>
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  margin: "10px auto",
  padding: "10px",
  width: "300px",
  borderRadius: "10px",
};

export default Appointments;