import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users', schema: 'identity' })
export class UsersEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  role_unq_id : string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;
}