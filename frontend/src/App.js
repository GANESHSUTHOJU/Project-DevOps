const API_URL = "https://YOUR-BACKEND-URL.onrender.com";

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    setUsers(response.data);
    setLoading(false);
  } catch (err) {
    setError('Failed to fetch users');
    setLoading(false);
  }
};

const addUser = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/api/users`, newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '' });
  } catch (err) {
    setError('Failed to add user');
  }
};