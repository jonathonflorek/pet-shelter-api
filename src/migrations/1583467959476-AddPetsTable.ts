import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPetsTable1583467959476 implements MigrationInterface {
    name = 'AddPetsTable1583467959476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "breed" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pet"`, undefined);
    }

}
