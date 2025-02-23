import { eq } from 'drizzle-orm';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { db } from '@/server/db';
import { clubs, leagues, seasons } from '@/server/db/schema';

const LeagueHomePage = async ({ params }: { params: { leagueId: string } }) => {
  const { leagueId } = await params;

  const singleLeague = await db.query.leagues.findFirst({
    where: eq(leagues.leagueId, Number(leagueId)),
  });
  const allSeasons = await db
    .select()
    .from(seasons)
    .where(eq(seasons.leagueId, Number(leagueId)));

  const allClubs = await db
    .select()
    .from(clubs)
    .where(eq(clubs.leagueId, Number(leagueId)));

  return (
    <div>
      <h1 className="text-3xl font-bold">{singleLeague?.name}</h1>
      <div className="flex items-center">
        <h2 className="text-xl">Seasons</h2>
        <Button variant={'link'} asChild>
          <Link href={`/league/${leagueId}/season/add`}>
            <PlusCircleIcon />
            Add Season
          </Link>
        </Button>
      </div>
      <ul>
        {allSeasons.length === 0 && <li>No seasons found for this league</li>}
        {allSeasons.map((season) => (
          <li key={season.seasonId}>
            <Link href={`/league/${leagueId}/season/${season.seasonId}`}>
              {season.year}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <h2 className="text-xl">Clubs</h2>
        <Button variant={'link'} asChild>
          <Link href={`/league/${leagueId}/club/add`}>
            <PlusCircleIcon />
            Add Club
          </Link>
        </Button>
      </div>
      <ul>
        {allClubs.length === 0 && <li>No clubs found for this league</li>}
        {allClubs.map((club) => (
          <li key={club.clubId}>
            <Link href={`/club/${club.clubId}`}>{club.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeagueHomePage;
