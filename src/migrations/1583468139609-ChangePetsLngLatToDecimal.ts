import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePetsLngLatToDecimal1583468139609 implements MigrationInterface {
    name = 'ChangePetsLngLatToDecimal1583468139609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "latitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "latitude" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "longitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "longitude" numeric NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "longitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "longitude" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "latitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "latitude" integer NOT NULL`, undefined);
    }

}
