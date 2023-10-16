import { IRestaurantRegisterDTO } from '../dtos/restaurant.dto';
import { IUserRegiserDTO } from '../dtos/user.dto';

export abstract class IUserRepository {
  abstract registerNewUser(data: IUserRegiserDTO): Promise<void>;
  abstract registerNewRestaurant(data: IRestaurantRegisterDTO): Promise<void>;
}
