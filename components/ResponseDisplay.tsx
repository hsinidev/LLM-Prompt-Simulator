
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon, LoadingDotsIcon } from './icons';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <LoadingDotsIcon className="h-12 w-12" />
          <p className="mt-4 text-lg">Generating response...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-400">
          <p>{error}</p>
        </div>
      );
    }
    if (response) {
      return (
        <pre className="whitespace-pre-wrap break-words text-gray-200 font-sans text-base">
          {response}
        </pre>
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>The generated response will appear here.</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg h-full flex flex-col relative">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300">Generated Response</h3>
            {response && !isLoading && (
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Copy response to clipboard"
                >
                    {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
                </button>
            )}
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
            {renderContent()}
        </div>
    </div>
  );
};

export default ResponseDisplay;
