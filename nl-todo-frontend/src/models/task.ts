export class Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    title: string = "",
    description: string = " ",
    status: string = "",
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
