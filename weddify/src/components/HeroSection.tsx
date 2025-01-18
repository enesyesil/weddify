import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Ensure you have this imported for Next.js Image component

const HeroSection: React.FC = () => {
  return (
    <section className="bg-yellow-400 text-black py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/hero_processed.png" // Replace with the actual path to the image
            alt="Wedding planning illustration"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-8">
          <h2 className="text-4xl font-bold mb-6">
            Create Your Perfect Wedding Invitation
          </h2>
          <p className="text-lg mb-8 font-bold">
            Weddify helps you design customized invitations, manage guest lists, and collect RSVPs effortlessly.
          </p>
          <Link href="/auth/register" passHref>
            <button className="bg-black text-white font-bold py-3 px-6 rounded-lg border-b-4 border-gray-800 hover:bg-gray-900 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
