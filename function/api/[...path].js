export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only intercept /api/* requests
    if (url.pathname.startsWith("/api/")) {
      const target = "https://01d026c7-4f7c-484e-86da-899426f53456-00-3rb8i4u7xysjq.kirk.replit.dev" + url.pathname;

      const response = await fetch(target, {
        method: request.method,
        headers: request.headers,
        body:
          request.method !== "GET" && request.method !== "HEAD"
            ? await request.text()
            : undefined
      });

      return new Response(await response.text(), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" // optional CORS
        }
      });
    }

    // Fallback for all other requests
    return new Response("Not found", { status: 404 });
  }
};
