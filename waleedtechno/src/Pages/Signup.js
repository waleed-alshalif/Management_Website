import { database, ref, set } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import "../Styles/Style.css";

export default function Signup() {
  const navigate = useNavigate();
  const cookies = new Cookies();

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

  //  Handle Submit the add user
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
      cookies.set("Username", formData.username);
      navigate("/main");
    } catch (err) {
      setError("Firebase registration failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Register Page</h2>
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
            {loading ? "Loading..." : "Register"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <p>
            Enter to create an account:
            <Link to="/login">Login</Link>
          </p>
          <Link to="/main">← Back to Home</Link>
        </div>
      </form>
    </div>
  );
}
