export class CreateUserDto {
  email: string;
  password: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
