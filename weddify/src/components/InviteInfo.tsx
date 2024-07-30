'use client';

import Navbar from '../components/Navbar';
import CountdownTimer from '../components/CountdownTimer';
import InviteForm from '../components/InviteForm';
import Footer from './Footer';

const InvitePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-200 p-4">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow">
        <CountdownTimer targetDate="2024-08-19T19:30:00" />
        <div className="bg-yellow-400 text-black text-center font-bold p-6 mt-24 mb-4 border-2 border-b-4 border-black rounded-lg shadow-lg max-w-lg mx-auto">
        Dear guests, our story is reaching its most magical chapter. As we write the words "happily ever after," your presence at our wedding would make it even more special.
        Please fill out the form below to let us know how many will be attending.
        </div>
        <div className="bg-yellow-400 text-black text-center p-4 mt-4 mb-8 border-2 border-black border-b-4 rounded-lg shadow-lg max-w-lg mx-auto">
          <p className="text-lg font-bold">Date: 19th August 2024</p>
          <p className="text-lg font-bold">Location: 123 Wedding Venue St, City, Country</p>
        </div>
        <InviteForm />
      </div>
      <Footer />
    </div>
  );
};

export default InvitePage;
