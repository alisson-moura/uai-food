import { NextFunction, Request, Response } from "express";
import { AppError } from "../../providers/AppError";

const httpErrors = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message })
  }
  else {
    response.status(500).json({ message: 'Internal server error!' })
  } 
}

export {httpErrors}