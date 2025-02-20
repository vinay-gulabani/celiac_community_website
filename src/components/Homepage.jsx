import React from 'react';
import Header from './Header';
import { Helmet } from "react-helmet";
import Quote from './Quote';
import CeliacDigest from './CeliacDigest';
import AboutCeliac from './AboutCeliac';
import Footer from './Footer'; // Import the Footer component
import "./Homepage.css";

function Homepage() {
  return (
    <div>

      {/* SEO Optimization */}
      <Helmet>
        <title>Flourless Haven | Celiac Community & Gluten-Free Living</title>
        <meta name="description" content="Join Flourless Haven, a dedicated celiac community offering gluten-free resources, recipes, restaurant guides, and expert insights." />
      </Helmet>


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
