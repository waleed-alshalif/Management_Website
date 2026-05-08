import { database, ref, set } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../Styles/DashStyle.css";

export default function AddOffice() {
  const navigate = useNavigate();
  const CurrentDate = new Date().toISOString();

  const [formData, setFormData] = useState({
    officename: "",
    location: "",
    manger: "",
    countemployees: "",
    CurrentDate,
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

      await set(ref(database, "offices/" + userId), {
        officename: formData.officename,
        location: formData.location,
        manger: formData.manger,
        countemployees: formData.countemployees,
        DateAdd: CurrentDate,
      });
      navigate("/dashboard/offices");
    } catch (err) {
      setError("Firebase offices failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Office Page</h2>
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
          <button type="reset">Reset</button>
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
