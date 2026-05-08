import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { database, ref, get, update } from "../../firebase";

import "../../Styles/DashStyle.css";

export default function UpdateEmploye() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use the id from the URL

  const [formData, setFormData] = useState({
    username: "",
    job: "",
    salary: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load current user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snapshot = await get(ref(database, `employes/${id}`)); // Fetch the user by id
        if (snapshot.exists()) {
          setFormData(snapshot.val()); // Pre-fill the form with user data
        } else {
          setError("Employe not found.");
        }
      } catch (err) {
        setError("Failed to fetch Employe data.");
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
      await update(ref(database, `employes/${id}`), formData); // Update user in database
      navigate("/dashboard/employes"); // Redirect to home page after update
    } catch (err) {
      setError("Failed to update employe.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      job: "",
      salary: "",
      email: "",
    }); // Reset the form fields
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Update Employe Page</h2>
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
            type="text"
            placeholder="Job..."
            name="job"
            required
            value={formData.job}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Salary..."
            name="salary"
            required
            value={formData.salary}
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
        <div class="but">
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Update"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <Link to="../../dashboard">Look Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
