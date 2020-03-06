import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const any: any = undefined;

@Entity('pet')
export class PetEntity {
    @PrimaryGeneratedColumn()
    public id: number = any;

    @Column()
    public name: string = any;

    @Column()
    public type: string = any;

    @Column()
    public breed: string = any;

    @Column()
    public latitude: number = any;

    @Column()
    public longitude: number = any;
}
