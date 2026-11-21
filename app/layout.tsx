
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Wishora | Where Every Wish Finds Its Way",
  description:
    "My Wishora — Where Every Wish Finds Its Way. A Wish Shared. A Dream Made Possible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          minHeight: "100vh",
          textAlign: "left",
          direction: "ltr",
        }}
      >
        {children}
      </body>
    </html>
  );
}
