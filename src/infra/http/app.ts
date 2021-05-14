import "reflect-metadata";

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { routes } from './routes'
import { httpErrors } from "./httpErrors";

const port = 8000

const app = express()
app.use(express.json())
app.use(routes)
app.use(httpErrors)

app.listen(8000, () => { console.log(`server is running on port: ${port}`) })


