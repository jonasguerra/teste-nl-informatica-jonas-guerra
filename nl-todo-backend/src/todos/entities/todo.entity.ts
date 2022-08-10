import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;
}
