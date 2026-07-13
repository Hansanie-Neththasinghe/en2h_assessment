import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1712345678901 implements MigrationInterface {
    name = 'InitialSchema1712345678901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "passwordHash" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        
        await queryRunner.query(`CREATE TABLE "service" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "price" decimal(10,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        
        await queryRunner.query(`CREATE TABLE "booking" ("id" varchar PRIMARY KEY NOT NULL, "customerName" varchar NOT NULL, "customerEmail" varchar NOT NULL, "customerPhone" varchar NOT NULL, "serviceId" varchar NOT NULL, "bookingDate" date NOT NULL, "bookingTime" time NOT NULL, "status" varchar NOT NULL DEFAULT ('PENDING'), "notes" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
