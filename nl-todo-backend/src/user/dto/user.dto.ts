
export class CreateUserDto {

    email: string;
    password: string;
    firstName?: string;
    lastName?: string;

    constructor(props: any){
        Object.assign(this, props);
    }
}
