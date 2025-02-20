import React, { useState } from "react";
import "./MyStory.css";
import Header from "../components/Header"; // Import the header component
import { Helmet } from "react-helmet";

const MyStory = () => {
  const [clickedSection, setClickedSection] = useState(null); // State to track clicked section
  const [hovered, setHovered] = useState(null); // State to track hovered section

  const sections = [
    {
      title: "A Journey That Began with Uncertainty",
      content:
        "Hi, I’m Vinay, and I’ve been living with celiac disease since I was diagnosed as a toddler. It all started when I was two, my parents were desperate for just one answer. Why wasn’t I growing like other kids? After months of uncertainty, in 2009, we finally had a diagnosis: celiac disease. From that moment, everything changed. Growing up in India and later in the UAE, where awareness was scarce, made everyday life a challenge. Finding safe food, avoiding accidental gluten exposure, and explaining my condition to others became part of my reality. Even the smallest trace of gluten could trigger severe symptoms like stomach pain, nausea, fatigue, and skin rashes.",
      image: "/images/pic_1.jpg",
      link: "#living-with-celiac",
    },
    {
      title: "Struggles in a World That Didn’t Understand",
      content:
        "Social events, school lunches, and family gatherings often felt isolating, as I had to sit out or bring my own food while others ate freely. Celiac disease wasn’t just about avoiding gluten, it was about constantly being on guard, questioning every meal, and struggling to make others understand the seriousness of the condition. At times, it felt like I was living in a world that wasn’t built for me, where my needs were overlooked and my struggles invisible to most.",
      image: "/images/pic_2.jpg",
      link: "#understanding-struggles",
    },
    {
      title: "Social and Health Impact",
      content:
        "Despite the challenges, living with celiac disease shaped me into who I am today. I’ve faced painful symptoms, endless doctor visits, and the frustration of navigating a world that often doesn’t understand. There were moments of helplessness, but also moments of strength. Over the years, I learned to adapt, researching gluten-free alternatives, educating those around me, and finding ways to live a full life despite the limitations. What once felt like a burden slowly turned into a mission to ensure others don’t have to go through the same struggles alone.",
      image: "/images/pic_3.jpg",
      link: "#supportive-community",
    },
    {
      title: "Turning Struggles into Strength",
      content:
        "That’s how this celiac community was born. This platform is not just a resource; it’s a place of connection and understanding. My hope is that it will serve as a lifeline for newly diagnosed adults, parents trying to navigate their child’s diagnosis, and anyone seeking support. Whether it’s finding reliable gluten-free options, trusted healthcare professionals, or simply a community that understands, this website is here to make the journey a little smoother for everyone. Together, we can turn our struggles into strength and ensure that no one feels alone in this fight.",
      image: "/images/PFP2.jpg",
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
      <Helmet>
      <title>My Celiac Journey | The Story Behind Flourless Haven</title>
<meta name="description" content="Read my personal journey of living with celiac disease, overcoming challenges, and building a gluten-free community to support others like me." />

            </Helmet>
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