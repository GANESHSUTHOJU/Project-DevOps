import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ✅ Production backend URL - working Render backend
const API_URL = process.env.REACT_APP_API_URL || "https://project-devops-5.onrender.com";

// Test function to check API availability
const testAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/health`);
    console.log('API Health Check:', response.data);
    return true;
  } catch (error) {
    console.error('API Health Check Failed:', error.message);
    return false;
  }
};

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
      // Test API health first
      const isHealthy = await testAPI();
      if (!isHealthy) {
        // Fallback to demo data if backend is not available
        console.log('Backend not healthy, using demo data');
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
          { id: 4, name: 'Alice Wilson', email: 'alice@example.com' },
          { id: 5, name: 'Charlie Brown', email: 'charlie@example.com' }
        ]);
        setError('⚠️ Backend not reachable - Using demo data');
        setLoading(false);
        return;
      }

      // Backend is healthy - fetch real users
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
      setError('');
      console.log('Successfully fetched users from backend');
    } catch (err) {
      console.error('Fetch Users Error:', err);
      // Fallback to demo data on error
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]);
      setError(`⚠️ Backend error - Using demo data: ${err.message}`);
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
      // Test if backend is available first
      const isHealthy = await testAPI();
      if (!isHealthy) {
        // Add to demo data if backend is not available
        const newUserWithId = {
          id: Date.now(),
          name: newUser.name,
          email: newUser.email
        };
        setUsers([...users, newUserWithId]);
        setNewUser({ name: '', email: '' });
        setError('✅ User added to demo data (Backend offline)');
        return;
      }

      // Backend is available - add to real backend
      const response = await axios.post(`${API_URL}/api/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
      setError('✅ User added successfully to backend!');
      console.log('Successfully added user to backend');
    } catch (err) {
      console.error('Add User Error:', err);
      // Fallback to demo data on error
      const newUserWithId = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email
      };
      setUsers([...users, newUserWithId]);
      setNewUser({ name: '', email: '' });
      setError(`⚠️ Backend error - Added to demo data: ${err.message}`);
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