import React, { useState } from "react";
import "./ContactUs.css";
import Header from "./Header";
import Footer from './Footer'; // Import the Footer component



const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      // Send the email (via backend API or third-party email service)
      const response = await fetch("https://formsubmit.co/ajax/gulabani.vinay@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="contact-us-page">
      <Header className="header" />
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>

      {/* Main Contact Form */}
      <div className="contact-us">
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
        {isSubmitted && <p className="success-message">Thank you for reaching out! We'll get back to you soon.</p>}
        <Footer/>
      
      </div>

    </div>
  );
};

export default ContactUs;
