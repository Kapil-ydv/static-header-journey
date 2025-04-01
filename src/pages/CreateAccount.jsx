
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import CountrySelect from '../components/CountrySelect';
import { AtSign, Lock, User } from 'lucide-react';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
  });
  const [errors, setErrors] = useState({});

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would make an API call here
      console.log('Form submitted:', formData);
      
      // Navigate to OTP verification
      navigate('/otp-verification', { 
        state: { 
          phone: `${selectedCountry.dialCode} ${formData.phone}`,
          isNewAccount: true 
        } 
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CustomHeader title="Create Free Account" showBackButton={false} />
      
      <div className="flex-1 px-4 py-6">
        <div className="mb-8">
          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            icon={<User size={18} className="text-gray-400" />}
          />

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

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            icon={<Lock size={18} className="text-gray-400" />}
          />
        </div>

        <div className="text-sm text-gray-500 mb-8">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>

        <CustomButton
          label="Create Account"
          onClick={handleSubmit}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary font-medium"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
