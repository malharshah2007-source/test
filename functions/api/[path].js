export async function onRequest(context) {
  // Your Replit backend URL
  const backendBase = "https://01d026c7-4f7c-484e-86da-899426f53456-00-3rb8i4u7xysjq.kirk.replit.dev";

  // Get everything after /api in the URL
  const path = context.request.url.split("/api")[1] || "";

  // Build the full backend request URL
  const target = backendBase + (path.startsWith("/") ? path : `/${path}`);

  // Forward method, headers, and body
  const response = await fetch(target, {
    method: context.request.method,
    headers: context.request.headers,
    body: ["GET", "HEAD"].includes(context.request.method)
      ? undefined
      : await context.request.text(),
  });

  // Return backend response
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
