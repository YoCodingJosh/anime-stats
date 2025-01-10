import { z } from 'zod';

// MAL API Schema

export const ItemStatusSchema = z.enum(['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']);
export const AnimeStatusSchema = z.enum(['finished_airing', 'currently_airing', 'not_yet_aired', 'cancelled']);
export const MediaTypeSchema = z.enum(['tv', 'ova', 'movie', 'special', 'ona', 'music', 'pv', 'cm', 'tv_special']);
export const NsfwStatusSchema = z.enum(['white', 'gray', 'black']);

// TODO: fix this schema
export const WatchlistEndpointResponseListStatusSchema = z.object({
  status: ItemStatusSchema,
  score: z.number(),
  num_episodes_watched: z.number(),
  is_rewatching: z.boolean(),
  updated_at: z.string(),
  priority: z.number().optional(),
  num_times_rewatched: z.number().optional(),
  rewatch_value: z.number().optional(),
  tags: z.array(z.string()).optional(),
  comments: z.string().optional(),
});

// TODO: fix this schema
export const WatchlistEndpointResponseNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  main_picture: z.object({
    medium: z.string(),
    large: z.string(),
  }),
  start_date: z.string(),
  end_date: z.string(),
  mean: z.number(),
  rank: z.number().optional(),
  popularity: z.number(),
  num_list_users: z.number(),
  num_scoring_users: z.number(),
  nsfw: NsfwStatusSchema,
  created_at: z.string(),
  updated_at: z.string(),
  media_type: MediaTypeSchema,
  status: AnimeStatusSchema,
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  num_episodes: z.number(),
  start_season: z.object({
    year: z.number(),
    season: z.string(),
  }),
  source: z.string(),
  average_episode_duration: z.number(),
  rating: z.string(),
  studios: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
});

export const WatchlistEndpointResponseDataSchema = z.object({
  node: WatchlistEndpointResponseNodeSchema,
  list_status: WatchlistEndpointResponseListStatusSchema,
});

export const WatchlistEndpointResponseSchema = z.object({
  data: z.array(WatchlistEndpointResponseDataSchema),
  paging: z.object({
    next: z.string().optional(),
  }).optional(),
});

export const WatchlistDataRequestSchema = z.object({
  data: z.array(WatchlistEndpointResponseDataSchema),
});

export type ItemStatus = z.infer<typeof ItemStatusSchema>;
export type AnimeStatus = z.infer<typeof AnimeStatusSchema>;
export type MediaType = z.infer<typeof MediaTypeSchema>;
export type NsfwStatus = z.infer<typeof NsfwStatusSchema>;
export type WatchlistEndpointResponseListStatus = z.infer<typeof WatchlistEndpointResponseListStatusSchema>;
export type WatchlistEndpointResponseNode = z.infer<typeof WatchlistEndpointResponseNodeSchema>;
export type WatchlistEndpointResponseData = z.infer<typeof WatchlistEndpointResponseDataSchema>;
export type WatchlistEndpointResponse = z.infer<typeof WatchlistEndpointResponseSchema>;
export type WatchlistDataRequest = z.infer<typeof WatchlistDataRequestSchema>;
