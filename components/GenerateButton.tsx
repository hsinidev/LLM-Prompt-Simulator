
import React from 'react';
import { SpinnerIcon } from './icons';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200"
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Generating...
        </>
      ) : (
        'Generate Response'
      )}
    </button>
  );
};

export default GenerateButton;
