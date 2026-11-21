
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const occasions = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Engagement",
  "Baby Shower",
  "Housewarming",
  "Other Celebration",
];

export default function CreateCelebrationPage() {
  const router = useRouter();

  const [occasion, setOccasion] = useState("Wedding");
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    // Check whether the user is logged in
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.push("/login");
      return;
    }

    // Create a brand-new celebration in Supabase
    const { data, error: insertError } = await supabase
      .from("celebrations")
      .insert({
        user_id: user.id,
        occasion,
        title: title.trim(),
        host: host.trim(),
        date: date || null,
        location: location.trim(),
        message: message.trim(),
      })
      .select("id")
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    // Remember which celebration the wishlist belongs to
    sessionStorage.setItem(
      "wishoraCurrentCelebrationId",
      data.id
    );

    // Continue to wishlist creation
    router.push("/create/wishes");
  }

  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#302624]">
      <header className="flex items-center justify-between border-b border-[#3B071B]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-3xl text-[#3B071B]">
          𝓜𝔂𝓦𝓲𝓼𝓱𝓸𝓻𝓪
        </Link>

        <Link
          href="/dashboard"
          className="text-sm text-[#786B65] hover:text-[#3B071B]"
        >
          Back to Dashboard
        </Link>
      </header>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-medium tracking-[0.35em] text-[#A98280]">
              YOUR STORY STARTS HERE
            </p>

            <h1 className="mt-5 font-serif text-5xl text-[#3B071B] md:text-6xl">
              Create Your Celebration
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786B65] md:text-base">
              Every beautiful celebration begins with a wish.
              Tell us a little about your special occasion.
            </p>

            <p className="mt-5 font-serif text-xl italic text-[#A98280]">
              A Wish Shared. A Dream Made Possible.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#3B071B]/10 bg-white p-7 shadow-sm md:p-12"
          >
            <div className="space-y-7">
              <div>
                <label className="mb-3 block text-sm font-medium text-[#3B071B]">
                  01. What are you celebrating?
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {occasions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setOccasion(item)}
                      className={`rounded-xl border px-3 py-4 text-sm transition ${
                        occasion === item
                          ? "border-[#3B071B] bg-[#3B071B] text-white"
                          : "border-[#DCCBC0] bg-[#F8F3ED] text-[#786B65] hover:border-[#3B071B]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-[#3B071B]">
                  02. Give your celebration a title
                </label>

                <input
                  id="title"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Our Wedding Celebration"
                  className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div>
                <label htmlFor="host" className="mb-2 block text-sm font-medium text-[#3B071B]">
                  03. Host name(s)
                </label>

                <input
                  id="host"
                  required
                  value={host}
                  onChange={(event) => setHost(event.target.value)}
                  placeholder="e.g. Aditi & Rohan"
                  className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-[#3B071B]">
                  04. Celebration date
                </label>

                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium text-[#3B071B]">
                  05. Location
                </label>

                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Kolkata, West Bengal"
                  className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#3B071B]">
                  06. A little note for your guests
                </label>

                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Share a few words about your special day..."
                  className="w-full resize-none rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>
            </div>

            {error && (
              <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-10 w-full rounded-full bg-[#3B071B] px-8 py-5 text-sm font-medium tracking-widest text-white transition hover:bg-[#542037] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "CREATING YOUR CELEBRATION..."
                : "CONTINUE TO YOUR WISHLIST ↗"}
            </button>

            <p className="mt-5 text-center text-xs text-[#95847C]">
              Your celebration. Your wishes. Your story.
            </p>
          </form>
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
