import { PrismaClient } from "@prisma/client";
import z from "zod";
import { NewExercise, NewExerciseOptional } from "../types";

const prisma = new PrismaClient();

const exerciseSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  maxWeight: z
    .number({
      invalid_type_error: "Weight must be a number",
    })
    .optional(),
  repetitionMax: z
    .number({
      invalid_type_error: "Repetition max must be a number",
    })
    .optional(),
  lastTime: z
    .date({
      invalid_type_error: "Last time must be a string",
    })
    .optional(),
  lastWeight: z
    .number({
      invalid_type_error: "Last weight must be a number",
    })
    .optional(),
  ownerId: z.number({
    invalid_type_error: "Owner id must be a number",
    required_error: "Owner id is required",
  }),
});

const validateExercise = (data: unknown) => {
  const exercise = exerciseSchema.safeParse(data);

  if (!exercise.success) {
    throw {
      message: exercise.error.errors[0].message,
      code: 400,
    };
  }

  return exercise.data;
};

const validatePartialExercise = (data: unknown) => {
  //validate but cannot change owner id
  const exercise = exerciseSchema
    .omit({ ownerId: true })
    .partial()
    .safeParse(data);

  if (!exercise.success) {
    throw {
      message: exercise.error.errors[0].message,
      code: 400,
    };
  }

  return exercise.data;
};

export const getExcersices = async () => {
  return await prisma.exercise.findMany();
};

/**
 * Finds a exercise by their ID.
 * @param id - The ID of the exercise.
 * @returns The exercise object if found.
 * @throws {Error} If the ID is not a number.
 * @throws {Error} If the exercise is not found.
 */
export const findById = async (id: string) => {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!exercise) {
    throw {
      message: "Exercise not found",
      code: 404,
    };
  }

  return exercise;
};

/**
 * Adds a new exercise to the database.
 * @param newExercise - The new exercise data.
 * @returns The new exercise.
 * @throws {Error} If the exercise data is invalid.
 */
export const addexercise = async (newExercise: NewExercise) => {
  const validatedExercise = validateExercise(newExercise);
  const exercise = await prisma.exercise.create({
    data: {
      ...validatedExercise,
    },
  });

  return exercise;
};

export const deleteExercise = async (id: string) => {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const deletedExercise = await prisma.exercise.delete({
    where: {
      id: parsedId,
    },
  });

  return deletedExercise;
};

export const updateExercise = async (id: string, data: NewExerciseOptional) => {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    throw {
      message: "Id must be a number",
      code: 400,
    };
  }

  const validatedExercise = validatePartialExercise(data);
  const updatedExercise = await prisma.exercise.update({
    where: {
      id: parsedId,
    },
    data: {
      ...validatedExercise,
    },
  });

  return updatedExercise;
};
