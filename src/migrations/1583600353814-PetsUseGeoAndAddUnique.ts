import {MigrationInterface, QueryRunner} from "typeorm";

export class PetsUseGeoAndAddUnique1583600353814 implements MigrationInterface {
    name = 'PetsUseGeoAndAddUnique1583600353814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "latitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "longitude"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "location" geometry(Point,4326) NOT NULL`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ab1ff6fc03c2677daf30a910fb" ON "pet" USING GiST ("location") `, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "UQ_235f6f09cad76c961afc52ba615" UNIQUE ("name", "type", "breed")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "UQ_235f6f09cad76c961afc52ba615"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ab1ff6fc03c2677daf30a910fb"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "location"`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "longitude" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pet" ADD "latitude" numeric NOT NULL`, undefined);
    }

}
