import { db } from "./firebaseConfig"; // Import your Firebase configuration
import { collection, setDoc, doc } from "firebase/firestore";
import blogData from "./data/blogData"; // Adjust the path to your blogData file

const uploadBlogData = async () => {
  try {
    const blogsCollection = collection(db, "blogs");
    for (const blog of blogData) {
      const blogDoc = doc(blogsCollection, blog.id.toString());
      await setDoc(blogDoc, blog); // Add each blog as a Firestore document
    }
    console.log("Blog data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading blog data:", error);
  }
};

uploadBlogData();
