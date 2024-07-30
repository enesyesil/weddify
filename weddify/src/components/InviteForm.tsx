'use client';

import { useState, useEffect } from 'react';

const InviteForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendees, setAttendees] = useState<string>('0');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/submit-invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        attendees: parseInt(attendees),
      }),
    });

    const data = await response.json();
    if (data.success) {
      setResponseMessage('Thank you for your response!');
    } else {
      setResponseMessage('Failed to submit your response. Please try again.');
    }
  };

  useEffect(() => {
    // Ensure attendees is always a valid number string
    if (isNaN(parseInt(attendees))) {
      setAttendees('0');
    }
  }, [attendees]);

  return (
    <div className="w-full mx-auto p-4 max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black font-bold">First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border-2 border-black border-b-4 bg-white text-black rounded shadow-sm focus:outline-none focus:ring-black focus:border-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold">Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border-2 border-black border-b-4 bg-white text-black rounded shadow-sm focus:outline-none focus:ring-black focus:border-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold">How many people will be with you? (Including you)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border-2 border-black border-b-4 bg-white text-black rounded shadow-sm focus:outline-none focus:ring-black focus:border-black"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded shadow-sm font-bold py-2 px-4 border border-b-8 border-zinc-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Count me in!
        </button>
      </form>
      {responseMessage && <p className="text-black font-bold mt-4">{responseMessage}</p>}
    </div>
  );
};

export default InviteForm;
