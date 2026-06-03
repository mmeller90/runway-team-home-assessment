import { IncomingMessage, ServerResponse } from "node:http";

function addCors(res: ServerResponse<IncomingMessage>) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function buildOkResponse(
  res: ServerResponse<IncomingMessage>,
  body: unknown,
) {
  addCors(res);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

export function buildErrorResponse(res: ServerResponse<IncomingMessage>) {
  addCors(res);
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Internal Server Error" }));
}

export function buildNotFoundResponse(res: ServerResponse<IncomingMessage>) {
  addCors(res);
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

export function buildBadRequestResponse(
  res: ServerResponse<IncomingMessage>,
  body: unknown,
) {
  addCors(res);
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}
