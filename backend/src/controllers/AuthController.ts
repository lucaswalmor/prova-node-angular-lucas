import { type UserDTO } from "../dto/UserDTO.js";
import { type Request, type Response } from "express";
import AuthService from "../services/AuthService.js";

class AuthController {
    register = async (req: Request, res: Response) => {
        const dto: UserDTO = req.body;

        const user = await AuthService.register(dto.email, dto.password);

        return res.status(201).json({ message: 'Usuário criada com sucesso!', user});
    }

    login = async (req: Request, res: Response) => {
        const dto: UserDTO = req.body;

        const user = await AuthService.login(dto.email, dto.password);

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        return res.status(200).json(user);
    }
}

export default new AuthController();