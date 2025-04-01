
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Mock country data
const countries = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
];

const CountrySelect = ({ selectedCountry, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(selectedCountry || countries[0]);

  const handleSelect = (country) => {
    setCountry(country);
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div className="relative w-24">
      <button
        type="button"
        className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <span className="mr-1">{country.flag}</span>
          <span className="text-sm">{country.dialCode}</span>
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {countries.map((item) => (
            <div
              key={item.code}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              <span className="mr-2">{item.flag}</span>
              <span className="text-sm">{item.name}</span>
              <span className="ml-auto text-sm text-gray-500">{item.dialCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
