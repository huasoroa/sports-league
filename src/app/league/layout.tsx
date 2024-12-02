import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

const LeagueLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default LeagueLayout;
