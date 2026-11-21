
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
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
  message: string | null;
};

type Wish = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

const categories = [
  "Travel & Honeymoon",
  "Jewellery",
  "Home & Living",
  "Fashion",
  "Experiences",
  "Personal Gifts",
  "Other",
];

const categoryImages: Record<string, string> = {
  "Travel & Honeymoon": "/images/experiences.jpg",
  Jewellery: "/images/experiences.jpg",
  "Home & Living": "/images/experiences.jpg",
  Fashion: "/images/experiences.jpg",
  Experiences: "/images/experiences.jpg",
  "Personal Gifts": "/images/experiences.jpg",
  Other: "/images/experiences.jpg",
};

function getWishImage(wish: Wish) {
  return (
    wish.image ||
    categoryImages[wish.category] ||
    categoryImages.Other
  );
}

export default function WishesPage() {
  const router = useRouter();

  const [celebration, setCelebration] =
    useState<Celebration | null>(null);

  const [celebrationId, setCelebrationId] = useState("");

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Travel & Honeymoon");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load the selected celebration and its wishes from Supabase
  useEffect(() => {
    async function loadWishlist() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      const savedCelebrationId = sessionStorage.getItem(
        "wishoraCurrentCelebrationId"
      );

      if (!savedCelebrationId) {
        router.replace("/dashboard");
        return;
      }

      setCelebrationId(savedCelebrationId);

      const { data: celebrationData, error: celebrationError } =
        await supabase
          .from("celebrations")
          .select("*")
          .eq("id", savedCelebrationId)
          .eq("user_id", user.id)
          .single();

      if (celebrationError || !celebrationData) {
        setError(
          celebrationError?.message ||
            "We could not find this celebration."
        );
        setLoaded(true);
        return;
      }

      setCelebration(celebrationData);

      const { data: wishesData, error: wishesError } =
        await supabase
          .from("wishes")
          .select("*")
          .eq("celebration_id", savedCelebrationId)
          .order("created_at", { ascending: true });

      if (wishesError) {
        setError(wishesError.message);
      } else {
        setWishes(
          (wishesData || []).map((wish) => ({
            id: wish.id,
            title: wish.title,
            category: wish.category || "Other",
            price: Number(wish.price || 0),
            image:
              wish.image ||
              categoryImages[wish.category || "Other"] ||
              categoryImages.Other,
            description: wish.description || "",
          }))
        );
      }

      setLoaded(true);
    }

    loadWishlist();
  }, [router]);

  const selectedImage =
    image.trim() ||
    categoryImages[category] ||
    categoryImages.Other;

  // Add a new wish to Supabase
  async function addWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!celebrationId) {
      setError("Celebration ID is missing. Please start again.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();

    const { data, error: insertError } = await supabase
      .from("wishes")
      .insert({
        celebration_id: celebrationId,
        title: title.trim(),
        category,
        price: Number(price),
        image: selectedImage,
        description: description.trim(),
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    const newWish: Wish = {
      id: data.id,
      title: data.title,
      category: data.category || "Other",
      price: Number(data.price),
      image: data.image || categoryImages.Other,
      description: data.description || "",
    };

    setWishes((previous) => [...previous, newWish]);

    setTitle("");
    setCategory("Travel & Honeymoon");
    setPrice("");
    setImage("");
    setDescription("");
    setShowForm(false);
    setSaving(false);
  }

  // Delete a wish from Supabase
  async function removeWish(id: string) {
    const supabase = createClient();

    setError("");

    const { error: deleteError } = await supabase
      .from("wishes")
      .delete()
      .eq("id", id)
      .eq("celebration_id", celebrationId);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setWishes((previous) =>
      previous.filter((wish) => wish.id !== id)
    );
  }

  const total = wishes.reduce(
    (sum, wish) => sum + Number(wish.price || 0),
    0
  );

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F3ED]">
        <p className="font-serif text-2xl text-[#3B071B]">
          Preparing your wishlist...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#302624]">
      {/* HEADER */}

      <header className="flex items-center justify-between border-b border-[#3B071B]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-3xl text-[#3B071B]">
          𝓜𝔂𝓦𝓲𝓼𝓱𝓸𝓻𝓪
        </Link>

        <Link
          href="/dashboard"
          className="text-sm text-[#786B65] hover:text-[#3B071B]"
        >
          ← Dashboard
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
        {/* PAGE INTRO */}

        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#A98280]">
            STEP 02 — YOUR WISHLIST
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#3B071B] md:text-6xl">
            Dreams worth <em>wishing for.</em>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786B65]">
            From little thoughtful gifts to your biggest dreams,
            add everything you&apos;d love your favourite people
            to be part of.
          </p>
        </div>

        {/* CELEBRATION DETAILS */}

        {celebration && (
          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-[#3B071B]/10 bg-white/50 px-6 py-5 text-center">
            <p className="text-xs tracking-[0.2em] text-[#A98280]">
              YOUR CELEBRATION
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#3B071B]">
              {celebration.title}
            </h2>

            <p className="mt-1 text-sm text-[#786B65]">
              {celebration.occasion}
              {celebration.date
                ? ` · ${celebration.date}`
                : ""}
            </p>
          </div>
        )}

        {/* WISHLIST HEADING */}

        <div className="mt-14 flex flex-col justify-between gap-5 border-b border-[#3B071B]/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#A98280]">
              YOUR DREAM COLLECTION
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#3B071B]">
              Your wishes
              <span className="ml-3 text-base text-[#A98280]">
                ({wishes.length})
              </span>
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-[#3B071B] px-7 py-3 text-sm text-white transition hover:bg-[#542037]"
          >
            {showForm ? "Close form" : "+ Add a wish"}
          </button>
        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ADD WISH FORM */}

        {showForm && (
          <div className="mt-8 rounded-2xl border border-[#3B071B]/10 bg-white/70 p-6 md:p-9">
            <p className="text-xs tracking-[0.2em] text-[#A98280]">
              ADD SOMETHING SPECIAL
            </p>

            <h3 className="mb-7 mt-2 font-serif text-3xl text-[#3B071B]">
              What are you wishing for?
            </h3>

            <form onSubmit={addWish} className="space-y-5">
              <div>
                <label htmlFor="wish-title" className="mb-2 block text-sm">
                  Wish name *
                </label>

                <input
                  id="wish-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  placeholder="e.g. A dream trip to Switzerland"
                  className="w-full rounded-lg border border-[#DCCBC0] bg-[#F8F3ED] px-4 py-3 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="wish-category" className="mb-2 block text-sm">
                    Category *
                  </label>

                  <select
                    id="wish-category"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                      setImage("");
                    }}
                    className="w-full rounded-lg border border-[#DCCBC0] bg-[#F8F3ED] px-4 py-3 text-sm outline-none focus:border-[#3B071B]"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="wish-price" className="mb-2 block text-sm">
                    Estimated price (₹) *
                  </label>

                  <input
                    id="wish-price"
                    type="number"
                    min="1"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    placeholder="e.g. 25000"
                    className="w-full rounded-lg border border-[#DCCBC0] bg-[#F8F3ED] px-4 py-3 text-sm outline-none focus:border-[#3B071B]"
                  />
                </div>
              </div>

              {/* IMAGE PREVIEW */}

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm">
                    Your wish picture
                  </label>

                  <span className="text-xs text-[#A98280]">
                    {image.trim()
                      ? "Custom image"
                      : "Automatically selected"}
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#3B071B]/10">
                  <div className="relative h-56 w-full">
                    <Image
                      src={selectedImage}
                      alt={`${category} preview`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>

                  <div className="bg-white/80 px-4 py-3">
                    <p className="text-sm text-[#3B071B]">
                      {category}
                    </p>

                    <p className="mt-1 text-xs text-[#786B65]">
                      {image.trim()
                        ? "Your custom image link will be used."
                        : "Wishora has selected this picture for you."}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="wish-image" className="mb-2 block text-sm">
                  Replace picture with your own URL (optional)
                </label>

                <input
                  id="wish-image"
                  type="url"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="Paste your image link, or leave empty"
                  className="w-full rounded-lg border border-[#DCCBC0] bg-[#F8F3ED] px-4 py-3 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <div>
                <label htmlFor="wish-description" className="mb-2 block text-sm">
                  A little description (optional)
                </label>

                <textarea
                  id="wish-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  placeholder="Tell your guests why this wish is special..."
                  className="w-full rounded-lg border border-[#DCCBC0] bg-[#F8F3ED] px-4 py-3 text-sm outline-none focus:border-[#3B071B]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#3B071B] px-6 py-4 text-sm text-white transition hover:bg-[#542037] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving your wish..." : "Add to my wishlist ↗"}
              </button>
            </form>
          </div>
        )}

        {/* EMPTY WISHLIST */}

        {wishes.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-[#A98280]/50 bg-white/30 px-6 py-16 text-center">
            <div className="text-4xl text-[#A98280]">♡</div>

            <h3 className="mt-5 font-serif text-3xl text-[#3B071B]">
              Your wishlist begins here.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#786B65]">
              Add your first wish and start creating a collection
              of things that would make your celebration special.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-7 rounded-lg border border-[#3B071B] px-7 py-3 text-sm text-[#3B071B] transition hover:bg-[#3B071B] hover:text-white"
            >
              Add your first wish
            </button>
          </div>
        ) : (
          <>
            {/* WISH CARDS */}

            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {wishes.map((wish) => (
                <article
                  key={wish.id}
                  className="overflow-hidden rounded-xl border border-[#3B071B]/10 bg-white/70"
                >
                  <div className="relative h-56 overflow-hidden bg-[#EFE5DC]">
                    <Image
                      src={getWishImage(wish)}
                      alt={wish.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-xs tracking-wider text-[#A98280]">
                      {wish.category}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl text-[#3B071B]">
                      {wish.title}
                    </h3>

                    {wish.description && (
                      <p className="mt-3 text-sm leading-6 text-[#786B65]">
                        {wish.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-[#3B071B]/10 pt-4">
                      <div>
                        <p className="text-xs text-[#95847C]">
                          ESTIMATED VALUE
                        </p>

                        <p className="mt-1 text-lg font-medium text-[#3B071B]">
                          ₹{Number(wish.price).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        onClick={() => removeWish(wish.id)}
                        className="text-xs text-[#A98280] underline underline-offset-4 hover:text-[#3B071B]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* TOTAL */}

            <div className="mt-10 flex flex-col justify-between gap-4 rounded-xl bg-[#EFE5DC] p-6 md:flex-row md:items-center md:px-8">
              <div>
                <p className="text-xs tracking-widest text-[#95847C]">
                  TOTAL WISHLIST VALUE
                </p>

                <p className="mt-2 font-serif text-3xl text-[#3B071B]">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>

              <p className="text-sm text-[#786B65]">
                {wishes.length} {wishes.length === 1 ? "wish" : "wishes"} added
                to your celebration
              </p>
            </div>
          </>
        )}

        {/* FOOTER */}

        <div className="mt-16 border-t border-[#3B071B]/10 pt-8 text-center">
          <p className="font-serif text-2xl italic text-[#A98280]">
            Every wish tells a story.
          </p>

          <p className="mt-3 text-xs tracking-widest text-[#95847C]">
            WISHORA — MADE FOR MEANINGFUL MOMENTS
          </p>
        </div>
      </section>
    </main>
  );
}
