import bcrypt from "bcryptjs";
import prisma from "../database/prisma.js";
import jwt from "jsonwebtoken";

class AuthService {
    register = async (email: string, password: string) => {
        const user = await prisma.user.create({
            data: { email, password: await bcrypt.hash(password, 10) }
        })

        return user;
    }

    login = async (email: string, password: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })
    
            if (!user) {
                return null;
            }
           
            const senhaValida = await bcrypt.compare(password, user.password);
            if (!senhaValida) return null;

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1d" }
            );
            
            return { token };

        } catch (error) {
            console.error("Erro no login:", error);
            return null;
        }
    }
}

export default new AuthService();