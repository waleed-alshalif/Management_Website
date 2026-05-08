import { database, ref, onValue } from "../firebase";
import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";

export default function Card() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const fetchData = (path, setter) => {
      onValue(ref(database, path), (snapshot) => {
        const data = snapshot.val();
        setter(data ? Object.values(data) : []);
      });
    };

    fetchData("users", setUsers);
    fetchData("employes", setEmployees);
    fetchData("offices", setOfficers);
  }, []);

  return (
    <>
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>

      <div className="card-grid">
        <div className="dashboard-card user">
          <h2>👤 Users: {users.length}</h2>
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card employee">
          <h2>💼 Employees: {employees.length}</h2>
          <ul>
            {employees.map((emp, i) => (
              <li key={i}>{emp.username}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card officer">
          <h2>🏢 Officers: {officers.length}</h2>
          <ul>
            {officers.map((off, i) => (
              <li key={i}>{off.officename}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
