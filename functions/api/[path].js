export async function onRequest(context) {
  const backendBase =
    "https://01d026c7-4f7c-484e-86da-899426f53456-00-3rb8i4u7xysjq.kirk.replit.dev";
  const path = context.request.url.split("/api")[1] || "";
  const target = backendBase + (path.startsWith("/") ? path : `/${path}`);

  const backendResponse = await fetch(target, {
    method: context.request.method,
    headers: context.request.headers,
    body: ["GET", "HEAD"].includes(context.request.method)
      ? undefined
      : await context.request.text(),
  });

  const data = await backendResponse.text(); // Convert body to text

  return new Response(data, {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}
