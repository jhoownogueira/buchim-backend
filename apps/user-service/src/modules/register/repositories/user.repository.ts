import { IUserRegiserDTO } from '../dtos/user.dto';

export abstract class IUserRepository {
  abstract registerNewUser(data: any): Promise<void>;
  abstract registerNewRestaurant(data: IUserRegiserDTO): Promise<void>;
}
