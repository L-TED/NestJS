import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("staffs", { schema: "arombake" })
export class Staffs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "age" })
  age: number;

  @Column("date", { name: "year" })
  year: string;
}
