
import React from 'react';

const CustomButton = ({ 
  onClick, 
  label, 
  type = 'primary', 
  disabled = false,
  fullWidth = true,
  className = ''
}) => {
  const baseClasses = "py-3 px-6 rounded-md font-medium text-white transition-all duration-200";
  
  const buttonTypes = {
    primary: "bg-primary hover:bg-primary/90",
    error: "bg-error hover:bg-error/90",
    outline: "bg-white text-primary border border-primary hover:bg-gray-50"
  };

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${buttonTypes[type]} ${disabledClass} ${widthClass} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
