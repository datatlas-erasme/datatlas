import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectMigration1564040000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
        `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "published" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_8bf68bc960b6b1b9a6b9c54b9f3" PRIMARY KEY ("id"))`,
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "project"`);
    }
    }