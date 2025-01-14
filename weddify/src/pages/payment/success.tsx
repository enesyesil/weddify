'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Success = () => {
  const router = useRouter();
  const { plan } = router.query;

  useEffect(() => {
    const updateSubscription = async () => {
      try {
        const response = await fetch('/api/update-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ plan }),
        });

        if (response.ok) {
          alert('Payment successful! Subscription activated.');
          router.push('/dashboard');
        } else {
          alert('Failed to update subscription. Please contact support.');
        }
      } catch (err) {
        alert('An error occurred. Please try again.');
      }
    };

    if (plan) {
      updateSubscription();
    }
  }, [plan, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
    </div>
  );
};

export default Success;
