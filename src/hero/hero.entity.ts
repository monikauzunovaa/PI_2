import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Universe } from "src/universe/universe.entity";
import { Power } from "src/powers/powers.entity";

@Entity()
export class Hero {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ default: 0, nullable: true })
    totalStrength?: number;

    @ManyToMany(() => Power)
    @JoinTable()
    powers: Power[];

    @ManyToOne(() => Universe, (universe) => universe.heroes)
    universe: Universe;
}