import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tiers } from "./Tiers";

@Index("tier_id", ["tierId"], {})
@Entity("guests", { schema: "arombake" })
export class Guests {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "expenditure", default: () => "'0'" })
  expenditure: number;

  @Column("int", { name: "tier_id", nullable: true })
  tierId: number | null;

  @ManyToOne(() => Tiers, (tiers) => tiers.guests, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tier_id", referencedColumnName: "id" }])
  tier: Tiers;
}
