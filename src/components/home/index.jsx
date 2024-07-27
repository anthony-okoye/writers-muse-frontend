// App.js or Main Component File
import React from 'react';
import Header from './Header';
import Navbar from '../common/Navbar';
import About from './About';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
