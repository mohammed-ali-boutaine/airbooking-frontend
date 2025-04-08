

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-red-500 text-center mb-6">Create account</h2>
      
      <form >
        <Input 
          type="text" 
          label="Username" 
          placeholder="your full name her ..." 
          value={formData.username}
          onChange={handleChange}
        />
        
        <Input 
          type="email" 
          label="Email" 
          placeholder="example@example.com" 
          value={formData.email}
          onChange={handleChange}
        />
        
        <Input 
          type="password" 
          label="Password" 
          placeholder="strong password" 
          value={formData.password}
          onChange={handleChange}
        />
        
        <div className="mt-6">
          <Button variant="primary" fullWidth type="submit">
            Continue
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <Button variant="social" fullWidth icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
            </svg>
          }>
            Continue With
          </Button>
          
          <Button variant="social" fullWidth icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          }>
            Continue With
          </Button>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>By signing in or creating an account, you agree with our <a href="#" className="text-blue-500 hover:underline">Terms & conditions</a> and <a href="#" className="text-blue-500 hover:underline">Privacy statement</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;

// File: components/LoginForm.tsx
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-red-500 text-center mb-6">Login to your account</h2>
      
      <form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          label="Email" 
          placeholder="example@example.com" 
          value={formData.email}
          onChange={handleChange}
        />
        
        <Input 
          type="password" 
          label="Password" 
          placeholder="your password" 
          value={formData.password}
          onChange={handleChange}
        />
        
        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-red-500 hover:text-red-600">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <div>
          <Button variant="primary" fullWidth type="submit">
            Login
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="social" icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
            </svg>
          }>
            Google
          </Button>
          
          <Button variant="social" icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          }>
            Facebook
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account? <a href="#" className="text-red-500 hover:text-red-600 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;