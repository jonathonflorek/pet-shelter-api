import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';

const any: any = undefined;

@Entity('pet')
// unique on 'type' in case there are 2 breeds of different types with same breed name
@Unique(['name', 'type', 'breed'])
export class PetEntity {
    @PrimaryGeneratedColumn()
    public id: number = any;

    @Column({ nullable: false })
    public name: string = any;

    @Column({ nullable: false })
    public type: string = any;

    @Column({ nullable: false })
    public breed: string = any;

    @Column('geometry', {
        nullable: false,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    @Index({ spatial: true })
    public location: {
        type: 'Point';
        coordinates: [number, number];
    } = any;
}
