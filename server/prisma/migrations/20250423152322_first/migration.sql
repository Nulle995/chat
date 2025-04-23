-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoomUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ChatRoomUser_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoomUser" ("chatId", "id", "role", "userId") SELECT "chatId", "id", "role", "userId" FROM "ChatRoomUser";
DROP TABLE "ChatRoomUser";
ALTER TABLE "new_ChatRoomUser" RENAME TO "ChatRoomUser";
CREATE UNIQUE INDEX "ChatRoomUser_userId_chatId_key" ON "ChatRoomUser"("userId", "chatId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
