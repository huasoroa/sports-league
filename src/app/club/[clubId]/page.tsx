import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { db } from '@/server/db';
import { clubs } from '@/server/db/schema';

const ClubHomePage = async ({
  params,
}: {
  params: { leagueId: string; clubId: string };
}) => {
  const { leagueId, clubId } = await params;

  const club = await db.query.clubs.findFirst({
    where: eq(clubs.clubId, Number(clubId)),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">{club?.name}</h1>
      <Link href={`/league/${leagueId}/club/${clubId}/player/add`}>
        <Button variant="default">Add player</Button>
      </Link>
    </div>
  );
};

export default ClubHomePage;
