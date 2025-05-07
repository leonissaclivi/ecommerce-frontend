import React from 'react';

const About = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10">About EverythingStore</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="leading-7">
          Welcome to <span className="font-semibold">EverythingStore</span> — your ultimate one-stop destination for everything you need.
          We started with a simple idea: to make online shopping effortless, affordable, and trustworthy. From tech gadgets and fashion to home
          essentials and more, we strive to bring you high-quality products with an unmatched customer experience.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-7">
          At EverythingStore, our mission is to empower people through accessible, reliable, and enjoyable online shopping. We believe
          shopping should be easy and fun — not stressful or expensive. That’s why we’re committed to curating great products, fast delivery,
          and top-notch service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside leading-7">
          <li>Vast collection of quality products across all categories</li>
          <li>Fast and secure checkout process</li>
          <li>Responsive customer support</li>
          <li>Easy returns and refund policy</li>
          <li>Constantly growing and evolving to meet your needs</li>
        </ul>
      </section>

      <section className="text-center">
        <p className="text-lg font-medium">
          Thank you for choosing <span className="text-blue-600 font-bold">EverythingStore</span>. We're here to make your life simpler and smarter!
        </p>
      </section>
    </div>
  );
};

export default About;
