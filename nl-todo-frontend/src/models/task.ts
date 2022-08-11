export class Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;

  constructor(
    title: string = "",
    description: string = " ",
    completed: boolean = false,
    createdAt: string = ""
  ) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}
