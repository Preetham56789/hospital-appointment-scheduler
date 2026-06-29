import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors"
      );

      console.log("DOCTORS:", res.data);

      setDoctors(res.data);

    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1
          style={{
            color: "white",
            fontSize: "60px",
            marginBottom: "30px",
            fontWeight: "700",
          }}
        >
          👨‍⚕️ Doctors
        </h1>

        {doctors.length === 0 ? (
          <p style={{ color: "white" }}>
            No doctors found
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "25px",
            }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                style={{
                  background: "#111c2e",
                  border: "1px solid #22304a",
                  borderRadius: "20px",
                  padding: "25px",
                  color: "white",
                }}
              >
                <h2
                  style={{
                    marginBottom: "15px",
                    fontSize: "28px",
                  }}
                >
                  {doctor.name}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                    marginBottom: "10px",
                  }}
                >
                  Department: {doctor.department}
                </p>

                <p
                  style={{
                    color: "#94a3b8",
                    marginBottom: "20px",
                  }}
                >
                  Experience: {doctor.experience} years
                </p>

                <h3
                  style={{
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                >
                  Available Slots
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {doctor.availableSlots &&
                  doctor.availableSlots.length > 0 ? (
                    doctor.availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        style={{
                          background:
                            "linear-gradient(135deg,#2563eb,#1d4ed8)",
                          border: "none",
                          padding: "10px 18px",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p>No slots available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Doctors;