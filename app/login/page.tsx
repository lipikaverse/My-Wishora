
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#302624]">
      <header className="flex items-center justify-between border-b border-[#3B071B]/10 px-6 py-5 md:px-16">
        <Link href="/" className="font-serif text-3xl text-[#3B071B]">
          𝓜𝔂𝓦𝓲𝓼𝓱𝓸𝓻𝓪
        </Link>
        <Link href="/" className="text-sm text-[#786B65]">
          Back to Home
        </Link>
      </header>

      <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-[#3B071B]/10 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-9 text-center">
            <p className="text-xs tracking-[0.35em] text-[#A98280]">
              WELCOME BACK
            </p>

            <h1 className="mt-5 font-serif text-5xl text-[#3B071B]">
              Welcome Home
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#786B65]">
              Log in to continue creating beautiful celebrations and sharing wishes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-[#3B071B]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#3B071B]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#DCCBC0] bg-[#FDFBF8] px-4 py-4 text-sm outline-none focus:border-[#3B071B]"
              />
            </div>

            {message && (
              <p className="rounded-xl bg-[#F8F3ED] p-4 text-sm text-[#3B071B]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#3B071B] px-8 py-5 text-sm font-medium tracking-widest text-white transition hover:bg-[#542037] disabled:opacity-60"
            >
              {loading ? "LOGGING IN..." : "LOG IN ↗"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#786B65]">
            New to My Wishora?{" "}
            <Link href="/signup" className="font-medium text-[#3B071B] underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-[#3B071B]/10 px-6 py-8 text-center">
        <p className="font-serif text-2xl text-[#3B071B]">My Wishora</p>
        <p className="mt-2 text-xs tracking-widest text-[#95847C]">
          WHERE EVERY WISH FINDS ITS WAY.
        </p>
      </footer>
    </main>
  );
}
