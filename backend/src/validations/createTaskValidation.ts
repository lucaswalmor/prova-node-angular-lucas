import type { CreateTaskDTO } from "../dto/CreateTaskDTO.js";

export function validateCreateTask(dto: CreateTaskDTO) {

    if (typeof dto.title !== "string") {
        return {valid: false, message: 'O campo Título deve ser um texto!'};
    }

    if (dto.title.trim() === "") {
        return {
            valid: false,
            message: "O campo Título é obrigatório."
        };
    }

    if (typeof dto.description !== "string") {
        return {valid: false, message: 'O campo Descrição deve ser um texto!'};
    }

    if (dto.description.trim() === "") {
        return {
            valid: false,
            message: "O campo Descrição é obrigatório."
        };
    }

    return {valid: true, message: ''};
}