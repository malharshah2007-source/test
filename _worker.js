export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Proxy only API calls
    if (url.pathname.startsWith("/api/users")) {
      const target = "https://01d026c7-4f7c-484e-86da-899426f53456-00-3rb8i4u7xysjq.kirk.replit.dev" + url.pathname;

      const response = await fetch(target, {
        method: request.method,
        headers: request.headers,
        body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined
      });

      // Pass through JSON
      return new Response(await response.text(), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" // optional if you need CORS
        }
      });
    }

    // Let Pages handle other routes (static files)
    return env.ASSETS.fetch(request);
  }
};
