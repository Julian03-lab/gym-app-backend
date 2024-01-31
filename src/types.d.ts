import { User, Exercise } from "@prisma/client";

export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export type NewUserOptional = Partial<NewUser>;

export type NewExercise = Omit<Exercise, "id">;
export type NewExerciseOptional = Partial<Omit<Exercise, "id" | "ownerId">> &
  Pick<Exercise, "ownerId">;
