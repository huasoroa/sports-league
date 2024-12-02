"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="py-4 px-8">
      <nav className="flex justify-between items-center">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/league">League</Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
