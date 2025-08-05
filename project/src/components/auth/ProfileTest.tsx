import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileTest: React.FC = () => {
  const { authState, refreshUserProfile } = useAuth();

  const handleTestRefresh = async () => {
    console.log('Testing profile refresh...');
    try {
      await refreshUserProfile();
      console.log('Profile refresh successful');
    } catch (error) {
      console.error('Profile refresh failed:', error);
    }
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-4">
      <h3 className="text-lg font-bold text-yellow-900 mb-2">Profile Test Panel</h3>
      <div className="space-y-2 text-sm">
        <p><strong>User ID:</strong> {authState.user?.id}</p>
        <p><strong>Email:</strong> {authState.user?.email}</p>
        <p><strong>Profile Completed:</strong> {authState.user?.profileCompleted ? 'Yes' : 'No'}</p>
        <p><strong>Full Name:</strong> {authState.user?.fullName || 'Not set'}</p>
        <p><strong>Phone:</strong> {authState.user?.phoneNumber || 'Not set'}</p>
        <button
          onClick={handleTestRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Test Refresh Profile
        </button>
      </div>
    </div>
  );
}; 