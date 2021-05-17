import { Router, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import { restaurantsRouter } from '../../modules/restaurants/infra/http/restaurants.routes'
import { accountsRouter } from '../../modules/accounts/infra/http/accounts.routes'

const routes = Router()

routes.use('/api-docs', swaggerUi.serve)
routes.use('/accounts', accountsRouter)
routes.use('/restaurants', restaurantsRouter)

routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
routes.get('/', (request: Request, response: Response) => response.redirect('/api-docs'))

export { routes }