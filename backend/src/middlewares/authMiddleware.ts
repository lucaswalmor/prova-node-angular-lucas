import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: number;
    email: string;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não informado" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      (req as any).user = decoded;
      return next();
    } catch {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  }