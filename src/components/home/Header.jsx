"use client";

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { TypewriterEffectSmooth } from "../common/typewritter/ui/typewriter-effect";
import logo from "../common/assets/logo.png";

export function Header() {
  const words = [
    {
      text: "Do",
    },
    {
      text: "you",
    },
    {
      text: "need",
    },
    {
      text: "help",
    },
    {
      text: "with",
    },
    {
      text: "an",
    },
    {
      text: "idea?",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <header className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="flex items-center mb-6">
        <img src={logo} alt="Your Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-bold text-neutral-600 dark:text-neutral-200">WritersMuse</h1>
      </div>

      <div className="text-center mb-6">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mb-4">
          Where Inspiration Meets Innovation
        </p>
        <TypewriterEffectSmooth words={words} className="mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link to="/login">
            <button className="w-40 h-12 rounded-xl bg-black border border-transparent text-white text-sm hover:bg-gray-800 transition-colors duration-300">
              Login now
            </button>
          </Link>
          <Link to="/register">
            <button className="w-40 h-12 rounded-xl bg-white text-black border border-black hover:bg-gray-200 transition-colors duration-300 text-sm">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
