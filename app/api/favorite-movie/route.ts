// app/api/favorite-movie/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  // Authentication: Read login user
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Read and validate input
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title =
    typeof (payload as { title?: unknown }).title === "string"
      ? (payload as { title: string }).title.trim()
      : "";

  if (!title) {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  // Update database
  try {
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { favoriteMovie: title },
      select: { favoriteMovie: true },
    });

    return NextResponse.json({ favoriteMovie: user.favoriteMovie }, { status: 200 });
  } catch (err) {
    console.error("[favorite-movie] update error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
