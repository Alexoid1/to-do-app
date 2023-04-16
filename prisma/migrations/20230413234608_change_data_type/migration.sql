-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "deadLine" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "remind" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "status" INTEGER NOT NULL
);
INSERT INTO "new_task" ("deadLine", "endTime", "id", "remind", "repeat", "startTime", "status", "title") SELECT "deadLine", "endTime", "id", "remind", "repeat", "startTime", "status", "title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
