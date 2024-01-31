import express from "express";
import excersisesRoutes from "./routes/excersises.routes";
import usersRoutes from "./routes/users.routes";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api/exercises", excersisesRoutes);

app.use("/api/users", usersRoutes);

app.get("/api", (_req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
