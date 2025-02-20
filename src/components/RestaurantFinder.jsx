import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Import the Header
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import AddRestaurant from "./AddRestaurant";
import ReviewsModal from "./ReviewsModal"; // Import the new modal component
import "./RestaurantFinder.css";
import Footer from './Footer'; // Import the Footer component
import { Helmet } from "react-helmet";


function RestaurantFinder() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // For modal

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [userID, setUserID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const adminUserID = "fNhjiwJK5TZ67lQLrdx9L83Icvi2";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveRestaurant = async (restaurantID) => {
    try {
      await deleteDoc(doc(db, "restaurants", restaurantID));
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantID));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(restaurant.cuisine) &&
          restaurant.cuisine.some((cuisine) =>
            cuisine.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (typeof restaurant.cuisine === "string" &&
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  return (
    <div>
      <Helmet>
      <title>Gluten-Free Restaurant Finder | Safe Dining for Celiacs</title>
<meta name="description" content="Find safe and trusted gluten-free restaurants near you with our restaurant finder. Enjoy dining out without the worry of gluten exposure!" />

            </Helmet>
      <Header />
    
    <div className="restaurant-finder-page">
      

      <div className="restaurant-finder-container">
        <h1 className="restaurant-finder-header">Restaurant Finder</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, location, or cuisine..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="restaurant-list">
  {filteredRestaurants.length > 0 ? (
    filteredRestaurants.map((restaurant) => (
      <div className="restaurant-card" key={restaurant.id}>
        {userID === adminUserID && (
          <button
            className="remove-restaurant-btn"
            onClick={() => handleRemoveRestaurant(restaurant.id)}
          >
            ✕
          </button>
        )}
        <h2>{restaurant.name}</h2>
        <p>
          <strong>Location:</strong> {restaurant.location}
        </p>
        <p>
          <strong>Cuisine:</strong>{" "}
          {Array.isArray(restaurant.cuisine)
            ? restaurant.cuisine.join(", ")
            : restaurant.cuisine}
        </p>
        <p>
          <strong>Rating:</strong> {restaurant.rating}/5
        </p>
        <p>
          <strong>Gluten-Free Certified:</strong>{" "}
          {restaurant.glutenFreeCert ? "Yes" : "No"}
        </p>

        {/* Display Google Maps link */}
        {restaurant.googleMapsLink && (
          <p className="google-maps-link">
            <strong>Google Maps Link:</strong>{" "}
            <a className = "link" href={restaurant.googleMapsLink} target="_blank" rel="noopener noreferrer">
              View on Google Maps
            </a>
          </p>
        )}
        <button
              className="reviews-btn"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              Reviews
            </button>
      </div>
    ))
  ) : (
    <p className="no-data-message">
      No restaurants found. Add one to get started!
    </p>
  )}
  {selectedRestaurant && (
        <ReviewsModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
</div>

        {userID === adminUserID && (
          <div className="add-restaurant-container">
            <AddRestaurant />
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default RestaurantFinder;
