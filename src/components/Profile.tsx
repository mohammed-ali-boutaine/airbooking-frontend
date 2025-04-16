import React, { useState, useEffect } from 'react';
import UserProfileSection from './UserProfileSection';
import { useUserStore } from "../../store/useUserStore";

// You would typically fetch this data from your API or user store
const ProfilePage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate loading user data if needed
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else {
      // If you need to fetch the user data
      setIsLoading(true);
      
      // Example of fetching user data
      const fetchUserData = async () => {
        try {
          // Replace with your actual API call
          // const response = await api.getUserProfile();
          // const userData = response.data;
          // setUser(userData);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load profile data. Please try again later.');
          setIsLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [user]);
  
  // Handle saving profile changes
  const handleSaveProfile = async (updatedData: Partial<typeof user>) => {
    try {
      // Call your API to update the user data
      // Example: await api.updateUserProfile(updatedData);
      
      // Update local state/store
      // Example with Zustand:
      // useUserStore.getState().updateUser(updatedData);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Handle password changes
  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    try {
      // Call your API to change the password
      // Example: await api.changePassword(oldPassword, newPassword);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }
  
  // Mock user data for this example (replace with your actual user from store)
  const mockUser = user || {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
    profileImage: ""
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <UserProfileSection 
        userData={mockUser}
        onSave={handleSaveProfile}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default ProfilePage;