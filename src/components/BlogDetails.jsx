import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { increment } from "firebase/firestore";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { Helmet } from "react-helmet"; // Import Helmet
import "react-quill/dist/quill.snow.css";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams(); // Extract blog ID from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // State to store blog details
  const [loading, setLoading] = useState(true); // Loading state
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(""); // State for new comment input

  // Fetch the blog data and its comments from Firestore
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDocRef = doc(db, "blogs", id);
        const blogDoc = await getDoc(blogDocRef);

        if (blogDoc.exists()) {
          const blogData = blogDoc.data();
          setBlog({
            id: blogDoc.id,
            likes: blogData.likes || 0,
            dislikes: blogData.dislikes || 0,
            ...blogData,
          });
          setComments(blogData.comments || []);
        } else {
          console.error("Blog not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Add a new comment to Firestore
  const handleAddComment = async () => {
    if (newComment.trim() === "") return; // Prevent empty comments

    const commentData = {
      text: newComment,
      author: "Anonymous", // Replace with user name if authentication is implemented
      date: new Date().toLocaleString(),
    };

    try {
      const blogDocRef = doc(db, "blogs", id);
      await updateDoc(blogDocRef, {
        comments: arrayUnion(commentData), // Add the new comment to the array
      });
      setComments((prevComments) => [...prevComments, commentData]); // Update local state
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const blogDocRef = doc(db, "blogs", id);

        // If the user already liked the blog
        if (userData.likedBlogs?.includes(id)) {
          console.log("You have already liked this blog.");
          await updateDoc(blogDocRef, { likes: increment(-1) });
          await updateDoc(userDocRef, { likedBlogs: arrayRemove(id) });

          setBlog((prevBlog) => ({
            ...prevBlog,
            likes: Math.max((prevBlog.likes || 0) - 1, 0),
          }));
          return;
        }

        // If the user disliked the blog, remove the dislike first
        if (userData.dislikedBlogs?.includes(id)) {
          await updateDoc(blogDocRef, { dislikes: increment(-1) });
          await updateDoc(userDocRef, { dislikedBlogs: arrayRemove(id) });

          setBlog((prevBlog) => ({
            ...prevBlog,
            dislikes: (prevBlog.dislikes || 0) - 1,
          }));
        }

        // Add a like
        await updateDoc(blogDocRef, { likes: increment(1) });
        await updateDoc(userDocRef, { likedBlogs: arrayUnion(id) });

        setBlog((prevBlog) => ({
          ...prevBlog,
          likes: (prevBlog.likes || 0) + 1,
        }));
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error updating likes or likedBlogs:", error);
    }
  };

  // Handle Dislike Button Click
  const handleDislike = async () => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const blogDocRef = doc(db, "blogs", id);

        // If the user already disliked the blog
        if (userData.dislikedBlogs?.includes(id)) {
          console.log("You have already disliked this blog.");
          await updateDoc(blogDocRef, { dislikes: increment(-1) });
          await updateDoc(userDocRef, { dislikedBlogs: arrayRemove(id) });

          setBlog((prevBlog) => ({
            ...prevBlog,
            dislikes: Math.max((prevBlog.dislikes || 0) - 1, 0),
          }));
          return;
        }

        // If the user liked the blog, remove the like first
        if (userData.likedBlogs?.includes(id)) {
          await updateDoc(blogDocRef, { likes: increment(-1) });
          await updateDoc(userDocRef, { likedBlogs: arrayRemove(id) });

          setBlog((prevBlog) => ({
            ...prevBlog,
            likes: (prevBlog.likes || 0) - 1,
          }));
        }

        // Add a dislike
        await updateDoc(blogDocRef, { dislikes: increment(1) });
        await updateDoc(userDocRef, { dislikedBlogs: arrayUnion(id) });

        setBlog((prevBlog) => ({
          ...prevBlog,
          dislikes: (prevBlog.dislikes || 0) + 1,
        }));
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error updating dislikes or dislikedBlogs:", error);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading blog...</div>;
  }

  if (!blog) {
    return (
      <div className="blog-details-container">
        <h2 className="blog-not-found">Oops! Blog not found.</h2>
        <p className="blog-not-found-text">The blog you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/blog")} className="back-to-blogs-button">
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="blog-details-container">
      {/* Using Helmet to set meta tags dynamically */}
      <Helmet>
        <title>{blog.title} | Flourless Haven</title>
        <meta name="description" content={blog.excerpt || "Read this insightful blog on Flourless Haven."} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || "Read this insightful blog on Flourless Haven."} />
        <meta property="og:image" content={blog.image} />
      </Helmet>

      <h1
        className="blog-details-title"
        dangerouslySetInnerHTML={{ __html: blog.title }}
      />

      {blog.image && <img src={blog.image} alt={blog.title} className="blog-details-image" />}
      <p className="blog-details-meta">
        By {blog.author} on {new Date(blog.date.seconds * 1000).toLocaleDateString()}
      </p>
      <div className="blog-details-content">
        {blog.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        )}
      </div>

      <div className="like-dislike-container">
        <button onClick={handleLike} className="like-button">
          👍 ({blog.likes || 0})
        </button>
        <button onClick={handleDislike} className="dislike-button">
          👎 ({blog.dislikes || 0})
        </button>
      </div>

      <button onClick={() => navigate("/blog")} className="back-to-blogs-button">
        Back to Blogs
      </button>

      {/* Comment Section */}
      <div className="comment-section">
        <h3 className="comment-section-title">Comments</h3>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              <span className="comment-meta">
                {comment.author} - {comment.date}
              </span>
            </li>
          ))}
        </ul>
        <textarea
          className="comment-input"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="add-comment-button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
