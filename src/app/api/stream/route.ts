import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const streamUrl = searchParams.get("url");

  if (!streamUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(streamUrl, {
      headers: {
        "User-Agent": "ParadigmRadio/1.0",
        Accept: "*/*",
      },
    });

    if (!response.ok || !response.body) {
      return new Response("Failed to fetch upstream stream", {
        status: response.status || 502,
      });
    }

    const contentType =
      response.headers.get("content-type") || "audio/mpeg";

    return new Response(response.body as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return new Response(message, { status: 500 });
  }
}
