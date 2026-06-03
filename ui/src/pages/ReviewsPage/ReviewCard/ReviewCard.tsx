import type { ReviewDto } from "../../../model/ReviewDto";
import "./ReviewCard.css";

interface Props {
  review: ReviewDto;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  // AI generated
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const submittedAt = new Intl.DateTimeFormat("en-US", {
    timeZone: userTimeZone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(review.submittedAt));
  // END
  return (
    <div className="review">
      <div>{review.author}</div>
      <div>{review.content}</div>
      <div>
        <div>{review.rating} / 5</div>
        <div>{submittedAt}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
