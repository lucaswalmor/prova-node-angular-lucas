import prisma from '../database/prisma.js';
import { type CreateTaskDTO } from '../dto/CreateTaskDTO.js';
import type { UpdateTaskDTO } from '../dto/UpdateTaskDTO.js';
import { type Task } from '../generated/prisma/client.js';


class TaskService {
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