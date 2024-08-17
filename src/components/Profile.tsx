import React, { useEffect } from 'react';
import { useAuth } from '../context/UserContext';

const Profile: React.FC = () => {
  const { user, fetchUserProfile, logout } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

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
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg border border-gray-300">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Profile
        </h2>
        <p className="mb-4 text-center">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-4 text-center">
          <strong>Registration Date:</strong> {formatDate(user.createdAt)}
        </p>
        <button
          onClick={logout}
          className="w-full py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
