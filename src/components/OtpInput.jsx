
import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ length = 4, value, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      setOtp([...otpArray, ...Array(length - otpArray.length).fill('')]);
    }
  }, [value, length]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Combine the OTP digits and call the onChange
    const otpValue = newOtp.join('');
    onChange(otpValue);
    
    // Move to next input if current field is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move focus to previous input on backspace if current is empty
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length).split('');
    if (pasteData.some(char => isNaN(char))) return;
    
    const newOtp = [...otp];
    pasteData.forEach((value, i) => {
      newOtp[i] = value;
    });
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus on the next empty input or the last one
    const lastFilledIndex = Math.min(pasteData.length, length - 1);
    inputRefs.current[lastFilledIndex].focus();
  };

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : null}
          className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          maxLength={1}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OtpInput;
