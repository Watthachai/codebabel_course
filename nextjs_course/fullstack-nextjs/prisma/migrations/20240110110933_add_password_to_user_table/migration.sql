-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
UPDATE "User" SET password = uuid_generate_v4();