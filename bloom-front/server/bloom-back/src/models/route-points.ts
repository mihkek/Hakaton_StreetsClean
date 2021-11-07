import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Routes from "./route";

@Entity("route_points")
export default class RoutePoints extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "float"})
    lat: string

    @Column({type: "float"})
    lng: string

    @ManyToOne(type => Routes, route => route.points, { cascade: true, onDelete: 'CASCADE' })
    route: Routes

    constructor(){
        super()
      }

}