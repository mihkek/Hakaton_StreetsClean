import { BaseEntity, Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import RoutePoints from "./route-points";

@Entity("routes")
export default class Routes extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({type:"float"})
    tehnikPosition_lat: number 

    @Column({type:"float"})
    tehnikPosition_len: number 

    @Column()
    line_color: string

    @Column()
    typeTeh: number

    @Column()
    timeWork: string

    @Column()
    tehCount: number

    @OneToMany( type => RoutePoints , points => points.route)
    points: RoutePoints[];

    constructor(){
        super()
      }

}