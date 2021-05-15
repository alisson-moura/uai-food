import { Router } from 'express'
import authMiddleware from '../../../../infra/http/middlewares/authMiddleware'
import RestaurantsController from './controllers/RestaurantsController'

const restaurantsRouter = Router()

restaurantsRouter.post('/', authMiddleware, RestaurantsController.create)

export { restaurantsRouter }