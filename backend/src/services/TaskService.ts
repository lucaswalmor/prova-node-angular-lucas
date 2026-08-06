import prisma from '../database/prisma.js';
import { type CreateTaskDTO } from '../dto/CreateTaskDTO.js';
import type { UpdateTaskDTO } from '../dto/UpdateTaskDTO.js';
// import { type Task } from '../interfaces/Task.js';
import { type Task } from '../generated/prisma/client.js';


class TaskService {
    // private tasks: Task[] = [
    //     { id: 1, title: 'Task 1', description: 'Descrição 1', isCompleted: false },
    //     { id: 2, title: 'Task 2', description: 'Descrição 2', isCompleted: false },
    //     { id: 3, title: 'Task 3', description: 'Descrição 3', isCompleted: false },
    // ]

    // private findTask(id: number): Task | undefined {
    //     return this.tasks.find(task => task.id === id);
    // }

    async index(): Promise<Task[]> {
        return prisma.task.findMany();
    }
    
    async show(id: number): Promise<Task | null> {
        return prisma.task.findUnique({
            where: {
                id
            }
        });
    }

    async store(dto: CreateTaskDTO): Promise<Task> {
        const task = await prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description
            }
        })
    
        return task;
    }

    async update(dto: UpdateTaskDTO, id: number): Promise<Task | null> {
        try {
            const task = await prisma.task.update({
                where: {
                    id
                },
                data: {
                    title: dto.title,
                    description: dto.description,
                    isCompleted: dto.isCompleted
                }
            })
        
            return task;
        } catch {
            return null;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.task.delete({
                where: { id },
            });
    
            return true;
        } catch {
            return false;
        }
    }
}

export default new TaskService();