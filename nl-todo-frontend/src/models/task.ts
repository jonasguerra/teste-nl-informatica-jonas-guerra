export class Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;

  constructor(
    title: string = "",
    description: string = " ",
    completed: boolean = false
  ) {
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}
