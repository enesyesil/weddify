import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-yellow-400 text-black py-16 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Create Your Perfect Wedding Invitation
        </h2>
        <p className="text-lg mb-8 font-bold">
          Weddify helps you design customized invitations, manage guest lists, and collect RSVPs effortlessly.
        </p>
        <a
          href="/dashboard"
          className="bg-black text-white font-bold py-3 px-6 rounded-lg border-b-4 border-gray-800 hover:bg-gray-900 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
