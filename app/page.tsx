
import Image from "next/image";
import Link from "next/link";

const occasions = [
  {
    number: "01",
    title: "Weddings",
    subtitle: "Two hearts. One beautiful beginning.",
    image: "/images/weddings.jpg",
  },
  {
    number: "02",
    title: "Birthdays",
    subtitle: "A little more magic, every year.",
    image: "/images/birthdays.jpg",
  },
  {
    number: "03",
    title: "Anniversaries",
    subtitle: "Celebrate a love that keeps growing.",
    image: "/images/anniversaries.jpg",
  },
  {
    number: "04",
    title: "Dreams & Experiences",
    subtitle: "Give them something to remember.",
    image: "/images/experiences.jpg",
  },
];

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

export default function Home() {
  return (
    <main className="home-page">
      {/* NAVIGATION */}
      <header className="navbar">
        <WishoraLogo />

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#our-world">Our World</a>
          <a href="#occasions">Occasions</a>
          <a href="#how-it-works">How It Works</a>
          <Link href="/about">About Us</Link>
          <a href="#philosophy">Our Philosophy</a>
        </nav>

        <Link href="/create" className="nav-cta">
          Begin Your Story <span>↗</span>
        </Link>
      </header>

      {/* HERO */}
      <section className="hero">
        <Image
          src="/images/hero-bg.jpg"
          alt="An elegant celebration"
          fill
          priority
          className="hero-image"
          sizes="100vw"
        />

        <div className="hero-shade" />
        <div className="hero-frame" />

        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            A WORLD OF MEANINGFUL CELEBRATIONS
          </p>

          <h1>
            Some moments
            <br />
            deserve <em>forever.</em>
          </h1>

          <p className="hero-description">
            Create a celebration around everything that matters.
            Share your dreams, bring your favourite people together
            and turn thoughtful gestures into memories that last.
          </p>

          {/* OPENS THE ADITI & ROHAN DEMO */}
          <Link href="/celebration" className="button button-light">
            Discover My Wishora <span>↗</span>
          </Link>

          <div className="hero-taglines">
            <p>Where Every Wish Finds Its Way.</p>
            <span>A Wish Shared. A Dream Made Possible.</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>CELEBRATE BEAUTIFULLY</span>
          <span>01 — 04</span>
        </div>
      </section>

      {/* OUR WORLD */}
      <section className="intro section-padding" id="our-world">
        <div className="intro-side">THE ART OF CELEBRATING</div>

        <div className="intro-main">
          <p className="eyebrow">MORE THAN JUST AN OCCASION</p>

          <h2>
            The most beautiful gifts
            <br />
            are the <em>memories</em> we make.
          </h2>

          <p className="intro-copy">
            Some dreams are too special to celebrate alone.
            My Wishora brings people together through thoughtful
            gifting, shared wishes and experiences that become
            a part of your story.
          </p>

          <a href="#how-it-works" className="text-link">
            Discover our world <span>→</span>
          </a>
        </div>

        <div className="intro-decoration">W</div>
      </section>

      {/* OCCASIONS */}
      <section className="occasions section-padding" id="occasions">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MADE FOR EVERY MILESTONE</p>
            <h2>
              Every reason to <em>celebrate.</em>
            </h2>
          </div>

          <p className="section-note">
            Because life is made of little moments
            and once-in-a-lifetime memories.
          </p>
        </div>

        <div className="occasion-grid">
          {occasions.map((occasion) => (
            <Link
              href="/create"
              className="occasion-card"
              key={occasion.number}
            >
              <div className="occasion-image-wrap">
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  fill
                  className="occasion-image"
                  sizes="(max-width: 700px) 100vw, 50vw"
                />

                <span className="occasion-number">
                  {occasion.number}
                </span>

                <span className="occasion-arrow">↗</span>

                <div className="occasion-overlay">
                  <h3>{occasion.title}</h3>
                  <p>{occasion.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy section-padding" id="philosophy">
        <div className="philosophy-inner">
          <div className="philosophy-topline">
            <span>✳</span>
            <p className="eyebrow">A THOUGHTFUL WAY TO CELEBRATE</p>
            <span>✳</span>
          </div>

          <h2>
            A gift is lovely.
            <br />
            Being part of a <em>dream</em>
            <br />
            is extraordinary.
          </h2>

          <div className="philosophy-divider" />

          <p className="philosophy-copy">
            A honeymoon waiting to happen. A home taking shape.
            An experience they have always dreamed of.
            Let the people you love be part of making it real.
          </p>

          <Link href="/create" className="button button-outline">
            The My Wishora Philosophy <span>↗</span>
          </Link>

          <div className="philosophy-footer">
            THOUGHTFUL GIVING. MEANINGFUL LIVING.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how section-padding" id="how-it-works">
        <div className="how-heading">
          <p className="eyebrow">A LITTLE MAGIC, MADE SIMPLE</p>

          <h2>
            Your story. Your wishes.
            <br />
            <em>Your people.</em>
          </h2>
        </div>

        <div className="steps">
          <article className="step">
            <span className="step-number">01</span>
            <div className="step-line" />

            <h3>Create your celebration</h3>

            <p>
              Bring your occasion to life with a personal
              celebration space made just for you.
            </p>
          </article>

          <article className="step">
            <span className="step-number">02</span>
            <div className="step-line" />

            <h3>Share what you wish for</h3>

            <p>
              Add the gifts, experiences and dreams you would
              love your people to be part of.
            </p>
          </article>

          <article className="step">
            <span className="step-number">03</span>
            <div className="step-line" />

            <h3>Make memories together</h3>

            <p>
              Invite the people you love to contribute thoughtful
              gifts and shared experiences.
            </p>
          </article>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing" id="begin">
        <div className="closing-visual">
          <Image
            src="/images/hero-bg.jpg"
            alt="A beautiful moment worth remembering"
            fill
            className="closing-image"
            sizes="(max-width: 800px) 100vw, 50vw"
          />

          <div className="closing-image-caption">
            <span>THE BEAUTY OF BEING TOGETHER</span>
            <span>MY WISHORA — EST. 2026</span>
          </div>
        </div>

        <div className="closing-content">
          <p className="eyebrow">
            FOR EVERY STORY. FOR EVERY HEART.
          </p>

          <h2>
            Let love be the reason.
            <br />
            Let memories be the <em>legacy.</em>
          </h2>

          <div className="closing-rule" />

          <p>
            Your moments deserve more than ordinary.
            Create a space for your wishes, invite your
            favourite people and celebrate what truly matters.
          </p>

          <Link href="/create" className="button button-dark">
            Begin Your My Wishora Story <span>↗</span>
          </Link>

          <span className="closing-note">
            MADE WITH LOVE. MEANT TO LAST FOREVER.
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <WishoraLogo footer />

        <p>Where Every Wish Finds Its Way.</p>

        <p className="footer-supporting-tagline">
          A Wish Shared. A Dream Made Possible.
        </p>

        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/create">Create a Celebration</Link>
        </div>

        <span>© 2026 MY WISHORA. ALL RIGHTS RESERVED.</span>
      </footer>
    </main>
  );
}
