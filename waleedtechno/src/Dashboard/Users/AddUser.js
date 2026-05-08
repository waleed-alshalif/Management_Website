import { database, ref, set } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../Styles/DashStyle.css";

export default function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Henale Submit the add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userId = Date.now(); // مؤقتًا نستخدم timestamp كـ ID

      await set(ref(database, "users/" + userId), {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard/alluser");
    } catch (err) {
      setError("Firebase add user failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Add Page</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password..."
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div class="but">
          <button type="reset">Reset</button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Add User"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <Link to="../../dashboard">Look Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
