import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ol>
        <li>
          Add a league <Link href="/league">here</Link>
        </li>
      </ol>
    </div>
  );
}
