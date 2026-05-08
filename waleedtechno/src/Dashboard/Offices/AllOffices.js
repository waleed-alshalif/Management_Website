import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, ref, onValue, remove } from "../../firebase";
import "../../Styles/Table.css";

export default function AllOffice() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(database, "offices/");
    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const usersArray = Object.entries(data).map(([id, user]) => ({
            id,
            ...user,
          }));
          setUsers(usersArray);
        } else {
          setUsers([]);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    // if (window.confirm("Are you sure you want to delete this user?")) {
    await remove(ref(database, "offices/" + id));
  };

  const handleEdit = (user) => {
    navigate(`/dashboard/updateoff/${user.id}`, { state: user });
  };

  if (loading)
    return <div className="loading">Loading Offices Page. wait Please ...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div>
        <h1>Offices List</h1>
        <Link to="/dashboard/addoffice" className="menu-item">
          Add Office
        </Link>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Office Name</th>
            <th>Manger</th>
            <th>Location</th>
            <th>Count Employees</th>
            <th>Date Office</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((off, index) => (
            <tr key={off.id}>
              <td>{index + 1}</td>
              <td>{off.officename}</td>
              <td>{off.manger}</td>
              <td>{off.location}</td>
              <td>{off.DateAdd}</td>
              <td>{off.DateAdd}</td>
              <td>
                <button onClick={() => handleEdit(off)}>✏️</button>
                <button onClick={() => handleDelete(off.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
