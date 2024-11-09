// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Cube from "../components/Cube";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Cube />
        <main>{children}</main>
      </body>
    </html>
  );
}