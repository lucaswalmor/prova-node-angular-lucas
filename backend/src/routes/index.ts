import { Router } from "express";
import TaskController from "../controllers/TaskController.js";

const router = Router();

router.get('/tasks', TaskController.index)
.get('/tasks/:id', TaskController.show)
.post('/tasks', TaskController.store)
.put('/tasks/:id', TaskController.update)
.delete('/tasks/:id', TaskController.delete);

export default router;