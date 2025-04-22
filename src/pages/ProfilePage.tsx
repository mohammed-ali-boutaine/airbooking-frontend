import React, { useState,useEffect } from 'react';
import UserProfileSection from '../components/UserProfileSection';
import { useUserStore } from "../store/useUserStore";

const ProfilePage: React.FC = () => {
  const { user, loading, updateUser } = useUserStore();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    console.log(user);
    useUserStore.getState().fetchUserFromToken();
    
  }, []);


  const handleSaveProfile = async (updatedData: Partial<typeof user>) => {
    try {
      setError(null);
      // In a real app, you would call your API here
      // await api.updateUserProfile(user.id, updatedData);
      
      // Update local state/store
      updateUser(updatedData);
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      setError(errorMessage);
      return Promise.reject(errorMessage);
    }
  };
  
  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    try {
      setError(null);
      // In a real app, you would call your API here
      // await api.changePassword(user.id, oldPassword, newPassword);
      
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
      setError(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Warning:</strong>
          <span className="block sm:inline"> User not found. Please log in again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-1">{error}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline ml-1">{successMessage}</span>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile Settings</h1>
      
      <UserProfileSection 
        userData={user}
        onSave={handleSaveProfile}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default ProfilePage;