
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateRegistry() {
  const [form, setForm] = useState({
    partner1: "",
    partner2: "",
    weddingDate: "",
    city: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Your Wishora registry journey begins! ♡");
    console.log(form);
  };

  return (
    <main className="min-h-screen bg-[#fff7f8] px-6 py-12">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-3xl font-serif font-bold text-[#bd7189]">
          Wishora ♡
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-pink-500">
          Back to Home
        </Link>
      </nav>

      <section className="mx-auto mt-14 max-w-2xl rounded-3xl bg-white p-8 shadow-lg md:p-12">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#bd7189]">
            YOUR FOREVER STARTS HERE
          </p>

          <h1 className="font-serif text-4xl text-gray-800 md:text-5xl">
            Create Your Registry
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Your wedding, your dreams, your wishlist.
            Let your loved ones be a part of your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Partner 1 Name
            </label>
            <input
              required
              name="partner1"
              value={form.partner1}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-pink-100 bg-[#fffafb] px-4 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Partner 2 Name
            </label>
            <input
              required
              name="partner2"
              value={form.partner2}
              onChange={handleChange}
              placeholder="Enter partner's name"
              className="w-full rounded-xl border border-pink-100 bg-[#fffafb] px-4 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Wedding Date
            </label>
            <input
              required
              type="date"
              name="weddingDate"
              value={form.weddingDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-pink-100 bg-[#fffafb] px-4 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Wedding City
            </label>
            <input
              required
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Kolkata"
              className="w-full rounded-xl border border-pink-100 bg-[#fffafb] px-4 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-pink-100 bg-[#fffafb] px-4 py-3 outline-none focus:border-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#bd7189] py-4 font-medium text-white transition hover:bg-[#a95c75]"
          >
            Create My Registry ♡
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Made with love, for your forever. ♡
        </p>
      </section>
    </main>
  );
}

