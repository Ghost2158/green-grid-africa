import React, { useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { ProfileData } from '../../types/auth';
import { Edit3, Save, X, User as UserIcon } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onUpdateProfile: (profileData: ProfileData) => Promise<void>;
  isLoading: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    dateOfBirth: '',
    address: '',
    country: '',
    state: '',
    phoneNumber: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync local state with user prop
  useEffect(() => {
    // Always pull from backend for non-demo users
    if (user && !user.email?.endsWith('@greengrid.com')) {
      // Real user: fetch from Supabase (already handled by parent refreshUserProfile)
      setProfileData({
        fullName: user.fullName || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        country: user.country || '',
        state: user.state || '',
        phoneNumber: user.phoneNumber || ''
      });
    } else if (user) {
      // Demo user: use mock data
      setProfileData({
        fullName: user.fullName || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        country: user.country || '',
        state: user.state || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) {
      console.error('No user ID available for profile update');
      return;
    }

    // Validate required fields
    if (!profileData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      console.log('Saving profile data:', profileData);
      await onUpdateProfile(profileData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      fullName: user.fullName || '',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || '',
      country: user.country || '',
      state: user.state || '',
      phoneNumber: user.phoneNumber || ''
    });
    setIsEditing(false);
  };

  const isFormValid = profileData.fullName.trim() !== '' && 
                     profileData.dateOfBirth.trim() !== '' && 
                     profileData.phoneNumber.trim() !== '';

  const renderField = (label: string, field: keyof ProfileData, type: string = 'text', required: boolean = false) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isEditing ? (
        <input
          type={type}
          value={profileData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <p className="text-gray-900 font-medium">
          {profileData[field] || 'Not provided'}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
            <p className="text-sm text-gray-500">Manage your personal details</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!isFormValid || isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {isEditing && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Fields marked with * are required.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('Full Name', 'fullName', 'text', true)}
        {renderField('Date of Birth', 'dateOfBirth', 'date', true)}
        {renderField('Phone Number', 'phoneNumber', 'tel', true)}
        {renderField('Country', 'country')}
        {renderField('State', 'state')}
        {renderField('Address', 'address')}
      </div>

      {isEditing && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-yellow-800 text-sm">
            <strong>Tip:</strong> Make sure all required fields are filled before saving.
          </p>
        </div>
      )}
    </div>
  );
}; 