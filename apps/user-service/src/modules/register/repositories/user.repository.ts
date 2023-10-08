export abstract class IUserRepository {
  abstract registerNewUser(data: any): Promise<void>;
  abstract registerNewRestaurant(data: any): Promise<void>;
}
