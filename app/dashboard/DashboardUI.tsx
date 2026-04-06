'use client';

import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import RefreshFactButton from "./RefreshFactButton";
import type { Session } from "next-auth";
import type { User } from ".prisma/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface DashboardUIProps {
  session: NonNullable<Session> & {
    user: NonNullable<Session['user']>;
  };
  user: User;
  movieFact: string;
  /** Current movie title for generating fun fact (equal to user's favoriteMovie) */
  currentTitle: string;
}

/** Low opacity posters used for top banner (can be added/removed as needed) */
const posters = [
  "https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  "https://image.tmdb.org/t/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  "https://image.tmdb.org/t/p/w342/q719jXXEzOoYaps6babgKnONONX.jpg",
  "https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "https://image.tmdb.org/t/p/w342/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
  "https://image.tmdb.org/t/p/w342/4OTYefcAlaShn6TGVK33UxLW9R7.jpg",
  "https://image.tmdb.org/t/p/w342/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
  "https://image.tmdb.org/t/p/w342/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg",
];
const postersLoop = [...posters, ...posters];

export default function DashboardUI({ session, user, movieFact, currentTitle }: DashboardUIProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // UI state for choosing a new movie
  const [choosing, setChoosing] = useState(false);
  const [movieInput, setMovieInput] = useState("");
  const [saving, setSaving] = useState(false);
  const disabled = saving || isPending;

  const submitNewMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = movieInput.trim();
    if (!title) return;

    try {
      setSaving(true);
      const res = await fetch("/api/favorite-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        console.error("Failed to update favorite movie:", await res.text());
        return;
      }
      setChoosing(false);
      setMovieInput("");
      // Refresh server component, get new favoriteMovie and corresponding fun fact
      startTransition(() => {
        router.replace(searchParams?.toString() ? `${pathname}?${searchParams}` : pathname);
        router.refresh();
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,.35)_70%,rgba(0,0,0,.65)_100%)]" />

      {/* Top movie posters banner */}
      <div className="absolute inset-x-0 top-0 h-[34vh] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/40 to-transparent" />
        <div className="absolute left-0 top-6 h-[80%] w-[200%] flex animate-posters-ribbon opacity-30 will-change-transform">
          {postersLoop.map((src, i) => (
            <div key={i} className="relative mx-4 h-full w-[10%] min-w-[140px]">
              <div className="relative h-full w-full overflow-hidden rounded-lg ring-1 ring-white/10 shadow-xl">
                <Image src={src} alt={`poster-${i}`} fill sizes="180px" className="object-cover" priority={i < 6} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page container */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 pb-16 pt-24 md:px-8 space-y-8">
        {/* Top personal info card */}
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {session.user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt="avatar"
                  className="h-12 w-12 rounded-full ring-1 ring-white/20"
                />
              )}
              <div>
                <div className="text-xl font-semibold tracking-tight">
                  {session.user.name ?? "User"}
                </div>
                <div className="text-sm text-white/60">{session.user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LogoutButton />
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="px-6 py-4 text-sm text-white/65">
            Welcome back! Here’s your favorite movie and a fresh fun fact.
          </div>
        </header>

        {/* Two cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Favorite Movie */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl transition hover:bg-white/7 hover:border-white/15">
            <h2 className="mb-2 text-lg font-semibold">Favorite Movie</h2>
            <p className="text-white/80">{user.favoriteMovie}</p>

            {/* Choose another movie (save as new favorite) */}
            <div className="mt-4 flex flex-col gap-3">
              {!choosing ? (
                <button
                  onClick={() => setChoosing(true)}
                  className="inline-flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/15 active:scale-[.99] transition cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path fill="currentColor" d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm1 4h-2v3H8v2h3v3h2v-3h3v-2h-3V8z"/>
                  </svg>
                  Choose another movie
                </button>
              ) : (
                <form onSubmit={submitNewMovie} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    value={movieInput}
                    onChange={(e) => setMovieInput(e.target.value)}
                    placeholder="Type a movie title…"
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/30 disabled:opacity-60"
                    aria-label="New movie title"
                    autoFocus
                    disabled={disabled}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={disabled}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15 disabled:opacity-60 cursor-pointer"
                    >
                      {(saving || isPending) && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" aria-hidden />
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setChoosing(false)}
                      className="text-sm text-white/60 hover:text-white/80 cursor-pointer"
                      disabled={disabled}
                    >
                      Cancel
                    </button>
                  </div>   
                </form>
              )}
            </div>

            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="mt-3 text-xs text-white/50">
              Tip: Saving here will update your profile favorite movie.
            </p>
          </div>

          {/* Fun Fact */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl transition hover:bg-white/7 hover:border-white/15">
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="text-lg font-semibold">
                Fun fact <span className="text-white/50 text-sm">for “{currentTitle}”</span>
              </div>
              <RefreshFactButton />
            </div>

            {/* Loading state (route transition) */}
            {isPending ? (
              <div className="mt-1 space-y-2">
                <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-2/5 rounded bg-white/10 animate-pulse" />
              </div>
            ) : (
              <div className="leading-relaxed text-white/80">
                {movieFact}
              </div>
            )}
          </div>
        </section>

        {/* Bottom wide card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl">
          <h2 className="mb-3 text-lg font-semibold">Notes</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Choose another movie will save to your profile and regenerate a new fun fact.
          </p>
        </section>
      </div>

        {/* Bottom movie posters banner (reverse) */}
      <div className="absolute inset-x-0 bottom-0 h-[34vh] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute left-0 bottom-6 h-[80%] w-[200%] flex animate-posters-ribbon-reverse opacity-30 will-change-transform">
          {postersLoop.map((src, i) => (
            <div key={`bottom-${i}`} className="relative mx-4 h-full w-[10%] min-w-[140px]">
              <div className="relative h-full w-full overflow-hidden rounded-lg ring-1 ring-white/10 shadow-xl">
                <Image src={src} alt={`bottom-poster-${i}`} fill sizes="180px" className="object-cover" priority={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
