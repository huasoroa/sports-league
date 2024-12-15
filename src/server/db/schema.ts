import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `sla_${name}`);

export const userRole = pgEnum('user_role', [
  'Admin',
  'Coach',
  'Referee',
  'Player',
]);

// 0. Users Table
export const users = createTable('users', {
  userId: integer('user_id').primaryKey().generatedAlwaysAsIdentity(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: userRole('role').notNull(), // Role defined by enum
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});

// 1. Sports Table
export const sports = createTable('sports', {
  sportId: integer('sport_id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
});

// 2. Leagues Table
export const leagues = createTable('leagues', {
  leagueId: integer('league_id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  sportId: integer('sport_id').references(() => sports.sportId),
});

// 3. Seasons Table
export const seasons = createTable('seasons', {
  seasonId: integer('season_id').primaryKey().generatedAlwaysAsIdentity(),
  leagueId: integer('league_id')
    .notNull()
    .references(() => leagues.leagueId),
  year: integer('year').notNull(),
  format: text('format').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
});

// 4. Divisions Table
export const divisions = createTable('divisions', {
  divisionId: integer('division_id').primaryKey().generatedAlwaysAsIdentity(),
  seasonId: integer('season_id')
    .notNull()
    .references(() => seasons.seasonId),
  name: text('name').notNull(),
  level: integer('level').notNull(),
  promotionSpots: integer('promotion_spots').notNull().default(0),
  relegationSpots: integer('relegation_spots').notNull().default(0),
});

// 5. Clubs Table
export const clubs = createTable('clubs', {
  clubId: integer('club_id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  leagueId: integer('league_id')
    .notNull()
    .references(() => leagues.leagueId),
});

// 6. Teams Table
export const teams = createTable('teams', {
  teamId: integer('team_id').primaryKey().generatedAlwaysAsIdentity(),
  clubId: integer('club_id')
    .notNull()
    .references(() => clubs.clubId),
  seasonId: integer('season_id')
    .notNull()
    .references(() => seasons.seasonId),
  divisionId: integer('division_id')
    .notNull()
    .references(() => divisions.divisionId),
  coachId: integer('coach_id').references(() => users.userId), // Add foreign key if users table is implemented.
});

// 7. Players Table
export const players = createTable('players', {
  playerId: integer('player_id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  age: integer('age').notNull(),
});

export const rosterStatus = pgEnum('roster_status', [
  'Active',
  'Reserve',
  'Injured',
]);

// 8. Team_Rosters Table
export const teamRosters = createTable('team_rosters', {
  rosterId: integer('roster_id').primaryKey().generatedAlwaysAsIdentity(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.teamId),
  playerId: integer('player_id')
    .notNull()
    .references(() => players.playerId),
  seasonId: integer('season_id')
    .notNull()
    .references(() => seasons.seasonId),
  status: rosterStatus('status').notNull(),
});

export const results = pgEnum('results', ['TeamHome', 'TeamAway', 'Draw']);

// 9. Matches Table
export const matches = createTable('matches', {
  matchId: integer('match_id').primaryKey().generatedAlwaysAsIdentity(),
  seasonId: integer('season_id')
    .notNull()
    .references(() => seasons.seasonId),
  divisionId: integer('division_id')
    .notNull()
    .references(() => divisions.divisionId),
  teamHomeId: integer('team_home_id')
    .notNull()
    .references(() => teams.teamId),
  teamAwayId: integer('team_away_id')
    .notNull()
    .references(() => teams.teamId),
  refereeId: integer('referee_id'), // Add foreign key if users table is implemented.
  location: text('location').notNull(),
  dateTime: timestamp('date_time').notNull(),
  teamHomeScore: integer('team_home_score').notNull().default(0),
  teamAwayScore: integer('team_away_score').notNull().default(0),
  result: results('result'),
});

export const participantRole = pgEnum('participant_role', [
  'Starter',
  'Substitute',
]);

// 10. Match_Participants Table
export const matchParticipants = createTable('match_participants', {
  participantId: integer('participant_id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  matchId: integer('match_id')
    .notNull()
    .references(() => matches.matchId),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.teamId),
  playerId: integer('player_id')
    .notNull()
    .references(() => players.playerId),
  role: participantRole('role').notNull(), // Role of the participant
});

export const playerStatCategories = createTable('player_stat_categories', {
  statCategoryId: integer('stat_category_id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  sportId: integer('sport_id')
    .notNull()
    .references(() => sports.sportId), // Linked to sports
  name: text('name').notNull(), // Name of the stat category (e.g., "Goals", "Aces")
  description: text('description'), // Description of the stat category (optional)
});

// 11. Player_Stats Table
export const playerStats = createTable('player_stats', {
  statId: integer('stat_id').primaryKey().generatedAlwaysAsIdentity(),
  playerId: integer('player_id')
    .notNull()
    .references(() => players.playerId), // Link to players
  matchId: integer('match_id')
    .notNull()
    .references(() => matches.matchId), // Link to match
  statCategoryId: integer('stat_category_id')
    .notNull()
    .references(() => playerStatCategories.statCategoryId), // Link to stat category
  value: integer('value').notNull(), // The value of the stat (e.g., 3 goals, 5 assists)
});
