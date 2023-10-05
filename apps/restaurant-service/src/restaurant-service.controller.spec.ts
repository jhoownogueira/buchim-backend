import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantServiceController } from './restaurant-service.controller';
import { RestaurantServiceService } from './restaurant-service.service';

describe('RestaurantServiceController', () => {
  let restaurantServiceController: RestaurantServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantServiceController],
      providers: [RestaurantServiceService],
    }).compile();

    restaurantServiceController = app.get<RestaurantServiceController>(RestaurantServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(restaurantServiceController.getHello()).toBe('Hello World!');
    });
  });
});
