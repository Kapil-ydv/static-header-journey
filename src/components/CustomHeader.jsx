
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomHeader = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-start w-full p-4 bg-white border-b border-gray-200">
      {showBackButton && (
        <button 
          onClick={goBack} 
          className="mr-4 p-1 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="text-lg font-medium">{title}</h1>
    </div>
  );
};

export default CustomHeader;
