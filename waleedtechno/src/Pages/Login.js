// Import the initialized `database` from firebase.js
import { database, ref, onValue } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React, { useState } from "react";
import "../Styles/Style.css";

export default function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Now use the `database` directly (no need for `getDatabase()` call)
      const usersRef = ref(database, "users/");

      onValue(usersRef, (snapshot) => {
        const users = snapshot.val();

        if (users) {
          const userArray = Object.values(users);
          const matchedUser = userArray.find(
            (user) =>
              user.email === formData.email &&
              user.password === formData.password
          );

          if (matchedUser) {
            cookies.set("Username", matchedUser.username);
            navigate("/dashboard");
          } else {
            setError("Incorrect email or password.");
          }
        } else {
          setError("No users found.");
        }

        setLoading(false);
      });
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit} className="formstyle">
        <h2>Login Page</h2>
        {error && <p className="error-message">{error}</p>}
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
            type="text"
            placeholder="Password..."
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div class="but">
          <button type="submit">
            <Link
              to="/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              Back
            </Link>
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"} {/* Show loading text */}
          </button>
        </div>
        <div className="nots">
          <p>
            Don't have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up
            </Link>
          </p>
          <Link to="/main" className="mt-4 text-gray-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}
