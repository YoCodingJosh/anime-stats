import { z } from 'zod';

export const GetUserResponseSchema = z.object({
  username: z.string(),
  avatar: z.string().url(),
  joined: z.string().datetime(),
  profile: z.string().url(),
});

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

export const GetUserErrorResponseSchema = z.object({
  message: z.string(),
});

export type GetUserErrorResponse = z.infer<typeof GetUserErrorResponseSchema>;
