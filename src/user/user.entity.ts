import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({
  })
  @Field((type) => Int)
  id: number;

  @Column({
    nullable: false
  })
  @Field()
  fullName: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  @Field()
  email: string;
  
  @Column({
    nullable: false,
    default: '',
  })
  @Field()
  password: string;
}