import React, { useState } from "react";
import "./MyStory.css";
import Header from "../components/Header"; // Import the header component

const MyStory = () => {
  const [clickedSection, setClickedSection] = useState(null); // State to track clicked section
  const [hovered, setHovered] = useState(null); // State to track hovered section

  const sections = [
    {
      title: "A Journey That Began with Uncertainty",
      content:
        "Hi, I’m Vinay, and I’ve been living with celiac disease since I was diagnosed as a toddler. This community is a reflection of my journey—a place designed to make life a little easier for others like me. When I was a baby, my parents grew increasingly worried as I hardly grew in height or weight. By the time I was two, their concerns deepened, and in 2009, after endless questions and uncertainty, a doctor finally gave us an answer: 'celiac disease.' It was a diagnosis that changed everything. From that moment, our lives shifted toward managing this autoimmune condition, learning about a gluten-free lifestyle, and coping with its demands.",
      image: "/images/pic_1.jpg",
      link: "#living-with-celiac",
    },
    {
      title: "Struggles in a World That Didn’t Understand",
      content:
        "It’s been a path filled with challenges but also one that taught me resilience and adaptability. Being diagnosed with celiac disease in India, and later growing up in the UAE, came with unique challenges in regions where awareness was scarce. At that time, understanding of the condition was almost nonexistent, and we often found ourselves navigating uncharted territory, struggling to find solutions and understanding from those around us. My health often suffered from even the smallest exposure to gluten, with symptoms ranging from severe abdominal pain and nausea to constant fatigue and skin rashes.",
      image: "/images/pic_2.jpg",
      link: "#understanding-struggles",
    },
    {
      title: "Social and Health Impact",
      content:
        "Social events like school lunches and family gatherings were especially isolating, as I often had to sit out or eat separately, watching others enjoy food I couldn’t touch. The lack of knowledge and resources made everyday life a minefield, constantly reminding me of how different my life was from others around me. Over the years, my journey has involved countless visits to doctors, regular medical tests, and a relentless commitment to a gluten-free lifestyle. These experiences have shaped me but also fueled my determination to create something meaningful.",
      image: "/images/pic_3.jpg",
      link: "#supportive-community",
    },
    {
      title: "Turning Struggles into Strength",
      content:
        "That’s how this celiac community was born. This platform is not just a resource; it’s a place of connection and understanding. My hope is that it will serve as a lifeline for newly diagnosed adults, parents trying to navigate their child’s diagnosis, and anyone seeking support. Whether it’s finding reliable gluten-free options, trusted healthcare professionals, or simply a community that understands, this website is here to make the journey a little smoother for everyone. Together, we can turn our struggles into strength and ensure that no one feels alone in this fight.",
      image: "/images/pic_2.jpg",
      link: "#supportive-community",
    }
  ];

  const handleClick = (index) => {
    setClickedSection(index); // Set the clicked section index
  };

  const handleMouseEnter = (index) => {
    setHovered(index); // Set hovered section index
  };

  const handleMouseLeave = () => {
    setHovered(null); // Reset hover state
  };


  return (
    <div className="my-story-page">
      <Header />

      <h1 className="page-title">My Story</h1>
      <div className="sections-container">
        {sections.map((section, index) => (
          <div
            className="story-section"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)} // Trigger hover
            onMouseLeave={handleMouseLeave} // Reset hover when mouse leaves
          >
            <a
              href={section.link}
              className="section-link"
              onClick={(e) => {
                e.preventDefault();
                handleClick(index); // Handle click to toggle title visibility
              }}
            >
              <div
                className="section-image"
                style={{ backgroundImage: `url(${section.image})` }}
              >
                {clickedSection !== index && hovered !== index ? (
                  <h2 className="section-title">{section.title}</h2>
                ) : (
                  <div className="section-overlay">
                    <p className="section-content">{section.content}</p>
                  </div>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStory;