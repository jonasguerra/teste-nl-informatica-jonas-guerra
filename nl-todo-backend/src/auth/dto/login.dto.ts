import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    email: string;

    password: string;
}
