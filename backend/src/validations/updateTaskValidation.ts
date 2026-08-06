import type { UpdateTaskDTO } from "../dto/UpdateTaskDTO.js";

export default function validateUpdateTask(dto: UpdateTaskDTO) {

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

    if (typeof dto.isCompleted !== "boolean") {
        return {valid: false, message: 'O campo Finalizada deve ser verdadeiro ou falso.'};
    }

    return {valid: true, message: ''};
}