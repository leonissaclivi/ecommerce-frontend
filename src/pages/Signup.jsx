import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, {
        username,
        email,
        mobile,
        password
      });

      if (res.data.success) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {message && (
          <div className={`mb-4 text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile"
            className="w-full px-4 py-2 border rounded"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">Login</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default Signup;
