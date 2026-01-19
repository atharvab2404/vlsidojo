-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "branch" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "signupCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "year" TEXT;
