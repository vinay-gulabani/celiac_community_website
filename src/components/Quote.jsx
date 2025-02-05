import React, { useEffect, useState } from 'react';
import quotes from '../data/quotes.json';
import "./Quote.css";

function Quote() {
  const [quote, setQuote] = useState('');
  const [animationClass, setAnimationClass] = useState('fade-in');

  const fetchRandomQuote = () => {
    setAnimationClass('fade-out'); // Start fade-out animation
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setAnimationClass('fade-in'); // Start fade-in animation after updating the quote
    }, 500); // Duration of the fade-out animation
  };

  useEffect(() => {
    fetchRandomQuote(); // Initial random quote on component mount
  }, []);

  return (
    <div className={`quote-container ${animationClass}`}>
      <div className="quote-box">
        <p className="quote-text">{quote}</p>
      </div>
      <button className="new-quote-button" onClick={fetchRandomQuote}>
        Get a New Quote
      </button>
    </div>
  );
}

export default Quote;
