/*
  Warnings:

  - You are about to alter the column `deadLine` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `endTime` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `startTime` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - Made the column `remind` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repeat` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "deadLine" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" INTEGER NOT NULL,
    "remind" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "status" INTEGER NOT NULL
);
INSERT INTO "new_task" ("deadLine", "endTime", "id", "remind", "repeat", "startTime", "status", "title") SELECT "deadLine", "endTime", "id", "remind", "repeat", "startTime", "status", "title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
