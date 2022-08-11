import * as bcrypt from "bcrypt";
import { BaseEntity } from "src/common/entities/base.entity";
import { Todo } from "src/todos/entities/todo.entity";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos: Todo[];
}
