import React from 'react';

function Label({htmlFor, text}) {
  return (
    <label htmlFor={htmlFor} className="text-base font-semibold text-gray-700">
        {text} <span className="text-red-600 dark:text-red-400"></span>
    </label>
  )
}

export default Label;