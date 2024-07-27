import React from 'react';
import Navbar from '../common/Navbar';
import InputField from '../common/form/InputField';
import Button from '../common/button/Button';

const ForgotPasswordForm = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <InputField id="email" label="Email" type="email" placeholder="Enter your email" />
          <Button text="Send OTP" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
