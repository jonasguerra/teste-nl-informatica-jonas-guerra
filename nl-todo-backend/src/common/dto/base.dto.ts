import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {

    @ApiProperty({readOnly: true})
    id: string;

    @ApiProperty({readOnly: true})
    createdAt: Date;

    @ApiProperty({readOnly: true})
    updatedAt: Date;

    constructor(props: any){
        Object.assign(this, props);
    }
}
