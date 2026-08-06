import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "todo",
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;