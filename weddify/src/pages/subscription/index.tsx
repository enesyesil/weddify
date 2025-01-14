'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '@/components/MainHeader'; // Adjust path based on your project structure
import Footer from '@/components/LandingFooter'; // Adjust path based on your project structure

const Subscription = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleProceed = () => {
    if (!selectedPlan) {
      alert('Please select a subscription plan before proceeding.');
      return;
    }

    if (selectedPlan === 'enterprise') {
      fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'user@example.com' }), // Replace with dynamic user email
      })
        .then(() => alert('Your inquiry has been sent!'))
        .catch(() => alert('Failed to send inquiry.'));
    } else {
      router.push(`/payment/${selectedPlan}`);
    }
  };

  return (
    <div> 
    <Header />
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
        
      <div className="bg-green-600 p-8 rounded-lg shadow-lg max-w-lg w-full border-b-4 border-green-400 ">
        <h1 className="text-2xl text-white font-bold mb-6 text-center">Choose Your Plan</h1>
        <div className="grid grid-cols-1 gap-4">
          <div
            onClick={() => setSelectedPlan('basic')}
            className={`cursor-pointer p-6 rounded-lg border-2 ${
              selectedPlan === 'basic' ? ' bg-green-500 border-gray-900 border-b-4 ' : 'border-gray-800'
            }`}
          >
            <h2 className="text-xl text-white font-bold">Basic Plan</h2>
            <p className="text-white">Up to 100 guests</p>
            <p className="text-whitefont-semibold text-white">$4.99/month</p>
          </div>
          <div
            onClick={() => setSelectedPlan('premium')}
            className={`cursor-pointer p-6 rounded-lg border-2 ${
              selectedPlan === 'premium' ?  ' bg-green-500 border-gray-900 border-b-4 ' : 'border-gray-800'
            }`}
          >
            <h2 className="text-xl text-white font-bold">Premium Plan</h2>
            <p className="text-white ">Up to 500 guests</p>
            <p className="text-white font-semibold">$9.99/month</p>
          </div>
          <div
            onClick={() => setSelectedPlan('enterprise')}
            className={`cursor-pointer p-6 rounded-lg border-2 ${
              selectedPlan === 'enterprise' ? ' bg-green-500 border-gray-900 border-b-4 ' : 'border-gray-800'
            }`}
          >
            <h2 className="text-xl text-white font-bold">Enterprise Plan</h2>
            <p className="text-white">Contact us for pricing</p>
          </div>
        </div>
        <button
          onClick={handleProceed}
          className="mt-6 bg-black text-white py-2 px-4 border-b-4 border-gray-600 rounded-lg w-full font-bold"
        >
          Proceed
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Subscription;
