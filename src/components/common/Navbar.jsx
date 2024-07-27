import React from 'react';
import { PELogoIcon } from './icons/Icons'
import LogoIcon from './assets/logo.png';

const Navbar = () => {
  return (
    <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0 flex flex-row">
        <div className="h-10 w-10 self-center mr-2">
        <img src={LogoIcon} alt="Logo" className='h-10 ' />
        </div>
        <div>
          <a href="/" className="text-2xl no-underline text-white hover:text-white-300 font-sans font-bold">WritersMuse</a><br />
          <span className="text-xs text-gray-300">Where Inspiration Meets Innovation</span>
        </div>
      </div>
      {/*<div className="sm:mb-0 self-center">
        <a href="#" className="text-md no-underline text-white hover:text-blue-300 ml-2 px-1">Link1</a>
        <a href="#" className="text-md no-underline text-gray-300 hover:text-blue-300 ml-2 px-1">Link2</a>
        <a href="#" className="text-md no-underline text-gray-300 hover:text-blue-300 ml-2 px-1">Link3</a>
      </div>*/}
    </nav>
  );
};

export default Navbar;
