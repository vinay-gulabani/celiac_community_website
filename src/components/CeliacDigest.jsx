import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Adjust the path to your firebase.js file
import "./CeliacDigest.css";
import { useNavigate } from "react-router-dom";


function CeliacDigest() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  // Helper function to extract plain text from HTML
  const extractPlainTextFromHTML = (htmlContent) => {
    if (!htmlContent) return "";
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || ""; // Extracts only the text content
  };

  // Helper function to truncate to 15 words
  const truncateTo15Words = (text) => {
    if (!text) return "";
    return text.split(" ").slice(0, 15).join(" ") + "...";
  };

  useEffect(() => {
    // Fetch the top 3 latest blogs
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsQuery = query(blogsCollection, orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(blogsQuery);

        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="celiac-digest">
      <h2>Celiac Digest</h2>
      <div className="digest-items">
        {blogs.map((post) => {
          const plainTextContent = extractPlainTextFromHTML(post.content); // Extract plain text from HTML
          const truncatedContent = truncateTo15Words(plainTextContent); // Truncate to 15 words

          return (
            <div className="digest-item" key={post.id}>
  {/* Title with dangerouslySetInnerHTML */}
  <h3
    dangerouslySetInnerHTML={{ __html: post.title }}
  />
  
  <img src={post.image} alt={post.title} className="digest-image" />
  
  {/* Excerpt with dangerouslySetInnerHTML */}
  <p
    dangerouslySetInnerHTML={{ __html: post.excerpt }}
  />
  
  <p className="digest-content">{truncatedContent}</p>
  
  <button className="read-more" onClick={() => navigate(`/blog/${post.id}`)}>
  Read more
</button>

</div>

          );
        })}
      </div>
    </div>
  );
}

export default CeliacDigest;
