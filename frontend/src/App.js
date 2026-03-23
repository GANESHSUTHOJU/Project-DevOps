import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ✅ Render deployment URL with fallback
const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://project-devops-backend.onrender.com" 
  : "http://localhost:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      console.log('Fetching from:', API_URL);
      const response = await axios.get(`${API_URL}/api/users`);
      console.log('Response:', response.data);
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response) {
        setError(`❌ Server Error: ${err.response.status}`);
      } else if (err.request) {
        setError(`❌ Network Error: Cannot reach ${API_URL}`);
      } else {
        setError(`❌ Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add user
  const addUser = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email) {
      setError("⚠️ Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to add user');
    }
  };

  // 🔹 Handle input
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 UI states
  if (loading) return <div className="container">⏳ Loading...</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Simple Web Application</h1>
        <p>React + Node.js + Docker + CI/CD</p>
      </header>

      {error && <div className="error">{error}</div>}

      <main>
        {/* Add User Form */}
        <section className="user-form">
          <h2>Add New User</h2>
          <form onSubmit={addUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add User</button>
          </form>
        </section>

        {/* User List */}
        <section className="user-list">
          <h2>Users</h2>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div className="user-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <small>ID: {user.id}</small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;