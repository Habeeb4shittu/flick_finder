import Header from "@/components/Header";
import "./globals.css";
import ProgressProvider from "@/components/ProgressProvider";

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
        <ProgressProvider>
          <Header />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
