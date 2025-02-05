import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Footer from './Footer'; // Import the Footer component

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import Header from "../components/Header"; // Import the header component
import "./Dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState([]); // State for storing liked blogs
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State for storing favorite recipes
  const [latestBlogs, setLatestBlogs] = useState([]); // State for storing latest blogs
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
          setProfilePic(userData.profilePic || null);

          // Fetch liked blogs using Firestore document IDs
          const likedBlogIds = userData.likedBlogs || [];
          if (likedBlogIds.length > 0) {
            const likedBlogsData = await Promise.all(
              likedBlogIds.map(async (blogId) => {
                const blogDocRef = doc(db, "blogs", blogId);
                const blogDoc = await getDoc(blogDocRef);
                if (blogDoc.exists()) {
                  return { id: blogDoc.id, ...blogDoc.data() };
                }
                return null;
              })
            );
            setLikedBlogs(likedBlogsData.filter((blog) => blog !== null));
          } else {
            setLikedBlogs([]);
          }

          // Fetch favorite recipes
          setFavoriteRecipes(userData.favoriteRecipes || []);
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const latestBlogsQuery = query(blogsRef, orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(latestBlogsQuery);

        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLatestBlogs(blogs);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUploadPic = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      console.log("Upload successful!");

      // Get the file's download URL
      const fileURL = await getDownloadURL(storageRef);
      console.log("File URL: ", fileURL);

      // Save the file's URL to Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { profilePic: fileURL });
      console.log("Profile picture updated in Firestore");

      // Update local state with the new profile picture URL
      setProfilePic(fileURL);

      console.log("Profile picture uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleDeletePic = async () => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);

      // Remove the profile picture URL from Firestore
      await updateDoc(userDocRef, { profilePic: null });

      // Update the local state
      setProfilePic(null);

      console.log("Profile picture deleted successfully!");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {/* Add Header component */}
      <Header />

      <div className="dashboard-container">
        {console.log("Current User:", auth.currentUser)}
        <div className="welcome-message">
          <h1>Welcome, {userData?.name?.split(" ")[0] || "User"}!</h1>
        </div>

        <div className="profile-section">
          <div className="profile-pic">
            
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <label className="upload-btn">
                <input type="file" onChange={handleUploadPic} />
              </label>
            )}
          </div>

          {profilePic && (
            <button className="delete-pic-button" onClick={handleDeletePic}>
              x
            </button>
          )}

          <div className="user-details">
            <h2>{userData?.name || "User"}</h2>
          </div>
        </div>

        <div className="content-section">
          <div className="content-box likes-box box">
            <h3>Liked Blogs</h3>
            {likedBlogs.length > 0 ? (
              <ul>
                {likedBlogs.map((blog) => (
                  <li key={blog.id} className="content-list">
                    <a
                      href={`/blog/${blog.id}`}
                      className="liked-blog-link"
                      dangerouslySetInnerHTML={{ __html: blog.title }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No liked blogs yet!</p>
            )}
          </div>

          <div className="content-box latest-box box">
            <h3>Latest Blogs</h3>
            {latestBlogs.length > 0 ? (
              <ul>
                {latestBlogs.map((blog) => (
                  <li key={blog.id} className="content-list">
                    <a
                      href={`/blog/${blog.id}`}
                      className="latest-blog-link"
                      dangerouslySetInnerHTML={{ __html: blog.title }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No blogs available yet!</p>
            )}
          </div>

          <div className="content-box favorite-box box1">
            <h3>Favorite Recipes</h3>
            {favoriteRecipes.length > 0 ? (
              <ul>
                {favoriteRecipes.map((recipe) => (
                  <li key={recipe.id} className="content-list">
                    <h4>{recipe.name}</h4>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorite recipes added yet!</p>
            )}
            <button
              className="go-to-recipes-button"
              onClick={() => navigate("/favorite-recipes")}
            >
              Go to My Recipes
            </button>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
