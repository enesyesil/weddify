'use client';

import CountdownTimer from '../components/CountdownTimer';
import InviteForm from '../components/InviteForm';

const InvitePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-wedding-bg bg-cover bg-center p-4">
      <div className="bg-brown-600 bg-opacity-75 text-white font-minecraft text-center p-2 mt-8 mb-8 border-4 border-b-8 border-r-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-white font-minecraft text-2xl">Gaye & Enes</h1>
      </div>
      <CountdownTimer targetDate="2024-08-19T19:30:00" />
      <div className="bg-brown-600 bg-opacity-75 text-white font-minecraft text-center p-2 mt-8 mb-4 border-4 border-b-8 border-r-8 rounded shadow-md max-w-lg mx-auto">
        Dear guests, we are excited to invite you to our special day! Please fill out the form below to let us know how many will be attending. We can&apos;t wait to celebrate with you!
      </div>
      <div className="bg-brown-600 bg-opacity-75 text-white font-minecraft text-center p-2 mt-4 mb-8 border-4 border-b-8 border-r-8 rounded shadow-md max-w-lg mx-auto">
        <p className="text-white font-minecraft text-lg">Date: 19th August 2024</p>
        <p className="text-white font-minecraft text-lg">Location: 123 Wedding Venue St, City, Country</p>
      </div>
      <InviteForm />
    </div>
  );
};

export default InvitePage;
