
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign } from 'lucide-react';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import CountrySelect from '../components/CountrySelect';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('phone'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (method === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        
        if (method === 'phone') {
          navigate('/otp-verification', { 
            state: { 
              phone: `${selectedCountry.dialCode} ${formData.phone}`,
              forPasswordReset: true 
            } 
          });
        } else {
          // In a real app, you would send email reset instructions
          navigate('/otp-verification', { 
            state: { 
              phone: formData.email, // Just to show something on the next screen
              forPasswordReset: true 
            } 
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CustomHeader title="Forgot Password" />
      
      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">Reset Your Password</h2>
          <p className="text-gray-600">
            Select which contact details should we use to reset your password
          </p>
        </div>

        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 py-3 px-4 rounded-md border ${
              method === 'phone' 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-gray-300 text-gray-500'
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 py-3 px-4 rounded-md border ${
              method === 'email' 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-gray-300 text-gray-500'
            }`}
          >
            Email
          </button>
        </div>

        {method === 'email' ? (
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            icon={<AtSign size={18} className="text-gray-400" />}
          />
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center">
              <CountrySelect
                selectedCountry={selectedCountry}
                onChange={setSelectedCountry}
              />
              <div className="flex-1 ml-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className={`w-full p-3 border ${
                    errors.phone ? 'border-error' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-error">{errors.phone}</p>
            )}
          </div>
        )}

        <div className="mt-8">
          <CustomButton
            label={isSubmitting ? "Sending..." : "Send Reset Instructions"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
