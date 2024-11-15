import React from 'react';
import Header from './Header';
import Quote from './Quote';
import CeliacDigest from './CeliacDigest';
import AboutCeliac from './AboutCeliac';
import Footer from './Footer'; // Import the Footer component

function Homepage() {
  return (
    <div>
      <Header />
      
      <section>
        <h2>Quote of the Day</h2>
        <Quote />
      </section>

      <AboutCeliac /> {/* Add the AboutCeliac component here */}

      <section>
        <CeliacDigest />
      </section>

      <Footer /> {/* Add Footer component at the bottom */}
    </div>
  );
}

export default Homepage;
