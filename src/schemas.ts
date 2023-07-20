import { z } from 'zod';

export type Data = z.infer<typeof dataSchema>;
export type Chat = z.infer<typeof chatSchema>;
export type User = z.infer<typeof userSchema>;
export type Message = z.infer<typeof messageSchema>;

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar_url: z.string().nullable(),
});

export const messageSchema = z.object({
  user_id: z.number(),
  timestamp: z.string().datetime(), // ISO datetime
  content: z.string(),
});

export const chatSchema = z.object({
  user: userSchema,
  messages: z.array(messageSchema),
});

export const archivedChatsSchema = z.array(chatSchema);

export const dataSchema = z.object({
  active: z.array(chatSchema).optional(),
  archived: z.array(chatSchema),
});
