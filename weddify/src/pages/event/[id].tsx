'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import EventHeader from './../../components/EventHeader'; // Adjust the path if necessary
import CountdownTimer from './../../components/CountdownTimer'; // Adjust the path if necessary
import InviteForm from './../../components/InviteForm'; // Adjust the path if necessary
import EventFooter from './../../components/EventFooter'; // Adjust the path if necessary

const EventPage: React.FC = () => {
  const [eventData, setEventData] = useState<any | null>(null); // Adjust the type if your API has a strict response type
  const router = useRouter();
  const { id } = router.query; // Get the event ID from the route

  useEffect(() => {
    const fetchEventData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/events/${id}`);
          const data = await response.json();
          setEventData(data);
        } catch (error) {
          console.error('Failed to fetch event data:', error);
        }
      }
    };
    fetchEventData();
  }, [id]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{eventData.name} - Invitation</title>
        <meta
          name="description"
          content={`Join us in celebrating "${eventData.name}" on ${new Date(
            eventData.date
          ).toLocaleDateString()}. RSVP to let us know how many will be attending.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-amber-200 p-4 mb-4">
        {/* Event Header */}
        <EventHeader text={eventData.headerText || 'Weddify'} />

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center flex-grow">
          <CountdownTimer targetDate={eventData.date} />
          <div className="bg-yellow-400 text-black text-center font-bold p-6 mt-6 mb-4 border-2 border-b-4 border-black rounded-lg shadow-lg max-w-lg mx-auto">
            {eventData.message}
          </div>
          <div className="bg-yellow-400 text-black text-center p-4 mt-4 mb-8 border-2 border-black border-b-4 rounded-lg shadow-lg max-w-lg mx-auto">
            <p className="text-md font-bold">Date: {new Date(eventData.date).toLocaleDateString()}</p>
            <p className="text-md font-bold">Time: {new Date(eventData.date).toLocaleTimeString()}</p>
            <p className="text-md font-bold">Location: {eventData.location}</p>
          </div>
          {/* Invite Form */}
          <InviteForm eventId={id as string} />
        </div>

        {/* Event Footer */}
        <EventFooter text={eventData.footerText || `© ${new Date().getFullYear()} Weddify`} />
      </div>
    </>
  );
};

export default EventPage;
