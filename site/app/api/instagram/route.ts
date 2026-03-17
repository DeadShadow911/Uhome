import { NextResponse } from "next/server";

/**
 * API route для получения ленты Instagram через Instagram Graph API.
 * Требует Business/Creator аккаунт Instagram.
 *
 * Env: INSTAGRAM_ACCESS_TOKEN — долгосрочный Page Access Token
 * Env: INSTAGRAM_USER_ID — Instagram Business User ID (ig_user_id)
 */
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "Instagram API not configured" },
      { status: 503 }
    );
  }

  try {
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    url.searchParams.set("access_token", token);
    url.searchParams.set("limit", "12");

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Instagram API error:", err);
      return NextResponse.json(
        { error: "Instagram fetch failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const items = data.data ?? [];

    return NextResponse.json({ items });
  } catch (e) {
    console.error("Instagram API error:", e);
    return NextResponse.json(
      { error: "Instagram fetch failed" },
      { status: 500 }
    );
  }
}
