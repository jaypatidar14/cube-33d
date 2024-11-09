// app/layout.tsx
import "./globals.css"; // Import global styles
import Navbar from "../components/Navbar"; // Adjust the path as needed
import Cube from "../components/Cube"; // Adjust the path as needed

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Correct type for children
}) {
  return (
    <html lang="en">
      <body>
        {/* Include the Navbar at the top */}
        <Navbar />
        {/* Spotlighted Cube */}
        <Cube />
        {/* Render the main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
