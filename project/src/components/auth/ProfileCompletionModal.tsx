import React, { useState } from 'react';
import { X, User, Calendar, MapPin, Phone, Globe, Building } from 'lucide-react';
import { ProfileData } from '../../types/auth';

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: ProfileData) => Promise<void>;
  isLoading: boolean;
}

const steps = [
  { key: 'fullName', label: 'Full Name', icon: User, placeholder: 'Enter your full name' },
  { key: 'dateOfBirth', label: 'Date of Birth', icon: Calendar, placeholder: 'YYYY-MM-DD' },
  { key: 'address', label: 'Address', icon: MapPin, placeholder: 'Enter your full address' },
  { key: 'country', label: 'Country', icon: Globe, placeholder: 'Enter your country' },
  { key: 'state', label: 'State/Province', icon: Building, placeholder: 'Enter your state or province' },
  { key: 'phoneNumber', label: 'Phone Number', icon: Phone, placeholder: 'Enter your phone number' }
];

export const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  isLoading
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    dateOfBirth: '',
    address: '',
    country: '',
    state: '',
    phoneNumber: ''
  });

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  const handleInputChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      [currentStepData.key]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete profile
      onComplete(profileData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setCurrentStep(0);
      setProfileData({
        fullName: '',
        dateOfBirth: '',
        address: '',
        country: '',
        state: '',
        phoneNumber: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Complete Your Profile</h2>
              <p className="text-green-100 text-sm mt-1">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-white hover:text-green-100 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 bg-green-400 bg-opacity-30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentStepData.label}
            </h3>
            <p className="text-gray-600 text-sm">
              Please provide your {currentStepData.label.toLowerCase()}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentStepData.label}
              </label>
              <div className="relative">
                <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={currentStepData.key === 'dateOfBirth' ? 'date' : 'text'}
                  value={profileData[currentStepData.key as keyof ProfileData]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder={currentStepData.placeholder}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0 || isLoading}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!profileData[currentStepData.key as keyof ProfileData] || isLoading}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Saving...' : currentStep === steps.length - 1 ? 'Complete Profile' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 