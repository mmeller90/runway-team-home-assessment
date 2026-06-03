import { loadReviews } from "./storage";
import type { ReviewDto } from "../model/ReviewDto.js";

const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

export async function getReviewsForApp(appId: string) {
  const reviews: ReviewDto[] = await loadReviews(appId);

  const cutoff = Date.now() - FORTY_EIGHT_HOURS;

  const filtered = reviews.filter((review) => {
    const time = new Date(review.submittedAt).getTime();
    return time >= cutoff;
  });

  return filtered.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}
