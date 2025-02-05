import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import Footer from './Footer'; // Import the Footer component


import Header from "./Header"; // Import Header
import "./BlogPage.css";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
    author: "",
  });

  const userId = "kgIHdWf8PJZVFl5X1IyAtq7TRAm2"; // Replace with your admin userId
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  // Fetch blog data from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
        setFilteredBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs based on search keyword and selected tag
  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesKeyword = blog.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
      return matchesKeyword && matchesTag;
    });
    setFilteredBlogs(filtered);
  }, [searchKeyword, selectedTag, blogs]);

  // Handle blog addition
  const handleAddBlog = async (e) => {
    e.preventDefault();

    const blogData = {
      title: newBlog.title,
      content: newBlog.content,
      tags: newBlog.tags.split(",").map((tag) => tag.trim()),
      image: newBlog.image,
      author: newBlog.author,
      date: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "blogs"), blogData);
      const blogWithId = { id: docRef.id, ...blogData };
      setBlogs((prevBlogs) => [...prevBlogs, blogWithId]);
      setFilteredBlogs((prevBlogs) => [...prevBlogs, blogWithId]);
      setNewBlog({ title: "", content: "", tags: "", image: "", author: "" });
      alert("Blog added successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog.");
    }
  };

  // Animation for blog cards
  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? "translateY(20px)" : "translateY(0)",
    config: { tension: 220, friction: 25 },
  });

  return (
    <>
      <Header />
      <div className="blog-page">
        <h1 className="blog-title">Celiac Digest</h1>
        <p className="blog-subtitle">
          Insights, Recipes, and Stories for a Gluten-Free Life
        </p>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search blogs by title..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            className="tag-filter"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {[...new Set(blogs.flatMap((blog) => blog.tags || []))].map(
              (tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className="loading-message">
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="blog-grid">
  {filteredBlogs.map((blog) => (
    <animated.div key={blog.id} className="blog-card" style={fadeIn}>
      <div className="blog-content">
        {/* Title with dangerouslySetInnerHTML */}
        <h2
          className="blog-card-title"
          dangerouslySetInnerHTML={{ __html: blog.title }}
        />
        
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="blog-image" />
        )}
        
        {/* Excerpt with dangerouslySetInnerHTML */}
        <p
          className="blog-card-excerpt"
          dangerouslySetInnerHTML={{
            __html: blog.content.length > 200
              ? `${blog.content.substring(0, 200)}...`
              : blog.content,
          }}
        />
        
        <p className="blog-meta">
          By {blog.author} on{" "}
          {new Date(blog.date.seconds * 1000).toLocaleDateString()}
        </p>
        
        <div className="blog-tags">
          {blog.tags &&
            blog.tags.map((tag, index) => (
              <span key={index} className="blog-tag">
                {tag}
              </span>
            ))}
        </div>
        
        <button
          className="read-more-button"
          onClick={() => navigate(`/blog/${blog.id}`)}
        >
          Read More
        </button>
      </div>
    </animated.div>
  ))}
</div>

        )}

        {/* Admin Section */}
        {currentUser?.uid === userId && (
          <div className="admin-section">
            <button
              onClick={() => setShowAddBlogForm(!showAddBlogForm)}
              className="add-blog-toggle"
            >
              {showAddBlogForm ? "Close Blog Form" : "Add New Blog"}
            </button>
            {showAddBlogForm && (
              <form className="add-blog-form" onSubmit={handleAddBlog}>
<ReactQuill
  theme="snow"
  value={newBlog.title}
  onChange={(title) =>
    setNewBlog({ ...newBlog, title })
  }
  placeholder="Enter the title of your blog..."
  required
  formats={['bold', 'italic', 'underline', 'strike', 'link']}
/>

                <input
                  type="text"
                  placeholder="Blog Author"
                  value={newBlog.author}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, author: e.target.value })
                  }
                  required
                />
                <ReactQuill
                  theme="snow"
                  value={newBlog.content}
                  onChange={(content) =>
                    setNewBlog({ ...newBlog, content })
                  }
                  placeholder="Write your blog content here..."
                  required
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  value={newBlog.tags}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, tags: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newBlog.image}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, image: e.target.value })
                  }
                />
                <button type="submit" className="submit-blog-button">
                  Submit Blog
                </button>
              </form>
            )}
          </div>
        )}
        <Footer/>
      </div>
    </>
  );
}

export default BlogPage;
