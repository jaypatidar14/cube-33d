import React from "react";
import Link from "next/link";
import Button from "./Button";
// import Button from './Button';
const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.02] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1)] pointer-events-none" />
        <nav className="relative">
          <div className="flex items-center px-6 py-4 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="ml-8 p-4 space-x-2">
              <Link href="/" className="ml-1 text-2xl font-bold">
                <span className="text-white">Everything</span>
                <span className="text-white">Talent</span>
              </Link>
            </div>
            {/* Nav Links */}
            <div className="flex-1 font-bold flex justify-center">
              <div className="flex space-x-8">
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
                <Link
                  href="/customers"
                  className="text-gray-300 hover:text-white"
                >
                  Customers
                </Link>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white"
                >
                  Resources
                </Link>
                <Link href="/docs" className="text-gray-300 hover:text-white">
                  Docs
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white"
                >
                  Pricing
                </Link>
                {/* Auth Buttons */}
                {/* <div className="flex-1 flex justify-end space-x-4">
                  <Button variant="ghost">Sign in</Button>
                  <Button>Get Started</Button>
                </div> */}
                <div className=" space-x-4 justifly-center">
                  <Button variant="ghost">Sign in</Button>{" "}
                  {/* Ghost style button */}
                  <Button>Get Started</Button> {/* Default style button */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32">
        {/* New Schedule API Button */}
        <Link href="/schedule-api">
          <div className="group relative flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40">
            <div className="animate-gradient absolute inset-0 block h-full w-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"></div>
            🚀 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
            <span className="animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              New Schedule API
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default MainPage;
