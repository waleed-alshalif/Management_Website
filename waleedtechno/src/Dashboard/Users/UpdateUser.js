import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { database, ref, get, update } from "../../firebase";

import "../../Styles/DashStyle.css";

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use the id from the URL

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load current user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snapshot = await get(ref(database, `users/${id}`)); // Fetch the user by id
        if (snapshot.exists()) {
          setFormData(snapshot.val()); // Pre-fill the form with user data
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
      }
    };

    if (id) {
      fetchUser(); // Fetch data when id is available
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await update(ref(database, `users/${id}`), formData); // Update user in database
      navigate("/dashboard/alluser"); // Redirect to home page after update
    } catch (err) {
      setError("Failed to update user.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    }); // Reset the form fields
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Update User</h2>
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

        <div className="but">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </button>
        </div>

        <div className="nots">
          <p>
            Want to login? <Link to="/login">Login</Link>
          </p>
          <Link to="/">← Back to Home</Link>
        </div>
      </form>
    </div>
  );
}
