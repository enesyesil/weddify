'use client';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
};

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login'); // Redirect to login page if not authenticated
    }
  }, [status, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // Fetch user's events
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (session) {
      fetchEvents();
    }
  }, [session]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-yellow-400 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button
        onClick={() => router.push('/dashboard/create-event')}
        className="bg-black text-white py-2 px-4 rounded-lg font-bold mb-6"
      >
        Create New Event
      </button>
      <h2 className="text-2xl font-bold mb-4">Your Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-lg shadow border border-black"
          >
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <button
              onClick={() => router.push(`/event/${event.id}`)} // Navigate to event details
              className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4"
            >
              View Event
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-center text-lg font-bold">No events created yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
