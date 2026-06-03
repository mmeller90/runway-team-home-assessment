import type { ReviewDto } from "../model/ReviewDto";
import { BaseApiService } from "./BaseApiService";

export class ReviewsApiService extends BaseApiService {
  async fetchReviews(appId: string): Promise<ReviewDto[]> {
    const response = await fetch(`${this.baseUrl}/reviews?appId=${appId}`);
    return (await response.json()).reviews ?? [];
  }
}
