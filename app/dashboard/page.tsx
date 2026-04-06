import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getMovieFact } from "@/lib/openai";
import DashboardUI from "./DashboardUI";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.user?.email) return redirect("/login");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return redirect("/login");
  if (!user.favoriteMovie) return redirect("/onboarding");

  const movieFact = await getMovieFact(user.favoriteMovie);

  return (
    <DashboardUI
      session={{ ...session, user: session.user }}
      user={user}
      movieFact={movieFact}
      currentTitle={user.favoriteMovie}
    />
  );
}
