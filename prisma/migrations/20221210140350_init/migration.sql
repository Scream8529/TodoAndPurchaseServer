-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "userName" TEXT NOT NULL,
    "avatar" TEXT,
    "pass" TEXT NOT NULL,
    "groups" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "notification_key" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "wait_confirm" INTEGER[],
    "members" INTEGER[],

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);
