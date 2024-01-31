import { PrismaClient, User } from "@prisma/client";
import { NewUser, NewUserOptional } from "../types";

const prisma = new PrismaClient();

export const getUsers = async () => {
  return await prisma.user.findMany();
};

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
  });

  if (!user) {
    throw {
      message: "User not found",
      code: 404,
    };
  }

  return user;
};

export const addUser = async (newUser: NewUser): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: {
      ...newUser,
    },
  });

  return createdUser;
};

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

export const updateUser = async (id: string, newUser: NewUserOptional) => {
  const parsedId = parseInt(id);

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
      ...newUser,
    },
  });

  return updatedUser;
};
