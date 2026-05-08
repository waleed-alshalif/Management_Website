import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, ref, onValue, remove } from "../../firebase";
import "../../Styles/Table.css";

export default function AllEmployees() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(database, "employes/");
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
    await remove(ref(database, "employes/" + id));
  };

  const handleEdit = (user) => {
    navigate(`/dashboard/updateemp/${user.id}`, { state: user });
  };

  if (loading)
    return (
      <div className="loading">Loading Employees Page. wait Please...</div>
    );
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div>
        <h1>Employees List</h1>
        <Link to="/dashboard/addemployes" className="menu-item">
          Add employe
        </Link>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Job</th>
            <th>Salary</th>
            <th>Email</th>
            <th>datejob</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.username}</td>
              <td>{emp.job}</td>
              <td>{emp.salary}</td>
              <td>{emp.email}</td>
              <td>{emp.datejob}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>✏️</button>
                <button onClick={() => handleDelete(emp.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
