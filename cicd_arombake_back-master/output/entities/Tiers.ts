import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Guests } from "./Guests";

@Entity("tiers", { schema: "arombake" })
export class Tiers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Guests, (guests) => guests.tier)
  guests: Guests[];
}
