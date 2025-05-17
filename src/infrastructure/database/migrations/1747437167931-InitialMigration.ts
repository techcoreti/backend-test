import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747437167931 implements MigrationInterface {
    name = 'InitialMigration1747437167931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_profile_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "profile" "public"."users_profile_enum" NOT NULL DEFAULT 'USER', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authentications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "is_logged" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_2505c0cb39a2248520f306c1447" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD CONSTRAINT "FK_e9a778e982665303f152c01573d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentications" DROP CONSTRAINT "FK_e9a778e982665303f152c01573d"`);
        await queryRunner.query(`DROP TABLE "authentications"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_profile_enum"`);
    }

}
