// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserImage } from './user-image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;
  
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'varchar', nullable: false })
  avatar: string;

    autor:User;

    @OneToMany(() => UserImage, (userImage) => userImage.user,{
      cascade: true,
    }) 
  images?: UserImage[];
}
