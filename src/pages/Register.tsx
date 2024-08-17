import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Input from '../components/Input';

const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(email, password, confirmPassword);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Register</h2>
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
          <div className="form-group">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
