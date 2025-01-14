'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const CreateEvent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  // Check if the user has an active subscription
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/check-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: session?.user?.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setHasActiveSubscription(data.hasActiveSubscription);
        } else {
          setError('Failed to verify subscription status. Please try again.');
        }
      } catch (err) {
        setError('An unexpected error occurred while checking subscription.');
      }
    };

    if (session?.user?.id) {
      checkSubscription();
    } else if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hasActiveSubscription) {
      setError('You need an active subscription to create events.');
      return;
    }

    if (new Date(date) <= new Date()) {
      setError('The event date must be in the future.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date,
          location,
          message,
          headerText,
          footerText,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/event/${data.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create event');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
          required
        />
        <textarea
          placeholder="Event Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
          rows={3}
        />
        <input
          type="text"
          placeholder="Header Text"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
        />
        <input
          type="text"
          placeholder="Footer Text"
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
          className="w-full mb-4 p-2 border border-black rounded"
        />
        <button
          type="submit"
          className={`bg-black text-white py-2 px-4 rounded font-bold w-full ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
