import z from "zod";

export const createRoomTypes = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});
