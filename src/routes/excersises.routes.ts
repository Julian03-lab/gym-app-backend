import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("ejercicios");
});

router.get("/:id", (_req, res) => {
  res.send("ejercicio");
});

// router.post("/", (req, res) => {
//   const { title, description, creationDate } = req.body;

//   const newHabit = habitsServices.addHabit({
//     title,
//     description,
//     creationDate,
//     status: "pending",
//   });

//   res.send(newHabit);
// });

export default router;
