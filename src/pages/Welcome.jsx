
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 text-center">
        <div className="mb-8">
          <div className="bg-primary/10 rounded-full p-6 inline-block mb-4">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path 
                d="M32 6C17.6 6 6 17.6 6 32C6 46.4 17.6 58 32 58C46.4 58 58 46.4 58 32C58 17.6 46.4 6 32 6ZM32 52C21 52 12 43 12 32C12 21 21 12 32 12C43 12 52 21 52 32C52 43 43 52 32 52Z" 
                fill="currentColor"
              />
              <path 
                d="M32 24C35.3137 24 38 21.3137 38 18C38 14.6863 35.3137 12 32 12C28.6863 12 26 14.6863 26 18C26 21.3137 28.6863 24 32 24Z" 
                fill="currentColor"
              />
              <path 
                d="M44 36C47.3137 36 50 33.3137 50 30C50 26.6863 47.3137 24 44 24C40.6863 24 38 26.6863 38 30C38 33.3137 40.6863 36 44 36Z" 
                fill="currentColor"
              />
              <path 
                d="M44 52C47.3137 52 50 49.3137 50 46C50 42.6863 47.3137 40 44 40C40.6863 40 38 42.6863 38 46C38 49.3137 40.6863 52 44 52Z" 
                fill="currentColor"
              />
              <path 
                d="M20 36C23.3137 36 26 33.3137 26 30C26 26.6863 23.3137 24 20 24C16.6863 24 14 26.6863 14 30C14 33.3137 16.6863 36 20 36Z" 
                fill="currentColor"
              />
              <path 
                d="M20 52C23.3137 52 26 49.3137 26 46C26 42.6863 23.3137 40 20 40C16.6863 40 14 42.6863 14 46C14 49.3137 16.6863 52 20 52Z" 
                fill="currentColor"
              />
              <path 
                d="M32 52C35.3137 52 38 49.3137 38 46C38 42.6863 35.3137 40 32 40C28.6863 40 26 42.6863 26 46C26 49.3137 28.6863 52 32 52Z" 
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to PayCay</h1>
          <p className="text-gray-600 mb-8">
            Your account is set up and ready to go!<br />
            Start using the app to manage your payments.
          </p>
        </div>

        <div className="w-full space-y-4">
          <CustomButton
            label="Start Using PayCay"
            onClick={() => console.log("Navigate to main app")}
          />
          
          <CustomButton
            label="Back to Login"
            type="outline"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
      
      <div className="p-4 text-center text-sm text-gray-500">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Welcome;
