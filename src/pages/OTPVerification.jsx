
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import OtpInput from '../components/OtpInput';
import StatusIcon from '../components/StatusIcon';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, isNewAccount, forPasswordReset } = location.state || {};
  
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timeLeft > 0 && !verificationStatus) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, verificationStatus]);

  const handleOtpChange = (value) => {
    setOtp(value);
    // Clear any previous error
    if (verificationStatus === 'error') {
      setVerificationStatus(null);
      setErrorMessage('');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      setErrorMessage('Please enter a valid OTP code');
      return;
    }

    setVerificationStatus('verifying');
    
    // Simulate API verification
    setTimeout(() => {
      if (otp === '1234') { // Success case for demo
        setVerificationStatus('success');
        
        // Wait for a moment to show success state
        setTimeout(() => {
          if (forPasswordReset) {
            navigate('/create-password');
          } else if (isNewAccount) {
            navigate('/welcome');
          } else {
            navigate('/login');
          }
        }, 1000);
      } else {
        setVerificationStatus('error');
        setErrorMessage('Wrong OTP. Please try again.');
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    // Reset the timer and status
    setTimeLeft(60);
    setVerificationStatus(null);
    setErrorMessage('');
    
    // In a real app, you would make an API call to resend OTP
    console.log('Resending OTP');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CustomHeader title="OTP Verification" />
      
      <div className="flex-1 px-4 py-6">
        {verificationStatus === 'success' ? (
          <div className="text-center">
            <StatusIcon type="success" />
            <h2 className="text-xl font-semibold mb-2">Verification Successful</h2>
            <p className="text-gray-600 mb-8">Your phone number has been verified successfully.</p>
          </div>
        ) : verificationStatus === 'error' ? (
          <div className="text-center">
            <StatusIcon type="error" />
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-error mb-8">{errorMessage}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Enter Verification Code</h2>
              <p className="text-gray-600">
                We've sent a 4-digit code to <br />
                <span className="font-medium">{phone || '+1 (555) 123-4567'}</span>
              </p>
            </div>

            <OtpInput
              length={4}
              value={otp}
              onChange={handleOtpChange}
            />

            {errorMessage && <p className="text-error text-center mb-4">{errorMessage}</p>}

            <div className="text-center mb-8">
              {timeLeft > 0 ? (
                <p className="text-gray-500">
                  Resend code in <span className="font-medium">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-primary font-medium"
                >
                  Resend Code
                </button>
              )}
            </div>
          </>
        )}

        {verificationStatus === 'verifying' ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : verificationStatus !== 'success' ? (
          <CustomButton
            label="Verify"
            onClick={handleVerifyOtp}
            disabled={otp.length !== 4}
          />
        ) : null}
      </div>
    </div>
  );
};

export default OTPVerification;
