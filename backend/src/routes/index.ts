import { Router } from "express";
import TaskController from "../controllers/TaskController.js";
import AuthController from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Bem-vindo à API TechX - Gerenciador de Tarefas",
    documentation: {
      description: "API RESTful para gerenciamento de tarefas",
      endpoints: "/tasks",
      version: "1.0.0",
    },
  });
});

router
  .get("/tasks", authMiddleware, TaskController.index)
  .get("/tasks/:id", authMiddleware, TaskController.show)
  .post("/tasks", authMiddleware, TaskController.store)
  .put("/tasks/:id", authMiddleware, TaskController.update)
  .delete("/tasks/:id", authMiddleware, TaskController.delete);

router.post("/auth/register", AuthController.register)
.post("/auth/login", AuthController.login)

export default router;
