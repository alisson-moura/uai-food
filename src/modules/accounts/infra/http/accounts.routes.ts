import { Router } from 'express'
//import { SessionController } from './controllers/SessionController'
import UsersController from './controllers/UsersController'

const accountsRouter = Router()

accountsRouter.post('/', UsersController.create)
//accountsRouter.post('/session', sessionController.create)

export { accountsRouter }