import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {

  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchDashboardData();

    // eslint-disable-next-line
  }, []);

  const fetchDashboardData = async () => {

    try {

      // FETCH DOCTORS
      const doctorRes = await axios.get(
        "http://localhost:5000/api/doctors"
      );

      setDoctorCount(doctorRes.data.length);

      // COUNT UNIQUE DEPARTMENTS
      const departments = [
        ...new Set(
          doctorRes.data.map(
            (doc) => doc.department
          )
        ),
      ];

      setDepartmentCount(departments.length);

      // FETCH APPOINTMENTS
      const appointmentRes = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointmentCount(
        appointmentRes.data.length
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "35px",
          fontWeight: "700",
        }}
      >
        🏥 Hospital Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >

        {/* TOTAL DOCTORS */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>
            👨‍⚕️ Total Doctors
          </h2>

          <h1 style={numberStyle}>
            {doctorCount}
          </h1>
        </div>

        {/* TOTAL APPOINTMENTS */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>
            📅 Appointments
          </h2>

          <h1 style={numberStyle}>
            {appointmentCount}
          </h1>
        </div>

        {/* DEPARTMENTS */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>
            🏥 Departments
          </h2>

          <h1 style={numberStyle}>
            {departmentCount}
          </h1>
        </div>

      </div>

    </DashboardLayout>
  );
};

const cardStyle = {
  background: "#111827",
  padding: "35px",
  borderRadius: "24px",
  border: "1px solid #1e293b",
};

const titleStyle = {
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "22px",
};

const numberStyle = {
  fontSize: "52px",
  fontWeight: "700",
};

export default Dashboard;