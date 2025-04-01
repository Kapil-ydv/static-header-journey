
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import StatusIcon from '../components/StatusIcon';

const CreatePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: formData.password.length >= 8 },
    { id: 'uppercase', label: 'At least 1 uppercase letter', met: /[A-Z]/.test(formData.password) },
    { id: 'lowercase', label: 'At least 1 lowercase letter', met: /[a-z]/.test(formData.password) },
    { id: 'number', label: 'At least 1 number', met: /[0-9]/.test(formData.password) },
    { id: 'special', label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear any previous errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every(req => req.met);
    
    if (!allRequirementsMet) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
      setStatus('processing');
      
      setTimeout(() => {
        // For demo, always succeed
        setStatus('success');
        
        // After showing success state, navigate to login
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CustomHeader title="Create New Password" />
      
      <div className="flex-1 px-4 py-6">
        {status === 'success' ? (
          <div className="text-center">
            <StatusIcon type="success" />
            <h2 className="text-xl font-semibold mb-2">Password Reset Successful</h2>
            <p className="text-gray-600 mb-8">
              Your password has been reset successfully.
              Redirecting to login...
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center">
            <StatusIcon type="error" />
            <h2 className="text-xl font-semibold mb-2">Password Reset Failed</h2>
            <p className="text-error mb-8">
              Something went wrong. Please try again.
            </p>
            <CustomButton
              label="Try Again"
              onClick={() => setStatus(null)}
            />
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Create a New Password</h2>
              <p className="text-gray-600">
                Your new password must be different from previous passwords
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className={`w-full p-3 pl-10 border ${
                    errors.password ? 'border-error' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className={`w-full p-3 pl-10 border ${
                    errors.confirmPassword ? 'border-error' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="mb-8 bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements</h3>
              <ul className="space-y-2">
                {passwordRequirements.map((req) => (
                  <li key={req.id} className="flex items-center text-sm">
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full mr-2 ${
                        req.met ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      {req.met && <Check size={12} color="white" />}
                    </span>
                    <span className={req.met ? 'text-gray-700' : 'text-gray-500'}>
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <CustomButton
              label={status === 'processing' ? "Creating Password..." : "Create Password"}
              onClick={handleSubmit}
              disabled={status === 'processing'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePassword;
