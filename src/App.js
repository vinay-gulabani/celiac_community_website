import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import BlogPage from "./components/BlogPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import RestaurantFinder from "./components/RestaurantFinder";
import ContactUs from "./components/TempContactUs";
import MyStory from "./components/MyStory";
import RecipePage from "./components/RecipePage";
import FavoriteRecipes from "./components/FavoriteRecipes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/restaurant-finder" element={<RestaurantFinder />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
