import React, { useEffect, useState } from 'react';
import quotes from '../data/quotes.json';

function Quote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a random quote from the JSON file
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="quote">
      <p>{quote}</p>
    </div>
  );
}

export default Quote;
