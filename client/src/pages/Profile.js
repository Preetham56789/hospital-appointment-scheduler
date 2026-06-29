import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  // 🔥 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

        // ✅ PREFILL FORM
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          address: res.data.address || "",
        });

      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false); // 🔥 prevents infinite loading
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // 🔄 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 SAVE PROFILE
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setEditMode(false);

    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  // ⏳ LOADING STATE
  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data found</p>;

  return (
    <DashboardLayout>
      <h2 style={{ marginBottom: "20px" }}>👤 My Profile</h2>

      <div style={cardStyle}>
        {!editMode ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not added"}</p>
            <p><strong>Age:</strong> {user.age || "-"}</p>
            <p><strong>Gender:</strong> {user.gender || "-"}</p>
            <p><strong>Address:</strong> {user.address || "-"}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <button onClick={() => setEditMode(true)} style={editBtn}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={inputStyle} />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
            <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" style={inputStyle} />
            <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" style={inputStyle} />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" style={inputStyle} />

            <button onClick={handleSave} style={saveBtn}>Save</button>
            <button onClick={() => setEditMode(false)} style={cancelBtn}>Cancel</button>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

// 🎨 STYLES
const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: "none",
};

const editBtn = {
  marginTop: "15px",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const saveBtn = {
  background: "green",
  color: "white",
  padding: "10px",
  border: "none",
  marginRight: "10px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "gray",
  color: "white",
  padding: "10px",
  border: "none",
  cursor: "pointer",
};

export default Profile;