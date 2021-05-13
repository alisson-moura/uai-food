import express, { NextFunction, Request, Response } from 'express'
import { AppError } from '../../providers/AppError'
import { routes } from './routes'

const port = 8000

const app = express()
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message })
  }
  response.status(500).json({ message: 'Internal server error!' })
})

app.listen(8000, () => { console.log(`server is running on port: ${port}`) })
