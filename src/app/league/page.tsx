import DataTable from "@/components/ui/data-table";
import { columnDefs } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/server/db";
import { leagues } from "@/server/db/schema";

const LeagueHomePage = async () => {
  const allLeagues = await db.select().from(leagues);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold my-2">League Home</h1>
        <Link href="/league/add">
          <Button variant="link">
            <PlusCircle /> Add League
          </Button>
        </Link>
      </div>
      <DataTable columns={columnDefs} data={allLeagues} />
    </div>
  );
};

export default LeagueHomePage;
