import { eq } from 'drizzle-orm';

import { db } from '.';
import { divisions, seasons } from './schema';

export const getAllLeagues = async () => await db.query.leagues.findMany();

export const getAllSeasonsByLeagueId = async (leagueId: number) =>
  await db.query.seasons.findMany({
    where: eq(seasons.leagueId, leagueId),
  });

export const getAllDivisionsBySeason = async (seasonId: number) =>
  await db.query.divisions.findMany({
    where: eq(divisions.seasonId, seasonId),
  });
