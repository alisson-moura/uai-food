import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../providers/AppError";
import TokenProvider_JWT from '../../../providers/TokenProvider/TokenProvider_JWT'

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers
    if (!authorization) {
        throw new AppError('Token not provided.', 401)
    }
    const token = authorization.replace("Bearer", '').trim()

    try {
        const data = TokenProvider_JWT.decode(token)
        request.userId = data.sub
        return next()
    } catch (error) {
        throw new AppError('Invalid token provided.', 401)
    }
}