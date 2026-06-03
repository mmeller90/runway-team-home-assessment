import { loadReviews } from "./storage";

export async function getReviewsForApp(appId: string) {
  const reviews = await loadReviews(appId);

  return reviews;
}
