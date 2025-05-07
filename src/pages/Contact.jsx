import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd typically send form data to backend or email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <div className="flex justify-center mb-8">
        <img src={assets.logo} alt="EverythingStore Logo" className="h-16" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 h-32 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-sm mt-2">Thank you! We'll get back to you soon.</p>
          )}
        </form>

        <div className="space-y-4 text-sm leading-6">
          <h2 className="text-xl font-semibold mb-2">Reach Us At</h2>
          <p><strong>Email:</strong> support@everythingstore.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Market Lane, Commerce City, USA</p>
          <p>We’re available Monday through Saturday, 9 AM – 6 PM.</p>
          <p>Need help with an order? Just drop us a message using the form.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
