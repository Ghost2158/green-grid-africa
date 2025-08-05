import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../components/auth/UserProfile';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { authState, updateProfile, refreshUserProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setError('Loading timeout. Please try refreshing the page.');
      }, 10000); // 10 second timeout
      
      try {
        console.log('Fetching user data for profile page...');
        console.log('Current user state:', authState.user);
        
        // Always try to refresh user profile from Supabase for non-demo users
        if (authState.user && !authState.user.email?.endsWith('@greengrid.com')) {
          await refreshUserProfile();
        }
        // Demo users: use mock data (already in state)
        setLastRefresh(new Date());
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data. Please try again.');
        clearTimeout(timeoutId);
      } finally {
        setIsLoading(false);
      }
    };

    if (authState.user) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []); // Remove dependencies to prevent infinite loop

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await refreshUserProfile();
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error refreshing profile:', error);
      setError('Failed to refresh profile data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!authState.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500">User not found. Please log in again.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
          </div>
          <button
            onClick={handleRefreshProfile}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {lastRefresh && (
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          {authState.user && (
            <UserProfile
              user={authState.user}
              onUpdateProfile={async (profileData) => {
                try {
                  console.log('ProfilePage: Updating profile with data:', profileData);
                  await updateProfile(profileData);
                  console.log('ProfilePage: Profile updated successfully');
                } catch (error) {
                  console.error('ProfilePage: Error updating profile:', error);
                  throw error;
                }
              }}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Account Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900 font-medium">{authState.user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 font-medium capitalize">{authState.user.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-gray-900 font-medium">
                  {authState.user.createdAt?.toLocaleDateString() || 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <p className="text-gray-900 font-medium">
                  {authState.user.lastLogin?.toLocaleDateString() || 'Never'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Profile Completed</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  authState.user.profileCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {authState.user.profileCompleted ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Account Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  authState.user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {authState.user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {authState.user.permissions && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Permissions</h3>
              <div className="space-y-2">
                {authState.user.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 capitalize">
                      {permission.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Data Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Data Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Full Name:</span>
                <span className="text-sm font-medium">
                  {authState.user.fullName || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date of Birth:</span>
                <span className="text-sm font-medium">
                  {authState.user.dateOfBirth || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="text-sm font-medium">
                  {authState.user.phoneNumber || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Country:</span>
                <span className="text-sm font-medium">
                  {authState.user.country || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">State:</span>
                <span className="text-sm font-medium">
                  {authState.user.state || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Address:</span>
                <span className="text-sm font-medium">
                  {authState.user.address || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 