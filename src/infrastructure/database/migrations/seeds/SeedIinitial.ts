import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedIinitial1947437167931 implements MigrationInterface {
  name = 'SeedIinitial1947437167931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.users (name,username,"password",email,profile,is_active) VALUES
	 ('Nome Completo','user@example.com','$2a$10$Jc9tTGJMo5jCNiQU4MImEuVnGFu16DQmQygmkP6wv/ELZSWdSKpGq','example@example.com','ADMIN'::public.users_profile_enum,true);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
