"use client";

import React from 'react';
import logo from "../common/assets/logo.png";
import twitterImg from "../common/assets/xlogo.png"; // Add your Twitter PNG image path here
import linkedinImg from "../common/assets/linkedin.png"; // Add your LinkedIn PNG image path here

// Replace with actual social media links
const socialLinks = [
  { href: "https://twitter.com/Okoyeanthonyy", icon: twitterImg, alt: "Twitter" },
  //{ href: "https://linkedin.com", icon: linkedinImg, alt: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow dark:bg-gray-800 py-4 px-6">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <a href="https://flowbite.com/" className="flex items-center mb-4 md:mb-0 space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">WritersMuse</span>
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-400">
            {socialLinks.map((social, index) => (
              <li key={index} className="me-4 md:me-6">
                <a href={social.href} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                  <img src={social.icon} alt={social.alt} className="h-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-700 w-full" />
        <span className="block text-sm text-gray-400 text-center">
          © 2024 <a href="https://writersmuse.com.ng/" className="hover:underline text-gray-300">WritersMuse™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
