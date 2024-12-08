import { eq } from 'drizzle-orm';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { db } from '@/server/db';
import { leagues, seasons } from '@/server/db/schema';

const LeagueHomePage = async ({ params }: { params: { id: string } }) => {
  const singleLeague = await db.query.leagues.findFirst({
    where: eq(leagues.leagueId, Number(params.id)),
  });
  const allSeasons = await db
    .select()
    .from(seasons)
    .where(eq(seasons.leagueId, Number(params.id)));

  return (
    <div>
      <h1 className="text-3xl font-bold">{singleLeague?.name}</h1>
      <div className="flex justfiy-between">
        <h2 className="text-xl">Seasons</h2>
        <Button variant={'link'} asChild>
          <Link href={`/league/${params.id}/season/new`}>
            <PlusCircleIcon />
            Add Season
          </Link>
        </Button>
      </div>
      <ul>
        {allSeasons.map((season) => (
          <li key={season.seasonId}>
            <Link href={`/league/${params.id}/season/${season.seasonId}`}>
              {season.year}
            </Link>
          </li>
        ))}
      </ul>
      <h1>Teams</h1>
    </div>
  );
};

export default LeagueHomePage;
