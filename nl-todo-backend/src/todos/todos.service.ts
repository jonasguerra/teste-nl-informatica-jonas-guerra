import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/entities/todo.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: string) {
    return await this.todoRepository.findOne(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    let item = await this.todoRepository.findOne(id);
    item = { ...item, ...updateTodoDto };

    return this.todoRepository.save(item);
  }

  async remove(id: string) {
    return await this.todoRepository.delete(id);
  }
}
