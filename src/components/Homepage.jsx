import React from 'react';
import Header from './Header';
import Quote from './Quote';
import CeliacDigest from './CeliacDigest';
import AboutCeliac from './AboutCeliac';
import Footer from './Footer'; // Import the Footer component
import "./Homepage.css";

function Homepage() {
  return (
    <div>
      <Header />

      <section className="centered-section">
        <h2>Quote of the Day</h2>
        <Quote />
      </section>

      <section className="about-section">
        <AboutCeliac />
      </section>

      <section className="centered-section">
        <CeliacDigest />
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;
