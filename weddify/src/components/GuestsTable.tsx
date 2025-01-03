'use client';

import { useEffect, useState } from 'react';

type Guest = {
  id: number;
  firstName: string;
  lastName: string;
};

const GuestsTable: React.FC<{ eventId: number }> = ({ eventId }) => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch(`/api/events/${eventId}/guests`);
      const data = await response.json();
      setGuests(data);
    };

    fetchGuests();
  }, [eventId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Guests for Event {eventId}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-yellow-400 text-black">
              <th className="px-4 py-2 text-left font-bold">First Name</th>
              <th className="px-4 py-2 text-left font-bold">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b">
                <td className="px-4 py-2">{guest.firstName}</td>
                <td className="px-4 py-2">{guest.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestsTable;
