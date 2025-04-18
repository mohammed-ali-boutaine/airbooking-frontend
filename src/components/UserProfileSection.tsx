import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, MapPin, Lock, Camera } from 'lucide-react';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  address?: string;
  profileImage?: string;
}

interface UserProfileSectionProps {
  userData: UserProfileData;
  onSave: (updatedData: Partial<UserProfileData>) => Promise<void>;
  onPasswordChange: (oldPassword: string, newPassword: string) => Promise<void>;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  userData,
  onSave,
  onPasswordChange
}) => {
  // State for form data
  const [formData, setFormData] = useState<UserProfileData>(userData);
  const [isEditing, setIsEditing] = useState<{
    name: boolean;
    email: boolean;
    address: boolean;
  }>({ name: false, email: false, address: false });
  
  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for feedback messages
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update form data when userData changes
  useEffect(() => {
    setFormData(userData);
  }, [userData]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Toggle edit mode for fields
  const toggleEdit = (field: 'name' | 'email' | 'address') => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    
    // If we're exiting edit mode, reset the field to original value
    if (isEditing[field]) {
      setFormData(prev => ({
        ...prev,
        [field]: userData[field]
      }));
    }
  };
  
  // Save changes for a specific field
  const saveField = async (field: 'name' | 'email' | 'address') => {
    try {
      await onSave({ [field]: formData[field] });
      setIsEditing(prev => ({
        ...prev,
        [field]: false
      }));
      setFeedback({
        type: 'success',
        message: `Your ${field} has been updated successfully!`
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => {
        setFeedback({ type: '', message: '' });
      }, 3000);
    } catch (error : any) {
      console.log(error);
      
      setFeedback({
        type: 'error',
        message: `Failed to update ${field}. Please try again.`
      });
    }
  };
  
  // Submit password change
  const submitPasswordChange = async () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'New passwords do not match.'
      });
      return;
    }
    
    try {
      await onPasswordChange(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setFeedback({
        type: 'success',
        message: 'Password has been updated successfully!'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => {
        setFeedback({ type: '', message: '' });
      }, 3000);
    } catch (error :any) {
      console.log(error);

      setFeedback({
        type: 'error',
        message: 'Failed to update password. Please check your current password and try again.'
      });
    }
  };
  
  // Handle profile image change
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Here you would typically upload the image to your server
      // and get back a URL. This is a simplified example.
      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target && event.target.result) {
            // In a real app, you would upload the file to your server here
            // and get back the URL of the uploaded image
            const imageUrl = event.target.result.toString();
            
            // Update the profile image in your backend
            await onSave({ profileImage: imageUrl });
            
            // Update local state
            setFormData(prev => ({
              ...prev,
              profileImage: imageUrl
            }));
            
            setFeedback({
              type: 'success',
              message: 'Profile picture updated successfully!'
            });
            
            // Clear feedback after 3 seconds
            setTimeout(() => {
              setFeedback({ type: '', message: '' });
            }, 3000);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);

        setFeedback({
          type: 'error',
          message: 'Failed to update profile picture. Please try again.'
        });
      }
    }
  };
  
  // Get user initial for profile image placeholder
  const getUserInitial = () => {
    return userData.name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
      
      {/* Feedback message */}
      {feedback.message && (
        <div className={`mb-4 p-3 rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedback.message}
        </div>
      )}
      
      {/* Profile Image Section */}
      <div className="flex items-center mb-8">
        <div className="mr-6">
          <div 
            className="relative cursor-pointer group"
            onClick={handleImageClick}
          >
            {formData.profileImage ? (
              <img 
                src={formData.profileImage} 
                alt={userData.name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 border-2 border-indigo-500">
                {getUserInitial()}
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-800">{userData.name}</h3>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-sm text-indigo-600 mt-2 cursor-pointer hover:underline" onClick={handleImageClick}>
            Change profile picture
          </p>
        </div>
      </div>
      
      {/* Personal Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
        
        {/* Name Field */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <User size={16} className="mr-2" />
              Name
            </label>
            <button 
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => toggleEdit('name')}
            >
              {isEditing.name ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {isEditing.name ? (
            <div className="flex">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => saveField('name')}
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mt-1 text-gray-900">{formData.name}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Mail size={16} className="mr-2" />
              Email
            </label>
            <button 
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => toggleEdit('email')}
            >
              {isEditing.email ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {isEditing.email ? (
            <div className="flex">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => saveField('email')}
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mt-1 text-gray-900">{formData.email}</p>
          )}
        </div>
        
        {/* Address Field */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <MapPin size={16} className="mr-2" />
              Address
            </label>
            <button 
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => toggleEdit('address')}
            >
              {isEditing.address ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {isEditing.address ? (
            <div className="flex">
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your address"
              />
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => saveField('address')}
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mt-1 text-gray-900">{formData.address || 'No address provided'}</p>
          )}
        </div>
      </div>
      
      {/* Security Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2 flex items-center">
          <Lock size={18} className="mr-2" />
          Security
        </h3>
        
        {/* Password Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={submitPasswordChange}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;