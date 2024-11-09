// app/layout.tsx
import "./globals.css"; // Import your global styles
import Navbar from "../components/Navbar"; // Adjust the path as needed
import Cube from '../components/Cube';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Include the Navbar at the top */}
        <Navbar />
        <Cube/>
        {/* Render the main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
