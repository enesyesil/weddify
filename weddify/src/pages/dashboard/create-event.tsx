'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateEvent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.id}`, // Pass the user ID
        },
        body: JSON.stringify({ name, date, location, userId: session?.user?.id }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/event/${data.id}`); // Redirect to the created event's page
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create event');
      }
    } catch (error) {
      setError('An unexpected error occurred');
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
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded font-bold w-full"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
