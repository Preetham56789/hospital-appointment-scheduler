import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const token = localStorage.getItem("token");

  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();

    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);

    } catch (error) {
      console.log(error);
      alert("Failed to load appointments");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors"
      );

      setDoctors(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleBookAppointment = async () => {
    if (!doctorId || !date || !selectedSlot) {
      return alert("Please fill all fields");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctor: doctorId,
          date,
          time: selectedSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment booked successfully");

      setDoctorId("");
      setDate("");
      setSelectedSlot("");

      fetchAppointments();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {

      await axios.put(
        `http://localhost:5000/api/appointments/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();

    } catch (error) {

      console.log(error);

      alert("Status update failed");
    }
  };

  // CANCEL
  const handleCancel = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();

    } catch (error) {

      console.log(error);

      alert("Cancel failed");
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter(
    (appt) => {
      const apptDate = new Date(appt.date);
      apptDate.setHours(0, 0, 0, 0);

      return apptDate >= today;
    }
  );

  const pastAppointments = appointments.filter(
    (appt) => {
      const apptDate = new Date(appt.date);
      apptDate.setHours(0, 0, 0, 0);

      return apptDate < today;
    }
  );

  return (
    <DashboardLayout>
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "25px",
        }}
      >
        📅 Appointments
      </h1>

      {/* BOOK */}
      <div
        style={{
          background: "#111827",
          padding: "30px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Book Appointment
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <select
            value={doctorId}
            onChange={(e) =>
              setDoctorId(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map((doctor) => (
              <option
                key={doctor._id}
                value={doctor._id}
              >
                {doctor.name} - {doctor.department}
              </option>
            ))}
          </select>

          <input
            type="date"
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* SLOT */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() =>
                setSelectedSlot(slot)
              }
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border:
                  selectedSlot === slot
                    ? "2px solid #3b82f6"
                    : "1px solid #334155",
                background:
                  selectedSlot === slot
                    ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
                    : "#1e293b",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleBookAppointment}
          style={{
            padding: "15px 30px",
            background:
              "linear-gradient(135deg,#16a34a,#15803d)",
            border: "none",
            borderRadius: "14px",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Book Appointment
        </button>
      </div>

      {/* UPCOMING */}
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Upcoming Appointments
      </h2>

      {upcomingAppointments.map((appt) => (
        <div
          key={appt._id}
          style={cardStyle}
        >
          <h2>
            👨‍⚕️ {appt.doctor?.name}
          </h2>

          <p>
            🏥 {appt.doctor?.department}
          </p>

          <p>
            📅{" "}
            {new Date(
              appt.date
            ).toLocaleDateString()}
          </p>

          <p>⏰ {appt.time}</p>

          <p>
            Status:
            <span
              style={{
                color:
                  appt.status === "Confirmed"
                    ? "#22c55e"
                    : appt.status === "Cancelled"
                    ? "#ef4444"
                    : "#facc15",
                fontWeight: "700",
                marginLeft: "8px",
              }}
            >
              {appt.status}
            </span>
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "18px",
            }}
          >
            <button
              onClick={() =>
                updateStatus(
                  appt._id,
                  "Confirmed"
                )
              }
              style={confirmBtn}
            >
              Confirm
            </button>

            <button
              onClick={() =>
                updateStatus(
                  appt._id,
                  "Cancelled"
                )
              }
              style={cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}

      {/* PAST */}
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        Past Appointments
      </h2>

      {pastAppointments.map((appt) => (
        <div
          key={appt._id}
          style={{
            ...cardStyle,
            opacity: 0.7,
          }}
        >
          <h2>
            👨‍⚕️ {appt.doctor?.name}
          </h2>

          <p>
            🏥 {appt.doctor?.department}
          </p>

          <p>
            📅{" "}
            {new Date(
              appt.date
            ).toLocaleDateString()}
          </p>

          <p>⏰ {appt.time}</p>

          <p>
            Status:
            <span
              style={{
                color:
                  appt.status === "Confirmed"
                    ? "#22c55e"
                    : appt.status === "Cancelled"
                    ? "#ef4444"
                    : "#facc15",
                fontWeight: "700",
                marginLeft: "8px",
              }}
            >
              {appt.status}
            </span>
          </p>
        </div>
      ))}
    </DashboardLayout>
  );
};

const inputStyle = {
  padding: "14px",
  minWidth: "260px",
  background: "#1e293b",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "12px",
};

const cardStyle = {
  background: "#111827",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "20px",
  border: "1px solid #1e293b",
};

const confirmBtn = {
  padding: "12px 18px",
  background:
    "linear-gradient(135deg,#16a34a,#15803d)",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "12px 18px",
  background:
    "linear-gradient(135deg,#dc2626,#b91c1c)",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

export default Appointments;