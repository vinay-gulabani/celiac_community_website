import React from 'react';
import './AboutCeliac.css';

function AboutCeliac() {
  return (
    <section className="about-celiac">
      <h2>What is Celiac Disease?</h2>
      <div className="about-celiac-content">
        <img 
          src="/images/quote_of_the_day.png" 
          alt="Celiac Disease illustration" 
          className="celiac-image" 
        />
        <div className="celiac-text">
          <p>
            Celiac disease is a genetic autoimmune disorder that affects both children and adults.
            When people with celiac disease consume gluten, their immune system responds by
            damaging the small intestine, leading to various health complications.
          </p>
          <button className="learn-more-button" onClick={() => window.location.href = '/blog/kBvkc1GYuQb747r2hWJ6'}>
            Learn more about celiac disease
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutCeliac;
