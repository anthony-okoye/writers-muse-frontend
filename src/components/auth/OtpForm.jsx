import React from 'react';
import Navbar from '../common/Navbar';
import InputField from '../common/form/InputField';
import Button from '../common/button/Button';

const OtpForm = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter OTP</h1>
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <InputField id="otp" label="OTP" type="text" placeholder="Enter your OTP" />
          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
