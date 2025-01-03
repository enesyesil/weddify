'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './EventHeader';
import CountdownTimer from '../components/CountdownTimer';
import InviteForm from '../components/InviteForm';
import Footer from './EventFooter';

const InvitePage: React.FC = () => {
  const [eventData, setEventData] = useState<any | null>(null); // Adjust type based on your API response
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          const response = await fetch(`/api/events/${eventId}`);
          const data = await response.json();
          setEventData(data);
        } catch (error) {
          console.error('Failed to fetch event data:', error);
        }
      }
    };
    fetchEventData();
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{eventData.name} Invitation</title>
        <meta
          name="description"
          content={`Join us in celebrating the event "${eventData.name}" on ${new Date(
            eventData.date
          ).toLocaleDateString()}. RSVP to let us know how many will be attending.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-amber-200 p-4">
        <Navbar />
        <div className="flex flex-col justify-center items-center flex-grow">
          <CountdownTimer targetDate={eventData.date} />
          <div className="bg-yellow-400 text-black text-center font-bold p-6 mt-6 mb-4 border-2 border-b-4 border-black rounded-lg shadow-lg max-w-lg mx-auto">
            {eventData.description}
          </div>
          <div className="bg-yellow-400 text-black text-center p-4 mt-4 mb-8 border-2 border-black border-b-4 rounded-lg shadow-lg max-w-lg mx-auto">
            <p className="text-md font-bold">Date: {new Date(eventData.date).toLocaleDateString()}</p>
            <p className="text-md font-bold">Time: {eventData.time}</p>
            <p className="text-md font-bold">Location: {eventData.location}</p>
          </div>
          <InviteForm eventId={eventId as string} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InvitePage;
