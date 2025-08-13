export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const target = "https://01d026c7-4f7c-484e-86da-899426f53456-00-3rb8i4u7xysjq.kirk.replit.dev" + url.pathname;

      try {
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
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
