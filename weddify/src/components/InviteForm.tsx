'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="text-center mb-8 font-minecraft">
      {Object.keys(timeLeft).length === 0 ? (
        <span className="text-white">Time&apos;s up!</span>
      ) : (
        <div className="flex justify-center flex-wrap">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center justify-center text-white bg-green-100 border-4 border-brown-600 max-w-full min-w-full rounded-none shadow-inner">
              <span className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{value as number}</span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
    <div className="w-auto mx-auto p-2">
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
            onChange={(e) => setAttendees(e.target.value)}
            required
          />
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

const InvitePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-wedding-bg bg-cover bg-center p-4">
      <div className="bg-brown-600 bg-opacity-75 text-white font-minecraft text-center p-2 mt-8 mb-8 border-4 border-b-8 border-r-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-white font-minecraft text-2xl">
          Gaye & Enes
        </h1>
      </div>
      <CountdownTimer targetDate="2024-08-19T19:30:00" />
      <div className="bg-brown-600 bg-opacity-75 text-white font-minecraft text-center p-2 mt-8 mb-8 border-4 border-b-8 border-r-8 rounded shadow-md max-w-lg mx-auto">
        Dear guests, we are excited to invite you to our special day! Please fill out the form below to let us know how many will be attending. We can&apos;t wait to celebrate with you!
      </div>
      <InviteForm />
    </div>
  );
};

export default InvitePage;
