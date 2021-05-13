import { Router } from 'express'
import { SessionController } from './controllers/SessionController'
import { UserController } from './controllers/UserController'

const accountsRouter = Router()
const usersController = new UserController()
const sessionController = new SessionController()

accountsRouter.post('/', usersController.create)
accountsRouter.post('/session', sessionController.create)

export { accountsRouter }