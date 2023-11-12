import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserImage{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({ type:'varchar', nullable:true })
    url: string;

    //Relacion product image a publicacion
    //muchas imagenes tienen una publicacion
    @ManyToOne(() => User, (user) => user.images, {
      onDelete: 'CASCADE',
    })
    user:User;
}