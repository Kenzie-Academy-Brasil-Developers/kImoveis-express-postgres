import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./user.entity";

@Entity("schedules_users_properties")
export class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => RealEstate, (p) => p.id)
  realEstate: RealEstate;
  
  @ManyToOne(() => User, (u) => u.id)
  user: User;
}

export default Schedule;
