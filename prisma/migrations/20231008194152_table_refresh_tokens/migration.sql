-- CreateTable
CREATE TABLE "UserTokens" (
    "UserID" TEXT NOT NULL,
    "Token" TEXT NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "RestaurantTokens" (
    "RestaurantID" TEXT NOT NULL,
    "Token" TEXT NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantTokens_pkey" PRIMARY KEY ("RestaurantID")
);

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantTokens" ADD CONSTRAINT "RestaurantTokens_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;
