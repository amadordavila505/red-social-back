import { User } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('simple-array', { nullable: true })
  likes: string[];

  @Column('simple-array', { nullable: true })
  comments: string[];

  @Column({ type: 'json', nullable: false })
  userCreated: {
    idUser: string;
    username: string;
    avatar: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ 
    name: 'user_id', //El campo que relaciona a mi tabla
    referencedColumnName: 'id'
  })
  autor: User;
}

