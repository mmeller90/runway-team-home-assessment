import { useParams } from "react-router-dom";
import { ReviewsApiService } from "../../api/ReviewsApiService";
import { useEffect, useState } from "react";
import type { ReviewDto } from "../../model/ReviewDto";
import ReviewCard from "./ReviewCard/ReviewCard";
import "./ReviewsPage.css";

const reviewsApiService = new ReviewsApiService();

const ReviewsPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  useEffect(() => {
    const fetch = async () => {
      if (id === undefined) {
        return;
      }

      const response = await reviewsApiService.fetchReviews(id);

      setReviews(response);
    };

    fetch();
  }, []);

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="reviewContainer">
          <ReviewCard review={review} />
        </div>
      ))}
    </>
  );
};

export default ReviewsPage;
