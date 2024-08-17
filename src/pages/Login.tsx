import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Input from '../components/Input';

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?
          <Link to="/register" className="link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
