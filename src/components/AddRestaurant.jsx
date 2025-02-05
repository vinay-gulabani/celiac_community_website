import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function AddRestaurant({ onRestaurantAdded }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState([]);
  const [rating, setRating] = useState("");
  const [glutenFreeCert, setGlutenFreeCert] = useState(false);
  const [cuisineInput, setCuisineInput] = useState(""); // For manual addition of cuisines
  const [googleMapsLink, setGoogleMapsLink] = useState(""); // Google Maps link state

  const handleAddCuisine = () => {
    if (cuisineInput.trim() && !cuisine.includes(cuisineInput)) {
      setCuisine((prev) => [...prev, cuisineInput.trim()]);
      setCuisineInput("");
    }
  };

  const removeCuisine = (cuisineToRemove) => {
    setCuisine(cuisine.filter((c) => c !== cuisineToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "restaurants"), {
        name,
        location,
        cuisine,
        rating: parseFloat(rating),
        glutenFreeCert,
        googleMapsLink, // Added the Google Maps link to the data being submitted
      });
      setName("");
      setLocation("");
      setCuisine([]);
      setRating("");
      setGlutenFreeCert(false);
      setGoogleMapsLink(""); // Reset the Google Maps link field
      onRestaurantAdded();
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <form className="add-restaurant-form" onSubmit={handleSubmit}>
      <label>Restaurant Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Enter restaurant name"
      />

      <label>Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        placeholder="Enter location"
      />

      <label>Cuisine</label>
      <div className="cuisine-input-container">
        <input
          type="text"
          value={cuisineInput}
          onChange={(e) => setCuisineInput(e.target.value)}
          placeholder="Add a cuisine and press Add"
        />
        <button
          type="button"
          onClick={handleAddCuisine}
          className="add-cuisine-btn"
        >
          Add
        </button>
      </div>

      {/* Display selected cuisines as tags */}
      <div className="selected-cuisines-container">
        {cuisine.map((cuisineName, index) => (
          <span key={index} className="selected-cuisine-tag">
            {cuisineName}
            <button
              type="button"
              className="remove-tag-btn"
              onClick={() => removeCuisine(cuisineName)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <label>Rating</label>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        step="0.1"
        min="0"
        max="5"
        required
        placeholder="Rate from 0 to 5"
      />

      {/* Gluten-Free Certified checkbox */}
      <div className="gluten-free-cert-container">
        <input
          type="checkbox"
          checked={glutenFreeCert}
          onChange={(e) => setGlutenFreeCert(e.target.checked)}
        />
        <label>Gluten-Free Certified</label>
      </div>

      {/* Google Maps Link */}
      <label>Google Maps Link</label>
      <input
        type="url"
        value={googleMapsLink}
        onChange={(e) => setGoogleMapsLink(e.target.value)}
        placeholder="Enter Google Maps link"
        className="google-maps-link"
      />

      <button type="submit" className="submit-btn">
        Add Restaurant
      </button>
    </form>
  );
}

export default AddRestaurant;
