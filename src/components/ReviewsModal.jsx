import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig"; // Ensure you import auth
import "./ReviewsModal.css";

function ReviewsModal({ restaurant, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("restaurantId", "==", restaurant.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    };
    fetchReviews();
  }, [restaurant.id]);

  const handleAddReview = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Please log in to submit a review.");
      return;
    }

    const newReviewData = {
      restaurantId: restaurant.id,
      userId: currentUser.uid, // User's UID
      reviewText: newReview,
      likes: 0,
      dislikes: 0,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "reviews"), newReviewData);
      setReviews((prev) => [...prev, newReviewData]);
      setNewReview("");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review.");
    }
  };

  const handleLike = async (reviewId) => {
    console.log("Document ID:", reviewId);

    // Check if reviewId is valid
    if (!reviewId) {
      console.error("Error: Invalid reviewId.");
      return;
    }

    const reviewRef = doc(db, "reviews", reviewId);
    const reviewToUpdate = reviews.find((review) => review.id === reviewId);

    // Check if reviewToUpdate exists
    if (!reviewToUpdate) {
      console.error("Error: Review not found.");
      return;
    }

    // If reviewToUpdate exists, proceed with updating the likes
    await updateDoc(reviewRef, { likes: reviewToUpdate.likes + 1 });

    // Update the state to reflect the like change
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handleDislike = async (reviewId) => {
    console.log("Document ID:", reviewId);

    // Check if reviewId is valid
    if (!reviewId) {
      console.error("Error: Invalid reviewId.");
      return;
    }

    const reviewRef = doc(db, "reviews", reviewId);
    const reviewToUpdate = reviews.find((review) => review.id === reviewId);

    // Check if reviewToUpdate exists
    if (!reviewToUpdate) {
      console.error("Error: Review not found.");
      return;
    }

    // If reviewToUpdate exists, proceed with updating the dislikes
    await updateDoc(reviewRef, { dislikes: reviewToUpdate.dislikes + 1 });

    // Update the state to reflect the dislike change
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review
      )
    );
  };

  const handleDeleteReview = async (reviewId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Please log in to delete a review.");
      return;
    }

    const adminUserId = "kgIHdWf8PJZVFl5X1IyAtq7TRAm2"; // Replace this with the actual admin user ID or fetch it from Firestore
    if (currentUser.uid !== adminUserId) {
      alert("You do not have permission to delete this review.");
      return;
    }

    const reviewRef = doc(db, "reviews", reviewId);
    await deleteDoc(reviewRef);

    // Remove the deleted review from the local state
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  return (
    <div className="reviews-modal">
      <div className="reviews-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Reviews for {restaurant.name}</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p>{review.reviewText}</p>
              <div className="review-actions">
                <button onClick={() => handleLike(review.id)} className="icon-btn">👍 {review.likes}</button>
                <button onClick={() => handleDislike(review.id)} className="icon-btn">👎 {review.dislikes}</button>

                {auth.currentUser && auth.currentUser.uid === "kgIHdWf8PJZVFl5X1IyAtq7TRAm2" && (
                  <button onClick={() => handleDeleteReview(review.id)} className="delete-btn">❌</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
        />
        <button onClick={handleAddReview} className="submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default ReviewsModal;
