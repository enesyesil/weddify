import React from 'react';

const ProductInfo: React.FC = () => {
  return (
    <section id="features" className="bg-yellow-400 text-black py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Why Weddify?</h3>
        <p className="text-lg font-bold mb-8">
          Everything you need to make your wedding invitations special and hassle-free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Custom Invitations</h4>
            <p>Weddify allows you to personalize every detail—fonts, colors, layouts, and even add a heartfelt message. Once your design is ready, each couple gets a unique link to their custom wedding page. Share this link with your guests for a seamless way to RSVP.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Guest Management</h4>
            <p>Simplify the chaos of planning with our powerful guest management tools. Effortlessly track RSVPs, organize your guest list, and ensure every detail is perfect. Stay stress-free while keeping everything in one place.
</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Seamless Experience</h4>
            <p>Planning your wedding should be a joy, not a hassle. Weddify’s intuitive interface makes creating invitations and managing guests simple and efficient, so you can focus on what truly matters—celebrating your big day.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
