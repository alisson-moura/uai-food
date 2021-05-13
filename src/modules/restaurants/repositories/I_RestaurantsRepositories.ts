import { Restaurant } from "../infra/typeorm/entities/Restaurant";

interface I_RestaurantsRepository {
  create({
  
  }):Promise<Restaurant>
}

export { I_RestaurantsRepository }