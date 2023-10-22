export type ICreatePost = {
  restaurantID: string;
  content: string;
  imageURL: string;
};

export type ILikePost = {
  userID: string;
  postID: string;
};
