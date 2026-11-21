
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Celebration = {
  id: string;
  occasion: string;
  title: string;
  host: string;
  date: string | null;
  location: string | null;
  message: string | null;
};

type Wish = {
  id: string;
  title: string;
  category: string | null;
  price: number | string | null;
  image: string | null;
  description: string | null;
};

const occasionThemes: Record<string, string> = {
  Wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
  Birthday:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2000&q=85",
  Anniversary:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=85",
  Engagement:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85",
  "Baby Shower":
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=2000&q=85",
  Housewarming:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85",
  "Other Celebration":
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=85",
};

export default function IndividualCelebrationPage() {
  const params = useParams<{ id: string }>();
  const celebrationId = params.id;

  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the link. Please copy the URL manually.");
    }
  }

  useEffect(() => {
    let active = true;

    async function loadCelebration() {
      const supabase = createClient();

      setLoading(true);
      setError("");

      const {
        data: celebrationData,
        error: celebrationError,
      } = await supabase
        .from("celebrations")
        .select("id, occasion, title, host, date, location, message")
        .eq("id", celebrationId)
        .maybeSingle();

      if (!active) return;

      if (celebrationError) {
        setError(celebrationError.message);
        setLoading(false);
        return;
      }

      if (!celebrationData) {
        setCelebration(null);
        setWishes([]);
        setLoading(false);
        return;
      }

      setCelebration(celebrationData);

      const { data: wishesData, error: wishesError } = await supabase
        .from("wishes")
        .select("*")
        .eq("celebration_id", celebrationId)
        .order("created_at", { ascending: true });

      if (!active) return;

      if (wishesError) {
        setError(wishesError.message);
      } else {
        setWishes(wishesData || []);
      }

      setLoading(false);
    }

    if (celebrationId) {
      loadCelebration();
    }

    return () => {
      active = false;
    };
  }, [celebrationId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F3ED]">
        <p className="font-serif text-xl text-[#3B071B]">
          Preparing your celebration...
        </p>
      </main>
    );
  }

  if (error || !celebration) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8F3ED] px-6 text-center">
        <h1 className="font-serif text-4xl text-[#3B071B]">
          {error ? "Something went wrong." : "Celebration not found."}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#786B65]">
          {error ||
            "This celebration may not exist or may no longer be available."}
        </p>

        <Link
          href="/dashboard"
          className="mt-8 rounded-full bg-[#3B071B] px-8 py-4 text-sm tracking-widest text-white"
        >
          BACK TO DASHBOARD
        </Link>
      </main>
    );
  }

  const backgroundImage =
    occasionThemes[celebration.occasion] ||
    occasionThemes["Other Celebration"];

  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#3B071B]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3B071B]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-3xl">
          𝓜𝔂𝓦𝓲𝓼𝓱𝓸𝓻𝓪
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full border border-[#3B071B] px-5 py-2 text-sm transition hover:bg-[#3B071B] hover:text-white"
          >
            {copied ? "Link Copied ✓" : "Share Celebration ↗"}
          </button>

          <Link
            href="/dashboard"
            className="text-sm text-[#786B65] transition hover:text-[#3B071B]"
          >
            My Dashboard ↗
          </Link>
        </div>
      </header>

      <section
        className="relative flex min-h-[650px] items-center justify-center bg-cover bg-center px-6 py-24 text-center md:min-h-[720px]"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl text-white">
          <p className="mb-7 text-xs uppercase tracking-[5px] md:text-sm">
            A special moment, beautifully shared
          </p>

          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            {celebration.title}
          </h1>

          <div className="mx-auto my-8 h-px w-20 bg-white/80" />

          <p className="mb-3 text-lg md:text-xl">
            Hosted with love by {celebration.host}
          </p>

          {celebration.date && (
            <p className="text-sm tracking-widest md:text-base">
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
            <p className="mt-2 text-sm tracking-widest">
              {celebration.location}
            </p>
          )}

          <p className="mt-12 font-serif text-xl italic md:text-2xl">
            Your presence is a gift. Your wishes make it even more special.
          </p>

          <a
            href="#wishlist"
            className="mt-10 inline-block rounded-full border border-white px-9 py-3 transition hover:bg-white hover:text-[#3B071B]"
          >
            Explore the Wishlist
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-5 text-xs uppercase tracking-[4px] text-[#A98280]">
          With love, from us
        </p>

        <h2 className="mb-7 font-serif text-4xl md:text-5xl">
          A little wish, a beautiful memory.
        </h2>

        <p className="leading-8 text-[#786B65]">
          {celebration.message ||
            "Every celebration becomes more meaningful when shared with the people we love. We have created this wishlist to share some of our dreams with you. If you wish, you can be a part of making them come true."}
        </p>
      </section>

      <section
        id="wishlist"
        className="bg-[#F1E9DF] px-6 py-16 md:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[4px] text-[#A98280]">
              A piece of our dreams
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              Our Wishlist
            </h2>

            <p className="mt-5 text-[#786B65]">
              Your contribution, big or small, means the world to us.
            </p>
          </div>

          {wishes.length === 0 ? (
            <div className="rounded-2xl bg-white/60 py-16 text-center">
              <h3 className="mb-3 font-serif text-2xl">
                The wishlist is taking shape.
              </h3>

              <p className="text-sm text-[#786B65]">
                No wishes have been added yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {wishes.map((wish) => (
                <article
                  key={wish.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden bg-[#E8DED3]">
                    {wish.image ? (
                      <Image
                        src={wish.image}
                        alt={wish.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#A47B70]">
                        My Wishora
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    {wish.category && (
                      <p className="mb-3 text-xs uppercase tracking-[2px] text-[#A47B70]">
                        {wish.category}
                      </p>
                    )}

                    <h3 className="mb-3 font-serif text-2xl">
                      {wish.title}
                    </h3>

                    {wish.description && (
                      <p className="mb-5 text-sm leading-6 text-[#786B65]">
                        {wish.description}
                      </p>
                    )}

                    {wish.price !== null && wish.price !== "" && (
                      <p className="mt-4 text-lg font-medium">
                        Goal: ₹
                        {Number(wish.price).toLocaleString("en-IN")}
                      </p>
                    )}

                    <p className="mt-5 border-t border-[#3B071B]/10 pt-4 text-xs text-[#A98280]">
                      A wish shared. A dream made possible.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-7 font-serif text-3xl italic md:text-4xl">
          The best gifts are the memories we create together.
        </p>

        <p className="leading-8 text-[#786B65]">
          Thank you for being a part of this special moment.
        </p>

        <p className="mt-10 font-serif text-3xl">
          With love,
          <br />
          {celebration.host}
        </p>

        <p className="mt-16 text-xs tracking-[4px] text-[#A47B70]">
          MADE WITH LOVE BY MY WISHORA
        </p>
      </section>
    </main>
  );
}
