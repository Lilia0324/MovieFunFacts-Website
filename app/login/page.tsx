// app/login/page.tsx
"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

/** Stable movie posters (TMDB CDN) */
const posters = [
  "https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // Inception
  "https://image.tmdb.org/t/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", // Interstellar
  "https://image.tmdb.org/t/p/w342/q719jXXEzOoYaps6babgKnONONX.jpg", // Spirited Away
  "https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // The Godfather
  "https://image.tmdb.org/t/p/w342/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg", // Fight Club
  "https://image.tmdb.org/t/p/w342/4OTYefcAlaShn6TGVK33UxLW9R7.jpg", // Parasite
  "https://image.tmdb.org/t/p/w342/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // Joker
  "https://image.tmdb.org/t/p/w342/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", // The Dark Knight
  "https://image.tmdb.org/t/p/w342/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", // Joker (alt)
  "https://image.tmdb.org/t/p/w342/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers: Infinity War
  "https://image.tmdb.org/t/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Avengers: Endgame
  "https://image.tmdb.org/t/p/w342/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", // Spider-Man: No Way Home
  "https://image.tmdb.org/t/p/w342/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", // The Dark Knight (alt)
  "https://image.tmdb.org/t/p/w342/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Wonder Woman 1984
  "https://image.tmdb.org/t/p/w342/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", // The Lord of the Rings: The Fellowship of the Ring
  "https://image.tmdb.org/t/p/w342/2va32apQP97gvUxaMnL5wYt4CRB.jpg", // Frozen
  "https://image.tmdb.org/t/p/w342/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", // Black Panther: Wakanda Forever
  "https://image.tmdb.org/t/p/w342/6oNm06TPz2vGiPc2I52oXW3JwPS.jpg", // The Super Mario Bros. Movie
  "https://image.tmdb.org/t/p/w342/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg", // Coco
  "https://image.tmdb.org/t/p/w342/6KErczPBROQty7QoIsaa6wJYXZi.jpg", // Soul
  "https://image.tmdb.org/t/p/w342/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg", // The Lion King (2019)
  "https://image.tmdb.org/t/p/w342/7GsM4mtM0worCtIVeiQt28HieeN.jpg", // Green Book
  "https://image.tmdb.org/t/p/w342/2CAL2433ZeIihfX1Hb2139CX0pW.jpg", // Titanic
];

const heightClasses = ["h-52", "h-64", "h-72", "h-56", "h-80"];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background colorful spots */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      {/* Background poster wall (5 columns alternating direction) */}
      <div className="absolute inset-0 opacity-80 overflow-hidden">
        {/* Top/bottom fade, ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black/70 z-10 pointer-events-none" />

        {/* 5 independent scrolling containers */}
        <div className="absolute inset-0 z-0 p-6">
          <div className="grid grid-cols-5 gap-4 h-full">
            {[0, 1, 2, 3, 4].map((col) => {
              const colItems = posters.filter((_, idx) => idx % 5 === col);
              const directionClass = col % 2 === 0 ? "poster-marquee-down" : "poster-marquee-up"; // 1/3/5 columns down, 2/4 columns up
              return (
                <div key={col} className="relative h-full overflow-hidden">
                  <div className={`${directionClass}`}>
                    {/* First batch */}
                    <div>
                      {colItems.map((src, i) => (
                        <div
                          key={`c${col}-a-${i}`}
                          className={`relative mb-4 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-xl ${heightClasses[i % heightClasses.length]}`}
                        >
                          <Image
                            src={src}
                            alt={`poster-col${col}-${i}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className="object-cover"
                            priority={i < 2}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Second batch (copy) */}
                    <div>
                      {colItems.map((src, i) => (
                        <div
                          key={`c${col}-b-${i}`}
                          className={`relative mb-4 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-xl ${heightClasses[i % heightClasses.length]}`}
                        >
                          <Image
                            src={src}
                            alt={`poster-col${col}-copy-${i}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className="object-cover"
                            priority={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Glass morphing login card */}
      <div className="relative z-20 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-white">Movie Fun Facts</h1>
          <p className="text-sm text-white/60">
            Sign in with Google to get started.
          </p>
        </div>
        <div className="mt-6">
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-white cursor-pointer"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
}
