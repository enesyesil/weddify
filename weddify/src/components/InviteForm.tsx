'use client';

import { useState } from 'react';

const InviteForm: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendees, setAttendees] = useState(1);
  const [responseMessage, setResponseMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');

    try {
      console.log('Submitting:', { firstName, lastName, attendees });
      const response = await fetch(`/api/events/${eventId}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, howMany: attendees }),
      });

      console.log('Response Status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        setResponseMessage(errorData.error || 'Failed to submit your response. Please try again.');
        return;
      }

      setResponseMessage('Thank you for your response!');
      setSubmitted(true);
    } catch (error) {
      console.error('Unexpected Error:', error);
      setResponseMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <label className="block text-black font-bold">Attendees</label>
          <input
            type="number"
            className="w-full px-3 py-2 border-2 border-black border-b-4 bg-white text-black rounded shadow-sm focus:outline-none focus:ring-black focus:border-black"
            value={attendees}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setAttendees(!isNaN(value) ? Math.max(1, value) : 1);
            }}
            min={1}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg border-b-4 border-zinc-600 shadow-sm font-bold"
          disabled={submitted || isLoading}
        >
          {isLoading ? 'Submitting...' : submitted ? 'Submitted' : 'Count me in!'}
        </button>
      </form>
      {responseMessage && <p className="text-black font-bold mt-4">{responseMessage}</p>}
    </div>
  );
};

export default InviteForm;
