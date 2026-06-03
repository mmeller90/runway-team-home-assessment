// AI GENERATED FILE: src/index.ts

import { createServer } from "node:http";
import { getReviewsForApp } from "./services/reviews.js";
import {
  buildBadRequestResponse,
  buildErrorResponse,
  buildNotFoundResponse,
  buildOkResponse,
} from "./server-utils.js";
import { getAllApps } from "./services/apps.js";
import { startPoller } from "./services/poller.js";

const PORT = Number(process.env.PORT) || 3000;

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/health") {
    buildOkResponse(res, { status: "ok" });
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/reviews")) {
    const appId = url.searchParams.get("appId");

    if (!appId) {
      buildBadRequestResponse(res, { error: "Missing app id" });
      return;
    }

    try {
      const reviews = await getReviewsForApp(appId);
      buildOkResponse(res, { appId, reviews });
    } catch (err) {
      buildErrorResponse(res);
    }

    return;
  }

  if (req.method === "GET" && url.pathname === "/apps") {
    const apps = await getAllApps();
    buildOkResponse(res, { apps });
    return;
  }

  buildNotFoundResponse(res);
});

server.listen(PORT, () => {
  startPoller();
  console.log(`Server running on http://localhost:${PORT}`);
});
