// AI GENERATED FILE: src/storage.ts

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ReviewDto } from "../model/ReviewDto.js";
import type { AppDto } from "../model/AppDto.js";

const DATA_DIR = path.resolve("data/reviews");
const APPS_FILE = path.resolve("data/apps.json");

export async function loadApps(): Promise<AppDto[]> {
  try {
    const data = await readFile(APPS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // file doesn't exist yet
    return [];
  }
}

export async function saveApps(apps: AppDto[]): Promise<void> {
  await writeFile(APPS_FILE, JSON.stringify(apps, null, 2), "utf-8");
}

export async function upsertApp(app: AppDto): Promise<void> {
  const apps = await loadApps();

  const idx = apps.findIndex((a) => a.appId === app.appId);

  if (idx === -1) {
    apps.push(app);
  } else {
    apps[idx] = {
      ...apps[idx],
      ...app,
    };
  }

  await saveApps(apps);
}

async function getFilePath(appId: string) {
  return path.join(DATA_DIR, `${appId}.json`);
}

export async function loadReviews(appId: string): Promise<ReviewDto[]> {
  try {
    const filePath = await getFilePath(appId);
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveReviews(appId: string, reviews: ReviewDto[]) {
  const filePath = await getFilePath(appId);
  await writeFile(filePath, JSON.stringify(reviews, null, 2), "utf-8");
}
