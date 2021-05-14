import { Router } from 'express'
import AuthenticateUserController from './controllers/AuthenticateUserController'
import UsersController from './controllers/UsersController'

const accountsRouter = Router()

accountsRouter.post('/', UsersController.create)
accountsRouter.post('/auth', AuthenticateUserController.create)

export { accountsRouter }