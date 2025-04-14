import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'social';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  disabled?:boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  onClick, 
  type = 'button',
  disabled = false,
  icon
}) => {
  const baseClasses = "inline-flex justify-center items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none transition-colors duration-300  hover:cursor-pointer";
  
  const variantClasses = {
    primary: "border-transparent text-white bg-[var(--primary-color)] hover:opacity-75",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    social: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;