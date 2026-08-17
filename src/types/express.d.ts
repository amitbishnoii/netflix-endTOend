import type { JwtPayload } from "jsonwebtoken";

interface AuthUser extends JwtPayload {
    userID: Types.ObjectId;
    role: string,
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export {};