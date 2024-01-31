import { User } from "@prisma/client";

export type NewUser = Omit<User, "id">;

export type NewUserOptional = Partial<NewUser>;
