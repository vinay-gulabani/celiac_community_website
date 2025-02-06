import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import BlogPage from "./components/BlogPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./AuthContext"; 
import RestaurantFinder from "./components/RestaurantFinder";
import ContactUs from "./components/TempContactUs";
import MyStory from "./components/MyStory";
import RecipePage from "./components/RecipePage";
import FavoriteRecipes from "./components/FavoriteRecipes";
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import "./App.css";
import BlogDetails from "./components/BlogDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Homepage: Redirects to Login if user is not logged in */}
          <Route path="/" element={<PrivateRoute component={Homepage} />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Other Pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/restaurant-finder" element={<PrivateRoute component={RestaurantFinder} />} />
          <Route path="/recipes" element={<PrivateRoute component={RecipePage} />} />
          <Route path="/favorite-recipes" element={<PrivateRoute component={FavoriteRecipes} />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// PrivateRoute Component
function PrivateRoute({ component: Component }) {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/login" replace />;
}

export default App;
