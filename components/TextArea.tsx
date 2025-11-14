
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 resize-y transition-colors duration-200"
      />
    </div>
  );
};

export default TextArea;
