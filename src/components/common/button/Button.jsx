import React from 'react';

const Button = ({ text }) => {
  return (
    <button
      className="w-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 transition duration-300"
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
