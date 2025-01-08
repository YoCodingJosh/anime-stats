import { z } from 'zod';
import { WatchlistDataRequest } from './mal_schema';

const BasicStatsSchema = z.object({
  grandTotalDuration: z.number(),

  totalDuration: z.number(),
  totalAnime: z.number(),
  totalEpisodes: z.number(),

  rewatchedAnime: z.number(),
  rewatchedEpisodes: z.number(),
  rewatchedDuration: z.number(),

  totalMovies: z.number(),
  totalOVA: z.number(),
  totalONA: z.number(),
  totalSpecial: z.number(),
  totalTV: z.number(),
  totalMusic: z.number(),
  totalPV: z.number(),
  totalTVSpecial: z.number(),
  totalCM: z.number(),

  averageScore: z.number(),

  completed: z.object({
    count: z.number(),
    totalDuration: z.number(),
    averageScore: z.number(),
  }),
  dropped: z.object({
    count: z.number(),
    totalDuration: z.number(),
    averageScore: z.number(),
  }),
  onHold: z.object({
    count: z.number(),
    totalDuration: z.number(),
    averageScore: z.number(),
  }),
  planToWatch: z.object({
    count: z.number(),
    totalDuration: z.number(),
  }),
  watching: z.object({
    count: z.number(),
    totalDuration: z.number(),
    averageScore: z.number(),
  }),
});

export type BasicStats = z.infer<typeof BasicStatsSchema>;

export type Stat = BasicStats; // | OtherStats; etc.

/**
 * A single stat that can be calculated for a user's watchlist.
 */
export interface Statistic {
  /**
   * The ID of the stat. This is in UUID format.
   * 
   * Used to identify a stat in the request url (like `/stats/:id`) and in the UI.
   */
  id: string;

  /**
   * The name of the stat.
   */
  name: string;

  /**
   * The description of the stat
   */
  description: string;

  /**
   * The function used to calculate the stat.
   * 
   * @param data The user's watchlist data used to calculate the stat
   * @returns The calculated stat (as a promise)
   */
  calculate: (data: WatchlistDataRequest) => Promise<Stat>;
}
