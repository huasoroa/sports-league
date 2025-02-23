'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import type { SeasonAddFormSchema } from '@/lib/formSchema';

import { db } from '.';
import { clubs, divisions, leagues, seasons } from './schema';

export const createLeague = async (data: { name: string }) => {
  //TODO: Validate values

  const [league] = await db
    .insert(leagues)
    .values({ name: data.name })
    .returning();

  const [season] = await db
    .insert(seasons)
    .values({
      leagueId: league.leagueId,
      year: new Date().getFullYear(),
      format: 'Regular',
      startDate: new Date(),
      endDate: new Date(),
    })
    .returning();

  await db
    .insert(divisions)
    .values({
      seasonId: season.seasonId,
      level: 1,
      name: 'Default Division',
      promotionSpots: 0,
      relegationSpots: 2,
    })
    .returning();

  redirect('/league');
};

export const createClub = async (leagueId: number, data: { name: string }) => {
  //TODO: Validate values

  await db.insert(clubs).values({ name: data.name, leagueId });

  console.log(data);

  redirect(`/league/${leagueId}`);
};

export const createSeason = async (
  leagueId: number,
  data: z.infer<typeof SeasonAddFormSchema>,
) => {
  //TODO: Validate values

  const [season] = await db
    .insert(seasons)
    .values({
      leagueId,
      year: data.year,
      format: 'Regular',
      startDate: new Date(),
      endDate: new Date(),
    })
    .returning();

  if (data.divisions.length > 0) {
    await db.insert(divisions).values(
      data.divisions.map((division) => ({
        seasonId: season.seasonId,
        level: division.level,
        name: division.name,
        promotionSpots: division.promotionSpots,
        relegationSpots: division.relegationSpots,
      })),
    );
  } else {
    await db.insert(divisions).values({
      seasonId: season.seasonId,
      level: 1,
      name: 'Default Division',
      promotionSpots: 0,
      relegationSpots: 2,
    });
  }

  redirect(`/league/${leagueId}/season/${season.seasonId}`);
};
