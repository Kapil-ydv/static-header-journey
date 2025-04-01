
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

const StatusIcon = ({ type }) => {
  if (type === 'success') {
    return (
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center bg-primary rounded-full">
          <Check size={32} color="white" />
        </div>
      </div>
    );
  } else if (type === 'error') {
    return (
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center bg-error rounded-full">
          <AlertTriangle size={32} color="white" />
        </div>
      </div>
    );
  }
  
  return null;
};

export default StatusIcon;
