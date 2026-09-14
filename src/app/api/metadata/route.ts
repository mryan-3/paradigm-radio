import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const streamUrl = searchParams.get("url");

  if (!streamUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(streamUrl, {
      headers: {
        "Icy-MetaData": "1",
        "User-Agent": "ParadigmRadio/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const icyMetaInt = response.headers.get("icy-metaint");
    const icyName = response.headers.get("icy-name");

    if (!icyMetaInt || !response.body) {
      return NextResponse.json({
        title: null,
        stationName: icyName || null,
      });
    }

    const metaInt = parseInt(icyMetaInt, 10);
    if (isNaN(metaInt) || metaInt <= 0 || metaInt > 65536) {
      return NextResponse.json({ title: null, stationName: icyName || null });
    }

    const reader = response.body.getReader();
    let bytesRead = 0;
    let chunks: Uint8Array[] = [];

    // Read up to metaInt + 512 bytes to catch the metadata block
    while (bytesRead < metaInt + 1024) {
      const { done, value } = await reader.read();
      if (done || !value) break;
      chunks.push(value);
      bytesRead += value.length;
    }

    try {
      reader.cancel();
    } catch {}

    const fullBuffer = new Uint8Array(bytesRead);
    let offset = 0;
    for (const chunk of chunks) {
      fullBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    if (fullBuffer.length > metaInt) {
      const lengthByte = fullBuffer[metaInt];
      const metaLength = lengthByte * 16;
      if (metaLength > 0 && fullBuffer.length >= metaInt + 1 + metaLength) {
        const metaBytes = fullBuffer.slice(
          metaInt + 1,
          metaInt + 1 + metaLength
        );
        const metaStr = new TextDecoder("utf-8", { fatal: false }).decode(metaBytes);
        const match = metaStr.match(/StreamTitle='([^']*)'/);
        if (match && match[1]?.trim()) {
          return NextResponse.json({
            title: match[1].trim(),
            stationName: icyName || null,
          });
        }
      }
    }

    return NextResponse.json({ title: null, stationName: icyName || null });
  } catch {
    clearTimeout(timeoutId);
    return NextResponse.json({ title: null, stationName: null });
  }
}
