import { Router } from 'express'
import { restaurantsRouter } from '../../modules/restaurants/infra/http/restaurants.routes'
import { accountsRouter } from '../../modules/accounts/infra/http/accounts.routes'

const routes = Router()

routes.use('/accounts', accountsRouter)
routes.use('/restaurants', restaurantsRouter)

export { routes }