import { Router } from "express";
import * as exercisesServices from "../services/exercisesServices";
const router = Router();

router.get("/", async (_req, res) => {
  res.send(await exercisesServices.getExcersices());
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = await exercisesServices.findById(req.params.id);
    res.send(exercise);
  } catch (error: any) {
    res.status(error.code || 500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newExcercise = await exercisesServices.addexercise(req.body);
    res.send(newExcercise);
  } catch (error: any) {
    res.status(error.code || 500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedExercise = await exercisesServices.deleteExercise(
      req.params.id
    );
    res.send(deletedExercise);
  } catch (error: any) {
    if (typeof error.code !== "number") {
      res.status(404).send({ error });
    } else {
      res.status(error.code).send({ error });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedExercise = await exercisesServices.updateExercise(
      req.params.id,
      req.body
    );
    res.send(updatedExercise);
  } catch (error: any) {
    if (typeof error.code !== "number") {
      res.status(404).send({ error });
    } else {
      res.status(error.code).send({ error });
    }
  }
});

export default router;
