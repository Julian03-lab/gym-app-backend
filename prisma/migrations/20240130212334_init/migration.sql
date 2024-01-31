-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maxWeight" DECIMAL(65,30),
    "repetitionMax" DECIMAL(65,30),

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
