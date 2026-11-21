
import Image from "next/image";
import Link from "next/link";

function WishoraLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand-logo ${footer ? "footer-brand" : ""}`}
      aria-label="My Wishora - Home"
    >
      <span className="logo-big">𝓜</span>
      <span className="logo-small">𝔂</span>
      <span className="logo-big">𝓦</span>
      <span className="logo-small">𝓲𝓼𝓱𝓸𝓻𝓪</span>
    </Link>
  );
}

export default function AboutPage() {
  const faqs = [
    {
      question: "What is My Wishora?",
      answer:
        "My Wishora is a celebration and gifting platform where people can create personalised wishlists for their special occasions and invite loved ones to contribute towards meaningful wishes.",
    },
    {
      question: "How does My Wishora work?",
      answer:
        "You create a celebration, add the things you wish for, and share your unique celebration page with friends and family. They can explore your wishes and become a part of making them possible.",
    },
    {
      question: "Which occasions can I create a wishlist for?",
      answer:
        "My Wishora is designed for weddings, birthdays, anniversaries and other special milestones. Every occasion worth celebrating deserves a wishlist of its own.",
    },
    {
      question: "Can my friends and family contribute together?",
      answer:
        "Yes! My Wishora is built around shared wishes. Friends and family can come together to contribute towards something meaningful instead of choosing separate gifts.",
    },
    {
      question: "Do I have to add expensive gifts?",
      answer:
        "Not at all. You can add wishes of different kinds and values. Your wishlist should reflect your dreams, preferences and budget.",
    },
    {
      question: "Can I add experiences instead of physical gifts?",
      answer:
        "Absolutely! Your wishes can be experiences, travel plans, special purchases or anything meaningful that you would love to receive.",
    },
    {
      question: "Is My Wishora only for weddings?",
      answer:
        "No. While weddings are one of the occasions we celebrate, My Wishora is for every meaningful moment, including birthdays, anniversaries and life's special milestones.",
    },
    {
      question: "How can I get started?",
      answer:
        "Simply visit our Create page, choose your occasion and start building your celebration. You can add your wishes and personalise your page before sharing it with loved ones.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F6F1E9] text-[#3B071B]">
      {/* Navigation */}
      <header className="navbar">
        <WishoraLogo />

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/create">Create</Link>
          <Link href="/about">About Us</Link>
        </nav>

        <Link href="/create" className="nav-cta">
          Begin Your Story <span>↗</span>
        </Link>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[570px] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <Image
          src="/images/hero-bg.jpg"
          alt="My Wishora celebration background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#260713]/35" />

        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <p className="mb-7 inline-block rounded-full bg-[#260713]/45 px-5 py-3 text-xs font-semibold tracking-[0.35em] text-white shadow-lg">
  THE STORY BEHIND MY WISHORA
</p>

          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            More than gifts.
            <br />
            <em>A world of possibilities.</em>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 md:text-lg">
            We believe every celebration holds a dream,
            every dream deserves to be shared, and every
            meaningful moment deserves to be remembered.
          </p>

          <div className="mt-9 space-y-3">
            <p className="font-serif text-xl italic">
              Where Every Wish Finds Its Way.
            </p>

            <p className="text-sm underline underline-offset-4">
              A Wish Shared. A Dream Made Possible.
            </p>
          </div>

          <a
            href="#our-story"
            className="mt-10 inline-block border border-white px-9 py-4 text-xs tracking-[0.18em] transition hover:bg-white hover:text-[#3B071B]"
          >
            DISCOVER OUR STORY ↓
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="grid items-center gap-14 px-7 py-24 md:grid-cols-2 md:px-20 md:py-32"
      >
        <div>
          <p className="mb-5 text-xs tracking-[0.25em] text-[#9A5268]">
            HOW IT ALL BEGAN
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            A different way
            <br />
            to <em>celebrate.</em>
          </h2>

          <div className="my-8 h-px w-20 bg-[#9A5268]" />

          <p className="mb-5 text-base leading-8 text-[#3B071B]">
            Celebrations bring people together. But when it
            comes to gifting, we often find ourselves choosing
            things without really knowing what someone dreams of.
          </p>

          <p className="mb-5 text-base leading-8 text-[#3B071B]">
            We imagined something different: a place where
            people could share their wishes, create meaningful
            celebration spaces, and invite the people they love
            to be part of making those wishes come true.
          </p>

          <p className="text-base leading-8 text-[#3B071B]">
            That idea is the beginning of My Wishora — a platform
            designed to make gifting more thoughtful and
            celebrations more personal.
          </p>
        </div>

        <div className="relative min-h-[420px] overflow-hidden">
          <Image
            src="/images/experiences.jpg"
            alt="A memorable shared experience"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-[#EDE3DA] px-7 py-24 md:px-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs tracking-[0.25em] text-[#9A5268]">
            WHAT WE STAND FOR
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            A purpose beyond <em>presents.</em>
          </h2>

          <div className="mt-16 grid gap-12 text-left md:grid-cols-2">
            <div className="border-t border-[#9A5268] pt-7">
              <span className="text-xs tracking-[0.2em] text-[#9A5268]">
                OUR MISSION
              </span>

              <h3 className="mt-5 font-serif text-3xl">
                Make every wish matter.
              </h3>

              <p className="mt-5 leading-8 text-[#3B071B]">
                To make celebrations more meaningful by
                connecting people through thoughtful gifting,
                shared wishes and experiences that bring joy.
              </p>
            </div>

            <div className="border-t border-[#9A5268] pt-7">
              <span className="text-xs tracking-[0.2em] text-[#9A5268]">
                OUR VISION
              </span>

              <h3 className="mt-5 font-serif text-3xl">
                A world where dreams are shared.
              </h3>

              <p className="mt-5 leading-8 text-[#3B071B]">
                To create a platform where every milestone
                becomes an opportunity to bring loved ones
                closer and turn meaningful wishes into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="px-7 py-24 md:px-20 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            <div className="absolute -inset-3 border border-[#B99AA2]" />

            <Image
              src="/images/hero-bg.jpg"
              alt="Celebration inspiration"
              width={650}
              height={800}
              className="relative h-[430px] w-full object-cover md:h-[580px]"
            />

            <p className="mt-5 text-center text-xs tracking-[0.2em] text-[#9A5268]">
              THE BEGINNING OF A DREAM
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs tracking-[0.25em] text-[#9A5268]">
              A LETTER FROM OUR FOUNDER
            </p>

            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Some dreams are too beautiful
              to celebrate <em>alone.</em>
            </h2>

            <div className="my-8 h-px w-20 bg-[#9A5268]" />

            <h3 className="mb-5 font-serif text-2xl">
              Hello, and welcome to My Wishora.
            </h3>

            <div className="space-y-5 text-base leading-8 text-[#3B071B]">
              <p>
                I have always believed that the most beautiful
                moments in life are not defined by how grand
                they look, but by the people who make them special.
              </p>

              <p>
                Yet, somewhere along the way, gifting became
                more about choosing something than understanding
                what someone truly wishes for.
              </p>

              <p className="font-serif text-2xl italic text-[#7B243F]">
                I wanted to change that.
              </p>

              <p>
                My Wishora was born from a simple but meaningful
                thought: what if people could share their dreams
                instead of receiving gifts they might never need?
                What if friends and family could come together,
                contribute a little, and make something
                extraordinary possible?
              </p>

              <p>
                A honeymoon. A dream home. A special experience.
                A birthday wish. A thousand little things that
                mean so much.
              </p>

              <p>
                I envision My Wishora becoming a place where
                celebrations go beyond invitations and presents
                — where technology brings people closer, wishes
                become shared goals, and every contribution
                carries a little love.
              </p>

              <p>
                We are at the beginning of something bigger,
                and I am excited to build it with every person
                who believes that the best things in life are
                made even more beautiful when shared.
              </p>

              <p>
                Thank you for being part of our beginning.
              </p>
            </div>

            <div className="mt-10">
              <p className="font-serif text-3xl italic text-[#7B243F]">
                Lipika Goswami
              </p>

              <p className="mt-2 text-xs tracking-[0.2em] text-[#9A5268]">
                FOUNDER & CEO, MY WISHORA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Beliefs */}
      <section className="bg-[#3B071B] px-7 py-24 text-center text-[#F6F1E9] md:py-28">
        <p className="mb-5 text-xs tracking-[0.25em] text-[#D9B6C2]">
          THE MY WISHORA WAY
        </p>

        <h2 className="font-serif text-4xl md:text-5xl">
          What makes a moment <em>meaningful?</em>
        </h2>

        <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:grid-cols-4">
          {[
            {
              number: "01",
              title: "Thoughtfulness",
              description: "Because the best gifts begin with understanding.",
            },
            {
              number: "02",
              title: "Togetherness",
              description: "Because dreams become sweeter when shared.",
            },
            {
              number: "03",
              title: "Personalisation",
              description: "Because every story deserves its own space.",
            },
            {
              number: "04",
              title: "Meaning",
              description: "Because memories matter more than things.",
            },
          ].map((item) => (
            <div key={item.number}>
              <span className="text-sm text-[#D9B6C2]">
                {item.number}
              </span>

              <h3 className="mt-5 font-serif text-2xl">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#F6F1E9]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section
        id="faqs"
        className="px-7 py-24 md:px-20 md:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="mb-5 text-xs tracking-[0.25em] text-[#9A5268]">
              WE&apos;RE HERE TO HELP
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              Frequently Asked <em>Questions.</em>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#3B071B]/80">
              Curious about My Wishora? Find answers to some
              of the questions you may have about creating,
              sharing and celebrating your wishes.
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-[#9A5268]/30 py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg md:text-xl">
                  <span>{faq.question}</span>

                  <span className="shrink-0 text-2xl text-[#9A5268] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pt-5 text-sm leading-8 text-[#3B071B]/75">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-[#3B071B]/80">
              Still have questions?
            </p>

            <p className="mt-2 font-serif text-xl italic text-[#7B243F]">
              We&apos;re here to help make your wishes possible.
            </p>
          </div>
        </div>
      </section>

    
{/* Closing */}

      {/* Closing */}
      <section className="relative overflow-hidden bg-[#EDE3DA] px-7 py-24 text-center md:py-32">
        <div className="mx-auto max-w-4xl border border-[#B98D99]/60 bg-[#F6F1E9] px-7 py-16 shadow-sm md:px-16 md:py-20">
          <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-[#9A5268]">
            THIS IS ONLY THE BEGINNING
          </p>

          <div className="mx-auto mb-8 h-px w-16 bg-[#9A5268]" />

          <h2 className="font-serif text-4xl leading-tight text-[#3B071B] md:text-6xl">
            Your dreams. Their love.
            <br />
            <em>One beautiful celebration.</em>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#684454] md:text-base">
            Be part of a new way to celebrate life&apos;s most
            meaningful moments. Your My Wishora story starts here.
          </p>

          <Link
            href="/create"
            className="mt-10 inline-flex items-center gap-3 border border-[#3B071B] bg-[#3B071B] px-10 py-5 text-xs font-semibold tracking-[0.15em] text-[#F6F1E9] transition duration-300 hover:bg-transparent hover:text-[#3B071B]"
          >
            CREATE YOUR CELEBRATION
            <span>↗</span>
          </Link>

          <p className="mt-9 font-serif text-lg italic text-[#9A5268]">
            Where Every Wish Finds Its Way.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#9A5268] px-7 py-12 text-center">
        <WishoraLogo footer />

        <p className="mt-5 text-sm text-[#3B071B]">
          Where Every Wish Finds Its Way.
        </p>

        <p className="mt-2 text-xs text-[#3B071B] underline underline-offset-4">
          A Wish Shared. A Dream Made Possible.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-7 text-xs text-[#7B243F]">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/create">Create a Celebration</Link>
        </div>

        <p className="mt-9 text-[10px] tracking-[0.2em] text-[#3B071B]">
          © 2026 MY WISHORA. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}
