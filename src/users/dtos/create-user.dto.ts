import { IsEmail, IsString, isString } from 'class-validator'

export class createUserDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}