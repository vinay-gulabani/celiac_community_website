import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "../components/Header";
import "./FavoriteRecipes.css";
import Footer from './Footer'; // Import the Footer component


function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setRecipes(userDoc.data().favoriteRecipes || []);
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const handleRemoveFromFavorites = async (recipeIndex) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const updatedRecipes = recipes.filter((_, index) => index !== recipeIndex);
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { favoriteRecipes: updatedRecipes });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error removing recipe from favorites:", error);
    }
  };

  const renderInstructions = (instructions) => {
    if (!instructions) {
      return <p>No instructions available</p>;
    }

    const cleanedInstructions = instructions.replace(/<\/?(ol|li)>/g, "");

    return (
      <div className="instructions-text">
        {cleanedInstructions.split(/(?<=\.)\s+/).map((sentence, idx) => (
          <p key={idx}>{sentence}</p>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="favorite-recipes-container">
        <h1>Favorite Recipes</h1>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                <div className="recipe-header">
                  <h2>{recipe.name}</h2>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromFavorites(index)}
                  >
                    Remove
                  </button>
                </div>
                <p><div><strong>Ingredients:</strong><br></br> 
                {recipe.ingredients.join(", ")}</div></p>
                <p>
                <div>
                  <strong>Instructions:</strong>
                  {renderInstructions(recipe.instructions)}
                </div>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite recipes added yet!</p>
        )}

        <Footer/>

      </div>
    </>
  );
}

export default FavoriteRecipes;
