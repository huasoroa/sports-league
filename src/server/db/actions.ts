'use server';

import { redirect } from 'next/navigation';

import { db } from '.';
import { leagues, seasons } from './schema';

export const createLeague = async (data: { name: string }) => {
  //TODO: Validate values

  const [league] = await db
    .insert(leagues)
    .values({ name: data.name })
    .returning();

  await db
    .insert(seasons)
    .values({
      leagueId: league.leagueId,
      year: new Date().getFullYear(),
      format: 'Regular',
      startDate: new Date(),
      endDate: new Date(),
    })
    .returning();

  redirect('/league');
};
