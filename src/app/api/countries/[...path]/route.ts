import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // take everything after /api/ and forward it
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/countries/, '');
  const target = `https://www.apicountries.com${path}`;

  try {
    const res = await fetch(target, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) NextResponse.json({ error: `Upstream error ${res.status}` }, { status: res.status });

    const data = await res.text();

    return new NextResponse(data, {
      status: 200,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
