import { Router } from "express";
import TaskController from "../controllers/TaskController.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
      message: 'Bem-vindo à API TechX - Gerenciador de Tarefas',
      documentation: {
        description: 'API RESTful para gerenciamento de tarefas',
        endpoints: '/tasks',
        version: '1.0.0'
      }
    });
  });
router.get('/tasks', TaskController.index)
.get('/tasks/:id', TaskController.show)
.post('/tasks', TaskController.store)
.put('/tasks/:id', TaskController.update)
.delete('/tasks/:id', TaskController.delete);

export default router;