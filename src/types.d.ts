import { User } from "@prisma/client";

export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export type NewUserOptional = Partial<NewUser>;
