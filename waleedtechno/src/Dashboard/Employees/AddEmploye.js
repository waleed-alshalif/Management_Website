import { database, ref, set } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../Styles/DashStyle.css";

export default function AddEmploye() {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString();

  const [formData, setFormData] = useState({
    username: "",
    job: "",
    salary: "",
    email: "",
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

      await set(ref(database, "employes/" + userId), {
        username: formData.username,
        job: formData.job,
        salary: formData.salary,
        email: formData.email,
        datejob: currentDate,
      });
      alert(
        "Thanks for offering WaleedTechno Company... the opportunity—we appreciate it!"
      );
      navigate("/dashboard/employes");
    } catch (err) {
      setError("Firebase Employ failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Employ Page</h2>
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
          <button type="reset">Reset</button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Employ"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <Link to="../../dashboard">Look Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
