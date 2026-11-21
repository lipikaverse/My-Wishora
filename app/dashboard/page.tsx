
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Celebration = {
  id: string;
  occasion: string;
  title: string;
  host: string;
  date: string | null;
  location: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [name, setName] = useState("there");
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      setName(
        user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "there"
      );

      const { data, error: queryError } = await supabase
        .from("celebrations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (queryError) {
        setError(queryError.message);
      } else {
        setCelebrations(data || []);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#302624]">
      <header className="flex items-center justify-between border-b border-[#3B071B]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-3xl text-[#3B071B]">
          𝓜𝔂𝓦𝓲𝓼𝓱𝓸𝓻𝓪
        </Link>

        <button
          onClick={handleLogout}
          className="text-sm text-[#786B65] transition hover:text-[#3B071B]"
        >
          Log Out ↗
        </button>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mb-14">
          <p className="text-xs tracking-[0.35em] text-[#A98280]">
            YOUR PERSONAL SPACE
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#3B071B] md:text-6xl">
            Welcome, {name}.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#786B65] md:text-base">
            Every beautiful celebration begins with a wish.
            Create yours and let your loved ones be part of it.
          </p>

          <p className="mt-5 font-serif text-xl italic text-[#A98280]">
            A Wish Shared. A Dream Made Possible.
          </p>
        </div>

        <div className="mb-14 flex flex-col justify-between gap-6 rounded-3xl bg-[#3B071B] p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#D9B9B5]">
              A NEW BEGINNING
            </p>

            <h2 className="mt-4 font-serif text-3xl md:text-4xl">
              Start a New Celebration
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#E5D5D0]">
              Weddings, birthdays, anniversaries and every
              moment worth celebrating.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#F8F3ED] px-8 py-4 text-sm font-medium tracking-widest text-[#3B071B] transition hover:bg-white"
          >
            CREATE NEW ↗
          </Link>
        </div>

        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#A98280]">
                YOUR COLLECTION
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[#3B071B]">
                My Celebrations
              </h2>
            </div>

            <span className="text-sm text-[#95847C]">
              {celebrations.length} Celebrations
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#3B071B]/10 bg-white p-10 text-center text-sm text-[#786B65]">
              Loading your celebrations...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-sm text-red-700">
              {error}
            </div>
          ) : celebrations.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#BDA9A0] bg-white/60 px-6 py-16 text-center">
              <h3 className="font-serif text-3xl text-[#3B071B]">
                Your story begins here.
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#786B65]">
                You haven&apos;t created a celebration yet.
                Start your first one and make it memorable.
              </p>

              <Link
                href="/create"
                className="mt-8 inline-flex rounded-full bg-[#3B071B] px-8 py-4 text-sm tracking-widest text-white hover:bg-[#542037]"
              >
                CREATE YOUR FIRST CELEBRATION ↗
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {celebrations.map((celebration) => (
                <Link
                  key={celebration.id}
                  href={`/celebration/${celebration.id}`}
                  className="block rounded-3xl border border-[#3B071B]/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs tracking-[0.25em] text-[#A98280]">
                    {celebration.occasion}
                  </p>

                  <h3 className="mt-4 font-serif text-3xl text-[#3B071B]">
                    {celebration.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#786B65]">
                    Hosted by {celebration.host}
                  </p>

                  {celebration.date && (
                    <p className="mt-2 text-sm text-[#95847C]">
                      {new Date(
                        celebration.date + "T00:00:00"
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  {celebration.location && (
                    <p className="mt-2 text-sm text-[#95847C]">
                      {celebration.location}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-[#3B071B]/10 pt-5">
                    <span className="text-xs tracking-widest text-[#3B071B]">
                      VIEW CELEBRATION
                    </span>

                    <span className="text-lg text-[#A98280]">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#3B071B]/10 px-6 py-8 text-center">
        <p className="font-serif text-2xl text-[#3B071B]">
          My Wishora
        </p>

        <p className="mt-2 text-xs tracking-widest text-[#95847C]">
          WHERE EVERY WISH FINDS ITS WAY.
        </p>
      </footer>
    </main>
  );
}
