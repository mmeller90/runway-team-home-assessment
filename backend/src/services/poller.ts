import { loadApps, saveApps } from "./storage.js";
import { loadReviews, saveReviews } from "./storage.js";
import type { ReviewDto } from "../model/ReviewDto.js";

let isRunning = false;

// AI GENERATED

type AppleRSSResponse = {
  feed?: {
    entry?: any[];
  };
};

export async function fetchReviewsFromRSS(appId: string): Promise<ReviewDto[]> {
  const url = `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/sortBy=mostRecent/page=1/json`;
  console.log(`Fetching data for app ${appId}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch RSS for appId=${appId}, status=${res.status}`,
    );
  }

  const data = (await res.json()) as AppleRSSResponse;

  const entries = data?.feed?.entry;

  if (!entries || !Array.isArray(entries)) {
    return [];
  }

  // Apple RSS has first entry as app metadata (not review)
  const reviewsEntries = entries.slice(1);

  const reviews: ReviewDto[] = reviewsEntries.map((entry: any) => {
    return {
      id: entry?.id?.label ?? `${appId}-${Math.random()}`,
      author: entry?.author?.name?.label ?? "unknown",
      content: entry?.content?.label ?? "",
      rating: Number(entry?.["im:rating"]?.label ?? 0),
      submittedAt: entry?.updated?.label ?? new Date().toISOString(),
    };
  });

  return reviews;
}

// END AI GENERATED

export function startPoller() {
  setInterval(async () => {
    if (isRunning) return;

    isRunning = true;

    try {
      const apps = await loadApps();

      for (const app of apps) {
        const fresh = await fetchReviewsFromRSS(app.appId);
        const existing = await loadReviews(app.appId);

        const merged = deduplicateReviews(existing, fresh);

        await saveReviews(app.appId, merged);

        app.lastSuccessfulSyncAt = new Date().toISOString();
      }

      await saveApps(apps);
    } catch (err) {
      console.error("Poller error:", err);
    } finally {
      isRunning = false;
    }
  }, 60000);
}

export function deduplicateReviews(existing: ReviewDto[], fresh: ReviewDto[]) {
  const map = new Map<string, ReviewDto>();

  for (const r of existing) {
    map.set(r.id, r);
  }

  for (const r of fresh) {
    map.set(r.id, r);
  }

  return Array.from(map.values());
}
