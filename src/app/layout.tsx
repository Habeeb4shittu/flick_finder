import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Flick Finder",
  description: "Discover your next favorite movie with Flick Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
