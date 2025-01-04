'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '@/components/MainHeader'; // Adjust path based on your project structure
import Footer from '@/components/LandingFooter'; // Adjust path based on your project structure

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
};

type Guest = {
  id: number;
  firstName: string;
  lastName: string;
  EventId: string;
  howMany: number;
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      }
    };

    if (session) {
      fetchEvents();
    }
  }, [session]);

  const handleViewGuests = async (eventId: number) => {
    setLoadingGuests(true);
    setError(null);

    try {
      const event = events.find((e) => e.id === eventId);
      const response = await fetch(`/api/events/${eventId}/guests`);
      if (!response.ok) throw new Error('Failed to fetch guests');
      const data = await response.json();
      setGuests(data);
      
      setSelectedEvent(event || null);
    } catch (err) {
      console.error('Error fetching guests:', err);
      setError('Failed to load guests. Please try again later.');
    } finally {
      setLoadingGuests(false);
    }
  };

  const handleCreateEvent = () => {
    router.push('/dashboard/create-event');
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-yellow-400">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">My Events</h2>
            {events.length === 0 ? (
              <div>
                <p className="text-lg font-bold mb-4">You have no events yet.</p>
                <button
                  onClick={handleCreateEvent}
                  className="bg-black text-white py-2 px-4 rounded-lg font-bold"
                >
                  Create Event
                </button>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-4 rounded-lg shadow border mb-4"
                >
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Location: {event.location}</p>
                  <p className="mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => handleViewGuests(event.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                      See List
                    </button>
                    <button
                      onClick={() => router.push(`/event/${event.id}`)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    >
                      Invite Page
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {selectedEvent && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                <p className="mb-4">{selectedEvent.description}</p>
                <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                <p>Location: {selectedEvent.location}</p>
              </div>
              <h2 className="text-2xl font-bold mb-4">List of Guests</h2>
              {loadingGuests ? (
                <p>Loading guests...</p>
              ) : guests.length === 0 ? (
                <p>No guests for this event.</p>
              ) : (
                <table className="w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border">First Name</th>
                      <th className="p-2 border">Last Name</th>
                      <th className="p-2 border">How Many</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr key={guest.id}>
                        <td className="p-2 border">{guest.firstName}</td>
                        <td className="p-2 border">{guest.lastName}</td>
                        <td className="p-2 border">{guest.howMany}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
