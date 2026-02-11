import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isDate, IsDateString, IsEmail, IsNotEmpty, min, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    nome: string;
    
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user', required: true })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'password123', description: 'The password of the user', required: true })
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;

    @ApiProperty({ example: true, description: 'Indicates if the user is active', required: true, default: true })
    @IsBoolean({ message: 'isActive must be a boolean value' })
    isActive: boolean;
    
    @ApiProperty({ example: '2024-06-01T12:00:00Z', description: 'The date and time when the user was created', type: 'string', format: 'date-time', default: new Date().toISOString() , readOnly: true}) 
    createdAt: Date;
    
 
}
