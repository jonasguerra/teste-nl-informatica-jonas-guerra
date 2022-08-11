import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth/jwt.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodosService } from "./todos.service";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("todos")
@ApiTags("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.todosService.remove(id);
  }
}
