import React, { useEffect } from 'react';
import { useAuth } from '../context/UserContext';

const Profile: React.FC = () => {
  const { user, getUser, logout } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Profile</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Registration Date:</strong> {formatDate(user.createdAt)}
        </p>
        <button onClick={logout} className="button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
