import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, ref, onValue, remove } from "../../firebase";
import "../../Styles/Table.css";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(database, "users/");
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
    await remove(ref(database, "users/" + id));
  };

  const handleEdit = (user) => {
    navigate(`/dashboard/updateuser/${user.id}`, { state: user });
  };

  if (loading)
    return <div className="loading">Loading users Page. wait Please ...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div>
        <h1>Users List</h1>
        <Link to="/dashboard/adduser" className="menu-item">
          Add User
        </Link>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>✏️</button>
                <button onClick={() => handleDelete(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
