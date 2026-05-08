import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { database, ref, get, update } from "../../firebase";

import "../../Styles/DashStyle.css";

export default function UpdateOffice() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use the id from the URL

  const [formData, setFormData] = useState({
    officename: "",
    location: "",
    manger: "",
    countemployees: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load current user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snapshot = await get(ref(database, `offices/${id}`)); // Fetch the user by id
        if (snapshot.exists()) {
          setFormData(snapshot.val()); // Pre-fill the form with user data
        } else {
          setError("offices not found.");
        }
      } catch (err) {
        setError("Failed to fetch offices data.");
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
      await update(ref(database, `offices/${id}`), formData); // Update user in database
      navigate("/dashboard/offices"); // Redirect to home page after update
    } catch (err) {
      setError("Failed to update offices.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      officename: "",
      location: "",
      manger: "",
      countemployees: "",
    }); // Reset the form fields
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2> Update Office Page</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Office Name..."
            name="officename"
            required
            value={formData.officename}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location..."
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Manger Office..."
            name="manger"
            required
            value={formData.manger}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Count Employees ..."
            name="countemployees"
            required
            value={formData.countemployees}
            onChange={handleChange}
          />
        </div>
        <div class="but">
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Add-Office"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <Link to="../../dashboard">Look Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
