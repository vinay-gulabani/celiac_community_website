import React from 'react';
import './CeliacDigest.css';

function CeliacDigest() {
  // Sample blog post data with images
  
  const blogPosts = [
    {
      title: "Celiac Disease in Children",
      description: "Learn how to spot the signs and symptoms in kids.",
      link: "/blog/celiac-disease-in-children",
      image: "/images/quote_of_the_day.png", // Replace with the actual path or URL
    },
    {
      title: "Gluten-Free Diet: What You Need to Know",
      description: "Discover the ins and outs of a gluten-free diet.",
      link: "/blog/gluten-free-diet",
      image: "/images/quote_of_the_day.png",
    },
    {
      title: "Celiac Disease and Mental Health",
      description: "Uncover the link between celiac disease and mental well-being.",
      link: "/blog/celiac-disease-mental-health",
      image: "/images/quote_of_the_day.png",
    },
  ];

  return (
    <div className="celiac-digest">
      <h2>Celiac Digest</h2>
      <div className="digest-items">
        {blogPosts.map((post, index) => (
          <div className="digest-item" key={index}>
            <h3>{post.title}</h3>
            <img src={post.image} alt={post.title} className="digest-image" />
            <p>{post.description}</p>
            <a href={post.link} className="read-more">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CeliacDigest;
