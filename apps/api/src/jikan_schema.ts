import { z } from 'zod';

export const JikanErrorResponseSchema = z.object({
  status: z.number(),
  type: z.string(),
  message: z.string().optional(),
  messages: z.record(z.array(z.string())).optional(),
  error: z.string().nullable(),
});

const defaultMalAvatar = 'https://cdn.myanimelist.net/images/kaomoji_mal_white.png';

export const JikanUserResponseSchema = z.object({
  data: z.object({
    mal_id: z.number(),
    username: z.string(),
    url: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string()
        .nullable()
        .transform((val) => !val ? defaultMalAvatar : val),
      }),
      webp: z.object({
        image_url: z.string()
        .nullable()
        .transform((val) => !val ? defaultMalAvatar : val),
      }),
    }),
    last_online: z.string(),
    gender: z.string().nullable(),
    birthday: z.string().nullable(),
    location: z.string().nullable(),
    joined: z.string(),
  }),
});

export type JikanErrorResponse = z.infer<typeof JikanErrorResponseSchema>;
export type JikanUserResponse = z.infer<typeof JikanUserResponseSchema>;

export const JikanResponseSchema = z.union([JikanErrorResponseSchema, JikanUserResponseSchema]);
export type JikanResponse = z.infer<typeof JikanResponseSchema>;
