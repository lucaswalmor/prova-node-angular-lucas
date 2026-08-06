import { type Request, type Response } from "express";
import { type UpdateTaskDTO } from "../dto/UpdateTaskDTO.js";
import TaskService from "../services/TaskService.js";
import type { CreateTaskDTO } from "../dto/CreateTaskDTO.js";
import { validateCreateTask } from "../validations/createTaskValidation.js";
import validateUpdateTask from "../validations/updateTaskValidation.js";

class TaskController {
    private getId(req: Request): number | null {
        const id = Number(req.params.id);
    
        if (Number.isNaN(id)) {
            return null;
        }

        return id;
    }

    index = async (_req: Request, res: Response): Promise<Response> => {
        const tasks = await TaskService.index();
        return res.json(tasks);
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const id = this.getId(req);

        if (id === null) {
            return res.status(400).json({
                message: "Id inválido"
            });
        }

        const task = await TaskService.show(id);

        if (!task) {
            return res.status(404).json({
                message: "Task não encontrada"
            });
        }
        
        return res.json({ task });
    }

    store = async (req: Request, res: Response): Promise<Response> => {
        const dto: CreateTaskDTO = req.body;
        const validation = validateCreateTask(dto);

        if (!validation.valid) {
            return res.status(400).json({
                message: validation.message
            });
        }
        
        const task = await TaskService.store(dto);
        return res.status(201).json({ message: 'Task criada com sucesso!', task});
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const id = this.getId(req);

        if (id === null) {
            return res.status(400).json({
                message: "Id inválido"
            });
        }

        const dto: UpdateTaskDTO = req.body;

        const validation = validateUpdateTask(dto);

        if (!validation.valid) {
            return res.status(400).json({
                message: validation.message
            });
        }

        const task = await TaskService.update(dto, id);

        if (!task) {
            return res.status(404).json({
                message: "Task não encontrada"
            });
        }

        return res.status(200).json({
            message: "Task atualizada com sucesso",
            task
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const id = this.getId(req);

        if (id === null) {
            return res.status(400).json({
                message: "Id inválido"
            });
        }

        const task = await TaskService.delete(id);
        
        if (!task) {
            return res.status(404).json({
                message: "Task não encontrada"
            });
        }

        return res.sendStatus(204);
    }
}

export default new TaskController();