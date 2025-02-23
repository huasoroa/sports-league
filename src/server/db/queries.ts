import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { db } from '.';
import { divisions, leagues, seasons } from './schema';

export const getLeagueById = cache(async (leagueId: number) => {
  const league = await db.query.leagues.findFirst({
    where: eq(leagues.leagueId, leagueId),
  });

  if (!league) {
    notFound();
  }

  return league;
});

export const getAllLeagues = unstable_cache(
  async () => await db.query.leagues.findMany(),
  ['leagues'],
  { revalidate: 7 * 24 * 60 * 60, tags: ['leagues'] },
);

export const getAllSeasonsByLeagueId = async (leagueId: number) =>
  await db.query.seasons.findMany({
    where: eq(seasons.leagueId, leagueId),
  });

export const getAllDivisionsBySeasonId = async (seasonId: number) =>
  await db.query.divisions.findMany({
    where: eq(divisions.seasonId, seasonId),
    orderBy: divisions.level,
  });
