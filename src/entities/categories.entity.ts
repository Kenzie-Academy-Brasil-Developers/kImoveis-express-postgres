import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;
}

export default Category;
