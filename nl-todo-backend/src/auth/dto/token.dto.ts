import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
    
    access_token: string;

    constructor(props: any){
        Object.assign(this, props);
    }
}