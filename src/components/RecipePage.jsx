  import React, { useState } from "react";
  import axios from "axios";
  import { auth, db } from "../firebase/firebaseConfig";
  import { doc, updateDoc, arrayUnion } from "firebase/firestore";
  import Header from "./Header";
  import "./RecipePage.css";
  import Footer from './Footer'; // Import the Footer component
  import { Helmet } from "react-helmet";

  const RecipePage = () => {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to modify ingredients
// Function to modify ingredients
const modifyIngredients = (ingredient) => {
  // Log original ingredient for debugging
  console.log("Original Ingredient:", ingredient);
  
  // Replacing "flour" or "Flour" with "gluten free flour" or "corn flour"
  let modifiedIngredient = ingredient.replace(/\bflour|Flour\b/gi, "gluten free flour or All Purpose Flour");

  // Replacing "Bread" or "Bread crumbs" with "Gluten Free Bread crumbs"
  modifiedIngredient = modifiedIngredient.replace(/\b(bread crumbs|Bread crumbs)\b/gi, "G-Free Bread Crumbs or all purpose flour ");

  

  console.log("Modified Ingredient:", modifiedIngredient); // Log to check the result
  return modifiedIngredient;
};


    const handleGenerateRecipes = async () => {
      if (!ingredients.trim()) {
        alert("Please enter some ingredients.");
        return;
      }
      setLoading(true);

      try {
        const response = await axios.post("https://celiac-community-api.onrender.com/generate", {
          ingredients,
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error generating recipes:", error);
        alert("An error occurred while fetching recipes.");
      }
      setLoading(false);
    };

    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
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

    const handleFavoriteRecipe = async (recipe) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Please log in to favorite a recipe.");
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          favoriteRecipes: arrayUnion(recipe),
        });
        alert("Recipe added to favorites!");
      } catch (error) {
        console.error("Error adding recipe to favorites:", error);
        alert("Failed to add recipe to favorites.");
      }
    };

    return (
      <div className="recipe-page">
        <Helmet>
        <title>AI Gluten-Free Recipe Finder | Personalized Recipes for You</title>
<meta name="description" content="Discover delicious gluten-free recipes tailored to your preferences with our AI-powered recipe finder. Easy, healthy, and celiac-friendly!" />

              </Helmet>
        <Header className="header" />

        <div className="recipe-content">
          <h1>Gluten-Free Recipe Suggestion</h1>
          <p>Enter ingredients to generate gluten-free recipes!</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="e.g., cocoa, beans, milk"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button className="btn" onClick={handleGenerateRecipes}>Generate Recipes</button>
          </div>

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          )}

          <div className="recipes-container">
            {recipes.length > 0 && (
              <div>
                <h2>Generated Recipes:</h2>
                {recipes.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                    <h3>{recipe.name}</h3>
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="recipe-image"
                    />
                    <div className="recipe-details">
                      <div className="side-by-side">
                        <div className="recipe-ingredients">
                          <h4>Ingredients:</h4>
                          <div className="ingredients-text">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <p key={idx}>
                                {capitalizeFirstLetter(modifyIngredients(ingredient))}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="recipe-instructions">
                          <h4>Instructions:</h4>
                          {renderInstructions(recipe.instructions)}
                        </div>
                      </div>
                      <button
                        className="favorite-button"
                        onClick={() => handleFavoriteRecipe(recipe)}
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="disclaimer">
          <p>
            Disclaimer: Recipes are AI-generated using Spoonacular and may not
            always be accurate. Please verify ingredients.
          </p>
        </div>
        <Footer />
      </div>
    );
  };

  export default RecipePage;
