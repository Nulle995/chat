-- CreateTable
CREATE TABLE "ChatRoomUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ChatRoomUser_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoomUser_userId_chatId_key" ON "ChatRoomUser"("userId", "chatId");
