'use client';

import { useState } from 'react';

const InviteForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendees, setAttendees] = useState(0);
  const [message, setMessage] = useState('');
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
        attendees,
        message,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setResponseMessage('Thank you for your response!');
    } else {
      setResponseMessage('Failed to submit your response. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-white font-minecraft">First Name</label>
          <input
            type="text"
            className="w-full px-2 py-1 border-4 border-brown-600 bg-transparent text-white rounded-none shadow-inner font-minecraft"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-white font-minecraft">Last Name</label>
          <input
            type="text"
            className="w-full px-2 py-1 border-4 border-brown-600 bg-transparent text-white rounded-none shadow-inner font-minecraft"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-white font-minecraft">How many people will be with you? (Including you)</label>
          <input
            type="number"
            className="w-full px-2 py-1 border-4 border-brown-600 bg-transparent text-white rounded-none shadow-inner font-minecraft"
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-white font-minecraft">Invite Message</label>
          <textarea
            className="w-full px-2 py-1 border-4 border-brown-600 bg-transparent text-white rounded-none shadow-inner font-minecraft"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-brown-600 text-white py-1 border-4 border-b-8 border-r-8 rounded-none shadow font-minecraft"
        >
          Submit
        </button>
      </form>
      {responseMessage && <p className="text-white font-minecraft mt-4">{responseMessage}</p>}
    </div>
  );
};

export default InviteForm;
