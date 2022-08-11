import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne((type) => User, (user) => user.todos)
  user: User;
}
