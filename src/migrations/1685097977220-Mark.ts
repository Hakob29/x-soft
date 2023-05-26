import { MigrationInterface, QueryRunner } from "typeorm";

export class Mark1685097977220 implements MigrationInterface {
    name = 'Mark1685097977220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mark" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0c6d4afd73cc2b4eee5a926aafc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "year" integer NOT NULL, "engine" integer NOT NULL, "color" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "markId" bigint, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_2902d5a0762387548da5672aa40" FOREIGN KEY ("markId") REFERENCES "mark"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_2902d5a0762387548da5672aa40"`);
        await queryRunner.query(`DROP TABLE "model"`);
        await queryRunner.query(`DROP TABLE "mark"`);
    }

}
