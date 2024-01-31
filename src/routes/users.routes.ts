import { Router } from "express";
import * as usersServices from "../services/usersServices";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const users = await usersServices.getUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await usersServices.findById(req.params.id);
    res.send(user);
  } catch (error: any) {
    res.status(error.code || 500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await usersServices.addUser(req.body);
    res.send(newUser);
  } catch (error: any) {
    console.log(error.code);
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await usersServices.deleteUser(req.params.id);
    res.send(deletedUser);
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
    const updatedUser = await usersServices.updateUser(req.params.id, req.body);
    res.send(updatedUser);
  } catch (error: any) {
    res.status(error.code || 500).send({ error });
  }
});

export default router;
