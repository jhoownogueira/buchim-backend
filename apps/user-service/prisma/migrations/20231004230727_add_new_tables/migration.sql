-- CreateTable
CREATE TABLE "Admin" (
    "AdminID" TEXT NOT NULL,
    "Username" VARCHAR(30) NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "CommentID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "PostID" TEXT NOT NULL,
    "ImageURL" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("CommentID")
);

-- CreateTable
CREATE TABLE "CreditsTransaction" (
    "TransactionID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TransactionType" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditsTransaction_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateTable
CREATE TABLE "Like" (
    "LikeID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "PostID" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("LikeID")
);

-- CreateTable
CREATE TABLE "Location" (
    "LocationID" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "Number" INTEGER NOT NULL,
    "Neighborhood" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "ZipCode" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION,
    "Longitude" DOUBLE PRECISION,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("LocationID")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "MenuItemID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(500) NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("MenuItemID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "NotificationID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "UsedCredits" DOUBLE PRECISION NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentID")
);

-- CreateTable
CREATE TABLE "Post" (
    "PostID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "Content" VARCHAR(200) NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("PostID")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "ReservationID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL,
    "NumberOfPeople" INTEGER NOT NULL,
    "Status" VARCHAR(255) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ReservationID")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "RestaurantID" TEXT NOT NULL,
    "Username" VARCHAR(15) NOT NULL,
    "FullName" VARCHAR(255) NOT NULL,
    "ProfileImageURL" TEXT NOT NULL,
    "LocationID" TEXT NOT NULL,
    "AcceptsReservations" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("RestaurantID")
);

-- CreateTable
CREATE TABLE "RestaurantTokens" (
    "RefreshTokenID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "RefreshToken" TEXT NOT NULL,
    "ExpiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantTokens_pkey" PRIMARY KEY ("RefreshTokenID")
);

-- CreateTable
CREATE TABLE "Review" (
    "ReviewID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Rating" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Username" VARCHAR(15) NOT NULL,
    "FullName" VARCHAR(255) NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfileImageURL" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "UserTokens" (
    "RefreshTokenID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "RefreshToken" TEXT NOT NULL,
    "ExpiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("RefreshTokenID")
);

-- CreateTable
CREATE TABLE "UserFollowsRestaurant" (
    "FollowID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "RestaurantID" TEXT NOT NULL,
    "FollowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollowsRestaurant_pkey" PRIMARY KEY ("FollowID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Username_key" ON "Admin"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_Username_key" ON "Restaurant"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "Post"("PostID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditsTransaction" ADD CONSTRAINT "CreditsTransaction_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "Post"("PostID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_LocationID_fkey" FOREIGN KEY ("LocationID") REFERENCES "Location"("LocationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantTokens" ADD CONSTRAINT "RestaurantTokens_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowsRestaurant" ADD CONSTRAINT "UserFollowsRestaurant_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowsRestaurant" ADD CONSTRAINT "UserFollowsRestaurant_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
