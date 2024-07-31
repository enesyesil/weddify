'use client';

import { useState } from 'react';

const InviteForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendees, setAttendees] = useState<number>(1); // Default value as 5
  const [responseMessage, setResponseMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDecrement = () => {
    setAttendees((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setAttendees((prev) => Math.min(50, prev + 1));
  };

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
        attendees,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setResponseMessage('Thank you for your response!');
      setSubmitted(true);
    } else {
      setResponseMessage('Failed to submit your response. Please try again.');
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
          <label htmlFor="quantity-input" className="block text-black font-bold">How many people will be with you? (Including you)</label>
          <div className="relative flex items-center border-2 border-black border-b-4 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={handleDecrement}
              className="bg-black hover:bg-stone-800 border-0 text-white p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              value={attendees}
              readOnly
              className="bg-white text-black font-bold text-center text-lg block w-full h-11"
              required
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="bg-black hover:bg-stone-800 border-0 text-white p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded shadow-sm font-bold py-2 px-4 border border-b-8 border-zinc-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          disabled={submitted}
        >
          {submitted ? 'Already Submitted' : 'Count me in!'}
        </button>
      </form>
      {responseMessage && <p className="text-black font-bold mt-4">{responseMessage}</p>}
    </div>
  );
};

export default InviteForm;
