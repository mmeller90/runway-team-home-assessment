import { loadApps } from "./storage";

export async function getAllApps() {
  const apps = await loadApps();

  return apps;
}