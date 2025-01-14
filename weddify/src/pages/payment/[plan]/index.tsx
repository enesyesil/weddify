'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Payment = () => {
  const router = useRouter();
  const { plan } = router.query;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (plan === 'basic') setAmount(499); // $4.99 in cents
    else if (plan === 'premium') setAmount(999); // $9.99 in cents
  }, [plan]);

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          amount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to Stripe Checkout page
        window.location.href = data.url;
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-400">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          {plan === 'basic' ? 'Basic Plan Payment' : 'Premium Plan Payment'}
        </h1>
        <p className="mb-4">Amount: ${(amount / 100).toFixed(2)}</p>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
