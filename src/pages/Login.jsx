
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API login
      setTimeout(() => {
        setIsLoading(false);
        // For demo: email: 'demo@example.com', password: 'password123'
        if (formData.email === 'demo@example.com' && formData.password === 'password123') {
          navigate('/welcome');
        } else {
          setErrors({
            general: 'Invalid email or password. Please try again.'
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CustomHeader title="Login" />
      
      <div className="flex-1 px-4 py-6">
        {errors.general && (
          <div className="bg-error/10 text-error p-3 rounded-md mb-6 text-center">
            {errors.general}
          </div>
        )}

        <div className="mb-8">
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

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            icon={<Lock size={18} className="text-gray-400" />}
          />

          <button
            onClick={() => navigate('/forgot-password')}
            className="text-primary text-sm font-medium mt-2 self-end"
          >
            Forgot Password?
          </button>
        </div>

        <CustomButton
          label={isLoading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={isLoading}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-primary font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
