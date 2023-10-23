export type ICreatePost = {
  restaurantID: string;
  content: string;
  imageURL: string;
};

export type ILikePost = {
  userID: string;
  postID: string;
};

export type IFollowRestaurant = {
  userID: string;
  restaurantID: string;
};

export type IRestaurantList = {
  id: string;
  username: string;
  fullName: string;
  profileImageURL: string;
  localization: {
    latitude: number | null;
    longitude: number | null;
    street: string;
    number: number;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
};
