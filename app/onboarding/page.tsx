import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session?.user?.email) return redirect("/login");

  async function setFavoriteMovie(formData: FormData) {
    "use server";
    const title = (formData.get("title") as string | null)?.trim();
    if (!title) return;
    const session = await getSession();
    if (!session?.user?.email) return redirect("/login");
    await prisma.user.update({
      where: { email: session.user.email },
      data: { favoriteMovie: title }
    });
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background: Color Gradients + Dots + Vignette */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,.35)_70%,rgba(0,0,0,.65)_100%)]" />

      {/* Page Container */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 pb-16 pt-24 md:px-8 space-y-8">
        {/* Welcome Header */}
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Movie Fun Facts</h1>
            <p className="text-white/70">Tell us your favorite movie and we'll generate fascinating facts about it</p>
          </div>
        </header>

        {/* Form Section */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <form action={setFavoriteMovie} className="p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">What's your favorite movie?</h2>
              <p className="text-sm text-white/60 mb-4">
                Enter your favorite movie title and we'll generate interesting facts about it
              </p>
              <input
                name="title"
                placeholder="e.g., Inception"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/15 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-fuchsia-600 hover:to-indigo-600 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Start My Movie Journey
            </button>
          </form>
        </section>

        {/* Information Card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                We'll save your favorite movie
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Generate fascinating facts about your movie
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Take you to your personal dashboard
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
