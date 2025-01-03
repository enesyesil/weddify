'use client';

import { useEffect, useState } from 'react';

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  attendees: number;
};

const EventsTable: React.FC<{ onSelectEvent: (eventId: number) => void }> = ({ onSelectEvent }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Your Events</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-yellow-400 text-black">
              <th className="px-4 py-2 text-left font-bold">Event Name</th>
              <th className="px-4 py-2 text-left font-bold">Date</th>
              <th className="px-4 py-2 text-left font-bold">Location</th>
              <th className="px-4 py-2 text-left font-bold">Attendees</th>
              <th className="px-4 py-2 text-left font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="px-4 py-2">{event.name}</td>
                <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.attendees}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => onSelectEvent(event.id)}
                  >
                    View Guests
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
