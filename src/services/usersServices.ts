import { PrismaClient, User } from "@prisma/client";
import { NewUser, NewUserOptional } from "../types";
import z from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
  lastname: z
    .string({
      invalid_type_error: "Lastname must be a string",
    })
    .optional(),
  age: z.number({
    invalid_type_error: "Age must be a number",
    required_error: "Age is required",
  }),
  weight: z
    .number({
      invalid_type_error: "Weight must be a number",
    })
    .optional(),
  height: z
    .number({
      invalid_type_error: "Height must be a number",
    })
    .optional(),
});

const validateUser = (data: unknown) => {
  const user = userSchema.safeParse(data);

  if (!user.success) {
    throw {
      message: user.error.errors[0].message,
      code: 400,
    };
  }

  return user.data;
};

const validatePartialUser = (data: unknown) => {
  const user = userSchema.partial().safeParse(data);

  if (!user.success) {
    throw {
      message: user.error.errors[0].message,
      code: 400,
    };
  }

  return user.data;
};

export const getUsers = async () => {
  const user = await prisma.user.findMany({
    include: {
      exercises: true,
    },
  });
  const filteredUsers = user.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return filteredUsers;
};

/**
 * Finds a user by their ID.
 * @param id - The ID of the user.
 * @returns The user object if found.
 * @throws {Error} If the ID is not a number.
 * @throws {Error} If the user is not found.
 */
export const findById = async (id: string) => {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parsedId,
    },
    include: {
      exercises: true,
    },
  });

  if (!user) {
    throw {
      message: "User not found",
      code: 404,
    };
  }

  return user;
};

/**
 * Adds a new user to the database.
 *
 * @param newUser - The new user object to be added.
 * @returns A promise that resolves to the created user object.
 */
export const addUser = async (newUser: NewUser): Promise<User> => {
  const validatedUser = validateUser(newUser);

  const createdUser = await prisma.user.create({
    data: {
      ...validatedUser,
    },
  });

  return createdUser;
};

/**
 * Deletes a user by their ID.
 * @param id - The ID of the user to delete.
 * @returns The deleted user.
 * @throws {Error} If the ID is not a number or if the user is not found.
 */
export const deleteUser = async (id: string) => {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: parsedId,
    },
  });

  if (!deletedUser) {
    throw {
      message: "User not found",
      code: 404,
    };
  }

  return deletedUser;
};

/**
 * Updates a user with the specified ID.
 * @param id - The ID of the user to update.
 * @param newUser - The new user data to update.
 * @returns The updated user.
 * @throws {Error} If the ID is not a number.
 */
export const updateUser = async (id: string, newUser: NewUserOptional) => {
  const parsedId = parseInt(id);
  const validatedUser = validatePartialUser(newUser);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: parsedId,
    },
    data: {
      ...validatedUser,
    },
  });

  return updatedUser;
};
