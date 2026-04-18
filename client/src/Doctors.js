import React, { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  // 🔹 Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN IN DOCTORS:", token);

        if (!token) {
          alert("Please login first");
          window.location.href = "/login";
          return;
        }

        const res = await fetch("http://localhost:5000/api/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("DOCTORS RESPONSE:", data);

        if (res.ok) {
          setDoctors(data);
        } else {
          alert(data.message || "Invalid token");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    fetchDoctors();
  }, []);

  // 🔹 Book Appointment
  const bookAppointment = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: doctorId,
          date: "2026-04-20",
          time: "10:00 AM",
        }),
      });

      const data = await res.json();

      console.log("BOOK RESPONSE:", data);

      if (res.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert(data.message || "Booking failed");
      }

    } catch (error) {
      console.log("BOOK ERROR:", error);
      alert("Server error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Doctors List</h2>

      {doctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc._id} style={{ margin: "20px" }}>
            <h3>{doc.name}</h3>
            <p>Department: {doc.department}</p>

            {/* 🔹 Book Button */}
            <button onClick={() => bookAppointment(doc._id)}>
              Book Appointment
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Doctors;